import * as monaco from 'monaco-editor';
import { ref, onMounted, onUnmounted } from 'vue';

export function useCodeEditor() {
  const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null);
  const compiledUF2 = ref<Uint8Array | null>(null);
  const isCompiling = ref(false);

  /**
   * Initialize Monaco Editor.
   */
  const initializeEditor = (elementId: string, initialValue: string) => {
    if (process.server) return; // Do nothing on the server

    onMounted(() => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
      }

      editor.value = monaco.editor.create(element, {
        value: initialValue,
        language: 'python',
        theme: 'vs-dark',
      });
    });

    onUnmounted(() => {
      editor.value?.dispose();
    });
  };

  /**
   * Mock compile Python code into a .uf2 binary.
   */
  const compileCode = async () => {
    if (!editor.value) {
      console.error('Editor is not initialized.');
      return;
    }

    const code = editor.value.getValue();
    console.log('Compiling code:', code);

    try {
      isCompiling.value = true;

      // Mock compilation logic (replace with actual WASM-based compiler)
      compiledUF2.value = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xFF]);

      console.log('Code compiled successfully:', compiledUF2.value);
    } catch (error) {
      console.error('Error during compilation:', error);
    } finally {
      isCompiling.value = false;
    }
  };

  /**
   * Save the compiled .uf2 file to the user's device.
   */
  const saveUF2 = () => {
    if (!compiledUF2.value) {
      console.error('No compiled .uf2 available.');
      return;
    }

    const blob = new Blob([compiledUF2.value], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'program.uf2';
    a.click();

    URL.revokeObjectURL(url);

    console.log('UF2 file downloaded.');
  };

  return {
    editor,
    compiledUF2,
    isCompiling,
    initializeEditor,
    compileCode,
    saveUF2,
  };
}
