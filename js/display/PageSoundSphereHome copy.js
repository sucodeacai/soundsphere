"use strict";
class PageSoundSphereHome extends SimplePage {
    generateAttributes() {
        throw new Error("Method not implemented.");
    }
    render() {
        throw new Error("Method not implemented.");
    }
    startTemplate() {
        throw new Error("Method not implemented.");
    }
    //itemOptionitemOptionEnabled: boolean = true;
    // constructor(containerElement: JQuery, titulo: string, soundSphereInfo: SoundSphereInfo, dao: DAO, sequenciador: any, canvas: any, contextCanvas: any) {
    constructor(containerElement, titulo, soundSphereInfo, dao, sequenciador, tooltip, sessionControl, pixelpersecond) {
        super(containerElement, titulo, soundSphereInfo, dao, sequenciador);
        this.canvas = [];
        this.buttonRemoveStatus = false;
        this.contextCanvas = [];
        this.stopActived = true;
        this.reloadPainel = false;
        this.listDescriptiveIcons = [];
        this.listDimension = [];
        this.listIntisty = [];
        //pauseActived = false
        this.itemMixOption = undefined;
        this.itemOptionEnabled = true;
        this.idSelectedIcomAlbum = undefined;
        this.mouseInsideIconAlbum = undefined;
        // this.canvas = canvas;
        // this.contextCanvas = contextCanvas;
        this.startWelcomeModal();
        this.pixelpersecond = pixelpersecond;
        this.setSettingsActions();
        // this.tooltip = tooltip;
        // this.sessionControl = sessionControl;
        // // this.startTemplate();
        // this.generateHTML();
        // // this.showModalInitial();
        // this.loadDescriptiveIcons();
        // this.loadDimensions();
        // this.loadIntensity();
    }
    startWelcomeModal() {
        const modalElement = document.getElementById("welcomeModal");
        if (modalElement) {
            // Usa "window.bootstrap" para acessar a API do Bootstrap sem módulos
            const modal = new window.bootstrap.Modal(modalElement);
            // Exibe o modal automaticamente ao carregar a página
            modal.show();
        }
    }
    enableItemOption() {
        this.itemOptionEnabled = true;
        this.painel.setCursorEdit();
        console.log("CHAMOU O CURSOR EDIT ENABLE");
    }
    disableItemOption() {
        this.itemOptionEnabled = false;
        this.painel.unsetCursorEdit();
    }
    disableAlbum() {
        console.log("disabilitando menu album");
        this.idSelectedIcomAlbum = undefined;
        this.disableItemOption();
        //$(".itemMenuAmostra").children("i.black")!.classList.toggle("black white");
        toggleClasses(".itemMenuAmostra > i.black", "black", "white");
    }
    disableMenuDescriptiveIcon() {
        this.descriptiveIcon = undefined;
        removeClassFromElements(".itemMenuDescriptiveIcon.itemMenuDescriptiveIconSelected", "itemMenuDescriptiveIconSelected");
    }
    disableMainenu() {
        //Por conta do callback ele verifica antes se ainda precisa desativar o itemoption
        if (this.descriptiveIcon == undefined &&
            this.idSelectedIcomAlbum == undefined) {
            this.enableItemOption();
        }
    }
    loadDimensions() {
        this.listDimension.push(new Dimension("A - Amargo", "A"));
        this.listDimension.push(new Dimension("D - Doce", "D"));
    }
    loadIntensity() {
        this.listIntisty.push(new Intensity("Mínimo", 1));
        this.listIntisty.push(new Intensity("Pouco", 2));
        this.listIntisty.push(new Intensity("Moderado", 3));
        this.listIntisty.push(new Intensity("Muito", 4));
        this.listIntisty.push(new Intensity("Máximo", 5));
    }
    loadDescriptiveIcons() {
        this.listDescriptiveIcons.push(new DescriptiveIcon(1, "img/icons/chocolate_tradicional.png", "Chocolate Tradicional", "chocolate_tradicioinal"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(2, "img/icons/chocolate_branco.png", "Chocolate Branco", "chocolate_branco"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(3, "img/icons/agua.png", "Agua", "agua"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(4, "img/icons/agua_vazio.png", "Agua vazio", "agua_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(5, "img/icons/cafe.png", "Café", "cafe"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(6, "img/icons/cafe_vazio.png", "Café vazio", "cafe_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(7, "img/icons/laranja.png", "Laranja", "laranja"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(8, "img/icons/laranja_vazio.png", "Laranja vazio", "laranja_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(9, "img/icons/limao.png", "Limão", "limao"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(10, "img/icons/limao_vazio.png", "Limão vazio", "limao_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(10, "img/icons/maca.png", "Maçã", "maca"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(11, "img/icons/maca_vazio.png", "Maçã vazio", "maca_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(12, "img/icons/tomate.png", "Tomate", "tomate"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(13, "img/icons/tomate_vazio.png", "tomate vazio", "tomate_vazio"));
    }
    getImgDescriptiveIcon(tag) {
        for (let index = 0; index < this.listDescriptiveIcons.length; index++) {
            if (tag == this.listDescriptiveIcons[index].tag) {
                return this.listDescriptiveIcons[index].img;
            }
        }
        return "";
    }
    getNameClass() {
        return "PageSoundSphereHome";
    }
    // startTemplate(): void {
    //   this.containerElement.classList.add("simpleTheme");
    //   this.containerElement.classList.add("container");
    // }
    generateActions() {
        let conteudo;
        conteudo = `
    <div class="ui alternate stripe vertical segment">
        <div class="ui stackable  aligned grid " style="margin-bottom: 5px;">
            <div style="margin:0 auto !important; ">
                <div class="ui  menu inverted">
                    <a data-html="Comando de voz"  id="buttonVoiceComand" data-content="Comando de Voz" class="item mainmenu">
                        <i class="microphone icon"></i>
                    </a>
                    <a data-html="Repete" id="buttonLoop" data-content="Loop" class="item mainmenu">
                        <i class="refresh icon"></i>
                    </a>
                    <a data-html="Toca" id="buttonPlay" data-content="Play" class="item mainmenu">
                        <i class="play icon"></i>
                    </a>
                    <a data-html="Pausa" id="buttonPause" data-content="Pause" class="item mainmenu">
                        <i class="pause icon"></i>
                    </a>
                    <a data-html="Pare" id="buttonStop" data-content="Stop" class="item active  mainmenu">
                        <i class="stop icon "></i>
                    </a>
                    <a  id="restartPanel" data-content="Recomeçar" class="item mainmenu">
                        <i class="file outlin icon"></i>
                    </a>
                    <a data-html="Carrega"  id="buttonUploadWav" data-content="Upload" class="item mainmenu">
                        <i class="upload icon"></i>
                    </a>
                    <a  data-html="Descarrega"   id="buttonDownload" data-content="download" class="item mainmenu">
                        <i class="download icon"></i>
                    </a>
                    <a data-html="Apaga" id="buttonRemove" data-content="Excluir" class="item mainmenu">
                        <i class="trash icon"></i>
                    </a>
                    <div class="right menu">
                        <div id="dropdownCamadas" class="ui dropdown item">
                            Camadas <i class="dropdown icon"></i>
                            <div class="menu">
                                <a data-value="0" class="item active"> Todos</a>
                                <a data-value="12" class="item ">Modificadores</a>
                                <a data-value="1" class="item ">Descritor</a>
                                <a data-value="2" class="item">Amplitude</a>
                                <a data-value="4" class="item">Alimentos</a>
                                <a data-value="3" class="item">Dimensão</a>
                                <a data-value="5" class="item">Intensidade</a>

                            </div>
                        </div>
                        
                       
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
    

    `;
        return conteudo;
    }
    generatePainel() {
        return `
        <canvas class="canvas" width="600" height="300" id="canva_painel_mixagem">
        </canvas>`;
    }
    generateAlbum() {
        let conteudo;
        if (this.dao.listItemBuffer.length != 0) {
            conteudo = `
        <div>
        
         <div id="containerSoundIcons"style="width: 590px; margin: 0 auto" class="scrollmenu">
           <h3 class="ui header" style="margin-bottom: 0px;">Amostras</h3>`;
            for (let index = 0; index < this.dao.listItemBuffer.length; index++) {
                // onclick="togle(id)" onmouseenter="playOneSound(id)" onmouseleave="stopOneSound(id)"
                if (this.dao.listItemBuffer[index].show) {
                    conteudo += `
          <a  data-html="<b>${this.dao.listItemBuffer[index].name}</b> </br> ${this.painel.sec2time(this.dao.listItemBuffer[index].timeDuration)}"  class="itemMenuAmostra" data-id="${index}"  style=" width:50px; background-color: ${this.dao.listItemBuffer[index].color} "; width:50px" id="path${index}"><i class="icon square"></i></a>
          `;
                }
            }
            conteudo += `
      <div class="row">
       <div class="column">
         <h3 class="ui header" style="margin-bottom: 0px;">Modificadores</h3>
         <button class="ui  button">
            <i class="icon trash"></i>
            Remover
          </button>
          <button class="ui  button">
            <i class="icon arrows alternate"></i>
            Mover
          </button>
          <div class="ui icon buttons">
            <button class="ui button"><i class="align plus icon"></i></button>
            <button class="ui button black"><i class="align volume up icon"></i> 100</button>
            <button class="ui button"><i class="align minus icon"></i></button>
    
          </div>
          <button class="ui  button">
            <i class="icon volume off"></i>
            Mudo
          </button>

       </div>
     </div>
     `;
            //Descritor
            conteudo += `
     <div class="row">
      <div class="column">
        <h3 class="ui header" style="margin-bottom: 0px;">Descritor</h3>
        <a class="ui  button " >PSD - Pesado </a>
        <a class="ui  button " >LVE - Leve </a>
        <a class="ui  button  black" >GRD - Grande </a>
        <a class="ui  button " >PEQ - Pequeno </a>
        <a class="ui  button " >ESC - Escuro </a>
        <a class="ui  button " >BRI - Brilhante </a>
        <a class="ui  button " >QUE - Quente </a>
        <a class="ui  button " >FRI - Frio </a>
      </div>
    </div>
    `;
            conteudo += `
      </div>
      <div id="containerDescriptiveIcons"style="width: 590px; margin: 0 auto" class="scrollmenu">
            <h3 class="ui header" style="margin-bottom: 0px;" >Alimentos</h3>`;
            for (let index = 0; index < this.listDescriptiveIcons.length; index++) {
                // onclick="togle(id)" onmouseenter="playOneSound(id)" onmouseleave="stopOneSound(id)"
                conteudo += `
        <a  style="padding:6px!important;" data-html=" ${this.listDescriptiveIcons[index].name}"  class="itemMenuDescriptiveIcon" data-tag="${this.listDescriptiveIcons[index].tag}" data-id="${index}"><img style="width:40px; height:40px;" src="${this.listDescriptiveIcons[index].url}">	</a>
        `;
            }
            //Dimensao
            conteudo += `
         <div class="row">
          <div class="column">
            <h3 class="ui header" style="margin-bottom: 0px;">Dimensão</h3>`;
            for (let index = 0; index < this.listDimension.length; index++) {
                conteudo += `<a class="ui  button button_dimension" data-tag="${this.listDimension[index].tag}"> ${this.listDimension[index].name} </a>`;
            }
            conteudo += `</div>
        </div>
      `;
            //Intensidade
            conteudo += `
     <div class="row">
      <div class="column">
        <h3 class="ui header" style="margin-bottom: 0px;">Intensidade</h3>`;
            for (let index = 0; index < this.listIntisty.length; index++) {
                conteudo += `<a class="ui  button button_intensity" data-tag="${this.listIntisty[index].tag}"> ${this.listIntisty[index].tag} - ${this.listIntisty[index].name} </a>`;
            }
            conteudo += `</div>
    </div>
    `;
            conteudo += `
      </div>
       </div>`;
            return conteudo;
        }
        else {
            return "";
        }
    }
    onEndRecordMenuBar() {
        document.getElementById("buttonVoiceComand").classList.toggle("active");
    }
    onEndRecordModalOptions() {
        document
            .getElementById("buttonVoiceComandModal")
            .classList.toggle("active");
    }
    setSettingsActions() { }
    setSettingsActions_old() {
        // $(".ui.dropdown").dropdown({
        //   direction: "downward",
        // });
        // $("dropdownCamadas").dropdown({
        //   direction: "downward",
        //   onChange: (value: any) => {
        //     if (value == 0) {
        //       this.painel.drawDescritor = true;
        //       this.painel.drawGradient = true;
        //       this.painel.drawDimension = true;
        //       this.painel.drawFood = true;
        //       this.painel.drawIntensity = true;
        //     } else if (value == 1) {
        //       this.painel.drawDescritor = true;
        //       this.painel.drawGradient = false;
        //       this.painel.drawDimension = false;
        //       this.painel.drawFood = false;
        //       this.painel.drawIntensity = false;
        //     } else if (value == 2) {
        //       this.painel.drawDescritor = false;
        //       this.painel.drawGradient = true;
        //       this.painel.drawDimension = false;
        //       this.painel.drawFood = false;
        //       this.painel.drawIntensity = false;
        //     } else if (value == 3) {
        //       this.painel.drawDescritor = false;
        //       this.painel.drawGradient = false;
        //       this.painel.drawDimension = true;
        //       this.painel.drawFood = false;
        //       this.painel.drawIntensity = false;
        //     } else if (value == 4) {
        //       this.painel.drawDescritor = false;
        //       this.painel.drawGradient = false;
        //       this.painel.drawDimension = false;
        //       this.painel.drawFood = true;
        //       this.painel.drawIntensity = false;
        //     } else {
        //       this.painel.drawDescritor = false;
        //       this.painel.drawGradient = false;
        //       this.painel.drawDimension = false;
        //       this.painel.drawFood = false;
        //       this.painel.drawIntensity = true;
        //     }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        //     this.painel.reMake();
        //   },
        // });
        this.voiceCommandMenuBar = new VoiceMenuBar(this.tooltip, this);
        this.voiceCommandModalOptions = new VoiceModalOptions(this.tooltip, this);
        // $("buttonVoiceComand")?.addEventListener("click", () => {
        //   document.getElementById("buttonVoiceComand")!.classList.toggle("active");
        //   this.voiceCommandMenuBar!.startRecognition(this.onEndRecordMenuBar);
        // });
        const buttonVoiceComand = document.getElementById("buttonVoiceComand");
        if (buttonVoiceComand) {
            buttonVoiceComand.addEventListener("click", () => {
                buttonVoiceComand.classList.toggle("active");
                this.voiceCommandMenuBar.startRecognition(this.onEndRecordMenuBar);
            });
        }
        // document.getElementById("restartPanel")?.addEventListener("click", () => {
        //   this.showModalRestartPanel();
        // });
        (_a = document.getElementById("restartPanel")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            // this.showModalRestartPanel();
        });
        // document.getElementById("buttonDownload")?.addEventListener("click", () => {
        //   this.showModalDownloads();
        // });
        (_b = document.getElementById("buttonDownload")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            // this.showModalDownloads();
        });
        // document.getElementById("buttonRemove")?.addEventListener("click", () => {
        //   this.buttonRemoveStatus = !this.buttonRemoveStatus;
        //   //Para a mixagem caso esteja executando
        //   this.stopTrash();
        //   //Remove a seleção dos demais botões
        //   document.getElementById("buttonPlay").classList.remove("active");
        //   document.getElementById("buttonPause").classList.remove("active");
        //   //Desabilita o painel;
        //   if (this.buttonRemoveStatus) {
        //     document.getElementById("buttonRemove")?.classList.add("active");
        //     this.painel.setCursorTrash();
        //     this.disableAlbum();
        //     this.disableMenuDescriptiveIcon();
        //   } else {
        //     document.getElementById("buttonRemove").classList.remove("active");
        //     this.painel.unsetCursorTrash();
        //     this.disableMainenu();
        //   }
        // });
        (_c = document.getElementById("buttonRemove")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.buttonRemoveStatus = !this.buttonRemoveStatus;
            //Para a mixagem caso esteja executando
            this.stopTrash();
            //Remove a seleção dos demais botões
            // document.getElementById("buttonPlay").classList.remove("active");
            // document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            //Desabilita o painel;
            if (this.buttonRemoveStatus) {
                document.getElementById("buttonRemove").classList.add("active");
                this.painel.setCursorTrash();
                this.disableAlbum();
                this.disableMenuDescriptiveIcon();
            }
            else {
                document.getElementById("buttonRemove").classList.remove("active");
                this.painel.unsetCursorTrash();
                this.disableMainenu();
            }
        });
        // document
        //   .getElementById("nameFile")!
        //   .setAttribute("placeholder", this.dao.getDefaultName()!);
        // document
        //   .getElementById("nameAuthor")!
        //   .setAttribute("placeholder", this.dao.getDefaultAuthor()!);
        (_d = document.getElementById("buttonLoop")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            this.sequenciador.changeLoop();
            document.getElementById("buttonLoop").classList.toggle("active");
        });
        (_e = document.getElementById("buttonPlay")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.playMixagem();
        });
        (_f = document.getElementById("buttonPause")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
            this.pauseMixagem();
        });
        (_g = document.getElementById("buttonStop")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
            this.stopMixagem();
        });
        (_h = document.getElementById("cancelModal")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
            $(".ui.modal").modal("hide");
        });
        (_j = document
            .getElementById("confirmRestartPanel")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            this.painel.restartMixing();
            this.painel.reMake();
            $(".ui.modal").modal("hide");
        });
        (_k = document
            .getElementById("buttonDownloadWav")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
            var _a;
            this.sequenciador.startDownload(this.closeModalDownload, (_a = document.getElementById("nameFile")) === null || _a === void 0 ? void 0 : _a.value);
            // this.generateHTML();
            this.atualizaTitulo();
        });
        (_l = document
            .getElementById("buttonCancelarDownload")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
            // this.closeModalDownload();
        });
        // document
        //   .getElementById("buttonDownloadJson")
        //   ?.addEventListener("click", () => {
        //     this.dao.downloadJSON(
        //       // (document.getElementById("nameFile") as HTMLInputElement)?.value,
        //       // (document.getElementById("nameAuthor") as HTMLInputElement)?.value
        //     );
        //     // this.closeModalDownload();
        //     // this.generateHTML();
        //     this.atualizaTitulo();
        //   });
        // document
        //   .getElementById("buttonDownloadJsonWav")
        //   ?.addEventListener("click", () => {
        //     this.dao.downloadJSON(
        //       (document.getElementById("nameFile") as HTMLInputElement)?.value,
        //       (document.getElementById("nameAuthor") as HTMLInputElement)?.value
        //     );
        //     this.sequenciador.startDownload(
        //       this.closeModalDownload,
        //       (document.getElementById("nameFile") as HTMLInputElement)?.value
        //     );
        //     // this.generateHTML();
        //     this.atualizaTitulo();
        //   });
        (_m = document
            .getElementById("buttonUploadWav")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            document.getElementById("filesWav").click();
        });
        (_o = document
            .getElementById("buttonInitialUploadWav")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            document.getElementById("filesWav").click();
            this.closeModalInitial();
        });
        (_p = document
            .getElementById("buttonJson1Cancelar")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", () => {
            this.closeModalJson1();
            this.backToMainModal();
        });
        (_q = document
            .getElementById("buttonJson2Cancelar")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", () => {
            this.closeModalJson2();
            this.backToMainModal();
        });
        (_r = document
            .getElementById("buttonJson1SelctJson")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", () => {
            document.getElementById("fileJSON").click();
        });
        (_s = document
            .getElementById("buttonJson2SelctWav")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", () => {
            document.getElementById("fileHomeWav").click();
        });
        (_t = document.getElementById("buttonJson3ok")) === null || _t === void 0 ? void 0 : _t.addEventListener("click", () => {
            this.closeModalJson3();
            this.reloadAlbum();
            this.painel.reMake();
        });
        (_u = document.getElementById("buttonJson4ok")) === null || _u === void 0 ? void 0 : _u.addEventListener("click", () => {
            this.closeModalJson4();
            document.getElementById("filesWav").click();
        });
        (_v = document
            .getElementById("buttonInitialContinue")) === null || _v === void 0 ? void 0 : _v.addEventListener("click", () => {
            this.showModalJson1();
        });
        this.generateActionsAlbum();
    }
    backToMainModal() {
        this.dao.eraserSoundSphereDB();
        this.showModalInitial();
    }
    nextStepJson1To2() {
        this.closeModalJson1();
        this.showModalJson2();
    }
    nextStepJson1To4() {
        this.closeModalJson1();
        this.showModalJson4();
    }
    nextStepJson2To3() {
        this.closeModalJson2();
        this.showModalJson3();
    }
    // Opções Modal
    closeModalJson2() {
        // document.getElementById("modalJson2").modal("hide");
    }
    closeModalJson3() {
        // document.getElementById("modalJson3").modal("hide");
    }
    closeModalJson4() {
        // document.getElementById("modalJson4").modal("hide");
    }
    closeModalJson1() {
        // document.getElementById("modalJson1").modal("hide");
    }
    closeModalDownload() {
        // document.getElementById("downloadModal").modal("hide");
    }
    closeModalInitial() {
        // document.getElementById("initialModal").modal("hide");
    }
    playMixagem() {
        this.buttonRemoveStatus = false;
        this.disableAlbum();
        this.disableMenuDescriptiveIcon();
        this.disableButtonTrash();
        this.sequenciador.play(() => {
            document.getElementById("buttonPlay").classList.toggle("active");
            document.getElementById("buttonStop").classList.remove("active");
            document.getElementById("buttonRemove").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            this.stopActived = false;
            // this.pauseActived = false;
        }, () => {
            //console.log("Terminou de executar")
            document.getElementById("buttonPlay").classList.remove("active");
            if (this.stopActived) {
                document.getElementById("buttonStop").classList.add("active");
                this.disableMainenu();
            }
            if (!this.sequenciador.activePause) {
                this.disableMainenu();
            }
        });
    }
    pauseMixagem() {
        this.buttonRemoveStatus = false;
        this.painel.unsetCursorTrash();
        this.disableAlbum();
        this.disableMenuDescriptiveIcon();
        this.sequenciador.pause(() => {
            //console.log("chamou  o cakkbacj do pause")
            document.getElementById("buttonRemove").classList.remove("active");
            document.getElementById("buttonPause").classList.add("active");
            document.getElementById("buttonStop").classList.remove("active");
            //this.pauseActived = true
            this.stopActived = false;
        }, () => {
            this.disableMainenu();
            document.getElementById("buttonPause").classList.remove("active");
        });
    }
    stopMixagem() {
        this.buttonRemoveStatus = false;
        this.disableMainenu();
        this.stopActived = true;
        this.stopStandard();
    }
    stopSimple() {
        this.buttonRemoveStatus = false;
        this.disableItemOption();
        this.stopActived = true;
        this.sequenciador.stopSimple(() => {
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonRemove").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonStop").classList.add("active");
        });
    }
    stopStandard() {
        this.sequenciador.stop(() => {
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonRemove").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonStop").classList.add("active");
        });
    }
    stopTrash() {
        this.sequenciador.stopSimple(() => {
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonStop").classList.add("active");
        });
    }
    //Função para gerenciar se ao clicar nos itens do album
    //se esta selecionado ou liberando os itens
    //itemOptionEnabled = true - OPções liberada
    //itemOptionEnabled = false - Inserir amostras
    generateActionsAlbum() {
        // $(".itemMenuAmostra").popup({
        //   on: "hover",
        // });
        // $(".itemMenuDescriptiveIcon").popup({
        //   on: "hover",
        // });
        // $(".mainmenu").popup({
        //   on: "hover",
        // });
        // $(".itemMenuAmostra").on("mouseenter", (e: JQueryEventObject) => {
        //   $(e.currentTarget).children("i")!.classList.toggle("square play");
        //   if (this.mouseInsideIconAlbum == undefined) {
        //     this.mouseInsideIconAlbum = $(e.target).data("id");
        //     this.tooltip.showMessageFixedId(
        //       "Executando: " +
        //         this.dao.listItemBuffer[$(e.currentTarget).data("id")].name,
        //       $(e.currentTarget).data("id")
        //     );
        //     this.sequenciador.playOneSound($(e.target).data("id"), () => {
        //       this.tooltip.removeMessageFixedId($(e.currentTarget).data("id"));
        //       this.mouseInsideIconAlbum = undefined;
        //       $(e.currentTarget)
        //         .children("i.play")!
        //         .classList.toggle("play square");
        //     });
        //   }
        // });
        // $(".itemMenuAmostra").on("mouseleave", (e: JQueryEventObject) => {
        //   this.sequenciador.stopOneSound();
        //   this.mouseInsideIconAlbum = undefined;
        //   this.tooltip.removeMessageFixedId($(e.currentTarget).data("id"));
        //   $(e.currentTarget).children("i.play")!.classList.toggle("play square");
        // });
        // $(".itemMenuAmostra").on("click", (e: JQueryEventObject) => {
        //   this.stopSimple();
        //   if (this.buttonRemoveStatus) {
        //     this.disableButtonTrash();
        //   }
        //   $("a.itemMenuAmostra")
        //     .children("i.black")!
        //     .classList.toggle("black white");
        //   if (this.idSelectedIcomAlbum == $(e.currentTarget).data("id")) {
        //     this.idSelectedIcomAlbum = undefined;
        //     this.enableItemOption();
        //   } else {
        //     $(e.currentTarget).children("i")!.classList.toggle("white black");
        //     this.idSelectedIcomAlbum = $(e.currentTarget).data("id");
        //     this.disableItemOption();
        //   }
        // });
        // $(".itemMenuDescriptiveIcon").on("click", (e: JQueryEventObject) => {
        //   this.stopSimple();
        //   if (this.buttonRemoveStatus) {
        //     this.disableButtonTrash();
        //   }
        //   $(".itemMenuDescriptiveIcon").classList.remove(
        //     "itemMenuDescriptiveIconSelected"
        //   );
        //   if (this.descriptiveIcon == $(e.currentTarget).data("tag")) {
        //     console.log($(e.currentTarget).data("tag"));
        //     $(e.currentTarget).classList.remove("itemMenuDescriptiveIconSelected");
        //     this.descriptiveIcon = undefined;
        //   } else {
        //     $(e.currentTarget)?.classList.add("itemMenuDescriptiveIconSelected");
        //     this.descriptiveIcon = $(e.currentTarget).data("tag");
        //   }
        // });
        // $(".button_dimension").on("click", (e: JQueryEventObject) => {
        //   this.stopSimple();
        //   if (this.buttonRemoveStatus) {
        //     this.disableButtonTrash();
        //   }
        //   $(".button_dimension").classList.remove("black");
        //   if (this.selected_tag_dimension == $(e.currentTarget).data("tag")) {
        //     console.log($(e.currentTarget).data("tag"));
        //     $(e.currentTarget).classList.remove("black");
        //     this.selected_tag_dimension = undefined;
        //   } else {
        //     $(e.currentTarget)?.classList.add("black");
        //     this.selected_tag_dimension = $(e.currentTarget).data("tag");
        //   }
        // });
        // $(".button_intensity").on("click", (e: JQueryEventObject) => {
        //   this.stopSimple();
        //   if (this.buttonRemoveStatus) {
        //     this.disableButtonTrash();
        //   }
        //   $(".button_intensity").classList.remove("black");
        //   if (this.selected_tag_intensity == $(e.currentTarget).data("tag")) {
        //     console.log($(e.currentTarget).data("tag"));
        //     $(e.currentTarget).classList.remove("black");
        //     this.selected_tag_intensity = undefined;
        //   } else {
        //     $(e.currentTarget)?.classList.add("black");
        //     this.selected_tag_intensity = $(e.currentTarget).data("tag");
        //   }
        // });
    }
    disableButtonTrash() {
        this.buttonRemoveStatus = false;
        document.getElementById("buttonRemove").classList.remove("active");
        this.painel.unsetCursorTrash();
    }
    renderAlbum() {
        // console.log("render album")
        // document.getElementById("contentAlbum").html(this.generateAlbum());
        // this.generateActionsAlbum();
    }
    setSettingsAttributes() {
        var _a;
        (_a = document
            .getElementById("buttonInitialUploadWav")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            document.getElementById("filesWav").click();
            this.closeModalInitial();
        });
    }
    generateHTML() {
        // let conoteudoHTML = `<br>
        //           <h2 class="ui header centered">
        //             <div style=" user-select: none;"  unselectable="on" id="titulo">
        //               <font color="${this.soundSphereInfo.getColorTitle()}">
        //               <p id="valuetitulo"  style="-moz-user-select:none;  user-select: none;" unselectable="on">
        //                 ${this.soundSphereInfo.getFullName()}`;
        // conoteudoHTML +=
        //   this.sessionControl.getLastEventNameValid() != undefined
        //     ? " - " + this.sessionControl.getLastEventNameValid()
        //     : "";
        // conoteudoHTML +=
        //   `</p>
        //             </div>
        //           </h2>
        //    ` +
        //   this.generatePainel() +
        //   `
        //    <br/>
        //       <div id="divActions">` +
        //   this.generateActions() +
        //   `</div> <br/>` +
        //   `<div id="contentAlbum">` +
        //   this.generateAlbum() +
        //   `</div>`;
        // this.containerElement!.innerHTML = conoteudoHTML;
        // // this.generateContentOfTheModals();
        // this.setSettingsActions();
        // this.setSettingsAttributes();
    }
    reloadAlbum() {
        document.getElementById("divActions").innerHTML = this.generateActions();
        document.getElementById("contentAlbum").innerHTML = this.generateAlbum();
        // this.generateContentOfTheModals();
        this.setSettingsActions();
        this.setSettingsAttributes();
    }
    atualizaTitulo() {
        console.log(this.sessionControl);
        console.log(this.sessionControl.getLastEventNameValid());
        console.log("------");
        document.getElementById("valuetitulo").innerHTML = `${this.soundSphereInfo.getFullName()} ${this.sessionControl.getLastEventNameValid() != undefined
            ? " - " + this.sessionControl.getLastEventNameValid()
            : ""}`;
    }
    // generateContentOfTheModals() {
    //   this.genrateContentofModalRestartPanel();
    //   this.genrateContentofModalJson1();
    //   this.genrateContentofModalJson2();
    //   this.genrateContentofModalJson3();
    //   this.genrateContentofModalJson4();
    //   this.genrateContentofModalDownload();
    //   this.genrateContentofModalInitial();
    // }
    showModalOptions() {
        // this.genrateContentofModalOptions();
        // document
        //   .getElementById("modalOptions")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalInitial() {
        // document
        //   .getElementById("initialModal")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalRestartPanel() {
        // document
        //   .getElementById("restartModal")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalDownloads() {
        // document
        //   .getElementById("downloadModal")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalJson1() {
        // document
        //   .getElementById("modalJson1")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalJson2() {
        // document
        //   .getElementById("modalJson2")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalJson4() {
        // document
        //   .getElementById("modalJson4")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    showModalJson3() {
        // console.log("showModalJson3");
        // document
        //   .getElementById("modalJson3")
        //   .modal({ closable: false })
        //   .modal("setting", "transition", "horizontal flip")
        //   .modal("show");
    }
    genrateContentofModalOptions() {
        //   let conteudo = `
        // <div class="header">Options/Opções:</div>
        // <div class="content" id="corpoModal">
        //   <form onsubmit="return false;" class="ui form" novalidate id="formOptions">
        //     <div class="column">
        //       <div class="ui error message"></div>
        //       <div class="ui grid">
        //         <div class="sixteen wide mobile six wide tablet four wide computer column">
        //           <h4 class="ui left aligned header">Geral</h4>
        //           <div class="ui labeled input field">
        //             <div id="checkSoloMute" class="ui toggle checkbox checked">
        //               <input type="checkbox" checked="checked" name="public">
        //               <label id="solo">Ativo/Solo
        //                 <i class="alarm icon"></i>
        //               </label>
        //             </div>
        //           </div>
        //         </div>
        //         <div class="sixteen wide mobile six wide tablet four wide computer column">
        //           <div class="field">
        //             <label><h3>Descritores</h3></label>
        //             <div class="ui item">
        //               <select id="select-filter" class="ui fluid  dropdown">
        //               `;
        //   if (this.itemMixOption!.getidSemanticDescriptor() == undefined) {
        //     conteudo += `<option selected="selected" data-code="undefined" value="undefined">Nenhum</option>`;
        //   } else {
        //     conteudo += `<option data-code="undefined"  value="undefined">Nenhum</option>`;
        //   }
        //   this.dao.listSemanticDescriptors.forEach((element, index) => {
        //     if (this.itemMixOption!.getidSemanticDescriptor() == index) {
        //       conteudo += `<option  selected="selected" data-code="${element.code}"  value="${index}" >${element.name}</option>`;
        //     } else {
        //       conteudo += `<option data-code="${element.code}"  value="${index}">${element.name}</option>`;
        //     }
        //   });
        //   conteudo += `
        //               </select>
        //             </div>
        //           </div>
        //         </div>
        //         <div class="sixteen wide mobile six wide tablet twelve wide computer column">
        //           <h4 class="ui left aligned header">Tempo de:</h3>
        //             <div class="two fields">
        //               <div id="divStartTime" class="ui labeled input field">
        //                 <div class="ui label green">
        //                   Start/Inicío
        //                 </div>
        //                 <input id="startTime" value="${
        //                   this.itemMixOption!.startTime
        //                 }" type="number">
        //               </div>
        //               <div id="divEndTime" class="ui labeled input field">
        //                 <div class="ui label red">
        //                   End/Fim
        //                 </div>
        //                 <input id="endTime" value="${
        //                   this.itemMixOption!.endTime
        //                 }" type="number">
        //               </div>
        //             </div>
        //         </div>
        //       </div>
        //       <h4 class="ui left aligned header">Volume</h4>
        //       <div class="ui green progress" data-total="200" id="barVolume">
        //         <div class="bar" >
        //           <div class="progress"></div>
        //         </div>
        //       </div>
        //       <div class="ui centered grid">
        //       <div class="label">
        //         <div class="ui icon buttons ">
        //           <button id="buttonMinus" class="ui basic button">
        //             <i class="icon minus red"></i>
        //           </button>
        //           <button id="buttonPlus" class="ui basic button">
        //             <i class="icon plus green"></i>
        //           </button>
        //         </div>
        //       </div>
        //       </div>
        //     </div>
        //   </form>
        // </div>
        // <div class="actions">
        //   <div id="buttonVoiceComandModal" class="ui blue right  icon button">
        //   <i class="microphone icon"></i>
        //   </div>
        //   <div id="playAudioComOptions" class="ui blue right  icon button">
        //     Com Modificadores
        //   </div>
        //   <div id="buttonPlayAudioSemEfeito" class="ui blue right  icon button">
        //     Sem Modificadores
        //   </div>
        //   <div id="buttonDeleteModalOptions" class="ui red button">
        //     Delete
        //     <i class="trash icon"></i>
        //   </div>
        //   <div id="buttonCalcelModal" class="ui neutral right labeled icon button">Cancel</div>
        //   <div  id="buttonOkModal"class="ui blue button ">Salvar</div>
        // </div>
        //   `;
        //   document.getElementById("modalOptions")!.innerHTML = conteudo;
        //   this.generateSetingsOptionModal();
    }
    closeModalOptions() {
        // document.getElementById("modalOptions").modal("hide");
        // this.itemMixOption = undefined;
    }
    generateSetingsOptionModal() {
        // document.getElementById("buttonPlayAudioSemEfeito").on("mouseleave", () => {
        //   this.sequenciador.stopOneSound();
        // });
        // document.getElementById("buttonPlayAudioSemEfeito").on("mouseenter", () => {
        //   this.sequenciador.playOneSound(
        //     this.itemMixOption!.idBuffer,
        //     function () {}
        //   );
        // });
        // document.getElementById("playAudioComOptions").on("mouseout", () => {
        //   //console.log("mouse out")
        //   this.sequenciador.stopOneSound();
        // });
        // document.getElementById("playAudioComOptions").on("mouseenter", () => {
        //   this.sequenciador.playOneSoundOption(this.itemMixOption!);
        // });
        // document
        //   .getElementById("select-filter")
        //   .on("change", (e: JQueryEventObject) => {
        //     let selected = $(e.target).find("option:selected");
        //     let code = selected.data("code");
        //     if ($(e.target).val() == "undefined") {
        //       this.itemMixOption!.setIdSemanticDescriptor(undefined);
        //       this.itemMixOption!.setCodeSemanticDescriptor(undefined);
        //     } else {
        //       this.itemMixOption!.setIdSemanticDescriptor(
        //         <number>$(e.target).val()
        //       );
        //       this.itemMixOption!.setCodeSemanticDescriptor(code);
        //     }
        //   });
        // console.log("ABRIU");
        // console.log(
        //   " this.itemMixOption!.getVolume();" + this.itemMixOption!.getVolume()
        // );
        // document.getElementById("barVolume").progress({
        //   label: "ratio",
        //   text: {
        //     ratio: "{value}",
        //   },
        // });
        // document
        //   .getElementById("barVolume")
        //   .progress("set progress", this.itemMixOption!.getVolume());
        // if (this.itemMixOption!.solo) {
        //   document.getElementById("checkSoloMute").checkbox("check");
        // } else {
        //   document.getElementById("checkSoloMute").checkbox("uncheck");
        // }
        // //Opções do checkbox
        // document.getElementById("checkSoloMute").checkbox({
        //   beforeChecked: () => {
        //     document.getElementById("solo")!.innerHTML = "Ativo/Solo ";
        //     var i = document.createElement("i");
        //     i.setAttribute("class", "alarm icon");
        //     document.getElementById("solo")!.appendChild(i);
        //     this.itemMixOption!.solo = true;
        //   },
        //   beforeUnchecked: () => {
        //     document.getElementById("solo")!.innerHTML = "Mudo/Mute ";
        //     var i = document.createElement("i");
        //     i.setAttribute("class", "alarm slash icon");
        //     document.getElementById("solo")!.appendChild(i);
        //     this.itemMixOption!.solo = false;
        //   },
        // });
        // //Evento ao alterar o inicio
        // document.getElementById("startTime").on("keyup change", () => {
        //   this.itemMixOption!.startTime = parseFloat(
        //     String(document.getElementById("startTime").val())
        //   );
        //   this.itemMixOption!.endTime =
        //     this.itemMixOption!.startTime + this.itemMixOption!.seconds;
        //   document
        //     .getElementById("endTime")
        //     .val(this.itemMixOption!.startTime + this.itemMixOption!.seconds);
        //   //console.log("startTime time p/: " + this.itemMixOption!.startTime);
        //   document.getElementById("formOptions").form("validate form");
        // });
        // //Evento ao alterar o fim
        // document.getElementById("endTime").on("keyup change", () => {
        //   this.itemMixOption!.endTime = parseFloat(
        //     String(document.getElementById("endTime").val())
        //   );
        //   this.itemMixOption!.startTime =
        //     this.itemMixOption!.endTime - this.itemMixOption!.seconds;
        //   document
        //     .getElementById("startTime")
        //     .val(this.itemMixOption!.endTime - this.itemMixOption!.seconds);
        //   //console.log("end time p/: " + this.itemMixOption!.endTime);
        //   document.getElementById("formOptions").form("validate form");
        // });
        // document
        //   .getElementById("buttonVoiceComandModal")
        //   ?.addEventListener("click", () => {
        //     document
        //       .getElementById("buttonVoiceComandModal")!
        //       .classList.toggle("active");
        //     this.voiceCommandModalOptions!.startRecognition(
        //       this.onEndRecordModalOptions
        //     );
        //   });
        // document
        //   .getElementById("buttonCalcelModal")
        //   ?.addEventListener("click", () => {
        //     this.closeModalOptions();
        //   });
        // document.getElementById("buttonOkModal")?.addEventListener("click", () => {
        //   if (document.getElementById("formOptions").form("is valid")) {
        //     //console.log("Pode fechar");
        //     this.painel.updateItemMixPanel(this.itemMixOption!);
        //     this.closeModalOptions();
        //     //painel.updateItem(this.itemMixOption);
        //   } else {
        //     //console.log(" n Pode fechar");
        //     document.getElementById("formOptions").form("validate form");
        //   }
        // });
        // document
        //   .getElementById("buttonDeleteModalOptions")
        //   ?.addEventListener("click", () => {
        //     this.painel.deleteItemMixPanel(this.itemMixOption!);
        //     this.closeModalOptions();
        //   });
        // // $('#buttonTesteModal').on('click', () => {
        // // this.sequenciador.downloadItemMixOption(this.itemMixOption!);
        // // });
        // document.getElementById("buttonMinus")?.addEventListener("click", () => {
        //   document.getElementById("buttonMinus").prop("disabled", true);
        //   document.getElementById("buttonPlus").prop("disabled", true);
        //   if (this.itemMixOption!.getVolume() > 0) {
        //     document
        //       .getElementById("barVolume")
        //       .progress("set duration", 0)
        //       .progress("decrement", 10);
        //     this.itemMixOption!.setVolume(this.itemMixOption!.getVolume() - 10);
        //     //console.log("Minus this.itemMixOption!.getVolume(): " + this.itemMixOption!.getVolume());
        //   }
        //   document.getElementById("buttonMinus").prop("disabled", false);
        //   document.getElementById("buttonPlus").prop("disabled", false);
        // });
        // //Button plus
        // document.getElementById("buttonPlus")?.addEventListener("click", () => {
        //   document.getElementById("buttonPlus").prop("disabled", true);
        //   document.getElementById("buttonMinus").prop("disabled", true);
        //   if (this.itemMixOption!.getVolume() < 200) {
        //     document
        //       .getElementById("barVolume")
        //       .progress("set duration", 0)
        //       .progress("increment", 10);
        //     this.itemMixOption!.setVolume(this.itemMixOption!.getVolume() + 10);
        //     //console.log("Plus this.itemMixOption!.getVolume(): " + this.itemMixOption!.getVolume());
        //   }
        //   document.getElementById("buttonPlus").prop("disabled", false);
        //   document.getElementById("buttonMinus").prop("disabled", false);
        // });
        // $.fn.form.settings.rules.minZero = (value: any) => {
        //   if (value < 0) {
        //     return false;
        //   } else {
        //     return true;
        //   }
        // };
        // $.fn.form.settings.rules.validEnd = (value: any) => {
        //   if (value < this.itemMixOption!.seconds) {
        //     return false;
        //   } else {
        //     return true;
        //   }
        // };
        // document.getElementById("formOptions").form({
        //   on: "blur",
        //   fields: {
        //     startTime: {
        //       identifier: "startTime",
        //       rules: [
        //         {
        //           type: "empty",
        //           prompt: "Informe o início.",
        //         },
        //         {
        //           type: "minZero",
        //           prompt: "O valor de início minimo é 0.",
        //         },
        //       ],
        //     },
        //     endTime: {
        //       identifier: "endTime",
        //       rules: [
        //         {
        //           type: "empty",
        //           prompt: "Informe o fim.",
        //         },
        //         {
        //           type: "validEnd",
        //           prompt:
        //             "O tempo final deve ser maior ou igual ao tempo total da amostra. Tempo da amostras: " +
        //             this.itemMixOption!.seconds +
        //             ".",
        //         },
        //       ],
        //     },
        //   },
        // });
    }
    genrateContentofModalRestartPanel() {
        // let conteudoHTML = `
        //     <div class="header">
        //       Atenção!
        //     </div>
        //     <div class="content">
        //       <p>Reiniciar a mixagem?</p>
        //     </div>
        //     <div class="actions">
        //       <div id="cancelModal" class="ui button">
        //         Cancel
        //       </div>
        //       <div id="confirmRestartPanel" class="ui primary button">
        //        Confirmar
        //       </div>
        //     </div>
        // `;
        // document.getElementById("restartModal").html(conteudoHTML);
    }
    genrateContentofModalDownload() {
        // let conteudoHTML = `
        //   <i class="close icon"></i>
        //     <div class="header">
        //       Opções de Download
        //     </div>
        //     <div class="content">
        //     <div class="ui form">
        //       <div class="field">
        //         <label>Arquivo: </label>
        //         <input id="nameFile" type="text"  >
        //       </div>
        //       <div class="field">
        //         <label>Autor: </label>
        //         <input id="nameAuthor" type="text" >
        //       </div>
        //     </div>
        //     </div>
        //     <div class="actions">
        //       <div class="feature alternate ui stripe vertical segment">
        //         <div class="ui four column center aligned divided relaxed stackable grid container">
        //           <div class="row center">
        //             <div class="column">
        //               <div id="buttonDownloadJson" class="ui green large button">
        //               JSON
        //               </div>
        //             </div>
        //             <div class="column">
        //               <div id="buttonDownloadJsonWav" class="ui primary view-ui large button">
        //               JSON + WAVE
        //               </div>
        //             </div>
        //             <div class="column">
        //               <div  id="buttonDownloadWav" class="ui orange large button">
        //               WAVE
        //               </div>
        //             </div>
        //             <div class="column">
        //               <div  id="buttonCancelarDownload" class="ui red large button">
        //               Cancelar
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        // `;
        // document.getElementById("downloadModal").html(conteudoHTML);
    }
    genrateContentofModalInitial() {
        // let conteudoHTML = `
        //   <div class="header">
        //   Bem vindo!
        // </div>
        // <div id="mensagem" class="content">
        //   <div class="feature alternate ui stripe vertical segment">
        //     <div class="ui two column center aligned divided relaxed stackable grid container">
        //       <div class="row">
        //       <div class="column">
        //       <h2 class="ui icon header">
        //         <i class="file outline icon"></i> Novo
        //       </h2>
        //       <p>Desejo iniciar um novo projeto.</p>
        //       <div id="buttonInitialUploadWav" class="ui primary view-ui large button">Iniciar</div>
        //     </div>
        //         <div class="column">
        //           <h2 class="ui icon header">
        //             <i class="upload icon"></i> Abrir
        //           </h2>
        //           <p>Quero continuar um projeto do
        //             <em>SoundSphere</em>.</p>
        //           <div id="buttonInitialContinue" class="ui green large button">Continuar</div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        // `;
        // document.getElementById("initialModal").html(conteudoHTML);
    }
    genrateContentofModalJson2() {
        // let conteudoHTML = `
        //   <div class="ui ordered top attached steps">
        //   <div class="completed step">
        //     <div class="content">
        //       <div class="title">JSON</div>
        //     </div>
        //   </div>
        //   <div class="active step">
        //     <div class="content">
        //       <div class="title">Amostras</div>
        //     </div>
        //   </div>
        //   <div class=" step">
        //     <div class="content">
        //       <div class="title">Informações</div>
        //     </div>
        //   </div>
        // </div>
        // <div class="content">
        //   <div id="errorMessageJson2"> </div>
        //   <p id="mensagemModalJson2"></p>
        //   <div id="filesRequireJSON" class="ui two column grid">
        //   </div>
        // </div>
        // <div class="actions">
        //   <div id="buttonJson2Cancelar" class="ui red button">Cancelar</div>
        //   <div id="buttonJson2SelctWav"  class="ui green button">Selecionar</div>
        // </div>
        // `;
        // document.getElementById("modalJson2").html(conteudoHTML);
    }
    showMessageJson2(mensagemPrincipal, listaRequire) {
        // document.getElementById("mensagemModalJson2").html(mensagemPrincipal);
        // let contetesteudo = ``;
        // for (let index = 0; index < listaRequire.length; index++) {
        //   contetesteudo += `
        //       <div class="column">
        //       <div class="ui bulleted list">
        //         <div class="item">${listaRequire[index]}</div>
        //       </div>
        //     </div>
        //       `;
        // }
        // document.getElementById("filesRequireJSON").html(contetesteudo);
        // this.nextStepJson1To2();
    }
    genrateContentofModalJson3() {
        // // console.log("genrateContentofModalJson3 ")
        // let conteudoHTML = `
        //   <div class="ui ordered top attached steps">
        //   <div class="completed step">
        //     <div class="content">
        //       <div class="title">JSON</div>
        //     </div>
        //   </div>
        //   <div class="completed step">
        //     <div class="content">
        //       <div class="title">Amostras</div>
        //     </div>
        //   </div>
        //   <div class=" active step">
        //     <div class="content">
        //       <div class="title">Informações</div>
        //     </div>
        //   </div>
        // </div>
        // <div class="content">
        //   <div id="errorMessageJson3"> </div>
        //   <div>Clique em OK, para iniciar.</div>
        // </div>
        // <div class="actions">
        //   <div id="buttonJson3ok"  class="ui green button">OK</div>
        // </div>
        // `;
        // document.getElementById("modalJson3").html(conteudoHTML);
    }
    genrateContentofModalJson4() {
        // // console.log("genrateContentofModalJson3 ")
        // let conteudoHTML = `
        //   <div class="ui ordered top attached steps">
        //   <div class="completed step">
        //     <div class="content">
        //       <div class="title">JSON</div>
        //     </div>
        //   </div>
        //   <div class="completed step">
        //     <div class="content">
        //       <div class="title">Amostras</div>
        //     </div>
        //   </div>
        //   <div class=" active step">
        //     <div class="content">
        //       <div class="title">Informações</div>
        //     </div>
        //   </div>
        // </div>
        // <div class="content">
        //   <div id="errorMessageJson3"> </div>
        //   <div>Vocë carregou um arquivo JSON que contem apenas Descritores Semanticos, clique em carregar fazer o upload dos arquivos WAV que deseja utilizar.</div>
        // </div>
        // <div class="actions">
        //   <div id="buttonJson4ok"  class="ui green button">Carregar</div>
        // </div>
        // `;
        // document.getElementById("modalJson4").html(conteudoHTML);
    }
    genrateContentofModalJson1() {
        // let conteudoHTML = `
        //   <div class="ui ordered top attached steps">
        //   <div class="active step">
        //     <div class="content">
        //       <div class="title">JSON</div>
        //     </div>
        //   </div>
        //   <div class=" step">
        //     <div class="content">
        //       <div class="title">Amostras</div>
        //     </div>
        //   </div>
        //   <div class=" step">
        //     <div class="content">
        //       <div class="title">Informações</div>
        //     </div>
        //   </div>
        // </div>
        // <div class="content">
        //   <div id="errorMessageJson1"></div>
        //   <div> Selecione o arquivo JSON gerado pelo SoundSphere que você deseja dar continuidade.</div>
        // </div>
        // <div class="actions">
        //   <div  id="buttonJson1Cancelar" class="ui red button">Cancelar</div>
        //   <div id="buttonJson1SelctJson" class="ui green button">Selecionar</div>
        // </div>
        // `;
        // document.getElementById("modalJson1").html(conteudoHTML);
    }
    setSemanticDescriptor(id) {
        // this.itemMixOption!.setIdSemanticDescriptor(id);
        // let selected = document
        //   .getElementById("select-filter")
        //   .find("option:selected");
        // let code = selected.data("code");
        // this.itemMixOption!.setCodeSemanticDescriptor(code);
    }
    showErrorMessageJson1(mensagem) {
        // const conteudo = `
        //   <div class="ui error message">
        //     </i>
        //     <div class="header">
        //      Atenção!
        //     </div>
        //     <p>
        //     ${mensagem}
        //     </p>
        //   </div>
        //   `;
        // document.getElementById("errorMessageJson1").html(conteudo);
    }
    showErrorMessageJson2(listMensagens) {
        // let conteudo = `
        //   <div class="ui error message">
        //     </i>
        //     <div class="header">
        //      Atenção!
        //     </div>`;
        // for (let index = 0; index < listMensagens.length; index++) {
        //   conteudo += `<p> ${listMensagens[index]}</p>`;
        // }
        // conteudo += `
        //   </div>
        //   `;
        // document.getElementById("errorMessageJson2").html(conteudo);
    }
    showErrorMessageJson3(listMensagens) {
        //   let conteudo = `
        //     <div class="ui error message">
        //       </i>
        //       <div class="header">
        //        Atenção!
        //       </div>`;
        //   for (let index = 0; index < listMensagens.length; index++) {
        //     conteudo += `<p> ${listMensagens[index]}</p>`;
        //   }
        //   conteudo += `
        //     </div>
        //     `;
        //   document.getElementById("errorMessageJson3").html(conteudo);
    }
}
