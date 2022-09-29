const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
  'dataapi', {
  getInterval: () => ipcRenderer.invoke("getInterval"),
  setInterval: (data) => ipcRenderer.invoke("setInterval", data),
}); 