class PageAdminDescriptors extends SimplePage {
  newFilterModal: Filter | undefined = undefined;
  positionDescriptorSelected: number = 0;
  idFilterSelected: number = 0;
  positionPreviousDescriptorSelected: number = 0;
  controlSelectedItemBuffer: number = 0;
  controlFilters: ControlFilters;

  constructor(containerElement: JQuery, titulo: string, soundSphereInfo: SoundSphereInfo, sequenciador: Sequenciador, dao: DAO) {
    super(containerElement, titulo, soundSphereInfo, dao, sequenciador)
    this.controlFilters = new ControlFilters();
    this.startTemplate()
    this.generateHTML()



  }
  render(): void {
    if (this.dao.listItemBuffer.length > 0) {
      $('#nameFileWav').html(`<i class="music icon"></i> ${this.dao.listItemBuffer[this.controlSelectedItemBuffer].name}`);
    }
    $('#uiForm').html(this.generateAttributes());
    this.setSettingsAttributes();
  }
  getNameClass(): string {
    return "PageAdminDescriptors"
  }

  //Toda vez que a pagina prcisa ser recarregada é chamado 
  startTemplate() {
    this.containerElement.addClass("simpleTheme  ");
    this.containerElement.addClass("container");
    this.containerElement.addClass("admin");
  }
  generateAttributes() {
    // console.log("teste genera ste")
    // console.log(this.dao.listSemanticDescriptors);
    let filter = this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getFilters();
    let conteudo = `
        <div class="three fields">   
          <div class="field"></div>
          <div class="field">
            <label><h3>Descritores</h3></label>
            <div class="ui item">
              <select id="select-descriptor" class="ui fluid  dropdown">
           `;
    this.dao.listSemanticDescriptors.forEach((element, index) => {
      if (this.positionDescriptorSelected == index) {
        conteudo += `<option selected="selected"  value="${index}">${element.name}</option>`
      } else {
        conteudo += `<option  value="${index}">${element.name}</option>`
      }
    });
    conteudo +=
      `
              </select>
            </div>
          </div>
          <div class="field">
          <label><h3 style="color:white">.</h3></label>
            <button id="buttonNewFilter" class="ui  button">
        
              Adicionar Filtro
            </button>
          </div>
        </div>`;
    filter.forEach((element, index) => {

      conteudo += `
          <div class="contentFilter ui stacked   segment" id="container${index}" data-order="${index}" data-id="container${index}">
    
      <div style="margin-bottom:1px" class="ui  header">
    
        <span id="span1${element.type}${index}" ${element.status != true ? `class="span1Line" ` : ""}>
    
          <span ${element.status != true ? `class="span2Line" ` : ""} id="span2${element.type}${index}">${index} - ${element.name}</span>
        </span>
     
        <div class="mini ui buttons">
          <button data-value="${index}" class="mini ui positive ${index == 0 ? " disabled " : " "} button">
            <i  data-value="${index}" class="angle up icon"></i>
          </button>
          <div class="or" data-text="ou"></div>
          <button data-value="${index}" class="mini ui orange ${index == (this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getLenght() - 1) ?
          "disabled " : " "}  button down">
            <i  data-value="${index}" class="angle down icon"></i>
          </button>
        </div>
        <button data-value="${index}"  id="remove${index}" class="ui compact button red">
          <i  data-value="${index}" class="trash icon " style="margin-right:0px; margin-left:0px"></i>
        </button>
        <div class="ui labeled input field">
          <div data-type="${element.type}${index}" id="divCheck${element.type}${index}" class="ui toggle checkbox ${element.status == true ? `checked` : ""}">
            <input data-type="${element.type}${index}" id="status${element.type}${index}" ${element.status == true ? `checked="checked" ` : ""} type="checkbox">
            <label class="labelCheck" for="status${element.type}${index}"> ${element.status == true ? `ativado` : "desativado"}
            </label>
          </div>
        </div>
      </div>
      <div class="three fields">
        ${element.frequency !== undefined ? `
        <div class="field">
          <label>Frequency</label>
          <input id="frequency${element.type}${index}" value="${element.frequency}" type="number" min="1" max="24000" ${element.status == true
            ? "" : "disabled"}/>
        </div>`: ""}
         ${element.Q !== undefined ? `
        <div class="field">
          <label>Q</label>
          <input id="Q${element.type}${index}" value="${element.Q}" type="number" min="1" max="24000" ${element.status == true ? "" :
            "disabled"} />
        </div>`: ""} ${element.gain !== undefined ? `
        <div class="field">
          <label>Ganho</label>
          <input id="gain${element.type}${index}" value="${element.gain}" type="number" min="1" max="24000" ${element.status == true ? "" :
            "disabled"} />
        </div>`: ""}
      </div>
    </div>`
    });
    return conteudo;
  }
  generateActions() {
    const conteudo = `
        ${this.dao.listItemBuffer.length == 0 ?
        "" : `
            <div class="ui divider"></div>
            <div style="margin-bottom: 5px" class="ui one column centered grid">
              <div style="padding-bottom: 3px" class="row">
                <div class="ui center aligned icon ">
                 
                  <div id="nameFileWav">
                  <i class="music icon"></i>
                  ${this.dao.listItemBuffer[this.controlSelectedItemBuffer].name}
                  </div>
                
                </div>
              </div>
              <div style="padding-top: 3px; padding-bottom:0px" class=" row ">
               <button id="buttonPlayFilter"  class="ui green button ">
                  Com filtro
                </button>
                <button id="buttonPlay"  class="ui green button ">
                  Sem filtro
                </button>
                <button id="buttonChangeWav" class="ui yellow right labeled
                icon button ">
                  <i class="chevron right icon "></i>
                  Mudar Amostra
                </button>
              </div>
            </div>
            `
      }
          <div class="ui divider"></div>
          <div style="margin-bottom: 5px" class="ui one column centered grid">
            <div class="row">
              <button id="buttonUploadWav" class="ui blue right labeled icon button">
                <i class="upload icon"></i>
                Upload Wav
              </button>
              <button id="buttonUploadJson"  class="ui blue right labeled icon button">
                <i class="upload icon"></i>
                Upload JSON
              </button>
              <button id="buttonDownloadJson" class="ui green right labeled icon button">
                <i class="download icon"></i>
                Download JSON
              </button>
            </div>
          </div>
       `;
    return conteudo;

  }
  setSettingsActions() {
    //Set configurations of Actions


    $('#buttonUploadWav').on('click', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      $('#filesWav').click();
    });
    $('#buttonUploadJson').on('click', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      $('#fileJSON').click();
    });
    $('#buttonDownloadJson').on('click', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      this.dao.downloadJSON();
    });
    $('#buttonPlayFilter').on('mouseout', (e: JQueryEventObject) => {
      this.sequenciador.stopOneSound()
    });
    $('#buttonPlayFilter').on('mouseover', (e: JQueryEventObject) => {
      this.setAttributesFilter();
     // console.log("PageSoundSphereHome  play")
      this.sequenciador.playOneSoundDescitor(this.controlSelectedItemBuffer, function () { }, this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getFilters());
    });
    $('#buttonPlay').on('mouseout', (e: JQueryEventObject) => {
      this.sequenciador.stopOneSound()
    });
    $('#buttonPlay').on('mouseover', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      this.sequenciador.playOneSound(this.controlSelectedItemBuffer, (function () { }))
    });
    $('#buttonChangeWav').on('click', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      this.nextItemBuffer();
      this.render()
    });


  }
  setSettingsAttributes() {
    document.body.addEventListener('animationend', removeElement);
    document.body.addEventListener('webkitAnimationEnd', removeElement);
    $('.ui.compact.button.red').on('click', (e: JQueryEventObject) => {
      $(e.target).closest('[data-id]').addClass("removed");
      setTimeout(() => {
        this.setAttributesFilter();
     //   console.log("Id a ser removido: " + $(e.target).data("value"));


        this.dao.listSemanticDescriptors[this.positionDescriptorSelected].removeFilter($(e.target).data("value"), () => { this.render() });
      }, 800);
    });
    $('.button.positive').on('click', (e: JQueryEventObject) => {
      $(e.target).closest('[data-id]').addClass("subir comando");
      $(`#container${$(e.target).closest('[data-id]').data("order") - 1}`).addClass("descer");
      setTimeout(() => {
        this.setAttributesFilter();

        // console.log("Position positionDescriptorSelected")
        // console.log(this.positionDescriptorSelected)
        // console.log(`($(e.target).data("value")`)
        // console.log($(e.target).data('value'));
        this.dao.listSemanticDescriptors[this.positionDescriptorSelected].upFilter($(e.target).data("value"), () => { this.render() });
      }, 500);
    });


    $('.button.down').on('click', (e: JQueryEventObject) => {

      $(e.target).closest('[data-id]').addClass("descer comando");
      $(`#container${$(e.target).closest('[data-id]').data("order") + 1}`).addClass("subir");
      setTimeout(() => {
        this.setAttributesFilter();
        this.dao.listSemanticDescriptors[this.positionDescriptorSelected].downFilter($(e.target).data("value"), () => { this.render() });
      }, 500);
    });
    (<any>$('.ui.checkbox')).checkbox({
      beforeChecked: function () {
        $("label[for='" + $(this).attr('id') + "']").html("Ativado");
        $(`#span1${$(this).data("type")}`).removeClass('span1Line');
        $(`#span2${$(this).data("type")}`).removeClass('span2Line');
        $(`#frequency${$(this).data("type")}`).prop("disabled", false);
        $(`#Q${$(this).data("type")}`).prop("disabled", false);
        $(`#gain${$(this).data("type")}`).prop("disabled", false);
      },
      beforeUnchecked: function () {
        $(`#span1${$(this).data("type")}`).addClass('span1Line');
        $(`#span2${$(this).data("type")}`).addClass('span2Line');
        $("label[for='" + $(this).attr('id') + "']").html("Desativado");
        $(`#frequency${$(this).data("type")}`).prop("disabled", true);
        $(`#Q${$(this).data("type")}`).prop("disabled", true);
        $(`#gain${$(this).data("type")}`).prop("disabled", true);
      }
    });

    $("#select-descriptor").on('focus', (e: JQueryEventObject) => {
      this.positionPreviousDescriptorSelected = <number>$(e.target).val();
    });
    $("#select-descriptor").on('change', (e: JQueryEventObject) => {
      this.setAttributesFilter();
      this.positionDescriptorSelected = <number>$(e.target).val();
      this.render();
      this.positionPreviousDescriptorSelected = <number>$(e.target).val();
    });

    $('#buttonNewFilter').on('click', (e: JQueryEventObject) => {
      // console.log("teste")
      this.newFilterModal= undefined;
      this.genrateContentofModalNewFilter()
    });

  }
  renderAddFilter(): void {
    // console.log("Filter selecionado" + this.idFilterSelected)
    $("#contentAddFilter").html(this.generateHTMLFilter());
  }
  genrateContentofModalNewFilter() {





    let conteudo =
      `
<div class="header">Inserir Filtro</div>
<div class="content" id="corpoModal">
  <form onsubmit="return false;" class="ui form" novalidate id="formOptions">
  `
    conteudo += `
  <div class="three fields">   
    <div class="field"></div>
    <div class="field">
      <label><h3>Filtros</h3></label>
      <div class="ui item">
        <select id="select-AddFilter" class="ui fluid  dropdown">
     `;
    this.controlFilters.getfilters().forEach((element, index) => {
      if (this.idFilterSelected == index) {
        conteudo += `<option selected="selected"  value="${index}">${element.name}</option>`
      } else {
        conteudo += `<option  value="${index}">${element.name}</option>`
      }
    });
    conteudo +=
      `
        </select>
      </div>
    </div>
  </div>`
    //Filtro selecionado

    conteudo += `
   <div id="contentAddFilter">`
    conteudo += this.generateHTMLFilter();
    conteudo += `</div>`


    conteudo += `
    
  </form>
</div>
<div class="actions">



  <div id="buttonCancelNewFilter" class="ui neutral right labeled icon button">Cancelar</div>
  <div  id="buttonSaveNewFilter"class="ui blue button ">Salvar</div>
</div>

  `
    $('#modalNewFilter').html(conteudo);
    this.generateSetingsModalNewFilter();

  }
  closeModalNewFilter() {
    this.idFilterSelected = 0;
    this.newFilterModal = undefined;
    $('#modalNewFilter').modal('hide');
    this.render()
  }
  generateSetingsModalNewFilter() {
    $('#modalNewFilter').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    $("#select-AddFilter").on('change', (e: JQueryEventObject) => {
      this.idFilterSelected = <number>$(e.target).val();
      this.renderAddFilter();
    });
    $('#buttonCancelNewFilter').on('click', (e: JQueryEventObject) => {
      this.closeModalNewFilter();
    });
    $('#buttonSaveNewFilter').on('click', (e: JQueryEventObject) => {
      this.addFilter();
      this.closeModalNewFilter();
    });

  }
  addFilter() {
    // console.log("Add filter page admin")
    // console.log(this.dao.listSemanticDescriptors[this.positionDescriptorSelected])
    if (this.newFilterModal!.frequency !== undefined) {

      // console.log("<number>$(`#addFrequency${this.newFilterModal!.type}`).val()")
      // console.log(<number>$(`#addFrequency${this.newFilterModal!.type}`).val())
      this.newFilterModal!.frequency = <number>$(`#addFrequency${this.newFilterModal!.type}`).val()
    }
    if (this.newFilterModal!.Q !== undefined) {
      this.newFilterModal!.Q = <number>$(`#addQ${this.newFilterModal!.type}`).val()
    }
    if (this.newFilterModal!.gain !== undefined) {
      this.newFilterModal!.gain = <number>$(`#addGain${this.newFilterModal!.type}`).val()
    }
    this.dao.listSemanticDescriptors[this.positionDescriptorSelected].addFilter(this.newFilterModal!);

  }
  setAttributesFilter(): void {
    let filter: Filter[] = this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getFilters();
    filter.forEach((element,index) => {
      // console.log("`#frequency${element.type}${index}`")
      // console.log(`#frequency${element.type}${index}`)
      if (element.frequency!=undefined) {
        element.frequency = <number>$(`#frequency${element.type}${index}`).val()
      }
      if (element.Q!=undefined) {
        element.Q = <number>$(`#Q${element.type}${index}`).val()
      }
      if (element.gain!=undefined) {
        element.gain = <number>$(`#gain${element.type}${index}`).val()
      }
      element.status = $(`#divCheck${element.type}${index}`).hasClass("checked")
    });
  }
  //Função para pular para a proxima musica
  nextItemBuffer(): void {
    if (this.controlSelectedItemBuffer < (this.dao.listItemBuffer.length - 1)) {
      this.controlSelectedItemBuffer += 1;
    } else {
      this.controlSelectedItemBuffer = 0;
    }
  }
  generateHTMLFilter() {
    this.newFilterModal = this.controlFilters.getFilter(this.idFilterSelected);

    // console.log("generateHTMLFilter" + this.newFilterModal.name)
    let conteudo = `<div class="three fields">
    ${ this.newFilterModal.frequency !== undefined ? `
 
    <div class="field">
      <label>Frequency</label>
      <input id="addFrequency${this.newFilterModal.type}" value="${this.newFilterModal.frequency}" type="number" min="1" max="24000" ${this.newFilterModal.status == true
          ? "" : "disabled"}/>
    </div>`: ""} ${this.newFilterModal.Q !== undefined ? `
    <div class="field">
      <label>Q</label>
      <input id="addQ${this.newFilterModal.type}" value="${this.newFilterModal.Q}" type="number" min="1" max="24000" ${this.newFilterModal.status == true ? "" :
          "disabled"} />
    </div>`: ""} ${this.newFilterModal.gain !== undefined ? `
    <div class="field">
      <label>Ganho</label>
      <input id="addGain${this.newFilterModal.type}" value="${this.newFilterModal.gain}" type="number" min="1" max="24000" ${this.newFilterModal.status == true ? "" :
          "disabled"} />
    </div>`: ""}
  </div>`
    return conteudo;
  }
  renderChangeSemanticDescriptors(): void {
    this.positionDescriptorSelected = 0;
    this.render();
  }
  generateHTML(): void {
    let conteudoModal =
      // `<div class="header">${this.titulo}</div>
      `
    <br>
          <h2 class="ui header centered">
            <div id="titulo">
              <font color="${this.soundSphereInfo.getColorTitle()}">
                ${this.soundSphereInfo.getFullName()} -${this.titulo}
            </div>
          </h2>
    <div class="content aparecer"  id="corpoModal">
      <div onsubmit="return false;" class="ui form"  id="formOptions">
        <div class="ui error message"></div>
        <div id="uiForm" class="ui form">`+ this.generateAttributes() + `
        </div>
      </div>
    </div>
    </div>
    
      `+ this.generateActions() + `
    
    </div>
    
    `;
    this.containerElement.html(conteudoModal);
    // this.divModal.modal('setting', {
    //   autofocus: false,
    //   closable: false
    // }).modal('show');
    this.setSettingsActions();
    this.setSettingsAttributes();
  }


}
//Função que ajuda na animação de remoção de item, chamada ante do drender
function removeElement(event: any) {
  if (event.animationName === 'disapear') {
    event.target.parentNode.removeChild(event.target);
  }
}
