<template>
    <div class="bg-gray-900 p-6 rounded-lg shadow-lg neon-border">
      <h2 class="text-2xl font-bold mb-4 neon-text-green">Write and Run MicroPython Code</h2>
  
      <!-- Code Editor -->
      <div id="editor" class="h-96 border border-neon-blue rounded-md shadow-inner bg-black"></div>
  
      <!-- Connection and Execution -->
      <div class="mt-6">
        <button
          class="bg-neon-blue text-black px-6 py-2 rounded-md font-bold shadow-md hover:shadow-lg hover:bg-blue-400"
          @click="connectToDevice"
        >
          Connect to RP2350
        </button>
        <button
          v-if="isConnected"
          class="bg-neon-green text-black px-6 py-2 rounded-md font-bold shadow-md hover:shadow-lg hover:bg-green-400 ml-4"
          @click="sendCode"
        >
          Send Code
        </button>
      </div>
  
      <!-- Output Display -->
      <div
        v-if="output"
        class="mt-6 p-4 border border-neon-pink bg-black rounded-md shadow-inner text-gray-300"
      >
        <h3 class="text-lg font-semibold text-neon-pink">Output</h3>
        <pre class="whitespace-pre-wrap">{{ output }}</pre>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Neon Colors */
  .neon-text-green {
    color: #39ff14;
    text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14;
  }
  .border-neon-blue {
    border-color: #0ff;
  }
  .border-neon-pink {
    border-color: #ff6ec7;
  }
  .bg-neon-blue {
    background-color: #0ff;
  }
  .bg-neon-green {
    background-color: #39ff14;
  }
  </style>
  
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import * as monaco from 'monaco-editor';
  
  const editor = ref(null);
  const device = ref(null);
  const isConnected = ref(false);
  const output = ref('');
  let writer = null;
  
  /**
   * Initialize the Monaco Editor with sample MicroPython code.
   */
  onMounted(() => {
    const editorElement = document.getElementById('editor');
    if (!editorElement) {
      console.error('Editor element not found.');
      return;
    }
  
    editor.value = monaco.editor.create(editorElement, {
      value: `0x8c`,
      language: 'shell',
      theme: 'vs-dark',
    });
  });
  
  /**
   * Connect to the RP2350 device using WebUSB.
   */
  const connectToDevice = async () => {
    try {
      device.value = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x2E8A }], // Replace with RP2350's Vendor ID
      });
  
      await device.value.open();
      await device.value.selectConfiguration(1);
      await device.value.claimInterface(1);
     
      // Set device to firmware upload mode
        // const out = await device.value.controlTransferOut({
        // requestType: 'vendor',
        // recipient: 'device',
        // request: 0x8b , // Custom command
        // value: 0x01,
        // index: 0x01
        // });
        // console.log(out)
        // await sendReboot2Command(0, 500, 0, 0);
        // Retrieve UF2_STATUS information
        // const response = await getInfo(0x04, 64, 0, 0); // Example: UF2_STATUS
        // console.log("GET_INFO Response:", response);

      isConnected.value = true;
        const uf2 = await fetch('/allitems-firmware.uf2')
        await writeUF2(uf2)
      output.value = 'Connected to RP2350.\n';
    } catch (error) {
      console.error('Error connecting to USB device:', error);
      output.value += `Error: ${error.message}\n`;
    }
  };

 
    /**
   * Parse a .uf2 file and extract blocks.
   * @param {ArrayBuffer} fileBuffer - The UF2 file as an ArrayBuffer.
   * @returns {Array} - An array of UF2 block objects with targetAddress and data fields.
   */
   const parseUF2File = (fileBuffer) => {

  const blocks = [];
  const view = new DataView(fileBuffer);
  const blockSize = 512; // Each UF2 block is 512 bytes.
  for (let offset = 0; offset < fileBuffer.byteLength; offset += blockSize) {
    const magicStart = view.getUint32(offset, true); // Read the first 4 bytes as little-endian
    const magicEnd = view.getUint32(offset + 508, true); // Read the last 4 bytes of the block
    // Validate magic values
    // if (magicStart != 179400496 || magicEnd != 171066965) {
    //   console.error(`Invalid UF2 block at offset ${offset}`);
    //   continue;
    // }

    // Extract target address and data
    const targetAddress = view.getUint32(offset + 8, true); // Target Flash address
    const data = new Uint8Array(fileBuffer, offset + 32, 256); // Extract 256 bytes of data payload
    //console.log("DATA: ",data)
    blocks.push({ targetAddress, data });
  }

  return blocks;
};


  /**
   * Write a single block of memory using the WRITE command.
   * @param {Uint32} address - The target memory address.
   * @param {Uint8Array} data - The data to write.
   */
  const writeBlock = async (address, data) => {
    if (!device.value) {
      console.error("Device not connected.");
      return;
    }

    try {
      // Construct the WRITE command
      const command = new Uint8Array(32);
      command.set([0x0b, 0xd1, 0x1f, 0x43], 0); // dMagic = 0x431fd10b (little-endian)
      command.set([0x01, 0x00, 0x00, 0x00], 4); // dToken = 0x00000001 (user-defined)
      command[8] = 0x05; // bCmdId (WRITE)
      command[9] = 0x08; // bCmdSize (8 bytes)

      // dTransferLength (4 bytes)
      command[12] = 0x00;
      command[13] = 0x01; // 256 bytes
      command[14] = 0x00;
      command[15] = 0x00;

      // dAddr (4 bytes, target Flash address)
      command[16] = address & 0xff;
      command[17] = (address >> 8) & 0xff;
      command[18] = (address >> 16) & 0xff;
      command[19] = (address >> 24) & 0xff;

      // dSize (4 bytes, size of the data)
      command[20] = 0x00;
      command[21] = 0x01; // 256 bytes
      command[22] = 0x00;
      command[23] = 0x00;
      //console.log(address, command)
      // Send the WRITE command to BULK_OUT
      console.log(command)
      const com = await device.value.transferOut(3, command);
      console.log(com)
      //await device.value.transferIn(4, 64)
      // Send the data payload to BULK_OUT
      const first = new DataView(data.buffer, 0, 64);
      const second = new DataView(data.buffer, 63, 64);
      const third = new DataView(data.buffer, 127, 64);
      const fourth = new DataView(data.buffer, 191, 64);
      
      
      

      const dta = await device.value.transferOut(3, first.buffer);
      const dta2 = await device.value.transferOut(3, second.buffer);
      const dta3 = await device.value.transferOut(3, third.buffer);
      const dta4 = await device.value.transferOut(3, fourth.buffer);
      console.log([dta,dta2,dta3,dta4])
      console.log(await device.value.transferIn(4, 64))
      console.log(`Block written to address 0x${address.toString(16)}`);
    } catch (error) {
        console.log(error)
      
        console.error("Error writing block:", error);
      device.value.clearHalt("out", 3)
      device.value.clearHalt("in", 4)
    }
  };

  /**
   * Write a .uf2 file to Flash.
   * @param {File} uf2File - The .uf2 file to write.
   */
  const writeUF2 = async (uf2File) => {
    if (!device.value) {
      console.error("Device not connected.");
      return;
    }

    try {
      // Read and parse the UF2 file
      const fileBuffer = await uf2File.arrayBuffer();
      const blocks = parseUF2File(fileBuffer);
        console.log(blocks)
      console.log(`Parsed ${blocks.length} UF2 blocks.`);

      //Write each block
      for (const block of blocks) {
        const { targetAddress, data } = block;
        console.log(block)
        await writeBlock(targetAddress, data);
      }
    

      console.log("UF2 write complete!");
      device.value.close();
    } catch (error) {
      console.error("Error writing UF2:", error);
    }
  };
  /**
   * Send the GET_INFO command.
   * @param {number} type - The type of information to retrieve (bType).
   * @param {number} transferLength - Length of the data to retrieve (must be multiple of 4, < 256).
   * @param {number} param0 - Type-specific parameter 0.
   * @param {number} param1 - Type-specific parameter 1 (optional, default 0).
   * @returns {Uint8Array|null} - Retrieved data or null if the operation fails.
   */
   const getInfo = async (type, transferLength, param0 = 0, param1 = 0) => {
    if (!device.value) {
      console.error("Device not connected.");
      return null;
    }

    if (transferLength % 4 !== 0 || transferLength >= 256) {
      console.error("Invalid transfer length. Must be a multiple of 4 and less than 256.");
      return null;
    }

    try {
      // Construct the 32-byte command packet
      const command = new Uint8Array(32);
      command.set([0x0b, 0xd1, 0x1f, 0x43], 0); // dMagic = 0x431fd10b (little-endian)
      command.set([0x01, 0x00, 0x00, 0x00], 4); // dToken = 0x00000001 (user-defined)
      command[8] = 0x8b; // bCmdId (GET_INFO)
      command[9] = 0x10; // bCmdSize (16 bytes)

      // dTransferLength (4 bytes)
      command[12] = transferLength & 0xff;
      command[13] = (transferLength >> 8) & 0xff;
      command[14] = (transferLength >> 16) & 0xff;
      command[15] = (transferLength >> 24) & 0xff;

      // bType (4 bytes at offset 0x10)
      command[16] = type & 0xff;
      command[17] = (type >> 8) & 0xff;
      command[18] = (type >> 16) & 0xff;
      command[19] = (type >> 24) & 0xff;

      // dParam0 (4 bytes at offset 0x14)
      command[20] = param0 & 0xff;
      command[21] = (param0 >> 8) & 0xff;
      command[22] = (param0 >> 16) & 0xff;
      command[23] = (param0 >> 24) & 0xff;

      // dParam1 (4 bytes at offset 0x18)
      command[24] = param1 & 0xff;
      command[25] = (param1 >> 8) & 0xff;
      command[26] = (param1 >> 16) & 0xff;
      command[27] = (param1 >> 24) & 0xff;

      // Send the command to BULK_OUT
      console.log(await device.value.transferOut(3, command));

      // Receive the response from BULK_IN
      const response = await device.value.transferIn(4, transferLength);
      if (response && response.data) {
        console.log(response)
        const data = new Uint8Array(response.data.buffer);
        console.log("GET_INFO response:", data);
        return data;
      } else {
        console.error("No data received from GET_INFO command.");
        return null;
      }
    } catch (error) {
      console.error("Error sending GET_INFO command:", error);
      return null;
    }
  };

  /*
   * Send the current code in the editor to the RP2350 over USB.
   */
  const sendCode = async () => {
    if (!isConnected.value || !device.value) {
      output.value += 'Not connected to any device.\n';
      return;
    }
  
    try {
      const encoder = new TextEncoder();
      //const code = editor.value.getValue();
  
      // Send the code line by line
      //const lines = code.split('\n');
      //for (const line of lines) {
    //    const data = encoder.encode(); // Add a newline
    //     console.log(data)
        const result = await device.value.transferOut(3, new Uint8Array([0x8c])); // Send data to endpoint 1
      
     // }
  
      output.value += 'Code sent to RP2350.\n';
      
    } catch (error) {
      console.error('Error sending data:', error);
      output.value += `Error: ${error.message}\n`;
    }
  };
  
  /**
   * Read incoming data from the device.
   */
  const readData = async () => {
    if (!isConnected.value || !device.value) {
      output.value += 'Not connected to any device.\n';
      return;
    }
  
    try {
      const decoder = new TextDecoder();
      while (true) {
        const result = await device.value.transferIn(4, 64); // Receive up to 64 bytes
  
        output.value += decoder.decode(result.data);
      }
    } catch (error) {
      console.error('Error reading data:', error);
      output.value += `Error: ${error.message}\n`;
    }
  };
  </script>
  
  <style>
  #editor {
    width: 100%;
    height: 500px;
  }
  </style>
  