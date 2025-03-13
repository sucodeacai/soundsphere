"use strict";
class FileMenuBar extends FileWav {
    // simplapage2:PageSoundSphereHome;
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        // this.simplapage2 = simplePage;
        this.simplePage = simplePage;
        $("#filesWav").on("change", (evt) => {
            "use strict";
            console.log("Chamou handledFIleselect xx");
            this.listNamesInvalid = [];
            let files = [], divLoading = document.getElementById("divLoading"), i, f, reader, audio, result;
            if (navigator.userAgent.match(/Android/i)) {
                files = evt.target.files;
            }
            else {
                for (i = 0; i < evt.target.files.length; i++) {
                    if (evt.target.files[i].type == "audio/wav" &&
                        !this.dao.isItemBufferLoadedByName(evt.target.files[i].name)) {
                        files.push(evt.target.files[i]);
                    }
                    else if (evt.target.files[i].type == "audio/wav") {
                        this.listNamesInvalid.push(evt.target.files[i].name +
                            ": -Arquivo já carregado/ File already loaded");
                    }
                    else {
                        console.log("==Arquivo repetido");
                        this.listNamesInvalid.push(evt.target.files[i].name + ": -Formanto inválido/ Invalid format");
                    }
                }
            }
            //Se os arquivos carregados tiver algum que pode ser utilizado e que atenda os requisitos
            //ele entra no primeiro IF, se não é exibido logo a mensagem de erro
            if (files.length > 0) {
                if (divLoading) {
                    divLoading.setAttribute("class", "ui inverted dimmer active");
                }
                this.loadFilesWav(files);
            }
            else {
                this.desativaModalLoad();
                this.showMessageErrorWav();
            }
        });
    }
    onReaderWav(bufferList) {
        let callBackToLoadWav = function () {
            this.desativaModalLoad();
            this.showMessageErrorWav();
        }.bind(this);
        this.dao.loadBufferList(bufferList, callBackToLoadWav);
    }
    showMessageErrorWav() {
        var messages = this.listNamesInvalid.concat(this.dao.listMessagesError);
        console.log("Mensagens de erro");
        console.log(messages);
        if (messages.length > 0) {
            let conteudoModal = `
          <div class="header">Error!</div>
          <div id="contentInvalidNames" class="content">`;
            for (let index = 0; index < messages.length; index++) {
                conteudoModal += `<p>${messages[index]}</p>`;
            }
            conteudoModal += `
          </div>
          <div class="actions">
            <div id="closeModalMessage" class="ui approve button">Cancelar</div>
          </div>
       
          `;
            $("#mainModal").html(conteudoModal);
            $("#mainModal").modal({ closable: false }).modal("show");
            $("#closeModalMessage").on("click", (e) => {
                $(".ui.modal").modal("hide");
                // this.simplePage.generateHTML();
                this.simplePage.generateContentOfTheModals();
                this.simplePage.reloadAlbum();
            });
        }
        else {
            console.log("Verificando buffes disponiveis");
            //         console.log(this.dao.listItembuffer)
            this.simplePage.reloadAlbum();
        }
    }
}
