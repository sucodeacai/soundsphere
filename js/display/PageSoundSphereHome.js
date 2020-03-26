"use strict";
class PageSoundSphereHome extends SimplePage {
    //itemOptionitemOptionEnabled: boolean = true;
    // constructor(containerElement: JQuery, titulo: string, soundSphereInfo: SoundSphereInfo, dao: DAO, sequenciador: any, canvas: any, contextCanvas: any) {
    constructor(containerElement, titulo, soundSphereInfo, dao, sequenciador, tooltip, sessionControl) {
        super(containerElement, titulo, soundSphereInfo, dao, sequenciador);
        this.canvas = [];
        this.contextCanvas = [];
        this.stopActived = true;
        //pauseActived = false
        this.itemMixOption = undefined;
        this.itemOptionEnabled = true;
        this.panelReleased = true;
        this.idSelectedIcomAlbum = undefined;
        this.mouseInsideIconAlbum = undefined;
        this.mouseOutIconAlbum = true;
        // this.canvas = canvas;
        // this.contextCanvas = contextCanvas;
        this.tooltip = tooltip;
        this.sessionControl = sessionControl;
        this.startTemplate();
        this.generateHTML();
        this.showModalInitial();
    }
    getNameClass() {
        return "PageSoundSphereHome";
    }
    render() {
        //console.asdf
    }
    startTemplate() {
        this.containerElement.addClass("simpleTheme");
        this.containerElement.addClass("container");
    }
    generateAttributes() {
        return this.generatePainel();
    }
    generateActions() {
        let conteudo;
        conteudo = `
    <div class="ui alternate stripe vertical segment">
  <div class="ui stackable  aligned grid " style="margin-bottom: 5px;"  >
    <div style="margin:0 auto !important; ">
      <div class="ui  menu inverted" >
        <a id="buttonVoiceComand" data-content="Comando de Voz" class="item">
          <i class="microphone icon"></i>
        </a>
        <a id="buttonLoop" data-content="Loop" class="item">
          <i class="refresh icon"></i>
        </a>
        <a id="buttonPlay" data-content="Play" class="item">
          <i class="play icon"></i>
        </a>
        <a id="buttonPause" data-content="Pause" class="item">
          <i class="pause icon"></i>
        </a>
        <a id="buttonStop" data-content="Stop" class="item active">
          <i class="stop icon "></i>
        </a>
        <a id="restartPanel" data-content="Recomeçar" class="item">
          <i class="file outlin icon"></i>
        </a>
        <a id="buttonUploadWav" data-content="Upload" class="item">
          <i class="upload icon"></i>
        </a>
        <a id="buttonDownload" data-content="download" class="item">
          <i class="download icon"></i>
        </a>
        <div class="right menu">
    <div id="dropdownCamadas" class="ui dropdown item">
      Camadas <i class="dropdown icon"></i>
      <div class="menu">
        <a data-value="0" class="item active">Descritor + Amplitude</a>
        <a data-value="1" class="item ">Descritor</a>
        <a data-value="2" class="item">Amplitude</a>
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
        <canvas class="canvas" width="600" height="300" id="canvas2">
        </canvas>`;
    }
    generateAlbum() {
        console.error("generate album");
        let conteudo;
        let formD = "M1095 954l0 809c-20,0 0,0 -20,0 -20,0 0,0 -20,-20 -263,-101 -546,283 -364,465 121,142 344,40 425,-101 40,-61 61,-121 61,-202 0,-223 0,-465 0,-688l748 -202c20,0 81,-20 101,-40l0 607c-40,0 -40,-40 -142,-40 -81,0 -182,61 -223,101 -20,20 -61,61 -61,101 -101,182 20,344 142,344 121,0 202,-20 283,-121 61,-61 101,-142 101,-243l0 -1052c-40,0 -465,121 -506,142l-506 142 -20 0z";
        let iconPlay = "M941 784l0 1594c0,210 398,-94 454,-126l865 -511c312,-183 18,-317 -160,-413l-864 -513c-20,-12 -295,-209 -295,-31z";
        if (this.dao.listItemBuffer.length != 0) {
            conteudo = `
        <div>
         <h3 class="ui header centered">Amostras de Áudio</h3>
         <div id="containerSoundIcons" class="ui five column grid">`;
            for (let index = 0; index < this.dao.listItemBuffer.length; index++) {
                // onclick="togle(id)" onmouseenter="playOneSound(id)" onmouseleave="stopOneSound(id)"
                conteudo += `
        <div  class="column " id="${index}div">
          <div data-id="${index}"  style="white-space:normal " class="ui segment contentIconWav">
            <svg data-id="${index}" id="${index}"  data-content="Tipo: audio/wav" data-title="SBR_LFETe...0" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" height="60px" width="60px" version="1.1" viewBox="0 0 3002 3002" xmlns:xlink="http://www.w3.org/1999/xlink" class="ui small centered image">
              <g data-id="${index}">
                <path data-id="${index}"d="${this.mouseInsideIconAlbum == index ? iconPlay : formD}"   style="fill: ${this.dao.listItemBuffer[index].color}" id="p0">
                </path>
              </g>
              ${this.idSelectedIcomAlbum == index ? `<circle style="stroke:black; stroke-width:130; fill:none" transform="matrix(0.988396 -0.151897 0.151897 0.988396 1501.05 1501.05)" r="1436" id="0circle"></circle>` : ""} 
            </svg>
            <p>
             ${this.dao.listItemBuffer[index].getReducedName()}
            </p>
          </div>
          
        </div>`;
            }
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
        $('#buttonVoiceComand').toggleClass("active");
    }
    onEndRecordModalOptions() {
        $('#buttonVoiceComandModal').toggleClass("active");
    }
    setSettingsActions() {
        $('.ui.dropdown')
            .dropdown();
        $('#dropdownCamadas')
            .dropdown({
            onChange: (value) => {
                if (value == 0) {
                    this.painel.drawDescritor = true;
                    this.painel.drawGradient = true;
                }
                if (value == 1) {
                    this.painel.drawDescritor = true;
                    this.painel.drawGradient = false;
                }
                if (value == 2) {
                    this.painel.drawDescritor = false;
                    this.painel.drawGradient = true;
                }
                this.painel.reMake();
                //console.log(" this.painel.drawGradient");
                //console.log(this.painel.drawGradient);
                //console.log("  this.painel.drawDescritor");
                //console.log(this.painel.drawDescritor);
            }
        });
        $("#dropdownCamadas").on('change', () => {
        });
        this.voiceCommandMenuBar = new VoiceMenuBar(this.tooltip, this);
        this.voiceCommandModalOptions = new VoiceModalOptions(this.tooltip, this);
        $('#buttonVoiceComand').on('click', () => {
            $('#buttonVoiceComand').toggleClass("active");
            this.voiceCommandMenuBar.startRecognition(this.onEndRecordMenuBar);
        });
        $('#restartPanel').on('click', () => {
            this.showModalRestartPanel();
        });
        $('#buttonDownload').on('click', () => {
            this.showModalDownloads();
        });
        $("#nameFile").attr("placeholder", this.dao.getDefaultName());
        $("#nameAuthor").attr("placeholder", this.dao.getDefaultAuthor());
        $('#buttonLoop').on('click', () => {
            this.sequenciador.changeLoop();
            $('#buttonLoop').toggleClass("active");
        });
        $('#buttonPlay').on('click', () => {
            this.playMixagem();
        });
        $('#buttonPause').on('click', () => {
            this.pauseMixagem();
        });
        $('#buttonStop').on('click', () => {
            this.stopMixagem();
        });
        $('#cancelModal').on('click', () => {
            $('.ui.modal').modal('hide');
        });
        $('#confirmRestartPanel').on('click', () => {
            this.sequenciador.stop(function () { });
            this.painel.restartMixing();
            this.painel.reMake();
            $('.ui.modal').modal('hide');
        });
        $('#buttonDownloadWav').on('click', () => {
            this.sequenciador.startDownload(this.closeModalDownload, $("#nameFile").val());
            // this.generateHTML();
            this.atualizaTitulo();
        });
        $('#buttonCancelarDownload').on('click', () => {
            this.closeModalDownload();
        });
        $('#buttonDownloadJson').on('click', () => {
            this.dao.downloadJSON($("#nameFile").val(), $("#nameAuthor").val());
            this.closeModalDownload();
            // this.generateHTML();
            this.atualizaTitulo();
        });
        $('#buttonDownloadJsonWav').on('click', () => {
            this.dao.downloadJSON($("#nameFile").val(), $("#nameAuthor").val());
            this.sequenciador.startDownload(this.closeModalDownload, $("#nameFile").val());
            // this.generateHTML();
            this.atualizaTitulo();
        });
        $('#buttonUploadWav').on('click', () => {
            this.sequenciador.stop(function () { });
            $("#filesWav").click();
        });
        $('#buttonInitialUploadWav').on('click', () => {
            this.sequenciador.stop(function () { });
            $("#filesWav").click();
            this.closeModalInitial();
        });
        $('#buttonJson1Cancelar').on('click', () => {
            this.closeModalJson1();
            this.backToMainModal();
        });
        $('#buttonJson2Cancelar').on('click', () => {
            this.closeModalJson2();
            this.backToMainModal();
        });
        $('#buttonJson1SelctJson').on('click', () => {
            $('#fileJSON').click();
        });
        $('#buttonJson2SelctWav').on('click', () => {
            $('#fileHomeWav').click();
        });
        $('#buttonJson3ok').on('click', () => {
            this.closeModalJson3();
            this.generateHTML();
        });
        $('#buttonJson4ok').on('click', () => {
            this.closeModalJson4();
            $("#filesWav").click();
        });
        $('#buttonInitialContinue').on('click', () => {
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
    closeModalJson2() {
        $('#modalJson2').modal('hide');
    }
    closeModalJson3() {
        $('#modalJson3').modal('hide');
    }
    closeModalJson4() {
        $('#modalJson4').modal('hide');
    }
    closeModalJson1() {
        $('#modalJson1').modal('hide');
    }
    closeModalDownload() {
        $('#downloadModal').modal('hide');
    }
    closeModalInitial() {
        $('#initialModal').modal('hide');
    }
    playMixagem() {
        this.panelReleased = false;
        this.sequenciador.play(() => {
            $('#buttonPlay').toggleClass("active");
            $('#buttonStop').removeClass("active");
            $('#buttonPause').removeClass("active");
            this.stopActived = false;
            // this.pauseActived = false;
        }, () => {
            //console.log("Terminou de executar")
            $('#buttonPlay').removeClass("active");
            if (this.stopActived) {
                $('#buttonStop').addClass("active");
                this.panelReleased = true;
            }
            if (!this.sequenciador.activePause) {
                this.panelReleased = true;
            }
        });
    }
    pauseMixagem() {
        this.panelReleased = true;
        this.sequenciador.pause(() => {
            //console.log("chamou  o cakkbacj do pause")
            $('#buttonPause').addClass("active");
            $('#buttonStop').removeClass("active");
            //this.pauseActived = true
            this.stopActived = false;
        }, () => {
            $('#buttonPause').removeClass("active");
        });
    }
    stopMixagem() {
        console.log("Painel stop");
        this.stopActived = true;
        //  this.pauseActived = false
        this.panelReleased = true;
        this.sequenciador.stop(() => {
            $('img').attr('draggable');
            $('#buttonPlay').removeClass("active");
            $('#buttonPause').removeClass("active");
            $('#buttonStop').addClass("active");
        });
    }
    //Função para gerenciar se ao clicar nos itens do album
    //se esta selecionado ou liberando os itens
    //itemOptionEnabled = true - OPções liberada
    //itemOptionEnabled = false - Inserir amostras
    generateActionsAlbum() {
        console.log("genarate actions albun");
        $('.ui.segment.contentIconWav').on('click', (e) => {
            if (this.idSelectedIcomAlbum == $(e.target).data("id")) {
                this.idSelectedIcomAlbum = undefined;
                this.itemOptionEnabled = true;
                this.painel.unselectedAlbumItem();
            }
            else {
                this.idSelectedIcomAlbum = $(e.target).data("id");
                this.itemOptionEnabled = false;
                this.painel.selectedAlbumItem();
            }
            this.renderAlbum();
        });
        $('.ui.segment.contentIconWav').on('mouseleave', () => {
            //console.log("mouse leave");
            this.sequenciador.stopOneSound();
            this.mouseInsideIconAlbum = undefined;
            this.mouseOutIconAlbum = true;
            this.tooltip.removeMessageFixed();
            this.renderAlbum();
        });
        $('.ui.segment.contentIconWav').on('mouseenter', (e) => {
            // console.log("mouse enter");
            if (this.mouseInsideIconAlbum == undefined && this.mouseOutIconAlbum && this.panelReleased) {
                // console.log("mouse enter undefined");
                this.mouseInsideIconAlbum = $(e.target).data("id");
                this.mouseOutIconAlbum = false;
                this.renderAlbum();
                this.tooltip.showMessageFixed("Executando: " + this.dao.listItemBuffer[$(e.target).data("id")].name);
                this.sequenciador.playOneSound($(e.target).data("id"), () => {
                    this.tooltip.removeMessageFixed();
                    this.mouseInsideIconAlbum = undefined;
                    this.renderAlbum();
                });
            }
        });
    }
    renderAlbum() {
        console.log("render album");
        $("#contentAlbum").html(this.generateAlbum());
        this.generateActionsAlbum();
    }
    setSettingsAttributes() {
    }
    generateHTML() {
        let conoteudoHTML = `<br>
              <h2 class="ui header centered">
                <div style=" user-select: none;"  unselectable="on" id="titulo">
                  <font color="${this.soundSphereInfo.getColorTitle()}">
                  <p id="valuetitulo"  style="-moz-user-select:none;  user-select: none;" unselectable="on">
                    ${this.soundSphereInfo.getFullName()}`;
        conoteudoHTML += this.sessionControl.getLastEventNameValid() != undefined ? " - " + this.sessionControl.getLastEventNameValid() : "";
        conoteudoHTML += `</p>
                </div>
              </h2>
       ` + this.generateAttributes() + `
       <br/>
          <div id="divActions">` + this.generateActions() + `</div> <br/>` +
            `<div id="contentAlbum">` +
            this.generateAlbum() +
            `</div>`;
        this.containerElement.html(conoteudoHTML);
        // this.divModal.modal('setting', {
        //   autofocus: false,
        //   closable: false
        // }).modal('show');
        this.generateContentOfTheModals();
        this.setSettingsActions();
        this.setSettingsAttributes();
        this.cretePainel();
    }
    reloadAlbum() {
        //     let conoteudoHTML = `<br>
        //     <h2 class="ui header centered">
        //       <div style=" user-select: none;"  unselectable="on" id="titulo">
        //         <font color="${this.soundSphereInfo.getColorTitle()}">
        //         <p id="valuetitulo"  style="-moz-user-select:none;  user-select: none;" unselectable="on">
        //           ${this.soundSphereInfo.getFullName()}`;
        //     conoteudoHTML += this.sessionControl.getLastEventNameValid() != undefined ? " - " + this.sessionControl.getLastEventNameValid() : ""
        //     conoteudoHTML += `</p>
        //       </div>
        //     </h2>
        // `+ this.generateAttributes() + `
        // <br/>
        // `+ this.generateActions() + `<br/>` +
        //       `<div id="contentAlbum">` +
        //       this.generateAlbum() +
        //       `</div">`
        //     this.containerElement.html(conoteudoHTML);
        $("#divActions").html(this.generateActions());
        $("#contentAlbum").html(this.generateAlbum());
        // this.divModal.modal('setting', {
        //   autofocus: false,
        //   closable: false
        // }).modal('show');
        this.generateContentOfTheModals();
        this.setSettingsActions();
        this.setSettingsAttributes();
        // this.cretePainel();
    }
    atualizaTitulo() {
        console.log(this.sessionControl);
        console.log(this.sessionControl.getLastEventNameValid());
        console.log("------");
        $("#valuetitulo").html(`${this.soundSphereInfo.getFullName()} ${this.sessionControl.getLastEventNameValid() != undefined ? " - " + this.sessionControl.getLastEventNameValid() : ""}`);
    }
    cretePainel() {
        let canvas = document.getElementById("canvas2");
        let contextCanvas = canvas.getContext("2d");
        let painel = new Painel(this.dao, contextCanvas, canvas, this, this.tooltip);
        this.sequenciador.painel = painel;
        this.painel = painel;
        if (this.dao.listItemBuffer.length > 0) {
            this.painel.reMake();
        }
    }
    generateContentOfTheModals() {
        this.genrateContentofModalRestartPanel();
        this.genrateContentofModalJson1();
        this.genrateContentofModalJson2();
        this.genrateContentofModalJson3();
        this.genrateContentofModalJson4();
        this.genrateContentofModalDownload();
        this.genrateContentofModalInitial();
        //this.genrateContentofModalOptions();
    }
    showModalOptions() {
        this.genrateContentofModalOptions();
        $('#modalOptions').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalInitial() {
        $('#initialModal').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalRestartPanel() {
        $('#restartModal').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalDownloads() {
        $('#downloadModal').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalJson1() {
        $('#modalJson1').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalJson2() {
        $('#modalJson2').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalJson4() {
        $('#modalJson4').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showModalJson3() {
        console.log("showModalJson3");
        $('#modalJson3').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    genrateContentofModalOptions() {
        let conteudo = `
  <div class="header">Options/Opções:</div>
  <div class="content" id="corpoModal">
    <form onsubmit="return false;" class="ui form" novalidate id="formOptions">
      <div class="column">
        <div class="ui error message"></div>
        <div class="ui grid">
          <div class="sixteen wide mobile six wide tablet four wide computer column">
            <h4 class="ui left aligned header">Geral</h4>
            <div class="ui labeled input field">
              <div id="checkSoloMute" class="ui toggle checkbox checked">
                <input type="checkbox" checked="checked" name="public">
                <label id="solo">Ativo/Solo
                  <i class="alarm icon"></i>
                </label>
              </div>
            </div>
          </div>
          <div class="sixteen wide mobile six wide tablet four wide computer column">
            <div class="field">
              <label><h3>Descritores</h3></label>
              <div class="ui item">
                <select id="select-filter" class="ui fluid  dropdown">
                `;
        if (this.itemMixOption.getidSemanticDescriptor() == undefined) {
            conteudo += `<option selected="selected" data-code="undefined" value="undefined">Nenhum</option>`;
        }
        else {
            conteudo += `<option data-code="undefined"  value="undefined">Nenhum</option>`;
        }
        this.dao.listSemanticDescriptors.forEach((element, index) => {
            if (this.itemMixOption.getidSemanticDescriptor() == index) {
                conteudo += `<option  selected="selected" data-code="${element.code}"  value="${index}" >${element.name}</option>`;
            }
            else {
                conteudo += `<option data-code="${element.code}"  value="${index}">${element.name}</option>`;
            }
        });
        conteudo +=
            `
                </select>
              </div>
            </div>
          </div>
          <div class="sixteen wide mobile six wide tablet twelve wide computer column">
            <h4 class="ui left aligned header">Tempo de:</h3>
              <div class="two fields">
                <div id="divStartTime" class="ui labeled input field">
                  <div class="ui label green">
                    Start/Inicío
                  </div>
                  <input id="startTime" value="${this.itemMixOption.startTime}" type="number">
                </div>
                <div id="divEndTime" class="ui labeled input field">
                  <div class="ui label red">
                    End/Fim
                  </div>
                  <input id="endTime" value="${this.itemMixOption.endTime}" type="number">
                </div>
              </div>
          </div>
        </div>
        <h4 class="ui left aligned header">Volume</h4>
        <div class="ui green progress" data-total="200" id="barVolume">
          <div class="bar" >
            <div class="progress"></div>
          </div>
 
        </div>
        <div class="ui centered grid">
        <div class="label">
          <div class="ui icon buttons ">
            <button id="buttonMinus" class="ui basic button">
              <i class="icon minus red"></i>
            </button>
            <button id="buttonPlus" class="ui basic button">
              <i class="icon plus green"></i>
            </button>
          </div>
        </div>
        </div>
      </div>
    </form>
  </div>
  <div class="actions">
    <div id="buttonVoiceComandModal" class="ui blue right  icon button">
    <i class="microphone icon"></i>
    </div>
    <div id="playAudioComOptions" class="ui blue right  icon button">
      Com Modificadores
    </div>
    <div id="buttonPlayAudioSemEfeito" class="ui blue right  icon button">
      Sem Modificadores
    </div>
    <div id="buttonDeleteModalOptions" class="ui red button">
      Delete
      <i class="trash icon"></i>
    </div>

    <div id="buttonCalcelModal" class="ui neutral right labeled icon button">Cancel</div>
    <div  id="buttonOkModal"class="ui blue button ">Ok</div>
  </div>

    `;
        $('#modalOptions').html(conteudo);
        this.generateSetingsOptionModal();
    }
    closeModalOptions() {
        $('#modalOptions').modal('hide');
        this.itemMixOption = undefined;
    }
    generateSetingsOptionModal() {
        $('#buttonPlayAudioSemEfeito').on('mouseleave', () => {
            this.sequenciador.stopOneSound();
        });
        $('#buttonPlayAudioSemEfeito').on('mouseenter', () => {
            this.sequenciador.playOneSound(this.itemMixOption.idBuffer, (function () { }));
        });
        $('#playAudioComOptions').on('mouseout', () => {
            //console.log("mouse out")
            this.sequenciador.stopOneSound();
        });
        $('#playAudioComOptions').on('mouseenter', () => {
            this.sequenciador.playOneSoundOption(this.itemMixOption);
        });
        $("#select-filter").on('change', (e) => {
            let selected = $(e.target).find('option:selected');
            let code = selected.data('code');
            if ($(e.target).val() == 'undefined') {
                this.itemMixOption.setIdSemanticDescriptor(undefined);
                this.itemMixOption.setCodeSemanticDescriptor(undefined);
            }
            else {
                this.itemMixOption.setIdSemanticDescriptor($(e.target).val());
                this.itemMixOption.setCodeSemanticDescriptor(code);
            }
        });
        console.log("ABRIU");
        console.log(" this.itemMixOption!.getVolume();" + this.itemMixOption.getVolume());
        $('#barVolume')
            .progress({
            label: 'ratio',
            text: {
                ratio: '{value}'
            }
        });
        $('#barVolume').progress("set progress", this.itemMixOption.getVolume());
        if (this.itemMixOption.solo) {
            $('#checkSoloMute').checkbox('check');
        }
        else {
            $('#checkSoloMute').checkbox('uncheck');
        }
        //Opções do checkbox
        $('#checkSoloMute').checkbox({
            beforeChecked: () => {
                document.getElementById("solo").innerHTML = "Ativo/Solo ";
                var i = document.createElement('i');
                i.setAttribute("class", "alarm icon");
                document.getElementById("solo").appendChild(i);
                this.itemMixOption.solo = true;
            },
            beforeUnchecked: () => {
                document.getElementById("solo").innerHTML = "Mudo/Mute ";
                var i = document.createElement('i');
                i.setAttribute("class", "alarm slash icon");
                document.getElementById("solo").appendChild(i);
                this.itemMixOption.solo = false;
            }
        });
        //Evento ao alterar o inicio
        $('#startTime').on('keyup change', () => {
            this.itemMixOption.startTime = parseFloat(String($('#startTime').val()));
            this.itemMixOption.endTime = this.itemMixOption.startTime + this.itemMixOption.seconds;
            $('#endTime').val(this.itemMixOption.startTime + this.itemMixOption.seconds);
            //console.log("startTime time p/: " + this.itemMixOption!.startTime);
            $('#formOptions').form('validate form');
        });
        //Evento ao alterar o fim
        $('#endTime').on('keyup change', () => {
            this.itemMixOption.endTime = parseFloat(String($('#endTime').val()));
            this.itemMixOption.startTime = this.itemMixOption.endTime - this.itemMixOption.seconds;
            $('#startTime').val(this.itemMixOption.endTime - this.itemMixOption.seconds);
            //console.log("end time p/: " + this.itemMixOption!.endTime);
            $('#formOptions').form('validate form');
        });
        $('#buttonVoiceComandModal').on('click', () => {
            $('#buttonVoiceComandModal').toggleClass("active");
            this.voiceCommandModalOptions.startRecognition(this.onEndRecordModalOptions);
        });
        $('#buttonCalcelModal').on('click', () => {
            this.closeModalOptions();
        });
        $('#buttonOkModal').on('click', () => {
            if ($('#formOptions').form('is valid')) {
                //console.log("Pode fechar");
                this.painel.updateItemMixPanel(this.itemMixOption);
                this.closeModalOptions();
                //painel.updateItem(this.itemMixOption);
            }
            else {
                //console.log(" n Pode fechar");
                $('#formOptions').form('validate form');
            }
        });
        $('#buttonDeleteModalOptions').on('click', () => {
            this.painel.deleteItemMixPanel(this.itemMixOption);
            this.closeModalOptions();
        });
        // $('#buttonTesteModal').on('click', () => {
        // this.sequenciador.downloadItemMixOption(this.itemMixOption!);
        // });
        $('#buttonMinus').on('click', () => {
            $('#buttonMinus').prop("disabled", true);
            $('#buttonPlus').prop("disabled", true);
            if (this.itemMixOption.getVolume() > 0) {
                $('#barVolume').progress('set duration', 0).progress('decrement', 10);
                this.itemMixOption.setVolume(this.itemMixOption.getVolume() - 10);
                //console.log("Minus this.itemMixOption!.getVolume(): " + this.itemMixOption!.getVolume());
            }
            $('#buttonMinus').prop("disabled", false);
            $('#buttonPlus').prop("disabled", false);
        });
        //Button plus
        $('#buttonPlus').on('click', () => {
            $('#buttonPlus').prop("disabled", true);
            $('#buttonMinus').prop("disabled", true);
            if (this.itemMixOption.getVolume() < 200) {
                $('#barVolume').progress('set duration', 0).progress('increment', 10);
                this.itemMixOption.setVolume(this.itemMixOption.getVolume() + 10);
                //console.log("Plus this.itemMixOption!.getVolume(): " + this.itemMixOption!.getVolume());
            }
            $('#buttonPlus').prop("disabled", false);
            $('#buttonMinus').prop("disabled", false);
        });
        $.fn.form.settings.rules.minZero = (value) => {
            if (value < 0) {
                return false;
            }
            else {
                return true;
            }
        };
        $.fn.form.settings.rules.validEnd = (value) => {
            if (value < this.itemMixOption.seconds) {
                return false;
            }
            else {
                return true;
            }
        };
        $('#formOptions').form({
            on: 'blur',
            fields: {
                startTime: {
                    identifier: 'startTime',
                    rules: [{
                            type: 'empty',
                            prompt: 'Informe o início.'
                        },
                        {
                            type: 'minZero',
                            prompt: 'O valor de início minimo é 0.'
                        }]
                },
                endTime: {
                    identifier: 'endTime',
                    rules: [{
                            type: 'empty',
                            prompt: 'Informe o fim.'
                        },
                        {
                            type: 'validEnd',
                            prompt: 'O tempo final deve ser maior ou igual ao tempo total da amostra. Tempo da amostras: ' + this.itemMixOption.seconds + '.'
                        }]
                }
            }
        });
    }
    genrateContentofModalRestartPanel() {
        let conteudoHTML = `
      <div class="header">
        Atenção!
      </div>
      <div class="content">
        <p>Você tem certeza que deseja recomeçar a mixagem?</p>
      </div>

      <div class="actions">
        <div id="cancelModal" class="ui button">
          Cancel
        </div>
        <div id="confirmRestartPanel" class="ui primary button">
         Ok
        </div>
      </div>
  `;
        $('#restartModal').html(conteudoHTML);
    }
    genrateContentofModalDownload() {
        let conteudoHTML = `
    <i class="close icon"></i>
      <div class="header">
        Opções de Download
      </div>
 
      <div class="content">
      <div class="ui form">

        <div class="field">
          <label>Nome do arquivo: </label>
          <input id="nameFile" type="text"  >
        </div>
        <div class="field">
          <label>Autor: </label>
          <input id="nameAuthor" type="text" >
        </div>
      </div>
      </div>
      <div class="actions">
        <div class="feature alternate ui stripe vertical segment">
          <div class="ui four column center aligned divided relaxed stackable grid container">
            <div class="row center">
              <div class="column">
                <div id="buttonDownloadJson" class="ui green large button">
                JSON
                </div>
              </div>
              <div class="column">
                <div id="buttonDownloadJsonWav" class="ui primary view-ui large button">
                JSON + WAV
                </div>
              </div>
              <div class="column">
                <div  id="buttonDownloadWav" class="ui orange large button">
                WAV
                </div>
              </div>
              <div class="column">
                <div  id="buttonCancelarDownload" class="ui red large button">
                Cancelar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
        $('#downloadModal').html(conteudoHTML);
    }
    genrateContentofModalInitial() {
        let conteudoHTML = `
    <div class="header">
    Bem vindo!
  </div>
  <div id="mensagem" class="content">
    <div class="feature alternate ui stripe vertical segment">
      <div class="ui two column center aligned divided relaxed stackable grid container">
        <div class="row">
        <div class="column">
        <h2 class="ui icon header">
          <i class="file outline icon"></i> Novo
        </h2>
        <p>Desejo iniciar um novo projeto.</p>
        <div id="buttonInitialUploadWav" class="ui primary view-ui large button">Iniciar</div>
      </div>
          <div class="column">
            <h2 class="ui icon header">
              <i class="upload icon"></i> Abrir
            </h2>
            <p>Quero continuar um projeto do
              <em>SoundSphere</em>.</p>
            <div id="buttonInitialContinue" class="ui green large button">Contnuar</div>
          </div> 
        </div>
      </div>
    </div>
  </div>
  `;
        $('#initialModal').html(conteudoHTML);
    }
    genrateContentofModalJson2() {
        let conteudoHTML = `
    <div class="ui ordered top attached steps">
    <div class="completed step">
      <div class="content">
        <div class="title">JSON</div>
      </div>
    </div>
    <div class="active step">
      <div class="content">
        <div class="title">Amostras</div>
      </div>
    </div>
    <div class=" step">
      <div class="content">
        <div class="title">Informações</div>
      </div>
    </div>
  </div>
  <div class="content">
    <div id="errorMessageJson2"> </div>
    <p id="mensagemModalJson2"></p>
    <div id="filesRequireJSON" class="ui two column grid">
      
    </div>
  </div>
  <div class="actions">
    <div id="buttonJson2Cancelar" class="ui red button">Cancelar</div>
    <div id="buttonJson2SelctWav"  class="ui green button">Selecionar</div>
  </div>
  `;
        $('#modalJson2').html(conteudoHTML);
    }
    showMessageJson2(mensagemPrincipal, listaRequire) {
        $('#mensagemModalJson2').html(mensagemPrincipal);
        let contetesteudo = ``;
        for (let index = 0; index < listaRequire.length; index++) {
            contetesteudo += `
        <div class="column">
        <div class="ui bulleted list">
          <div class="item">${listaRequire[index]}</div>
        </div>
      </div>
        `;
        }
        $('#filesRequireJSON').html(contetesteudo);
        this.nextStepJson1To2();
    }
    genrateContentofModalJson3() {
        console.log("genrateContentofModalJson3 ");
        let conteudoHTML = `
    <div class="ui ordered top attached steps">
    <div class="completed step">
      <div class="content">
        <div class="title">JSON</div>
      </div>
    </div>
    <div class="completed step">
      <div class="content">
        <div class="title">Amostras</div>
      </div>
    </div>
    <div class=" active step">
      <div class="content">
        <div class="title">Informações</div>
      </div>
    </div>
  </div>
  <div class="content">
    <div id="errorMessageJson3"> </div>
    <div>Clique em OK, para iniciar.</div>
  </div>
  <div class="actions">
    <div id="buttonJson3ok"  class="ui green button">OK</div>
  </div>
    
  `;
        $('#modalJson3').html(conteudoHTML);
    }
    genrateContentofModalJson4() {
        console.log("genrateContentofModalJson3 ");
        let conteudoHTML = `
    <div class="ui ordered top attached steps">
    <div class="completed step">
      <div class="content">
        <div class="title">JSON</div>
      </div>
    </div>
    <div class="completed step">
      <div class="content">
        <div class="title">Amostras</div>
      </div>
    </div>
    <div class=" active step">
      <div class="content">
        <div class="title">Informações</div>
      </div>
    </div>
  </div>
  <div class="content">
    <div id="errorMessageJson3"> </div>
    <div>Vocë carregou um arquivo JSON que contem apenas Descritores Semanticos, clique em carregar fazer o upload dos arquivos WAV que deseja utilizar.</div>
  </div>
  <div class="actions">
    <div id="buttonJson4ok"  class="ui green button">Carregar</div>
  </div>
    
  `;
        $('#modalJson4').html(conteudoHTML);
    }
    genrateContentofModalJson1() {
        let conteudoHTML = `
    <div class="ui ordered top attached steps">
    <div class="active step">
      <div class="content">
        <div class="title">JSON</div>
      </div>
    </div>
    <div class=" step">
      <div class="content">
        <div class="title">Amostras</div>
      </div>
    </div>
    <div class=" step">
      <div class="content">
        <div class="title">Informações</div>
      </div>
    </div>
  </div>
  <div class="content">
    <div id="errorMessageJson1"></div>
    <div> Selecione o arquivo JSON gerado pelo SoundSphere que você deseja dar continuidade.</div>
  </div>
  <div class="actions">

    <div  id="buttonJson1Cancelar" class="ui red button">Cancelar</div>
    <div id="buttonJson1SelctJson" class="ui green button">Selecionar</div>
  </div>
  `;
        $('#modalJson1').html(conteudoHTML);
    }
    setSemanticDescriptor(id) {
        this.itemMixOption.setIdSemanticDescriptor(id);
        let selected = $("#select-filter").find('option:selected');
        let code = selected.data('code');
        this.itemMixOption.setCodeSemanticDescriptor(code);
    }
    showErrorMessageJson1(mensagem) {
        const conteudo = `
    <div class="ui error message">
      </i>
      <div class="header">
       Atenção!
      </div>
      <p>
      ${mensagem}
      </p>
    </div>
    `;
        $('#errorMessageJson1').html(conteudo);
    }
    showErrorMessageJson2(listMensagens) {
        let conteudo = `
    <div class="ui error message">
      </i>
      <div class="header">
       Atenção!
      </div>`;
        for (let index = 0; index < listMensagens.length; index++) {
            conteudo += `<p> ${listMensagens[index]}</p>`;
        }
        conteudo += ` 
    </div>
    `;
        $('#errorMessageJson2').html(conteudo);
    }
    showErrorMessageJson3(listMensagens) {
        let conteudo = `
    <div class="ui error message">
      </i>
      <div class="header">
       Atenção!
      </div>`;
        for (let index = 0; index < listMensagens.length; index++) {
            conteudo += `<p> ${listMensagens[index]}</p>`;
        }
        conteudo += ` 
    </div>
    `;
        $('#errorMessageJson3').html(conteudo);
    }
}
