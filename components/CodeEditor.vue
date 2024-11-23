<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Learn Microcontroller Programming</h2>
  
      <!-- Code Editor -->
      <div id="editor" class="h-96 border rounded-md"></div>
  
      <!-- Links to Resources -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold">Resources for Microcontroller Programming</h3>
        <ul class="list-disc list-inside mt-2">
          <li>
            <a
              href="https://docs.micropython.org/en/latest/"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              MicroPython Official Documentation
            </a> - Learn how to program with MicroPython.
          </li>
          <li>
            <a
              href="https://www.raspberrypi.com/documentation/microcontrollers/"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Raspberry Pi Pico and RP2350 Documentation
            </a> - Official guide to programming Raspberry Pi Pico and RP2350-based boards.
          </li>
          <li>
            <a
              href="https://learn.adafruit.com/"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              Adafruit Learning System
            </a> - Tutorials and guides for microcontroller projects.
          </li>
          <li>
            <a
              href="https://circuitpython.org/"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              CircuitPython
            </a> - Another great platform for microcontroller programming.
          </li>
          <li>
            <a
              href="https://github.com/micropython/micropython"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              MicroPython on GitHub
            </a> - Explore the source code and contribute to the MicroPython project.
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import * as monaco from 'monaco-editor';
  import { onMounted } from 'vue';
  
  /**
   * Initialize the Monaco Editor with sample MicroPython code.
   */
  onMounted(() => {
    const editorElement = document.getElementById('editor');
    if (!editorElement) {
      console.error('Editor element not found.');
      return;
    }
  
    monaco.editor.create(editorElement, {
      value: `# MicroPython Example: Blink an LED on the RP2040/RP2350
  from machine import Pin
  from time import sleep
  
  # Initialize onboard LED (replace 25 with the pin number for external LEDs)
  led = Pin(25, Pin.OUT)
  
  while True:
      led.value(1)  # Turn LED on
      sleep(1)      # Wait 1 second
      led.value(0)  # Turn LED off
      sleep(1)      # Wait 1 second
  `,
      language: 'python',
      theme: 'vs-dark',
    });
  });
  </script>
  
  <style>
  #editor {
    width: 100%;
    height: 500px;
  }
  </style>
  