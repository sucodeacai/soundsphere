"use strict";
class FileWavSoundSphereContinue extends FileWav {
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.listNamesValid = [];
        this.simplePage = simplePage;
        const fileHomeWavInput = document.getElementById("filesWavContinue");
        if (fileHomeWavInput) {
            fileHomeWavInput.addEventListener("change", (evt) => {
                "use strict";
                this.listNamesInvalid = [];
                this.listNamesValid = this.dao.getListNameOfBuffers();
                let files = []; // Agora usamos File[], que é um array real
                if (navigator.userAgent.match(/Android/i)) {
                    files = Array.from(evt.target.files || []); // Converte o FileList para um array
                }
                else {
                    const targetFiles = evt.target.files;
                    if (targetFiles) {
                        for (let i = 0; i < targetFiles.length; i++) {
                            let sameName = false;
                            for (let index = 0; index < this.listNamesValid.length; index++) {
                                if (targetFiles[i].name === this.listNamesValid[index]) {
                                    sameName = true;
                                }
                            }
                            if (sameName) {
                                files.push(targetFiles[i]);
                            }
                            else {
                                this.listNamesInvalid.push(targetFiles[i].name);
                            }
                        }
                    }
                }
                if (files.length === this.listNamesValid.length) {
                    this.simplePage.activateModalLoading();
                    this.loadFilesWav(files);
                }
                else {
                    // this.desativaModalLoad();
                    this.showMessageErrorWav();
                    this.simplePage.disableModalLoading();
                }
            });
        }
    }
    onReaderWav(bufferList) {
        let callBackToLoadWav = function () {
            this.listNamesInvalid = this.listNamesInvalid.concat(this.dao.listMessagesError);
            this.simplePage.showContinueLastMessage(this.listNamesInvalid);
            this.simplePage.disableModalLoading();
        }.bind(this);
        this.dao.loadBufferList(bufferList, callBackToLoadWav, false);
    }
    showMessageErrorWav() {
        this.simplePage.showErrorContineWavProblem(this.listNamesInvalid);
        this.simplePage.disableModalLoading();
    }
}
