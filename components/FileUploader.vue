<template>
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
      <input
        type="file"
        accept=".bin,.uf2"
        @change="handleFile"
        class="hidden"
        ref="fileInput"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        @click="triggerFileInput"
      >
        Upload Binary (.bin, .uf2)
      </button>
      <p v-if="fileName" class="mt-4 text-gray-600">Selected: {{ fileName }}</p>
    </div>
  </template>
  
  <script setup>
  import { useIOT } from '~/composables/useIOT';
  
  const fileName = ref('');
  const fileInput = ref(null);
  
  const triggerFileInput = () => fileInput.value?.click();
  
  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      fileName.value = file.name;
      await uploadBinary(file); // Upload binary using `web-iot`
    }
  };

  const { uploadBinary } = useIOT();
  </script>
  