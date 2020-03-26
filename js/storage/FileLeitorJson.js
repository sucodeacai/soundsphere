"use strict";
class FileLeitorJson extends FileJson {
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.simplePage = simplePage;
    }
    showMessageErrorJson(mensagem) {
        this.simplePage.showMessageErrorJson(mensagem);
    }
    onReaderJson(evt) {
        let soundSphereDB = JSON.parse(evt.target.result);
        console.log(soundSphereDB);
        if (soundSphereDB.soundSphereInfo != undefined && soundSphereDB.soundSphereInfo.JSONFileStructureVersion == this.dao.soundSphereInfo.JSONFileStructureVersion) {
            this.dao.synchronizeSoundSphereDB(soundSphereDB);
            this.simplePage.closeModal();
            this.simplePage.showData();
        }
        else {
            this.simplePage.showMessageErrorJson(`Versões inconpativeis, informações: </br> Versão do arquivo: ${soundSphereDB.soundSphereInfo.version} - Versão Sendo Utilizada: ${this.dao.soundSphereInfo.version}.`);
        }
    }
}
