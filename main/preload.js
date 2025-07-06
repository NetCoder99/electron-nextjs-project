const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  invokeMain              : (channel, data) => ipcRenderer.invoke(channel, data),  
});