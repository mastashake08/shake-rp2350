export function useIOT() {
  let directoryHandle: FileSystemDirectoryHandle | null = null;

  /**
   * Request access to the RP2350 directory.
   */
  const connect = async () => {
    try {
      console.log('Requesting directory access...');
      directoryHandle = await window.showDirectoryPicker({
        id: 'RP2350',
        mode: 'readwrite'});
      console.log('Directory selected:', directoryHandle);
      return directoryHandle;
    } catch (error) {
      console.error('Failed to access directory:', error);
      return null;
    }
  };

  /**
   * Write a binary file (.uf2 or .bin) to the connected directory with progress tracking.
   * @param {File} file - The binary file to upload.
   * @param {Function} onProgress - Callback for tracking upload progress.
   */
  const uploadBinary = async (file: File, onProgress = (uploaded: number, total: number) => {}) => {
    if (!directoryHandle) {
      console.error('No directory selected. Please connect first.');
      return;
    }

    try {
      console.log('Uploading file:', file.name);

      // Create a file handle in the directory
      const newDir = await directoryHandle.getDirectoryHandle('BIN', {
        create: true
      })
      const fileHandle = await newDir.getFileHandle(file.name, {
        create: true,
      });

      // Write to the file with progress tracking
      const writableStream = await fileHandle.createWritable();
      const fileData = await file.arrayBuffer();
      const totalBytes = fileData.byteLength;
      const chunkSize = 64 * 1024; // 64KB chunks
      let uploadedBytes = 0;

      for (let i = 0; i < totalBytes; i += chunkSize) {
        const chunk = fileData.slice(i, i + chunkSize);
        await writableStream.write(chunk);
        uploadedBytes += chunk.byteLength;

        // Call the progress callback
        onProgress(uploadedBytes, totalBytes);
      }

      await writableStream.close();
      console.log('File successfully written to directory.');
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  /**
   * Disconnect by clearing the directory handle.
   */
  const disconnect = () => {
    directoryHandle = null;
    console.log('Disconnected from directory.');
  };

  return {
    connect,
    uploadBinary,
    disconnect,
  };
}
