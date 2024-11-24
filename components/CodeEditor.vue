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
      value: `# MicroPython Example: Blink an LED on the RP2040/RP2350
  from machine import Pin
  from time import sleep
  
  # Initialize onboard LED (replace 25 with the pin number for external LEDs)
  led = Pin(25, Pin.OUT)
  
  while True:
      led.value(1)  # Turn LED on
      sleep(1)      # Wait 1 second
      led.value(0)  # Turn LED off
      sleep(1)      # Wait 1 second
  `,
      language: 'python',
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
      //await device.value.selectConfiguration(1);
      //await device.value.claimInterface(0);
  
      isConnected.value = true;
      output.value = 'Connected to RP2350.\n';
    } catch (error) {
      console.error('Error connecting to USB device:', error);
      output.value += `Error: ${error.message}\n`;
    }
  };
  
  /**
   * Send the current code in the editor to the RP2350 over USB.
   */
  const sendCode = async () => {
    if (!isConnected.value || !device.value) {
      output.value += 'Not connected to any device.\n';
      return;
    }
  
    try {
      const encoder = new TextEncoder();
      const code = editor.value.getValue();
  
      // Send the code line by line
      const lines = code.split('\n');
      for (const line of lines) {
        const data = encoder.encode(line + '\r\n'); // Add a newline
        await device.value.transferOut(1, data); // Send data to endpoint 1
      }
  
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
        const result = await device.value.transferIn(1, 64); // Receive up to 64 bytes
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
  