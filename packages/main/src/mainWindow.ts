import { BrowserWindow } from 'electron';
import { join } from 'path';
import { URL } from 'url';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    visualEffectState: 'active',
    webPreferences: {
      webviewTag: false,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 240,
    height: 240,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: true,
    alwaysOnTop: true,
    focusable: true,
  });

  browserWindow.setAlwaysOnTop(true, 'floating');
  browserWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  browserWindow.setIgnoreMouseEvents(false);

  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();
    browserWindow?.setIgnoreMouseEvents(false);

    if (import.meta.env.DEV) {
      // browserWindow?.webContents.openDevTools();
    }
  });

  browserWindow.on('blur', () => {
    setTimeout(() => {
      if (!browserWindow.isDestroyed()) {
        browserWindow.setAlwaysOnTop(true, 'floating');
      }
    }, 100);
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

// ADICIONE ESTA FUNÇÃO QUE ESTAVA FALTANDO:
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.setAlwaysOnTop(true, 'floating');
  window.setIgnoreMouseEvents(false);
  window.moveTop();
  window.focus();
}