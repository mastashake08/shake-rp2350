<template>
    <div class="p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <div class="flex items-center space-x-4">
        <span
          class="inline-block w-4 h-4 rounded-full"
          :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
        ></span>
        <p class="text-lg font-medium">
          {{ isConnected ? 'RP2350 Connected' : 'No Device Connected' }}
        </p>
      </div>
      <button
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        @click="openDeviceDialog"
      >
        Select Device
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import DeviceDialog from './DeviceDialog.vue';
  import { useIOT } from '~/composables/useIOT';
  
  const { isConnected, connect } = useIOT();
  
  const openDeviceDialog = async () => {
    const selectedDevice = await connect();
    if (selectedDevice) {
      console.log('Connected to device:', selectedDevice);
    }
  };
  </script>
  