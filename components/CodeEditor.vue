<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Write and Run MicroPython Code</h2>
  
      <!-- Code Editor -->
      <div id="editor" class="h-96 border rounded-md"></div>
  
      <!-- Connection and Execution -->
      <div class="mt-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          @click="connectToDevice"
        >
          Connect to RP2350
        </button>
        <button
          v-if="isConnected"
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
          @click="sendCode"
        >
          Send Code
        </button>
      </div>
  
      <!-- Output Display -->
      <div v-if="output" class="mt-4 p-4 bg-gray-100 border rounded-md">
        <h3 class="text-lg font-semibold">Output</h3>
        <pre class="whitespace-pre-wrap">{{ output }}</pre>
      </div>
    </div>
  </template>
  
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
  