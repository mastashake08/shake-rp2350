<template>
    <div v-if="isDialogOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-xl font-bold mb-4">Select Device</h2>
        <ul class="divide-y divide-gray-200">
          <li
            v-for="device in devices"
            :key="device.deviceId"
            class="py-2 px-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            @click="selectDevice(device)"
          >
            <span>{{ device.productName || 'Unknown Device' }}</span>
            <span class="text-gray-500 text-sm">{{ device.vendorId }}</span>
          </li>
        </ul>
        <div class="flex justify-end mt-4">
          <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" @click="closeDialog">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { USBManager } from '@mastashake08/web-iot';
  
  const isDialogOpen = ref(false);
  const devices = ref([]);
  const usbManager = new USBManager();
  
  const openDialog = async () => {
    isDialogOpen.value = true;
    devices.value = await usbManager.requestDevice();
  };
  
  const closeDialog = () => {
    isDialogOpen.value = false;
  };
  
  const selectDevice = async (device) => {
    try {
      await usbManager.connectDevice(device);
      console.log('Connected to device:', device);
      closeDialog();
    } catch (error) {
      console.error('Failed to connect to device:', error);
    }
  };
  
  // Allow external control to open dialog
  export { openDialog };
  </script>
  