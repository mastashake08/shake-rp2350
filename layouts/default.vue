<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <!-- Shared Header -->
    <header class="bg-gradient-to-r from-purple-800 via-pink-600 to-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-lg">
      <h1 class="text-3xl font-extrabold neon-text"><a href="/shake-rp2350/">Shake RP2350</a></h1>
      <nav class="flex space-x-6">
        <a href="/shake-rp2350/" class="hover:underline text-neon-green">Home</a>
        <a href="/shake-rp2350/about" class="hover:underline text-neon-purple">About Project</a>
        <a href="/shake-rp2350/code-editor" class="hover:underline text-neon-pink">Code Editor</a>
        <a href="/shake-rp2350/about-the-dev" class="hover:underline text-neon-blue">About Mastashake</a>
      </nav>
      <!-- Social Links -->
      <div class="flex space-x-4">
        <a href="https://github.com/mastashake08/shake-rp2350" target="_blank" class="hover:opacity-75">
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
      <slot />
    </main>

    <!-- Shared Footer -->
    <footer class="bg-black border-t border-purple-600 py-4 text-center">
      
      <p class="text-neon-green">© 2024 Shake RP2350. Built by <a href="https://jyroneparker.com" target="_blank">Mastashake.</a>
        <a
              href="https://buy.stripe.com/6oEbLI1bf6eKbXqcNk"
              target="_blank"
              class="ml4"
            >
              Support with Stripe
            </a></p>
    </footer>
  </div>
</template>

<style scoped>
/* Neon Colors */
.text-neon-green {
  color: #39ff14;
}
.text-neon-pink {
  color: #ff6ec7;
}
.text-neon-blue {
  color: #0ff;
}
.text-neon-purple {
  color: #a349a4;
}
.neon-text {
  text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14;
}

/* Gradient Backgrounds */
.bg-cyber-gradient {
  background: linear-gradient(135deg, #240b36, #c31432);
}

/* General Styling */
body {
  font-family: 'Courier New', Courier, monospace;
}
</style>

<script setup lang="ts">
useSchemaOrg([
  // primary breadcrumb
  defineBreadcrumb({
    itemListElement: [
      // item is the url and will be resolved to the absolute url
      { name: 'Home', item: '/' },
      { name: 'About', item: '/about' },
      { name: 'Code Editor', item: '/code-editor' },
      // item is not required for the last list element
      { name: 'About Mastashake' },
    ]
  }),
  defineSoftwareApp({
      name: 'Shake RP2350',
      operatingSystem: 'WEB',
      applicationCategory: 'DeveloperApplication',
      aggregateRating: {
        ratingValue: '4.6',
        ratingCount: 8864,
      },
    })
])
</script>
