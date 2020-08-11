"use strict";
class PageSoundSphereHome extends SimplePage {
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
        //pauseActived = false
        this.itemMixOption = undefined;
        this.itemOptionEnabled = true;
        this.idSelectedIcomAlbum = undefined;
        this.mouseInsideIconAlbum = undefined;
        // this.canvas = canvas;
        // this.contextCanvas = contextCanvas;
        this.pixelpersecond = pixelpersecond;
        this.tooltip = tooltip;
        this.sessionControl = sessionControl;
        this.startTemplate();
        this.generateHTML();
        this.showModalInitial();
        this.loadDescriptiveIcons();
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
        this.idSelectedIcomAlbum = undefined;
        this.disableItemOption();
        $('.itemMenuAmostra').children('i.black').toggleClass('black white');
    }
    disableMenuDescriptiveIcon() {
        this.descriptiveIcon = undefined;
        $('.itemMenuDescriptiveIcon.itemMenuDescriptiveIconSelected').removeClass('itemMenuDescriptiveIconSelected');
    }
    disableMainenu() {
        //Por conta do callback ele verifica antes se ainda precisa desativar o itemoption
        if (this.descriptiveIcon == undefined && this.idSelectedIcomAlbum == undefined) {
            this.enableItemOption();
        }
    }
    loadDescriptiveIcons() {
        this.listDescriptiveIcons.push(new DescriptiveIcon(0, "img/icons/agua.png", "Agua", "agua"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(1, "img/icons/agua_vazio.png", "Agua vazio", "agua_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(2, "img/icons/cafe.png", "Café", "cafe"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(3, "img/icons/cafe_vazio.png", "Café vazio", "cafe_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(4, "img/icons/laranja.png", "Laranja", "laranja"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(5, "img/icons/laranja_vazio.png", "Laranja vazio", "laranja_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(6, "img/icons/limao.png", "Limão", "limao"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(7, "img/icons/limao_vazio.png", "Limão vazio", "limao_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(8, "img/icons/maca.png", "Maçã", "maca"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(9, "img/icons/maca_vazio.png", "Maçã vazio", "maca_vazio"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(10, "img/icons/tomate.png", "Tomate", "tomate"));
        this.listDescriptiveIcons.push(new DescriptiveIcon(11, "img/icons/tomate_vazio.png", "tomate vazio", "tomate_vazio"));
    }
    getImgDescriptiveIcon(tag) {
        for (let index = 0; index < this.listDescriptiveIcons.length; index++) {
            if (tag == this.listDescriptiveIcons[index].tag) {
                return this.listDescriptiveIcons[index].img;
            }
        }
        return '';
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
        let conteudo;
        if (this.dao.listItemBuffer.length != 0) {
            conteudo = `
        <div>
         
         <div id="containerSoundIcons"style="width: 590px; margin: 0 auto" class="scrollmenu">`;
            for (let index = 0; index < this.dao.listItemBuffer.length; index++) {
                // onclick="togle(id)" onmouseenter="playOneSound(id)" onmouseleave="stopOneSound(id)"
                conteudo += `
        <a  data-html="<b>${this.dao.listItemBuffer[index].name}</b> </br> ${this.painel.sec2time(this.dao.listItemBuffer[index].timeDuration)}"  class="itemMenuAmostra" data-id="${index}"  style=" width:50px; background-color: ${this.dao.listItemBuffer[index].color} "; width:50px" id="path${index}"><i class="icon square"></i></a>
        `;
            }
            conteudo += `
      </div>
      <div id="containerDescriptiveIcons"style="width: 590px; margin: 0 auto" class="scrollmenu">`;
            for (let index = 0; index < this.listDescriptiveIcons.length; index++) {
                // onclick="togle(id)" onmouseenter="playOneSound(id)" onmouseleave="stopOneSound(id)"
                conteudo += `
        <a  style="padding:6px!important;" data-html=" ${this.listDescriptiveIcons[index].name}"  class="itemMenuDescriptiveIcon" data-tag="${this.listDescriptiveIcons[index].tag}" data-id="${index}"><img style="width:40px; height:40px;" src="${this.listDescriptiveIcons[index].url}">	</a>
        `;
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
            .dropdown({
            direction: 'downward'
        });
        $('#dropdownCamadas')
            .dropdown({
            direction: 'downward',
            onChange: (value) => {
                if (value == 0) {
                    this.painel.drawDescritor = true;
                    this.painel.drawGradient = true;
                }
                else if (value == 1) {
                    this.painel.drawDescritor = true;
                    this.painel.drawGradient = false;
                }
                else {
                    this.painel.drawDescritor = false;
                    this.painel.drawGradient = true;
                }
                this.painel.reMake();
            }
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
        $('#buttonRemove').on('click', () => {
            this.buttonRemoveStatus = !this.buttonRemoveStatus;
            //Para a mixagem caso esteja executando
            this.stopTrash();
            //Remove a seleção dos demais botões
            $('#buttonPlay').removeClass("active");
            $('#buttonPause').removeClass("active");
            //Desabilita o painel;
            if (this.buttonRemoveStatus) {
                $('#buttonRemove').addClass("active");
                this.painel.setCursorTrash();
                this.disableAlbum();
                this.disableMenuDescriptiveIcon();
            }
            else {
                $('#buttonRemove').removeClass("active");
                this.painel.unsetCursorTrash();
                this.disableMainenu();
            }
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
            this.reloadAlbum();
            this.painel.reMake();
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
        this.buttonRemoveStatus = false;
        this.disableAlbum();
        this.disableMenuDescriptiveIcon();
        this.disableButtonTrash();
        this.sequenciador.play(() => {
            $('#buttonPlay').toggleClass("active");
            $('#buttonStop').removeClass("active");
            $('#buttonRemove').removeClass("active");
            $('#buttonPause').removeClass("active");
            this.stopActived = false;
            // this.pauseActived = false;
        }, () => {
            //console.log("Terminou de executar")
            $('#buttonPlay').removeClass("active");
            if (this.stopActived) {
                $('#buttonStop').addClass("active");
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
            $('#buttonRemove').removeClass("active");
            $('#buttonPause').addClass("active");
            $('#buttonStop').removeClass("active");
            //this.pauseActived = true
            this.stopActived = false;
        }, () => {
            this.disableMainenu();
            $('#buttonPause').removeClass("active");
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
            $('#buttonPlay').removeClass("active");
            $('#buttonRemove').removeClass("active");
            $('#buttonPause').removeClass("active");
            $('#buttonStop').addClass("active");
        });
    }
    stopStandard() {
        this.sequenciador.stop(() => {
            // $('img').attr('draggable');
            $('#buttonPlay').removeClass("active");
            $('#buttonRemove').removeClass("active");
            $('#buttonPause').removeClass("active");
            $('#buttonStop').addClass("active");
        });
    }
    stopTrash() {
        this.sequenciador.stopSimple(() => {
            // $('img').attr('draggable');
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
        $('.itemMenuAmostra')
            .popup({
            on: 'hover'
        });
        $('.itemMenuDescriptiveIcon')
            .popup({
            on: 'hover'
        });
        $('.mainmenu')
            .popup({
            on: 'hover'
        });
        $(".itemMenuAmostra").on('mouseenter', (e) => {
            $(e.currentTarget).children('i').toggleClass('square play');
            if (this.mouseInsideIconAlbum == undefined) {
                this.mouseInsideIconAlbum = $(e.target).data("id");
                this.tooltip.showMessageFixedId("Executando: " + this.dao.listItemBuffer[$(e.currentTarget).data("id")].name, $(e.currentTarget).data("id"));
                this.sequenciador.playOneSound($(e.target).data("id"), () => {
                    this.tooltip.removeMessageFixedId($(e.currentTarget).data("id"));
                    this.mouseInsideIconAlbum = undefined;
                    $(e.currentTarget).children('i.play').toggleClass('play square');
                });
            }
        });
        $(".itemMenuAmostra").on('mouseleave', (e) => {
            this.sequenciador.stopOneSound();
            this.mouseInsideIconAlbum = undefined;
            this.tooltip.removeMessageFixedId($(e.currentTarget).data("id"));
            $(e.currentTarget).children('i.play').toggleClass('play square');
        });
        $(".itemMenuAmostra").on('click', (e) => {
            if (this.descriptiveIcon) {
                this.disableMenuDescriptiveIcon();
            }
            else if (this.buttonRemoveStatus) {
                this.disableButtonTrash();
            }
            this.stopSimple();
            $("a.itemMenuAmostra").children('i.black').toggleClass('black white');
            if (this.idSelectedIcomAlbum == $(e.currentTarget).data("id")) {
                this.idSelectedIcomAlbum = undefined;
                this.enableItemOption();
            }
            else {
                $(e.currentTarget).children('i').toggleClass('white black');
                this.idSelectedIcomAlbum = $(e.currentTarget).data("id");
                console.log("CHAMOU O DISABLE ITEM");
                this.disableItemOption();
            }
        });
        $(".itemMenuDescriptiveIcon").on('click', (e) => {
            if (this.idSelectedIcomAlbum) {
                this.disableAlbum();
            }
            else if (this.buttonRemoveStatus) {
                this.disableButtonTrash();
            }
            this.stopSimple();
            $(".itemMenuDescriptiveIcon").removeClass('itemMenuDescriptiveIconSelected');
            if (this.descriptiveIcon == $(e.currentTarget).data("tag")) {
                $(e.currentTarget).removeClass('itemMenuDescriptiveIconSelected');
                this.descriptiveIcon = undefined;
                this.enableItemOption();
            }
            else {
                $(e.currentTarget).addClass('itemMenuDescriptiveIconSelected');
                this.descriptiveIcon = $(e.currentTarget).data("tag");
                this.disableItemOption();
            }
        });
    }
    disableButtonTrash() {
        this.buttonRemoveStatus = false;
        $('#buttonRemove').removeClass("active");
        this.painel.unsetCursorTrash();
    }
    renderAlbum() {
        // console.log("render album")
        // $("#contentAlbum").html(this.generateAlbum());
        // this.generateActionsAlbum();
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
        this.generateContentOfTheModals();
        this.setSettingsActions();
        this.setSettingsAttributes();
    }
    reloadAlbum() {
        $("#divActions").html(this.generateActions());
        $("#contentAlbum").html(this.generateAlbum());
        this.generateContentOfTheModals();
        this.setSettingsActions();
        this.setSettingsAttributes();
    }
    atualizaTitulo() {
        console.log(this.sessionControl);
        console.log(this.sessionControl.getLastEventNameValid());
        console.log("------");
        $("#valuetitulo").html(`${this.soundSphereInfo.getFullName()} ${this.sessionControl.getLastEventNameValid() != undefined ? " - " + this.sessionControl.getLastEventNameValid() : ""}`);
    }
    generateContentOfTheModals() {
        this.genrateContentofModalRestartPanel();
        this.genrateContentofModalJson1();
        this.genrateContentofModalJson2();
        this.genrateContentofModalJson3();
        this.genrateContentofModalJson4();
        this.genrateContentofModalDownload();
        this.genrateContentofModalInitial();
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
    <div  id="buttonOkModal"class="ui blue button ">Salvar</div>
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
        <p>Reiniciar a mixagem?</p>
      </div>

      <div class="actions">
        <div id="cancelModal" class="ui button">
          Cancel
        </div>
        <div id="confirmRestartPanel" class="ui primary button">
         Confirmar
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
          <label>Arquivo: </label>
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
                JSON + WAVE
                </div>
              </div>
              <div class="column">
                <div  id="buttonDownloadWav" class="ui orange large button">
                WAVE
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
            <div id="buttonInitialContinue" class="ui green large button">Continuar</div>
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
        // console.log("genrateContentofModalJson3 ")
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
        // console.log("genrateContentofModalJson3 ")
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
