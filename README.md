Here’s the updated `README.md` reflecting the correct repository link:

---

# Shake RP2350

**Shake RP2350** is a Progressive Web Application (PWA) built with Nuxt 3 to interact with RP2350 IoT devices. The application allows users to upload `.uf2` binary files to the RP2350 filesystem using the modern **File System Access API** for seamless file management.

This application is styled with TailwindCSS, supports drag-and-drop file uploads, and integrates Google AdSense for monetization.

---

## Features

- **File System Access:**
  - Connect directly to the RP2350 device's filesystem via the File System Access API.
  - Upload `.uf2` binary files to the device.

- **Drag-and-Drop File Upload:**
  - Intuitive drag-and-drop interface for easy binary file selection.

- **Progressive Web Application:**
  - Installable and offline-ready with PWA features.

- **Responsive Design:**
  - Styled with TailwindCSS for a modern and mobile-friendly UI.

- **Google AdSense Integration:**
  - Monetized with ads using the `@nuxtjs/google-adsense` package.

---

## Getting Started

### Prerequisites

- **Node.js** (16.x or higher recommended)
- **npm** or **yarn**
- A Chromium-based browser (e.g., Chrome or Edge) that supports the File System Access API.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mastashake08/shake-rp2350.git
   cd shake-rp2350
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Google AdSense:
   - Update the `nuxt.config.ts` file with your Google AdSense `id`:
     ```ts
     'google-adsense': {
       id: 'ca-pub-xxxxxxxxxxxxxxxx'
     },
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## Usage

### Connecting to the RP2350

1. Click the **"Connect to RP2350"** button to select the RP2350 directory (usually its mount point).
2. Grant permission for the application to access the directory.

### Uploading `.uf2` Files

1. Drag a `.uf2` file into the designated drag-and-drop area **OR** click the **"Upload .uf2 File"** button to select a file.
2. The application will write the file to the connected RP2350 directory.

### Disconnecting

To disconnect, simply close the application or refresh the page. The filesystem connection will be reset.

---

## Project Structure

- **`/components`**: Vue components, including the drag-and-drop file uploader.
- **`/composables`**: Custom hooks for RP2350 file operations (`useIOT.ts`).
- **`/layouts`**: Application layout files.
- **`/pages`**: Pages of the application.
- **`/assets`**: TailwindCSS styles and static assets.
- **`/nuxt.config.ts`**: Nuxt configuration file.

---

## Technologies Used

- **Nuxt 3**: Framework for building modern web applications.
- **File System Access API**: Browser API for interacting with local files and directories.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **@nuxtjs/google-adsense**: Google AdSense integration for monetization.
- **@nuxtjs/pwa**: PWA module for offline capabilities and installable apps.

---

## Screenshots

![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)  
*Home Page with drag-and-drop upload interface*

![Directory Picker](https://via.placeholder.com/800x400?text=Directory+Picker+Screenshot)  
*Directory picker dialog for connecting to the RP2350 filesystem*

---

## Deployment

1. Build the application for production:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

3. Alternatively, deploy to your favorite hosting platform such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **File System Access API**: For enabling modern file interaction capabilities in web applications.
- **Nuxt.js Team**: For providing an excellent framework for building web applications.
- **TailwindCSS**: For an amazing styling framework.

---

## Contact

For any inquiries or support, contact **@mastashake08** on [GitHub](https://github.com/mastashake08). 

Happy coding! 🚀

