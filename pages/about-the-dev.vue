<template>
    <div class="min-h-screen bg-black text-white flex flex-col py-8 px-6">
      <!-- Main Content -->
      <div class="p-6 bg-gray-900 shadow-lg rounded-lg neon-border">
        <!-- Headshot Placeholder -->
        <div class="flex justify-center mb-6">
            <img src="/headshot.jpg" alt="Jyrone Parker" class="object-cover w-128 h-128 rounded-lg shadow-md" />
        </div>

  
        <h2 class="text-3xl font-bold mb-4 text-neon-green">Meet Jyrone Parker (Mastashake)</h2>
        <p class="text-gray-300 leading-7">
          Hello! I'm <strong class="text-neon-green">Jyrone Parker</strong>, also known as Mastashake, a passionate full-stack developer, cloud architect, and IoT enthusiast. 
          With over a decade of experience in software engineering, I love building innovative projects, contributing to open-source, and mentoring 
          the next generation of developers.
        </p>
        <p class="text-gray-300 leading-7 mt-4">
          My work includes developing solutions for IoT devices, optimizing cloud infrastructure, and creating engaging educational content for 
          the developer community. You may have seen my work or tutorials on platforms like GitHub, YouTube, or my social media channels.
        </p>
        <p class="text-gray-300 leading-7 mt-4">
          I strive to push the boundaries of technology and share knowledge with the global developer community. If you appreciate my work 
          and would like to support me, consider sponsoring me on GitHub or connecting with me on social media!
        </p>
  
        <!-- Social Media Links -->
        <h3 class="text-2xl font-bold mt-6 mb-4 text-neon-blue">Follow Me</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <a href="https://youtube.com/c/jyroneparker" target="_blank" class="text-neon-red hover:underline">
              YouTube: @jyroneparker
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jyroneparker" target="_blank" class="text-neon-pink hover:underline">
              Twitter: @jyroneparker
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/jyroneparker" target="_blank" class="text-neon-green hover:underline">
              LinkedIn: Jyrone Parker
            </a>
          </li>
          <li>
            <a href="https://github.com/mastashake08" target="_blank" class="text-neon-blue hover:underline">
              GitHub: @mastashake08
            </a>
          </li>
          <li>
            <a href="https://jyroneparker.com" target="_blank" class="text-neon-purple hover:underline">
              Personal Website: jyroneparker.com
            </a>
          </li>
        </ul>
  
        <!-- GitHub Sponsorship -->
        <h3 class="text-2xl font-bold mt-6 mb-4 text-neon-pink">Support My Work</h3>
        <p class="text-gray-300 leading-7">
          If you'd like to support my open-source contributions, educational content, or ongoing projects, consider becoming a sponsor on GitHub.
          Your support goes a long way in helping me dedicate more time to creating valuable resources for the community.
        </p>
        <a
          href="https://github.com/sponsors/mastashake08"
          target="_blank"
          class="bg-neon-green text-black px-6 py-3 rounded-md font-bold shadow-md hover:bg-green-400 mt-4 inline-block"
        >
          Sponsor Me on GitHub
        </a>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Neon Colors */
  .text-neon-green {
    color: #39ff14;
    text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14;
  }
  .text-neon-blue {
    color: #0ff;
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
  }
  .text-neon-pink {
    color: #ff6ec7;
    text-shadow: 0 0 5px #ff6ec7, 0 0 10px #ff6ec7;
  }
  .text-neon-purple {
    color: #a349a4;
    text-shadow: 0 0 5px #a349a4, 0 0 10px #a349a4;
  }
  .text-neon-red {
    color: red;
    text-shadow: 0 0 5px red, 0 0 10px red;
  }
  .bg-neon-green {
    background-color: #39ff14;
    box-shadow: 0 0 15px #39ff14;
  }
  .neon-border {
    border: 2px solid #39ff14;
    box-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14;
  }
  </style>
  