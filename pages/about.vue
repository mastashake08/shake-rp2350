<template>
    <div class="p-6 bg-black text-white neon-border shadow-md rounded-lg max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold neon-text mb-6 text-center">About This Project</h2>
      <p class="text-neon-blue leading-7">
        This project was inspired by the futuristic, cutting-edge tech showcased at <strong>DefCon 32</strong>. My goal was to create a portable,
        browser-based solution for programming microcontrollers, combining the sleek aesthetics of cyberpunk with the power of modern APIs.
      </p>
      <p class="text-neon-green leading-7 mt-4">
        With technologies like WebUSB, WebAssembly, and the File System Access API, this project eliminates the need for bulky IDEs, allowing you
        to write code directly in the browser—anytime, anywhere.
      </p>
      <h3 class="text-xl font-semibold mt-6 mb-4 text-neon-pink">Technologies Used</h3>
      <ul class="list-disc list-inside space-y-2 text-white">
        <li>RP2350 Microcontroller</li>
        <li>WebUSB API</li>
        <li>WebAssembly (WASM)</li>
        <li>File System Access API</li>
      </ul>
      <h3 class="text-xl font-semibold mt-6 mb-4 text-neon-purple">Collaborate or Sponsor</h3>
      <p class="text-white leading-7">
        Join me in exploring the potential of browser-based microcontroller programming. Your feedback and support are invaluable in refining
        and expanding this project. Connect with me or sponsor my work using the links below:
      </p>
      <div class="flex space-x-4 mt-6">
        <a href="https://github.com/mastashake08/shake-rp2350" target="_blank" class="hover:opacity-75">
          <img src="/github-icon.svg" alt="GitHub" class="h-8 w-8" />
        </a>
        <a href="https://twitter.com/jyroneparker" target="_blank" class="hover:opacity-75">
          <img src="/twitter-icon.svg" alt="Twitter" class="h-8 w-8" />
        </a>
        <a href="https://linkedin.com/in/jyroneparker" target="_blank" class="hover:opacity-75">
          <img src="/linkedin-icon.svg" alt="LinkedIn" class="h-8 w-8" />
        </a>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Neon Border */
  .neon-border {
    border: 2px solid #39ff14;
    box-shadow: 0 0 10px #39ff14;
  }
  </style>
  