<template>
     <div class="min-h-screen bg-black text-white flex flex-col py-8 px-6">
    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Instructions Section -->
      <div class="bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-neon-green">
        <h2 class="text-2xl font-bold mb-4 text-neon-green">How to Use</h2>
        <ol class="list-decimal list-inside space-y-4 text-gray-300">
          <li>
            Click the <b>"Connect to RP2350"</b> button to connect to your device.value.
          </li>
          <li>
            Grant access to the RP2350's filesystem (its mount point).
          </li>
          <li>
            Upload a <b>.uf2</b> or <b>.bin</b> file:
            <ul class="list-disc list-inside ml-6 space-y-2">
              <li>Drag and drop the file into the upload area.</li>
              <li>OR click the <b>"Upload File"</b> button to select a file from your computer.</li>
            </ul>
          </li>
          <li>
            Inspect the connected device details using the <b>"Inspect RP2350"</b> section below.
          </li>
        </ol>
        <p class="mt-4 text-gray-500">
          Note: Ensure your device is mounted and the site is served over HTTPS.
        </p>
      </div>

      <!-- FileUploader Section -->
      <div class="bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-neon-blue">
        <FileUploader />
      </div>
    </div>

    <!-- Inspect RP2350 Section -->
    <div class="bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-neon-pink mt-12">
      <h2 class="text-2xl font-bold mb-4 text-neon-pink">Inspect RP2350</h2>
      <button
        class="bg-neon-blue text-black px-4 py-2 rounded-md font-bold hover:bg-blue-400 shadow-md hover:shadow-lg mb-4"
        @click="inspectDevice"
      >
        Inspect RP2350
      </button>

      <!-- Device Info -->
      <div v-if="deviceInfo">
        <p class="font-bold">Device Information:</p>
        <ul class="list-disc list-inside space-y-2 mt-4 text-gray-300">
          <li><b>Product Name:</b> {{ deviceInfo.productName || 'Unknown' }}</li>
          <li><b>Manufacturer:</b> {{ deviceInfo.manufacturerName || 'Unknown' }}</li>
          <li><b>Serial Number:</b> {{ deviceInfo.serialNumber || 'Unknown' }}</li>
          <li><b>Vendor ID:</b> {{ deviceInfo.vendorId }}</li>
          <li><b>Product ID:</b> {{ deviceInfo.productId }}</li>
        </ul>
      </div>
      <p v-else class="text-gray-500">
        No device information available. Click "Inspect RP2350" to begin.
      </p>

      <!-- Configurations and Interfaces -->
      <div v-if="configurations.length" class="mt-8">
        <p class="font-bold text-neon-green">Device Configurations:</p>
        <div v-for="(config, index) in configurations" :key="index" class="mt-6">
          <p><b>Configuration {{ index + 1 }}:</b></p>
          <ul class="list-disc list-inside space-y-4 text-gray-300">
            <li><b>Configuration Value:</b> {{ config.configurationValue }}</li>
            <li><b>Interfaces:</b></li>
            <ul class="list-inside ml-6 space-y-2">
              <li
                v-for="(x, index2) in config.interfaces"
                :key="index2"
                class="space-y-2"
              >
                <b>Interface {{ index2 + 1 }}:</b>
                <ul class="list-disc list-inside ml-6">
                  <li><b>Interface Number:</b> {{ x.interfaceNumber }}</li>
                  <li><b>Alternate Setting:</b> {{ x.alternateSetting }}</li>
                  <li>
                    <b>Endpoints:</b>
                    <ul class="list-disc list-inside ml-6">
                      <li
                        v-for="(endpoint, eIndex) in x.endpoints"
                        :key="eIndex"
                      >
                        <b>Endpoint {{ eIndex + 1 }}:</b>
                        {{ endpoint.type }} ({{ endpoint.direction }})
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  const deviceInfo = ref(null);
  const configurations = ref([]);
  const device = ref(null)
  /**
   * Inspect the RP2350 using WebUSB API.
   */
  const inspectDevice = async () => {
    try {
      // Request a USB device matching the RP2350 Vendor ID
      device.value= await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x2E8A }], // Replace with the actual Vendor ID for RP2350
      });
  
      if (!device.value) {
        console.error('No RP2350 device found.');
        return;
      }
  
      // Open the device to access configurations
      await device.value.open();
      await device.value.selectConfiguration(1);
      await device.value.claimInterface(1);
      // Fetch basic device details
      deviceInfo.value = {
        productName: device.value.productName,
        manufacturerName: device.value.manufacturerName,
        serialNumber: device.value.serialNumber,
        vendorId: `0x${device.value.vendorId.toString(16)}`,
        productId: `0x${device.value.productId.toString(16)}`,
      };
  
      // Fetch configurations and interfaces
      configurations.value = device.value.configurations.map((config) => ({
        configurationValue: config.configurationValue,
        interfaces: config.interfaces.map((iface) => ({
          interfaceNumber: iface.interfaceNumber,
          alternateSetting: iface.alternateSetting,
          endpoints: iface.alternates[0].endpoints.map((ep) => ({
            type: ep.type,
            direction: ep.direction,
          })),
        })),
      }));
  
      console.log('Device Configurations:', configurations.value);
    } catch (error) {
      console.error('Failed to inspect device:', error);
    }
  };
   /**
   * Parse a .uf2 file and extract blocks.
   * @param {ArrayBuffer} fileBuffer - The UF2 file as an ArrayBuffer.
   * @returns {Uint8Array[]} - An array of UF2 blocks.
   */
   const parseUF2File = (fileBuffer) => {
    const blocks = [];
    const view = new DataView(fileBuffer);
    const blockSize = 512; // UF2 blocks are 512 bytes each.

    for (let offset = 0; offset < fileBuffer.byteLength; offset += blockSize) {
      const block = new Uint8Array(fileBuffer, offset, blockSize);
      blocks.push(block);
    }

    return blocks;
  };

  /**
   * Upload a .uf2 file to the RP2350.
   * @param {File} uf2File - The .uf2 file to upload.
   */
  const uploadUF2 = async (uf2File) => {
    if (!device.value) {
      console.error("Device is not connected.");
      return;
    }

    try {
      // Read the .uf2 file and parse blocks.
      const fileBuffer = await uf2File.arrayBuffer();
      const blocks = parseUF2File(fileBuffer);

      console.log(`Parsed ${blocks.length} UF2 blocks.`);

      // Send each block to the device.
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        await device.value.transferOut(1, block); // Endpoint 1 for writing
        console.log(`Uploaded block ${i + 1}/${blocks.length}`);
      }

      console.log("UF2 upload complete!");
    } catch (error) {
      console.error("Error uploading UF2:", error);
    }
  };

  </script>
  <style scoped>
  /* Neon Colors */
  .text-neon-green {
    color: #39ff14;
  }
  .text-neon-blue {
    color: #0ff;
  }
  .text-neon-pink {
    color: #ff6ec7;
  }
  .bg-neon-blue {
    background-color: #0ff;
  }
  .border-neon-green {
    border-left-color: #39ff14;
  }
  .border-neon-blue {
    border-left-color: #0ff;
  }
  .border-neon-pink {
    border-left-color: #ff6ec7;
  }
  </style>