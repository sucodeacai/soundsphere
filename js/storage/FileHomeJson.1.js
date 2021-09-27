"use strict";
class FileHomeJson extends FileJson {
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.simplePage = simplePage;
    }
    showMessageErrorJson(mensagem) {
        this.simplePage.showErrorMessageJson1(mensagem);
    }
    onReaderJson(evt) {
        let soundSphereDB = JSON.parse(evt.target.result);
        console.log(soundSphereDB);
        if (soundSphereDB.soundSphereInfo != undefined && soundSphereDB.soundSphereInfo.version == this.dao.soundSphereInfo.version) {
            this.dao.synchronizeSoundSphereDB(soundSphereDB);
            if (this.dao.listItemBuffer.length == 0 && this.dao.listItemMixPanel.length == 0) {
                this.simplePage.nextStepJson1To4();
            }
            else {
                this.simplePage.showMessageJson2("Selecione os seguintes arquivos: ", this.dao.getListNameOfBuffers());
            }
        }
        else {
            this.simplePage.showErrorMessageJson1(`Aquivo incompatível carregue arquivos gerados pela versão SoundSphere - ${this.dao.soundSphereInfo.version}.`);
        }
    }
    handleFileSelectAudioToJSON(evt) {
        // if (this.soundSphereBDbyJSONFile != undefined) {
        //     console.log("Chamou handleFileSelectAudioToJSON");
        //     this.listNamesInvalid = [];
        //     var files = [],
        //         divLoading = document.getElementById('divLoading'),
        //         i, f, reader, audio, result;
        //     if (navigator.userAgent.match(/Android/i)) {
        //         files = evt.target.files;
        //     } else {
        //         for (let i = 0; i < evt.target.files.length; i++) {
        //             if (evt.target.files[i].type == "audio/wav" && (this.checkFileLoadedJSON(evt.target.files[i].name))) {
        //                 files.push(evt.target.files[i]);
        //             } else if (evt.target.files[i].type == "audio/wav" && !(this.soundSphereBDbyJSONFile.bufferList.length > 0)) {
        //                 console.log("inseriru")
        //                 files.push(evt.target.files[i]);
        //             }
        //             else if (evt.target.files[i].type == "audio/wav") {
        //                 this.listNamesInvalid.push(evt.target.files[i].name + ": - O arquivo não foi carregado pois não esta na lista.");
        //             } else {
        //                 this.listNamesInvalid.push(evt.target.files[i].name + ": - Formanto inválido/ Invalid format");
        //             }
        //         }
        //     }
        //     //A lista de arquivos validos deve ser igual ao tamanho da listBuffer LS
        //     //se não houver buffers no arquivo sub entendesse que não e a continuacao
        //     //apartir de um arquivo json gerado com descritores semanticos personalzados
        //     if (this.soundSphereBDbyJSONFile.bufferList.length > 0) {
        //         if (this.checkBufferListLenghtJSON() == files.length) {
        //             if (divLoading) {
        //                 divLoading.setAttribute('class', 'ui inverted dimmer active');
        //             }
        //             this.loadFilesWav(files);
        //         } else {
        //             this.listNamesInvalid.push("Não foram enviados todos os arquivos da lista.");
        //             this.desativarLoadingJSONError();
        //         }
        //     } else {
        //         //this.dao.synchronizeSemanticDescriptor(this.soundSphereBDbyJSONFile.listSemanticDescriptor);
        //         if (divLoading) {
        //             divLoading.setAttribute('class', 'ui inverted dimmer active');
        //         }
        //         this.loadFilesWav(files);
        //     }
        // }
    }
    desativarLoadingJSONOK() {
        // "use strict";
        // console.log("ta no desativarLoadingJSONOK ");
        // $('#modalOkLS').modal('show');
        // var divLoading = document.getElementById('divLoading');
        // if (divLoading) {
        //     divLoading.setAttribute('class', 'ui inverted dimmer desactive');
        // }
        // //Se tiver algum this.listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
        // if (this.listNamesInvalid.length > 0) {
        //     var divFather = document.getElementById('messageAttentionModalOkLS');
        //     var divMessageAT = document.createElement('div');
        //     divMessageAT.setAttribute('class', 'ui warning icon message');
        //     var icon = document.createElement('i');
        //     icon.setAttribute('class', 'warning sign icon');
        //     var divContent = document.createElement('div');
        //     divContent.setAttribute('class', 'content');
        //     var divHeader = document.createElement('div');
        //     divHeader.setAttribute('class', 'header');
        //     divHeader.innerHTML = "Atenção! Os seguintes itens não foram carregados pois:";
        //     var ul = document.createElement('ul');
        //     ul.setAttribute('class', 'list');
        //     for (var i = 0; i < this.listNamesInvalid.length; i++) {
        //         var li = document.createElement('li');
        //         li.innerHTML = this.listNamesInvalid[i];
        //         ul.appendChild(li);
        //     }
        //     divMessageAT.appendChild(icon);
        //     divMessageAT.appendChild(divContent);
        //     divContent.appendChild(divHeader);
        //     divContent.appendChild(ul);
        //     if (divFather) {
        //         divFather.appendChild(divMessageAT);
        //     }
        // }
        // //Simcroniza  o LS com o Soundsphere
        // if (this.soundSphereBDbyJSONFile != undefined) {
        //     this.dao.synchronizeItemMix(this.soundSphereBDbyJSONFile.listItemMixPanel);
        // }
    }
    desativarLoadingJSONError() {
        // "use strict";
        // var divLoading = document.getElementById('divLoading');
        // if (divLoading) {
        //     divLoading.setAttribute('class', 'ui inverted dimmer desactive');
        // }
        // //Se tiver algum this.listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
        // if (this.listNamesInvalid.length > 0) {
        //     var divMessageError = document.getElementById('mensageStep2JSON');
        //     var divError = document.createElement('div');
        //     divError.setAttribute('class', 'ui error message');
        //     var icon = document.createElement('i');
        //     icon.setAttribute('class', 'close icon');
        //     var divHeader = document.createElement('div');
        //     divHeader.setAttribute('class', 'header');
        //     divHeader.innerHTML = "Atenção!";
        //     var ul = document.createElement('ul');
        //     ul.setAttribute('class', 'list');
        //     for (var i = 0; i < this.listNamesInvalid.length; i++) {
        //         var li = document.createElement('li');
        //         li.innerHTML = this.listNamesInvalid[i];
        //         ul.appendChild(li);
        //     }
        //     divError.appendChild(icon);
        //     divError.appendChild(divHeader);
        //     divError.appendChild(ul);
        //     if (divMessageError) {
        //         divMessageError.innerHTML = "";
        //         divMessageError.appendChild(divError);
        //     }
        // }
    }
    //Funcoes que lidam com a variavel criada a partir dos dados do arquivo JSON enviado
    getNameBuffersJSON() {
        // if (this.soundSphereBDbyJSONFile != undefined) {
        //     var bufferList = this.soundSphereBDbyJSONFile.bufferList;
        //     var nameList = [];
        //     console.log("bufferList " + bufferList.length);
        //     for (var i = 0; i < bufferList.length; i++) {
        //         nameList[i] = bufferList[i].name;
        //     }
        //     console.log("name list: " + nameList);
        //     return nameList;
        // } else {
        //     return [];
        // }
    }
    checkBufferListLenghtJSON() {
        // if (this.soundSphereBDbyJSONFile != undefined) {
        //     return this.soundSphereBDbyJSONFile.bufferList.length;
        // }
    }
    //veririfa se o aqruivo foi carregado pelo nome
    checkFileLoadedJSON(name) {
        // if (this.soundSphereBDbyJSONFile != undefined) {
        //     var bufferList = this.soundSphereBDbyJSONFile.bufferList;
        //     for (var i = 0; i < bufferList.length; i++) {
        //         if (bufferList[i].name == name) {
        //             return true;
        //         }
        //     }
        //     return false;
        // } else {
        //     return false;
        // }
    }
}
