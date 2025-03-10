"use strict";
class PageAdminDescriptors extends SimplePage {
    constructor(containerElement, titulo, soundSphereInfo, sequenciador, dao) {
        super(containerElement, titulo, soundSphereInfo, dao, sequenciador);
        this.newFilterModal = undefined;
        this.positionDescriptorSelected = 0;
        this.idFilterSelected = 0;
        this.positionPreviousDescriptorSelected = 0;
        this.controlSelectedItemBuffer = 0;
        this.controlFilters = new ControlFilters();
        this.startTemplate();
        this.generateHTML();
    }
    render() {
        if (this.dao.listItemBuffer.length > 0) {
            document
                .getElementById("nameFileWav")
                .html(`<i class="music icon"></i> ${this.dao.listItemBuffer[this.controlSelectedItemBuffer].name}`);
        }
        document.getElementById("uiForm").html(this.generateAttributes());
        this.setSettingsAttributes();
    }
    getNameClass() {
        return "PageAdminDescriptors";
    }
    //Toda vez que a pagina prcisa ser recarregada é chamado
    startTemplate() {
        this.containerElement.classList.add("simpleTheme  ");
        this.containerElement.classList.add("container");
        this.containerElement.classList.add("admin");
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
                conteudo += `<option selected="selected"  value="${index}">${element.name}</option>`;
            }
            else {
                conteudo += `<option  value="${index}">${element.name}</option>`;
            }
        });
        conteudo += `
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
          <button data-value="${index}" class="mini ui orange ${index ==
                this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getLenght() -
                    1
                ? "disabled "
                : " "}  button down">
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
        ${element.frequency !== undefined
                ? `
        <div class="field">
          <label>Frequency</label>
          <input id="frequency${element.type}${index}" value="${element.frequency}" type="number" min="1" max="24000" ${element.status == true ? "" : "disabled"}/>
        </div>`
                : ""}
         ${element.Q !== undefined
                ? `
        <div class="field">
          <label>Q</label>
          <input id="Q${element.type}${index}" value="${element.Q}" type="number" min="1" max="24000" ${element.status == true ? "" : "disabled"} />
        </div>`
                : ""} ${element.gain !== undefined
                ? `
        <div class="field">
          <label>Ganho</label>
          <input id="gain${element.type}${index}" value="${element.gain}" type="number" min="1" max="24000" ${element.status == true ? "" : "disabled"} />
        </div>`
                : ""}
      </div>
    </div>`;
        });
        return conteudo;
    }
    generateActions() {
        const conteudo = `
        ${this.dao.listItemBuffer.length == 0
            ? ""
            : `
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
            `}
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
        document
            .getElementById("buttonUploadWav")
            .on("click", (e) => {
            this.setAttributesFilter();
            document.getElementById("filesWav").click();
        });
        document
            .getElementById("buttonUploadJson")
            .on("click", (e) => {
            this.setAttributesFilter();
            document.getElementById("fileJSON").click();
        });
        document
            .getElementById("buttonDownloadJson")
            .on("click", (e) => {
            this.setAttributesFilter();
            this.dao.downloadJSON();
        });
        document
            .getElementById("buttonPlayFilter")
            .on("mouseout", (e) => {
            this.sequenciador.stopOneSound();
        });
        document
            .getElementById("buttonPlayFilter")
            .on("mouseover", (e) => {
            this.setAttributesFilter();
            // console.log("PageSoundSphereHome  play")
            this.sequenciador.playOneSoundDescitor(this.controlSelectedItemBuffer, function () { }, this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getFilters());
        });
        document
            .getElementById("buttonPlay")
            .on("mouseout", (e) => {
            this.sequenciador.stopOneSound();
        });
        document
            .getElementById("buttonPlay")
            .on("mouseover", (e) => {
            this.setAttributesFilter();
            this.sequenciador.playOneSound(this.controlSelectedItemBuffer, function () { });
        });
        document
            .getElementById("buttonChangeWav")
            .on("click", (e) => {
            this.setAttributesFilter();
            this.nextItemBuffer();
            this.render();
        });
    }
    setSettingsAttributes() {
        document.body.addEventListener("animationend", removeElement);
        document.body.addEventListener("webkitAnimationEnd", removeElement);
        $(".ui.compact.button.red").on("click", (e) => {
            var _a;
            (_a = $(e.target).closest("[data-id]")) === null || _a === void 0 ? void 0 : _a.classList.add("removed");
            setTimeout(() => {
                this.setAttributesFilter();
                //   console.log("Id a ser removido: " + $(e.target).data("value"));
                this.dao.listSemanticDescriptors[this.positionDescriptorSelected].removeFilter($(e.target).data("value"), () => {
                    this.render();
                });
            }, 800);
        });
        $(".button.positive").on("click", (e) => {
            var _a, _b;
            (_a = $(e.target).closest("[data-id]")) === null || _a === void 0 ? void 0 : _a.classList.add("subir comando");
            (_b = $(`#container${$(e.target).closest("[data-id]").data("order") - 1}`)) === null || _b === void 0 ? void 0 : _b.classList.add("descer");
            setTimeout(() => {
                this.setAttributesFilter();
                // console.log("Position positionDescriptorSelected")
                // console.log(this.positionDescriptorSelected)
                // console.log(`($(e.target).data("value")`)
                // console.log($(e.target).data('value'));
                this.dao.listSemanticDescriptors[this.positionDescriptorSelected].upFilter($(e.target).data("value"), () => {
                    this.render();
                });
            }, 500);
        });
        $(".button.down").on("click", (e) => {
            var _a, _b;
            (_a = $(e.target).closest("[data-id]")) === null || _a === void 0 ? void 0 : _a.classList.add("descer comando");
            (_b = $(`#container${$(e.target).closest("[data-id]").data("order") + 1}`)) === null || _b === void 0 ? void 0 : _b.classList.add("subir");
            setTimeout(() => {
                this.setAttributesFilter();
                this.dao.listSemanticDescriptors[this.positionDescriptorSelected].downFilter($(e.target).data("value"), () => {
                    this.render();
                });
            }, 500);
        });
        $(".ui.checkbox").checkbox({
            beforeChecked: function () {
                $("label[for='" + $(this).attr("id") + "']").html("Ativado");
                $(`#span1${$(this).data("type")}`).classList.remove("span1Line");
                $(`#span2${$(this).data("type")}`).classList.remove("span2Line");
                $(`#frequency${$(this).data("type")}`).prop("disabled", false);
                $(`#Q${$(this).data("type")}`).prop("disabled", false);
                $(`#gain${$(this).data("type")}`).prop("disabled", false);
            },
            beforeUnchecked: function () {
                var _a, _b;
                (_a = $(`#span1${$(this).data("type")}`)) === null || _a === void 0 ? void 0 : _a.classList.add("span1Line");
                (_b = $(`#span2${$(this).data("type")}`)) === null || _b === void 0 ? void 0 : _b.classList.add("span2Line");
                $("label[for='" + $(this).attr("id") + "']").html("Desativado");
                $(`#frequency${$(this).data("type")}`).prop("disabled", true);
                $(`#Q${$(this).data("type")}`).prop("disabled", true);
                $(`#gain${$(this).data("type")}`).prop("disabled", true);
            },
        });
        document
            .getElementById("select-descriptor")
            .on("focus", (e) => {
            this.positionPreviousDescriptorSelected = $(e.target).val();
        });
        document
            .getElementById("select-descriptor")
            .on("change", (e) => {
            this.setAttributesFilter();
            this.positionDescriptorSelected = $(e.target).val();
            this.render();
            this.positionPreviousDescriptorSelected = $(e.target).val();
        });
        document
            .getElementById("buttonNewFilter")
            .on("click", (e) => {
            // console.log("teste")
            this.newFilterModal = undefined;
            this.genrateContentofModalNewFilter();
        });
    }
    renderAddFilter() {
        // console.log("Filter selecionado" + this.idFilterSelected)
        document.getElementById("contentAddFilter").html(this.generateHTMLFilter());
    }
    genrateContentofModalNewFilter() {
        let conteudo = `
<div class="header">Inserir Filtro</div>
<div class="content" id="corpoModal">
  <form onsubmit="return false;" class="ui form" novalidate id="formOptions">
  `;
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
                conteudo += `<option selected="selected"  value="${index}">${element.name}</option>`;
            }
            else {
                conteudo += `<option  value="${index}">${element.name}</option>`;
            }
        });
        conteudo += `
        </select>
      </div>
    </div>
  </div>`;
        //Filtro selecionado
        conteudo += `
   <div id="contentAddFilter">`;
        conteudo += this.generateHTMLFilter();
        conteudo += `</div>`;
        conteudo += `
    
  </form>
</div>
<div class="actions">



  <div id="buttonCancelNewFilter" class="ui neutral right labeled icon button">Cancelar</div>
  <div  id="buttonSaveNewFilter"class="ui blue button ">Salvar</div>
</div>

  `;
        document.getElementById("modalNewFilter").html(conteudo);
        this.generateSetingsModalNewFilter();
    }
    closeModalNewFilter() {
        this.idFilterSelected = 0;
        this.newFilterModal = undefined;
        document.getElementById("modalNewFilter").modal("hide");
        this.render();
    }
    generateSetingsModalNewFilter() {
        document
            .getElementById("modalNewFilter")
            .modal({ closable: false })
            .modal("setting", "transition", "horizontal flip")
            .modal("show");
        document
            .getElementById("select-AddFilter")
            .on("change", (e) => {
            this.idFilterSelected = $(e.target).val();
            this.renderAddFilter();
        });
        document
            .getElementById("buttonCancelNewFilter")
            .on("click", (e) => {
            this.closeModalNewFilter();
        });
        document
            .getElementById("buttonSaveNewFilter")
            .on("click", (e) => {
            this.addFilter();
            this.closeModalNewFilter();
        });
    }
    addFilter() {
        // console.log("Add filter page admin")
        // console.log(this.dao.listSemanticDescriptors[this.positionDescriptorSelected])
        if (this.newFilterModal.frequency !== undefined) {
            // console.log("<number>$(`#addFrequency${this.newFilterModal!.type}`).val()")
            // console.log(<number>$(`#addFrequency${this.newFilterModal!.type}`).val())
            this.newFilterModal.frequency = ($(`#addFrequency${this.newFilterModal.type}`).val());
        }
        if (this.newFilterModal.Q !== undefined) {
            this.newFilterModal.Q = ($(`#addQ${this.newFilterModal.type}`).val());
        }
        if (this.newFilterModal.gain !== undefined) {
            this.newFilterModal.gain = ($(`#addGain${this.newFilterModal.type}`).val());
        }
        this.dao.listSemanticDescriptors[this.positionDescriptorSelected].addFilter(this.newFilterModal);
    }
    setAttributesFilter() {
        let filter = this.dao.listSemanticDescriptors[this.positionDescriptorSelected].getFilters();
        filter.forEach((element, index) => {
            // console.log("`#frequency${element.type}${index}`")
            // console.log(`#frequency${element.type}${index}`)
            if (element.frequency != undefined) {
                element.frequency = ($(`#frequency${element.type}${index}`).val());
            }
            if (element.Q != undefined) {
                element.Q = $(`#Q${element.type}${index}`).val();
            }
            if (element.gain != undefined) {
                element.gain = $(`#gain${element.type}${index}`).val();
            }
            element.status = $(`#divCheck${element.type}${index}`).hasClass("checked");
        });
    }
    //Função para pular para a proxima musica
    nextItemBuffer() {
        if (this.controlSelectedItemBuffer < this.dao.listItemBuffer.length - 1) {
            this.controlSelectedItemBuffer += 1;
        }
        else {
            this.controlSelectedItemBuffer = 0;
        }
    }
    generateHTMLFilter() {
        this.newFilterModal = this.controlFilters.getFilter(this.idFilterSelected);
        // console.log("generateHTMLFilter" + this.newFilterModal.name)
        let conteudo = `<div class="three fields">
    ${this.newFilterModal.frequency !== undefined
            ? `
 
    <div class="field">
      <label>Frequency</label>
      <input id="addFrequency${this.newFilterModal.type}" value="${this.newFilterModal.frequency}" type="number" min="1" max="24000" ${this.newFilterModal.status == true ? "" : "disabled"}/>
    </div>`
            : ""} ${this.newFilterModal.Q !== undefined
            ? `
    <div class="field">
      <label>Q</label>
      <input id="addQ${this.newFilterModal.type}" value="${this.newFilterModal.Q}" type="number" min="1" max="24000" ${this.newFilterModal.status == true ? "" : "disabled"} />
    </div>`
            : ""} ${this.newFilterModal.gain !== undefined
            ? `
    <div class="field">
      <label>Ganho</label>
      <input id="addGain${this.newFilterModal.type}" value="${this.newFilterModal.gain}" type="number" min="1" max="24000" ${this.newFilterModal.status == true ? "" : "disabled"} />
    </div>`
            : ""}
  </div>`;
        return conteudo;
    }
    renderChangeSemanticDescriptors() {
        this.positionDescriptorSelected = 0;
        this.render();
    }
    generateHTML() {
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
        <div id="uiForm" class="ui form">` +
            this.generateAttributes() +
            `
        </div>
      </div>
    </div>
    </div>
    
      ` +
            this.generateActions() +
            `
    
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
function removeElement(event) {
    if (event.animationName === "disapear") {
        event.target.parentNode.removeChild(event.target);
    }
}
