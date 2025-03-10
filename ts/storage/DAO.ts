"use strict";
/*@#  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/

//Classe responsavel por gerenciar as informações da
//aplicação no Local Storage e no arquivo JSON

abstract class DAO {
  soundSphereInfo: SoundSphereInfo;
  listSemanticDescriptors: SemanticDescriptor[];
  painel: any;
  listItemMixPanel: ItemMixPanel[][] = [];
  listItemBuffer: ItemBuffer[] = [];
  listItemBufferProv: ItemBuffer[] = [];
  listaNamesOk: string[] = [];
  listMessagesError: string[] = [];
  sessionControl: SessionControl;
  // controlPainel: any
  audioCtx: AudioContext | any;
  controlFiles: ControlFiles;
  contId: number = 0;
  // listItembuffer:ItemBuffer[] =[]
  /**
   * @param  {ItemBuffer[]} bufferList
   * @param  {ItemMixPanel[][]} listItemMixPanel
   * @param  {SemanticDescriptor[]} listSemanticDescriptor
   * @param  {string} soundSphereVersion
   * @returns void
   */
  abstract soundSphereDBToJson(
    bufferList: ItemBuffer[],
    listItemMixPanel: ItemMixPanel[][],
    listSemanticDescriptors: SemanticDescriptor[],
    soundSphereInfo: SoundSphereInfo,
    sessionControl: SessionControl
  ): void;
  constructor(
    soundSphereInfo: SoundSphereInfo,
    listSemanticDescriptors: SemanticDescriptor[],
    audioCtx: AudioContext | any,
    controlFiles: ControlFiles,
    sessionControl: SessionControl
  ) {
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
    const getId = (item: { id: any }) => item.id;
    //Pegar todos os itens dentro da lista
    const getListItens = (list) => list.map(getId);
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
    } else {
      this.contId = 0;
    }
  }
  getDefaultName() {
    if (this.sessionControl.getLastEventNameValid()) {
      return this.sessionControl.getLastEventNameValid();
    } else {
      var now = new Date();
      return (
        "SoundSphere A" +
        now.getFullYear() +
        "M" +
        (now.getMonth() + 1) +
        "D" +
        now.getDate() +
        "H" +
        now.getHours() +
        "-" +
        now.getMinutes() +
        "-" +
        now.getSeconds()
      );
    }
  }
  getDefaultAuthor() {
    if (this.sessionControl.getLastAuthorValid()) {
      return this.sessionControl.getLastAuthorValid();
    } else {
      return "Não informado";
    }
  }
  isItemBufferLoadedByName(name: string) {
    for (let index = 0; index < this.listItemBuffer.length; index++) {
      if (
        this.listItemBuffer[index].name == name &&
        this.listItemBuffer[index].show
      ) {
        //    console.log("XXXXXX - Nome repetido: "+name)
        return true;
      }
    }
    // console.log("-> ok: " + name)
    return false;
  }
  itemBufferHaveBufer(name: string) {
    for (let index = 0; index < this.listItemBuffer.length; index++) {
      if (this.listItemBuffer[index].name == name) {
        //    hamou o reset translate("XXXXXX - Nome repetido: "+name)
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
      console.log(
        "this.listItemBuffer[index].name: " + this.listItemBuffer[index].name
      );
      console.log(
        "this.listItemBuffer[index].amount: " +
          this.listItemBuffer[index].amount
      );
      if (this.listItemBuffer[index].amount != 0) {
        listName.push(this.listItemBuffer[index].name);
      }
    }
    return listName;
  }
  getNameSemanticDescriptor(id: number) {
    return this.listSemanticDescriptors[id].name;
  }
  //valida se é valido
  validColor(color: string) {
    var isOk = false;
    if (color.indexOf("#") > -1) {
      isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    }
    return isOk;
  }
  //Localiza o código hexadecimal
  getColor(name: string) {
    return name.substring(name.indexOf("#"), name.indexOf("#") + 7);
  }

  loadBufferList(listAudioData: any, callback: any, newList: boolean = true) {
    this.listMessagesError = [];
    this.listItemBufferProv = [];
    this.listaNamesOk = [];
    for (let index = 0; index < listAudioData.length; index++) {
      this.audioCtx
        .decodeAudioData(listAudioData[index].buffer)
        .then((buffer: any) => {
          if (
            buffer.numberOfChannels == 1 ||
            buffer.numberOfChannels == 2 ||
            buffer.numberOfChannels == 4 ||
            buffer.numberOfChannels == 6
          ) {
            // console.log("Inserindo buffer prov: listAudioData[index].name ")
            // console.log(listAudioData[index].name)

            let itemBuffer = this.createItemBuffer(
              buffer,
              listAudioData[index].name
            );
            //Se for uma nova lista de itens os mesmos não possuem cores
            //entao possa ser que exista cores nos nomes esse trecho do código
            //verifica isso
            if (newList) {
              if (this.validColor(this.getColor(listAudioData[index].name))) {
                itemBuffer.color = this.getColor(listAudioData[index].name);
              }
            }
            this.listItemBufferProv.push(itemBuffer);
          } else {
            this.listMessagesError.push(
              listAudioData[index].name +
                " só são permitidos arquivos mono, stereo, quad e 5.1."
            );
          }
          //se  o tamanho da lista de itens provisiorios e o tamannho do errros somados juntos forem igual ao tamaho da lista decode, quer dizer que terminou
          if (
            this.listItemBufferProv.length + this.listMessagesError.length ==
            listAudioData.length
          ) {
            //Cria a lista em ordem alfabeita
            this.listaNamesOk = this.createListNames(this.listItemBufferProv);
            if (newList) {
              this.loadNew();
            } else {
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
          if (this.listItemBufferProv[index3].color == "") {
            this.listItemBufferProv[index3].color = this.controlFiles.getColor(
              this.listItemBuffer.length
            );
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
        if (
          this.listItemBuffer[index2].name ==
          this.listItemBufferProv[index3].name
        ) {
          //console.log("Inserindo na lista de Continue: " + this.listItemBufferProv[index3].name)
          this.listItemBuffer[index2].buffer =
            this.listItemBufferProv[index3].buffer;
          break;
        }
      }
    }
  }
  //Cria a lista de nomes em ordem alfabetica
  private createListNames(listItemBufferProv: any): string[] {
    let listaNamesOk: string[] = [];
    // console.log("-------------------------listItemBufferProv[index]")
    // console.log(listItemBufferProv)
    // console.log(listItemBufferProv.length)
    for (let index = 0; index < listItemBufferProv.length; index++) {
      // console.log("Inseridno: " + listItemBufferProv[index].name);
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
  downloadJSON(nameFileUser: string, authorUser: string) {
    let a = document.createElement("a");
    console.log("-------- NAME AUTHOR: " + authorUser);
    this.sessionControl.putName(
      nameFileUser ? nameFileUser : this.getDefaultName()
    );
    this.sessionControl.putAuthor(
      authorUser ? authorUser : this.getDefaultAuthor()
    );
    // this.sessionControl.putAuthor("teste put autor");
    this.sessionControl.putEndEventSession();
    let data =
      "text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          this.soundSphereDBToJson(
            this.listItemBuffer,
            this.listItemMixPanel,
            this.listSemanticDescriptors,
            this.soundSphereInfo,
            this.sessionControl
          )
        )
      );
    a.href = "data:" + data;
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
  synchronizeSoundSphereDB(soundSphereBD: SoundSphereBD) {
    this.syncronizeListItemBuffers(soundSphereBD.listItemBuffer);
    this.synchronizeItemMixPanel(soundSphereBD.listItemMixPanel);

    this.synchronizeSemanticDescriptor(soundSphereBD);
    this.synchronizesessionControl(soundSphereBD.sessionControl);
    this.synchronizeContId();
  }

  synchronizesessionControl(sessionControl: SessionControl) {
    this.sessionControl.listEventSession = [];
    sessionControl.listEventSession.forEach((element) => {
      let evtSession = new EventSession();
      evtSession.datDateSave = element.datDateSave;
      evtSession.dateStartWork = element.dateStartWork;
      evtSession.name = element.name;
      evtSession.author = element.author;
      element.listEventItemMixPanel.forEach((element) => {
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
        itemMixPanel.descriptiveIcon = element.itemMixPanel.descriptiveIcon;
        itemMixPanel.tag_dimension = element.itemMixPanel.tag_dimension;
        itemMixPanel.tag_intensity = element.itemMixPanel.tag_intensity;

        itemMixPanel.changeStardValues();
        itemMixPanel.setIdSemanticDescriptor(
          element.itemMixPanel.idSemanticDescriptor
        );
        itemMixPanel.setCodeSemanticDescriptor(
          element.itemMixPanel.codeSemanticDescriptor
        );

        let evtItemMixPanel = new EventItemMixPanel(
          itemMixPanel,
          element.eventCrud,
          element.date
        );
        evtSession.listEventItemMixPanel.push(evtItemMixPanel);
      });
      this.sessionControl.listEventSession.push(evtSession);
    });
    this.sessionControl.newEventSession();
    console.log("Terminou asynchronizesessionControl ");
    console.log(this.sessionControl);
  }
  syncronizeListItemBuffers(listBuffer: any) {
    this.listItemBuffer = [];
    for (let index = 0; index < listBuffer.length; index++) {
      let itemBuffer = new ItemBuffer();
      itemBuffer.name = listBuffer[index].name;
      itemBuffer.timeDuration = listBuffer[index].timeDuration;
      itemBuffer.color = listBuffer[index].color;
      itemBuffer.numberOfChannels = listBuffer[index].numberOfChannels;
      itemBuffer.show = false;
      this.listItemBuffer.push(itemBuffer);
    }
  }

  synchronizeSemanticDescriptor(soundSphereBD: SoundSphereBD) {
    this.listSemanticDescriptors = [];
    soundSphereBD.listSemanticDescriptor.forEach((element) => {
      let filters: any = [];
      element._filters.forEach(function (element2) {
        filters.push(
          new Filter(
            element2.type,
            element2.name,
            element2.frequency,
            element2.Q,
            element2.gain,
            element2.status
          )
        );
      });
      this.listSemanticDescriptors.push(
        new SemanticDescriptor(element.name, element.code, filters)
      );
    });
  }
  synchronizeItemMixPanel(listItemMixPanel: any[][]) {
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
          if (!itemMixPanel.excluded) {
            this.listItemBuffer[itemMixPanel.idBuffer].amount =
              this.listItemBuffer[itemMixPanel.idBuffer].amount + 1;
            this.listItemBuffer[itemMixPanel.idBuffer].show = true;
          }

          itemMixPanel.color = listItemMixPanel[i][j].color;
          itemMixPanel.setVolume(listItemMixPanel[i][j].volume);
          itemMixPanel.seconds = listItemMixPanel[i][j].seconds;
          itemMixPanel.width = listItemMixPanel[i][j].width;
          itemMixPanel.height = listItemMixPanel[i][j].height;
          itemMixPanel.size = listItemMixPanel[i][j].size;
          itemMixPanel.linha = listItemMixPanel[i][j].linha;
          itemMixPanel.style = listItemMixPanel[i][j].style;
          itemMixPanel.descriptiveIcon = listItemMixPanel[i][j].descriptiveIcon;
          itemMixPanel.tag_dimension = listItemMixPanel[i][j].tag_dimension;
          itemMixPanel.tag_intensity = listItemMixPanel[i][j].tag_intensity;

          itemMixPanel.changeStardValues();
          itemMixPanel.setIdSemanticDescriptor(
            listItemMixPanel[i][j].idSemanticDescriptor
          );
          itemMixPanel.setCodeSemanticDescriptor(
            listItemMixPanel[i][j].codeSemanticDescriptor
          );

          if (this.listItemMixPanel[i] == undefined) {
            this.listItemMixPanel[i] = new Array();
            this.listItemMixPanel[i].push(itemMixPanel);
          } else {
            this.listItemMixPanel[i].push(itemMixPanel);
          }
        }
      }
    }
  }
  //Função para faciliar o add Buffer
  createItemBuffer(buffer: any, name: string): ItemBuffer {
    var itemBuffer = new ItemBuffer();
    itemBuffer.buffer = buffer;
    itemBuffer.timeDuration = buffer.duration;
    itemBuffer.numberOfChannels = buffer.numberOfChannels;
    itemBuffer.name = name;
    //itemBuffer.listItemMix = [];
    return itemBuffer;
  }
}

//     //Função que retorna a lista de buffers no Local Storage
//     //para informar ao usuario quais arquivos devem ser carregados
//     getNameBuffersLS() {
//         var allData = JSON.parse(<string>localStorage.getItem('allData'));
//         var bufferList = allData.bufferList;
//         var nameList = [];
//         console.log("bufferList " + bufferList.length);
//         for (var i = 0; i < bufferList.length; i++) {
//             nameList[i] = bufferList[i].name;
//         }
//         console.log("name list: " + nameList);
//         return nameList;
//     }
// // function downloadLocal() {
//     var allData = JSON.parse(localStorage.getItem('allData'));
//     console.log("NOME file: " + allData.bufferList[0].name);
//     var a = document.getElementById("downloadLocal");
//     var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
//     a.href = 'data:' + data;
//     a.download = 'data.json';
//     a.click();
// }
// Informa a quantidade de buffers no LS
// function checkBufferListLenghtLS() {
//     var allData = JSON.parse(localStorage.getItem('allData'));
//     var bufferList = allData.bufferList;
//     return bufferList.length;
// }
// Informa a

// function checkFileLoadedLS(name) {
//     var allData = JSON.parse(localStorage.getItem('allData'));
//     var bufferList = allData.bufferList;
//     for (var i = 0; i < bufferList.length; i++) {
//         if (bufferList[i].name == name) {
//             return true;
//         }
//     }
//     return false;
// }
// //Verificar se o arquivo que esta sendo inserido é valido

// //Função para sincronizar o LS com o SoundSPhere

// function synchronizeSoundSphereLS() {
//     var allData = JSON.parse(localStorage.getItem('allData'));
//     for (var i = 0; i < allData.listItemMixPanel.length; i++) {
//         for (var j = 0; j < allData.listItemMixPanel[i].length; j++) {
//             var itemMixPanel = new ItemMixPanel();
//             itemMixPanel.x = allData.listItemMixPanel[i][j].x;
//             itemMixPanel.y = allData.listItemMixPanel[i][j].y;
//             itemMixPanel.solo = Boolean(allData.listItemMixPanel[i][j].solo);
//             itemMixPanel.startTime = allData.listItemMixPanel[i][j].startTime;
//             itemMixPanel.endTime = allData.listItemMixPanel[i][j].endTime;
//             itemMixPanel.id = allData.listItemMixPanel[i][j].id;
//             itemMixPanel.idBuffer = allData.listItemMixPanel[i][j].idBuffer;
//             itemMixPanel.color = allData.listItemMixPanel[i][j].color;
//             itemMixPanel.volume = allData.listItemMixPanel[i][j].volume;
//             itemMixPanel.seconds = allData.listItemMixPanel[i][j].seconds;
//             itemMixPanel.width = allData.listItemMixPanel[i][j].width;
//             itemMixPanel.height = allData.listItemMixPanel[i][j].height;
//             itemMixPanel.size = allData.listItemMixPanel[i][j].size;
//             itemMixPanel.style = allData.listItemMixPanel[i][j].style;
//             itemMixPanel.idSemanticDescriptor = allData.listItemMixPanel[i][j].idSemanticDescriptor;
//             painel.listItemMixPanel[i][j] = itemMixPanel;
//         }
//     }
//     painel.reMake();
// }
