const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("db", {
  loadPokeData: () => ipcRenderer.invoke("loadPokeData"),
  storePokeData: (PokeData) => ipcRenderer.invoke("storePokeData", PokeData),
  deletePokeData: () => ipcRenderer.send("deletePokeData"),
});
