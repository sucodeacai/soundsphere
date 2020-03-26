"use strict";
/*@#  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
//Classe responsavel por gerenciar as informações da 
//aplicação no Local Storage e no arquivo JSON
class DAO {
    constructor(soundSphereInfo, listSemanticDescriptors, audioCtx, controlFiles, sessionControl) {
        this.listItemMixPanel = [];
        this.listItemBuffer = [];
        this.listItemBufferProv = [];
        this.listaNamesOk = [];
        this.listMessagesError = [];
        this.contId = 0;
        this.controlFiles = controlFiles;
        this.soundSphereInfo = soundSphereInfo;
        this.listSemanticDescriptors = listSemanticDescriptors;
        this.audioCtx = audioCtx;
        this.sessionControl = sessionControl;
    }
    //Passa o id para para ser inserido no item Mix
    getNewIdItemMix() {
        this.contId++;
        return this.contId;
    }
    //Pegar o maior ID para continuar a partir dele
    synchronizeContId() {
        //Pegar o id dentro da lista
        const getId = (item) => item.id;
        //Pegar todos os itens dentro da lista
        const getListItens = list => list.map(getId);
        Array.prototype.flatMap = function (callback) {
            return Array.prototype.concat.apply([], this.map(callback));
        };
        const listIds = this.listItemMixPanel.flatMap(getListItens);
        //Filtra os valores undefined e null
        var filtered = listIds.filter(function (el) {
            return el != null;
        });
        //se a lista tiver mais que um item
        if (filtered.length > 0) {
            this.contId = Math.max.apply(null, filtered);
        }
        else {
            this.contId = 0;
        }
    }
    getDefaultName() {
        if (this.sessionControl.getLastEventNameValid()) {
            return this.sessionControl.getLastEventNameValid();
        }
        else {
            var now = new Date();
            return "SoundSphere A" + now.getFullYear() + "M" + (now.getMonth() + 1) + "D" + now.getDate() + "H" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
        }
    }
    getDefaultAuthor() {
        if (this.sessionControl.getLastAuthorValid()) {
            return this.sessionControl.getLastAuthorValid();
        }
        else {
            return "Não informado";
        }
    }
    isItemBufferLoadedByName(name) {
        for (let index = 0; index < this.listItemBuffer.length; index++) {
            if (this.listItemBuffer[index].name == name) {
                //    console.log("XXXXXX - Nome repetido: "+name)
                return true;
            }
        }
        // console.log("-> ok: " + name)
        return false;
    }
    itemBufferHaveBufer(name) {
        for (let index = 0; index < this.listItemBuffer.length; index++) {
            if (this.listItemBuffer[index].name == name) {
                //    console.log("XXXXXX - Nome repetido: "+name)
                if (this.listItemBuffer[index].buffer != undefined) {
                    return true;
                }
                break;
            }
        }
        return false;
    }
    getListNameOfBuffers() {
        let listName = [];
        for (let index = 0; index < this.listItemBuffer.length; index++) {
            listName.push(this.listItemBuffer[index].name);
        }
        return listName;
    }
    getNameSemanticDescriptor(id) {
        return this.listSemanticDescriptors[id].name;
    }
    //valida se é valido
    validColor(color) {
        var isOk = false;
        if (color.indexOf("#") > -1) {
            isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        }
        return isOk;
    }
    //Localiza o código hexadecimal
    getColor(name) {
        return name.substring(name.indexOf("#"), name.indexOf("#") + 7);
    }
    loadBufferList(listAudioData, callback, newList = true) {
        this.listMessagesError = [];
        this.listItemBufferProv = [];
        this.listaNamesOk = [];
        for (let index = 0; index < listAudioData.length; index++) {
            this.audioCtx.decodeAudioData(listAudioData[index].buffer).then((buffer) => {
                if (buffer.numberOfChannels == 1 || buffer.numberOfChannels == 2 || buffer.numberOfChannels == 4 || buffer.numberOfChannels == 6) {
                    // console.log("Inserindo buffer prov: listAudioData[index].name ")
                    // console.log(listAudioData[index].name)
                    let itemBuffer = this.createItemBuffer(buffer, listAudioData[index].name);
                    //Se for uma nova lista de itens os mesmos não possuem cores
                    //entao possa ser que exista cores nos nomes esse trecho do código 
                    //verifica isso
                    if (newList) {
                        if (this.validColor(this.getColor(listAudioData[index].name))) {
                            itemBuffer.color = this.getColor(listAudioData[index].name);
                        }
                    }
                    this.listItemBufferProv.push(itemBuffer);
                }
                else {
                    this.listMessagesError.push(listAudioData[index].name + " só são permitidos arquivos mono, stereo, quad e 5.1.");
                }
                //se  o tamanho da lista de itens provisiorios e o tamannho do errros somados juntos forem igual ao tamaho da lista decode, quer dizer que terminou
                if ((this.listItemBufferProv.length + this.listMessagesError.length) == listAudioData.length) {
                    //Cria a lista em ordem alfabeita
                    this.listaNamesOk = this.createListNames(this.listItemBufferProv);
                    if (newList) {
                        this.loadNew();
                    }
                    else {
                        this.loadCotinue();
                    }
                    // console.log("Terminou de carregar lista de itens carregados")
                    // console.log(this.listItemBuffer)
                    callback();
                }
            });
        }
    }
    //Se for uma nova lista de itens buffers
    loadNew() {
        for (let index2 = 0; index2 < this.listaNamesOk.length; index2++) {
            for (let index3 = 0; index3 < this.listItemBufferProv.length; index3++) {
                if (this.listaNamesOk[index2] == this.listItemBufferProv[index3].name) {
                    //console.log("Inserindo na lista de buffers OK: " + this.listItemBufferProv[index3].name)
                    if (this.listItemBufferProv[index3].color == '') {
                        this.listItemBufferProv[index3].color = this.controlFiles.getColor(this.listItemBuffer.length);
                    }
                    this.listItemBuffer.push(this.listItemBufferProv[index3]);
                    break;
                }
            }
        }
    }
    loadCotinue() {
        for (let index2 = 0; index2 < this.listItemBuffer.length; index2++) {
            for (let index3 = 0; index3 < this.listItemBufferProv.length; index3++) {
                if (this.listItemBuffer[index2].name == this.listItemBufferProv[index3].name) {
                    //console.log("Inserindo na lista de Continue: " + this.listItemBufferProv[index3].name)
                    this.listItemBuffer[index2].buffer = this.listItemBufferProv[index3].buffer;
                    break;
                }
            }
        }
    }
    //Cria a lista de nomes em ordem alfabetica
    createListNames(listItemBufferProv) {
        let listaNamesOk = [];
        // console.log("-------------------------listItemBufferProv[index]")
        // console.log(listItemBufferProv)
        // console.log(listItemBufferProv.length)
        for (let index = 0; index < listItemBufferProv.length; index++) {
            console.log("Inseridno: " + listItemBufferProv[index].name);
            listaNamesOk.push(listItemBufferProv[index].name);
        }
        // console.log("-------------------------listaNamesOk")
        // console.log(listaNamesOk)
        let listaOrdenada = this.controlFiles.orderListByName(listaNamesOk);
        for (let index = 0; index < listaOrdenada.length; index++) {
            // console.log(`${index} - ${listaOrdenada[index]}`);
        }
        return listaOrdenada;
    }
    // saveLocalStorage() {
    //     var soundSphereBD = new SoundSphereBD(this.listItemBuffer, this.listItemMixPanel, this.listSemanticDescriptors, this.soundSphereInfo.getVersion());
    //     localStorage.setItem("soundSphereBD", JSON.stringify(soundSphereBD));
    // }
    //Função para fazer o download do  JSON, dependendo do tipo de classe instanciada
    //gera arquivos com informações JSONS diferentes
    /**
     * @param  {ItemBuffer[]} bufferList
     * @param  {ItemMixPanel[][]} listItemMixPanel
     */
    downloadJSON(nameFileUser, authorUser) {
        let a = document.createElement('a');
        console.log("-------- NAME AUTHOR: " + authorUser);
        this.sessionControl.putName(nameFileUser ? nameFileUser : this.getDefaultName());
        this.sessionControl.putAuthor(authorUser ? authorUser : this.getDefaultAuthor());
        // this.sessionControl.putAuthor("teste put autor");
        this.sessionControl.putEndEventSession();
        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.soundSphereDBToJson(this.listItemBuffer, this.listItemMixPanel, this.listSemanticDescriptors, this.soundSphereInfo, this.sessionControl)));
        a.href = 'data:' + data;
        var nameFile = this.sessionControl.getLastEventName();
        a.download = nameFile + ".json";
        a.click();
        this.sessionControl.newEventSession();
    }
    eraserSoundSphereDB() {
        this.listItemBuffer = [];
        this.listItemMixPanel = [];
        this.listSemanticDescriptors = generatorSemaitsDescriptors();
    }
    //Nomes dos arquivos que estao no allDataJSONFile
    //Verifica se o arquivo foi gerado pelo soundsphere
    // checkValidJSONFile() {
    //     let lcAll = localStorage.getItem('allData');
    //     if (lcAll) {
    //         var allData = JSON.parse(lcAll);
    //         if (allData.bufferList != null && allData.listItemMixPanel != null) {
    //             return true;
    //         }
    //         else {
    //             return false;
    //         }
    //     }
    // }
    //QUantidade de buffers
    synchronizeSoundSphereDB(soundSphereBD) {
        this.synchronizeItemMixPanel(soundSphereBD.listItemMixPanel);
        this.syncronizeListItemBuffers(soundSphereBD.listItemBuffer);
        this.synchronizeSemanticDescriptor(soundSphereBD);
        this.synchronizesessionControl(soundSphereBD.sessionControl);
        this.synchronizeContId();
    }
    synchronizesessionControl(sessionControl) {
        this.sessionControl.listEventSession = [];
        sessionControl.listEventSession.forEach(element => {
            let evtSession = new EventSession();
            evtSession.datDateSave = element.datDateSave;
            evtSession.dateStartWork = element.dateStartWork;
            evtSession.name = element.name;
            evtSession.author = element.author;
            element.listEventItemMixPanel.forEach(element => {
                let itemMixPanel = new ItemMixPanel();
                itemMixPanel.x = element.itemMixPanel.x;
                itemMixPanel.y = element.itemMixPanel.y;
                itemMixPanel.solo = Boolean(element.itemMixPanel.solo);
                itemMixPanel.startTime = element.itemMixPanel.startTime;
                itemMixPanel.endTime = element.itemMixPanel.endTime;
                itemMixPanel.id = element.itemMixPanel.id;
                itemMixPanel.excluded = element.itemMixPanel.excluded;
                itemMixPanel.idBuffer = element.itemMixPanel.idBuffer;
                itemMixPanel.color = element.itemMixPanel.color;
                itemMixPanel.setVolume(element.itemMixPanel.volume);
                itemMixPanel.seconds = element.itemMixPanel.seconds;
                itemMixPanel.width = element.itemMixPanel.width;
                itemMixPanel.height = element.itemMixPanel.height;
                itemMixPanel.size = element.itemMixPanel.size;
                itemMixPanel.linha = element.itemMixPanel.linha;
                itemMixPanel.style = element.itemMixPanel.style;
                itemMixPanel.changeStardValues();
                itemMixPanel.setIdSemanticDescriptor(element.itemMixPanel.idSemanticDescriptor);
                console.log("Syncronize: " + element.itemMixPanel.codeSemanticDescriptor);
                itemMixPanel.setCodeSemanticDescriptor(element.itemMixPanel.codeSemanticDescriptor);
                console.log("Syncronize: " + itemMixPanel.getCodeSemanticDescriptor());
                let evtItemMixPanel = new EventItemMixPanel(itemMixPanel, element.eventCrud, element.date);
                evtSession.listEventItemMixPanel.push(evtItemMixPanel);
            });
            this.sessionControl.listEventSession.push(evtSession);
        });
        this.sessionControl.newEventSession();
        console.log("Terminou asynchronizesessionControl ");
        console.log(this.sessionControl);
    }
    syncronizeListItemBuffers(listBuffer) {
        this.listItemBuffer = [];
        for (let index = 0; index < listBuffer.length; index++) {
            let itemBuffer = new ItemBuffer();
            itemBuffer.name = listBuffer[index].name;
            itemBuffer.timeDuration = listBuffer[index].timeDuration;
            itemBuffer.color = listBuffer[index].color;
            itemBuffer.numberOfChannels = listBuffer[index].numberOfChannels;
            this.listItemBuffer.push(itemBuffer);
        }
    }
    synchronizeSemanticDescriptor(soundSphereBD) {
        this.listSemanticDescriptors = [];
        soundSphereBD.listSemanticDescriptor.forEach((element) => {
            let filters = [];
            element._filters.forEach(function (element2) {
                filters.push(new Filter(element2.type, element2.name, element2.frequency, element2.Q, element2.gain, element2.status));
            });
            this.listSemanticDescriptors.push(new SemanticDescriptor(element.name, element.code, filters));
        });
    }
    synchronizeItemMixPanel(listItemMixPanel) {
        this.listItemMixPanel = [];
        for (var i = 0; i < listItemMixPanel.length; i++) {
            if (listItemMixPanel[i] != undefined) {
                for (var j = 0; j < listItemMixPanel[i].length; j++) {
                    var itemMixPanel = new ItemMixPanel();
                    itemMixPanel.x = listItemMixPanel[i][j].x;
                    itemMixPanel.y = listItemMixPanel[i][j].y;
                    itemMixPanel.solo = Boolean(listItemMixPanel[i][j].solo);
                    itemMixPanel.startTime = listItemMixPanel[i][j].startTime;
                    itemMixPanel.endTime = listItemMixPanel[i][j].endTime;
                    itemMixPanel.id = listItemMixPanel[i][j].id;
                    itemMixPanel.excluded = listItemMixPanel[i][j].excluded;
                    itemMixPanel.idBuffer = listItemMixPanel[i][j].idBuffer;
                    itemMixPanel.color = listItemMixPanel[i][j].color;
                    itemMixPanel.setVolume(listItemMixPanel[i][j].volume);
                    itemMixPanel.seconds = listItemMixPanel[i][j].seconds;
                    itemMixPanel.width = listItemMixPanel[i][j].width;
                    itemMixPanel.height = listItemMixPanel[i][j].height;
                    itemMixPanel.size = listItemMixPanel[i][j].size;
                    itemMixPanel.linha = listItemMixPanel[i][j].linha;
                    itemMixPanel.style = listItemMixPanel[i][j].style;
                    itemMixPanel.changeStardValues();
                    itemMixPanel.setIdSemanticDescriptor(listItemMixPanel[i][j].idSemanticDescriptor);
                    itemMixPanel.setCodeSemanticDescriptor(listItemMixPanel[i][j].codeSemanticDescriptor);
                    if (this.listItemMixPanel[i] == undefined) {
                        this.listItemMixPanel[i] = new Array();
                        this.listItemMixPanel[i].push(itemMixPanel);
                    }
                    else {
                        this.listItemMixPanel[i].push(itemMixPanel);
                    }
                }
            }
        }
    }
    //Função para faciliar o add Buffer
    createItemBuffer(buffer, name) {
        var itemBuffer = new ItemBuffer();
        itemBuffer.buffer = buffer;
        itemBuffer.timeDuration = buffer.duration;
        itemBuffer.numberOfChannels = buffer.numberOfChannels;
        itemBuffer.name = name;
        //itemBuffer.listItemMix = [];
        return itemBuffer;
    }
}
