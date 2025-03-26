"use strict";
class SoundSphereInfo {
    constructor() {
        this.name = "SoundSphere";
        //**************************************** */
        // ATENÇÃO LEMBRAR DE TROCAR VERSÃO
        //**************************************** */
        this.version = "1.7";
        this.JSONFileStructureVersion = "1.7";
        this.beta = true;
    }
    getVersion() {
        return this.version;
    }
    getFullName() {
        return `${this.name} - ${this.version}`;
    }
    getColorTitle() {
        return this.beta ? "red" : "black";
    }
}
