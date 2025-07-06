const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  addNewRequirement       : (beltLevel)   => ipcRenderer.send('addNewRequirement', beltLevel),
  addNewRequirementResult : (callback)    => ipcRenderer.on('addNewRequirementResult', (_event, value) => callback(value)),
})