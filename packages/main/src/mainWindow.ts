import { BrowserWindow } from 'electron';
import { join } from 'path';
import { URL } from 'url';

// mainWindows.ts
async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    visualEffectState: 'active',
    webPreferences: {
      webviewTag: false,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false, // Adicione isso
    },
    width: 240,
    height: 240,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: false,
    hasShadow: true,
  });

  // Garantir que os eventos de mouse funcionem
  browserWindow.setIgnoreMouseEvents(false);

  // Adicionar listener para garantir eventos após carregar
  browserWindow.webContents.on('did-finish-load', () => {
    browserWindow.setIgnoreMouseEvents(false);

    // Injetar CSS para garantir eventos de mouse
    browserWindow.webContents.insertCSS(`
      * {
        -webkit-app-region: no-drag;
      }
    `);
  });

  browserWindow.setAlwaysOnTop(true, 'floating', 1);
  browserWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();
    browserWindow?.setIgnoreMouseEvents(false);

    if (import.meta.env.DEV) {
      // browserWindow?.webContents.openDevTools();
    }
  });

  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
        '../renderer/dist/index.html',
        'file://' + __dirname
      ).toString();

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
