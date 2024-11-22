<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header class="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Shake RP2350</h1>
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
            <li>Wait for the upload to complete. A progress bar will show the upload status.</li>
            <li>Once the upload is complete, check the RP2350 filesystem for the uploaded file.</li>
          </ol>
          <p class="mt-4 text-gray-500">Note: Ensure your device is mounted and the site is served over HTTPS.</p>
        </div>

        <!-- FileUploader Section -->
        <div>
          <FileUploader />
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
        <p>© 2024 Shake RP2350. Built by <a href="https://jyroneparker.com" target="_blank">Mastashake08.</a></p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import FileUploader from '~/components/FileUploader.vue';
</script>
