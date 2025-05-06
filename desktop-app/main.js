import { app, BrowserWindow } from "electron/main";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    // Load a URL instead of a local file
    //   win.loadFile('index.html')
    win.loadURL("http://localhost:5173/");
  } else {
    win.loadFile(join(__dirname, "builder/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
