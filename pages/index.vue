<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
      <header class="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Shake RP2350</h1>
        <nav>
          <a href="/" class="text-white hover:underline mr-4">Home</a>
          <a href="/code-editor" class="text-white hover:underline">Code Editor</a>
        </nav>
         <!-- Social Links -->
         <div class="flex space-x-4">
          <a href="https://github.com/mastashake08" target="_blank" class="hover:opacity-75">
            <img src="/github-icon.svg" alt="GitHub" class="h-6 w-6" />
          </a>
          <a href="https://twitter.com/jyroneparker" target="_blank" class="hover:opacity-75">
            <img src="/twitter-icon.svg" alt="Twitter" class="h-6 w-6" />
          </a>
          <a href="https://linkedin.com/in/jyroneparker" target="_blank" class="hover:opacity-75">
            <img src="/linkedin-icon.svg" alt="LinkedIn" class="h-6 w-6" />
          </a>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="flex-1 container mx-auto py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Instructions Section -->
          <div class="p-6 bg-white shadow-md rounded-lg">
            <h2 class="text-xl font-bold mb-4">How to Use</h2>
            <ol class="list-decimal list-inside space-y-2">
              <li>Click the <b>"Connect to RP2350"</b> button to connect to your device.</li>
              <li>Grant access to the RP2350's filesystem (its mount point).</li>
              <li>Upload a <b>.uf2</b> or <b>.bin</b> file:
                <ul class="list-disc list-inside ml-6">
                  <li>Drag and drop the file into the upload area.</li>
                  <li>OR click the <b>"Upload File"</b> button to select a file from your computer.</li>
                </ul>
              </li>
              <li>Inspect the connected device details using the <b>"Inspect RP2350"</b> section below.</li>
            </ol>
            <p class="mt-4 text-gray-500">Note: Ensure your device is mounted and the site is served over HTTPS.</p>
          </div>
  
          <!-- FileUploader Section -->
          <div>
            <FileUploader />
          </div>
        </div>
  
        <div class="p-6 bg-white shadow-md rounded-lg">
          <h2 class="text-xl font-bold mb-4">Inspect RP2350</h2>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
            @click="inspectDevice"
          >
            Inspect RP2350
          </button>
  
          <!-- Device Info -->
          <div v-if="deviceInfo">
            <p class="font-bold">Device Information:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
              <li><b>Product Name:</b> {{ deviceInfo.productName || 'Unknown' }}</li>
              <li><b>Manufacturer:</b> {{ deviceInfo.manufacturerName || 'Unknown' }}</li>
              <li><b>Serial Number:</b> {{ deviceInfo.serialNumber || 'Unknown' }}</li>
              <li><b>Vendor ID:</b> {{ deviceInfo.vendorId }}</li>
              <li><b>Product ID:</b> {{ deviceInfo.productId }}</li>
            </ul>
          </div>
          <p v-else class="text-gray-500">No device information available. Click "Inspect RP2350" to begin.</p>
  
          <!-- Configurations and Interfaces -->
          <div v-if="configurations.length" class="mt-6">
           <p class="font-bold">Device Configurations:</p>
             <div v-for="(config, index) in configurations" :key="index" class="mt-4">
              <p><b>Configuration {{ index + 1 }}:</b></p>
             <ul class="list-disc list-inside space-y-2">
                <li><b>Configuration Value:</b> {{ config.configurationValue }}</li>
                <li><b>Interfaces:</b></li>
                <ul class="list-inside ml-6">
                  <li
                    v-for="(x, index2) in config.interfaces"
                    :key="index2"
                    class="space-y-1"
                  >
                    <b>Interface {{ index2 + 1 }}</b>
                    <ul class="list-disc list-inside ml-6">
                      <li><b>Interface Number:</b> {{ x.interfaceNumber }}</li>
                      <li><b>Alternate Setting:</b> {{ x.alternateSetting }}</li>
                      <li>
                        <b>Endpoints:</b>
                        <ul class="list-inside ml-6">
                          <li v-for="(endpoint, eIndex) in x.endpoints" :key="eIndex">
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
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto text-center space-y-4">
          <!-- Stripe Checkout Link -->
          <div>
            <a
              href="https://buy.stripe.com/6oEbLI1bf6eKbXqcNk"
              target="_blank"
              class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Support with Stripe
            </a>
          </div>
  
          <!-- Social Links -->
          <div class="flex justify-center space-x-6">
            <a href="https://github.com/mastashake08" target="_blank" class="hover:opacity-75">
              <img src="/github-icon.svg" alt="GitHub" class="h-8 w-8" />
            </a>
            <a href="https://twitter.com/jyroneparker" target="_blank" class="hover:opacity-75">
              <img src="/twitter-icon.svg" alt="Twitter" class="h-8 w-8" />
            </a>
            <a href="https://linkedin.com/in/jyroneparker" target="_blank" class="hover:opacity-75">
              <img src="/linkedin-icon.svg" alt="LinkedIn" class="h-8 w-8" />
            </a>
          </div>
  
          <!-- Branding -->
          <p>© 2024 Shake RP2350. Built by <a href="https://jyroneparker.com" target="_blank">Mastashake.</a></p>
        </div>
      </footer>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  const deviceInfo = ref(null);
  const configurations = ref([]);
  
  /**
   * Inspect the RP2350 using WebUSB API.
   */
  const inspectDevice = async () => {
    try {
      // Request a USB device matching the RP2350 Vendor ID
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x2E8A }], // Replace with the actual Vendor ID for RP2350
      });
  
      if (!device) {
        console.error('No RP2350 device found.');
        return;
      }
  
      // Open the device to access configurations
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(1);
      console.log(device.configurations)
      // Fetch basic device details
      deviceInfo.value = {
        productName: device.productName,
        manufacturerName: device.manufacturerName,
        serialNumber: device.serialNumber,
        vendorId: `0x${device.vendorId.toString(16)}`,
        productId: `0x${device.productId.toString(16)}`,
      };
  
      // Fetch configurations and interfaces
      configurations.value = device.configurations.map((config) => ({
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
  </script>