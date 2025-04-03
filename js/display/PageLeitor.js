"use strict";
class PageLeitor {
    constructor(soundSphereInfo) {
        this.soundSphereInfo = soundSphereInfo;
        this.setVersionSoundSphere();
    }
    setVersionSoundSphere() {
        // console.log("Teste....");
        const title = document.getElementById("continueJsonTitle");
        title.innerHTML = `SoundSphere ${this.soundSphereInfo.version}`;
    }
}
