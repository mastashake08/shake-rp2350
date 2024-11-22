<template>
  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
    <!-- Connect Button -->
    <button
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
      @click="connect"
    >
      Connect to RP2350
    </button>

    <!-- Drag-and-Drop Zone -->
    <div
      class="w-full h-32 bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
      @dragover.prevent
      @drop.prevent="handleFileDrop"
    >
      <p class="text-gray-600">Drag and drop a .uf2 or .bin file here</p>
    </div>

    <!-- Upload Button -->
    <div class="mt-4">
      <input
        type="file"
        accept=".uf2,.bin"
        ref="fileInput"
        class="hidden"
        @change="handleFileSelect"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        @click="triggerFileInput"
      >
        Upload .uf2 or .bin File
      </button>
    </div>

    <!-- File Name and Status -->
    <p v-if="fileName" class="mt-4 text-gray-600">Selected: {{ fileName }}</p>
    <p v-if="statusMessage" class="mt-2 text-sm text-gray-500">{{ statusMessage }}</p>

    <!-- Progress Bar -->
    <div v-if="progress > 0" class="mt-4 w-full bg-gray-200 rounded-full h-4">
      <div
        class="bg-blue-500 h-4 rounded-full transition-all duration-200"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIOT } from '~/composables/useIOT';

const { connect, uploadBinary } = useIOT();
const fileName = ref('');
const fileInput = ref(null);
const statusMessage = ref('');
const progress = ref(0);

/**
 * Trigger the file input click event.
 */
const triggerFileInput = () => {
  fileInput.value?.click();
};

/**
 * Handle file selection via file input.
 * @param {Event} event
 */
const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await processFile(file);
  }
};

/**
 * Handle file drop via drag-and-drop.
 * @param {DragEvent} event
 */
const handleFileDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    await processFile(file);
  }
};

/**
 * Process the uploaded file and upload it to the device.
 * @param {File} file
 */
const processFile = async (file) => {
  if (file.name.endsWith('.uf2') || file.name.endsWith('.bin')) {
    fileName.value = file.name;
    statusMessage.value = 'Uploading...';
    progress.value = 0;

    await uploadBinary(file, (uploadedBytes, totalBytes) => {
      progress.value = Math.round((uploadedBytes / totalBytes) * 100);
    });

    if (progress.value === 100) {
      statusMessage.value = `Upload complete! (${file.name})`;
    }
  } else {
    statusMessage.value = 'Invalid file type. Only .uf2 and .bin files are allowed.';
  }
};
</script>
