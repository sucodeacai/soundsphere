"use strict";
class FileMenuBar extends FileWav {
    // simplapage2:PageSoundSphereHome;
    constructor(sequenciador, dao, tooltip, simplePage) {
        var _a;
        super(sequenciador, dao);
        // this.simplapage2 = simplePage;
        this.simplePage = simplePage;
        (_a = document
            .getElementById("filesWav")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (evt) => {
            "use strict";
            // console.log("Chamou handledFIleselect xx");
            this.listNamesInvalid = [];
            let files = [], divLoading = null, i, f, reader, audio, result;
            const target = evt.target;
            if (navigator.userAgent.match(/Android/i)) {
                // files = target.files as FileList;
            }
            else {
                for (i = 0; i < target.files.length; i++) {
                    if (target.files[i].type === "audio/wav" &&
                        !this.dao.isItemBufferLoadedByName(target.files[i].name)) {
                        files.push(target.files[i]);
                    }
                    else if (target.files[i].type === "audio/wav") {
                        this.listNamesInvalid.push(target.files[i].name +
                            ": -Arquivo já carregado/ File already loaded");
                    }
                    else {
                        console.log("Arquivo repetido");
                        this.listNamesInvalid.push(target.files[i].name + ": -Formato inválido/ Invalid format");
                    }
                }
            }
            // Se os arquivos carregados tiver algum que pode ser utilizado e que atendisableModalLoadingdisableModalLoadingda os requisitos
            // entra no primeiro IF, se não é exibido logo a mensagem de erro
            if (files.length > 0) {
                this.simplePage.activateModalLoading();
                this.loadFilesWav(files);
            }
            else {
                this.showMessageErrorWav();
                this.simplePage.disableModalLoading();
            }
        });
    }
    onReaderWav(bufferList) {
        let callBackToLoadWav = function () {
            this.showMessageErrorWav();
        }.bind(this);
        this.dao.loadBufferList(bufferList, callBackToLoadWav);
    }
    showMessageErrorWav() {
        var messages = this.listNamesInvalid.concat(this.dao.listMessagesError);
        console.log("Mensagens de erro");
        console.log(messages);
        if (messages.length > 0) {
            this.simplePage.startErrorModal(messages);
            this.simplePage.render();
        }
        else {
            console.info("Nenhum arquivo encontrado com erro");
            // console.log("Verificando buffes disponiveis");
            //         console.log(this.dao.listItembuffer)
            this.simplePage.render();
        }
        this.simplePage.disableModalLoading();
    }
}
