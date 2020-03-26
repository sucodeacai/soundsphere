"use strict";
class SimplePage {
    constructor(containerElement, titulo, soundSphereInfo, dao, sequenciador) {
        this.containerElement = containerElement;
        this.titulo = titulo ? titulo : "";
        this.dao = dao;
        this.sequenciador = sequenciador;
        this.soundSphereInfo = soundSphereInfo;
    }
}
