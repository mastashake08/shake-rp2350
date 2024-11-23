<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header -->
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
        <CodeEditor />
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-4 text-center">
        <p>© 2024 RP2350 Programming App. Built by Mastashake08.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import CodeEditor from '~/components/CodeEditor.vue';
  </script>
  