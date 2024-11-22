// composables/useIOT.ts
import { USBManager, SerialManager } from '@mastashake08/web-iot';

export function useIOT() {
  const usbManager = new USBManager();
  const serialManager = new SerialManager();
  let device = null;

  /**
   * Connect to a device using USB or Serial.
   */
  const connect = async () => {
    try {
      // Try connecting via USB
      const usbDevices = await usbManager.requestDevice();
      if (usbDevices.length > 0) {
        device = usbDevices[0];
        await usbManager.connectDevice(device);
        console.log('Connected to USB device:', device);
        return;
      }

      // If no USB devices, try Serial
      const serialPorts = await serialManager.requestPort();
      if (serialPorts.length > 0) {
        device = serialPorts[0];
        await serialManager.connectPort(device);
        console.log('Connected to Serial device:', device);
        return;
      }

      throw new Error('No devices available to connect.');
    } catch (error) {
      console.error('Failed to connect to device:', error);
    }
  };

  /**
   * Write binary data to the connected device.
   * @param {File} file - The binary file to upload.
   */
  const uploadBinary = async (file: File) => {
    if (!device) {
      console.error('No device connected.');
      return;
    }

    try {
      // Read file content as ArrayBuffer
      const fileData = await file.arrayBuffer();
      const data = new Uint8Array(fileData);

      if (usbManager.isConnected(device)) {
        // Write data to the device over USB
        await usbManager.writeToDevice(device, data);
        console.log('File successfully uploaded via USB.');
      } else if (serialManager.isConnected(device)) {
        // Write data to the device over Serial
        await serialManager.writeToPort(device, data);
        console.log('File successfully uploaded via Serial.');
      } else {
        console.error('No valid connection to write data.');
      }
    } catch (error) {
      console.error('Failed to upload binary:', error);
    }
  };

  /**
   * Disconnect from the currently connected device.
   */
  const disconnect = async () => {
    try {
      if (usbManager.isConnected(device)) {
        await usbManager.disconnectDevice(device);
        console.log('USB device disconnected.');
      } else if (serialManager.isConnected(device)) {
        await serialManager.disconnectPort(device);
        console.log('Serial device disconnected.');
      } else {
        console.error('No device connected to disconnect.');
      }

      device = null;
    } catch (error) {
      console.error('Failed to disconnect device:', error);
    }
  };

  return {
    connect,
    uploadBinary,
    disconnect,
  };
}
