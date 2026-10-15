/**
 * Electron Main Process - Visualizador de Estruturas de Dados & Algoritmos v2.1.0
 */

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1050,
    minHeight: 680,
    title: 'Visualizador de Estruturas de Dados & Algoritmos',
    backgroundColor: '#0f172a',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in user's default web browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Native application menu
  const menuTemplate = [
    {
      label: 'Arquivo',
      submenu: [
        { label: 'Reiniciar Aplicação', role: 'reload' },
        { type: 'separator' },
        { label: 'Sair', role: 'quit' }
      ]
    },
    {
      label: 'Exibir',
      submenu: [
        { label: 'Aumentar Zoom', role: 'zoomIn' },
        { label: 'Diminuir Zoom', role: 'zoomOut' },
        { label: 'Redefinir Zoom', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Alternar Tela Cheia', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: 'Ferramentas do Desenvolvedor', role: 'toggleDevTools' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Repositório no GitHub',
          click: () => shell.openExternal('https://github.com/Ed1rac/Visualizador-de-Estruturas-de-Dados')
        },
        {
          label: 'Versão Web Online (GitHub Pages)',
          click: () => shell.openExternal('https://ed1rac.github.io/Visualizador-de-Estruturas-de-Dados/')
        },
        { type: 'separator' },
        {
          label: 'Sobre o Visualizador v2.1.0',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre o Visualizador',
              message: 'Visualizador de Estruturas de Dados & Algoritmos',
              detail: 'Versão 2.1.0 Desktop (64-bit)\nReconstrução moderna e estendida do visualization.jar original.\nDesenvolvido com foco no rigor didático para o ensino universitário.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
