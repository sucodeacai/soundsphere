"use strict";
class FileSemanticWav extends FileWav {
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     * @param  {Tooltip} tooltip
     * @param  {PageAdminDescriptors} SimplePage
     */
    //teste
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.callBackToLoadWav = function () {
            this.desativaModalLoad();
            this.showMessageErrorWav();
            this.simplePage.generateHTML();
        }.bind(this);
        this.tooltip = tooltip;
        this.simplePage = simplePage;
        $('#filesWav').on('change', (evt) => {
            "use strict";
            console.log("Chamou handledFIleselect 1");
            this.listNamesInvalid = [];
            let files = [], divLoading = document.getElementById('divLoading'), i, f, reader, audio, result;
            if (navigator.userAgent.match(/Android/i)) {
                files = evt.target.files;
            }
            else {
                for (i = 0; i < evt.target.files.length; i++) {
                    if (evt.target.files[i].type == "audio/wav" && !(this.dao.isItemBufferLoadedByName(evt.target.files[i].name))) {
                        files.push(evt.target.files[i]);
                    }
                    else if (evt.target.files[i].type == "audio/wav") {
                        this.listNamesInvalid.push(evt.target.files[i].name + ": -Arquivo já carregado/ File already loaded");
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
                    divLoading.setAttribute('class', 'ui inverted dimmer active');
                }
                this.loadFilesWav(files);
            }
            else {
                this.desativaModalLoad();
                this.showMessageErrorWav();
            }
        });
    }
    showMessageErrorWav() {
        var messages = this.listNamesInvalid.concat(this.dao.listMessagesError);
        console.log("Mensagens de erro");
        console.log(messages);
        if (messages.length > 0) {
            console.log(messages);
            this.tooltip.showMessages(messages);
        }
        this.simplePage.render();
    }
    onReaderWav(bufferList) {
        this.dao.loadBufferList(bufferList, this.callBackToLoadWav);
    }
}
