const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addNewRequirement       : (beltLevel)   => ipcRenderer.send('addNewRequirement', beltLevel),
  addNewRequirementResult : (callback)    => ipcRenderer.on('addNewRequirementResult', (_event, value) => callback(value)),
    on:   (channel, callback) => {ipcRenderer.on(channel, callback);    },
    send: (channel, args)     => {ipcRenderer.send(channel, args);    }
});