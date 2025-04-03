"use strict";
class PageSoundSphereHome extends SimplePage {
    render() {
        this.loadContainerAudio();
        if (this.firstRender) {
            this.loadContainerSemaitsDescriptors();
            this.loadContainerActionDescriptiveIcons();
            this.loadContainerDimension();
            this.loadContainerIntensity();
            this.addClickEventToItensModificadoresPanel();
            this.addEventsVolume();
            this.addEventsMenuNav();
            this.addTooltipEvents();
            this.updatePageWithLayers();
            this.firstRender = false;
        }
        this.addClickEventsToCumulativeItens();
    }
    // constructor(containerElement: JQuery, titulo: string, soundSphereInfo: SoundSphereInfo, dao: DAO, sequenciador: any, canvas: any, contextCanvas: any) {
    constructor(containerElement, titulo, soundSphereInfo, dao, sequenciador, tooltip, sessionControl, painel) {
        super(containerElement, titulo, soundSphereInfo, dao, sequenciador);
        this.canvas = [];
        this.contextCanvas = [];
        // stopActived = true;
        this.reloadPainel = false;
        this.firstRender = true;
        this.modalContinueByJson = undefined;
        this.listActionDescriptiveIcons = [];
        this.listDimension = [];
        this.listIntensity = [];
        this.listSemanticDescriptors = [];
        //COntrolar Caracteristicas empilhaveis
        this.idActionDescriptiveIcon = undefined;
        this.idDimension = undefined;
        this.idIntensity = undefined;
        this.idSemanticDescriptor = undefined;
        this.codeSemanticDescriptor = undefined;
        this.idSelectedIcomAlbum = undefined;
        //Controlar Modificadores Painel
        this.listButtonActiveModificadorPainel = [];
        this.listLayerShow = {};
        //Controla o Status do menu Painel
        this.selectedPanelMenu = false;
        this.currentVolume = 100;
        this.mouseInsideIconAlbum = undefined;
        // this.canvas = canvas;
        // this.contextCanvas = contextCanvas;
        this.tooltip = tooltip;
        this.setVersionSoundSphere();
        this.startWelcomeModal();
        this.painel = painel;
        this.dependencyInjection();
        //Pega  URL aprams e atualiza a a configuracao
        let urlParams = getUrlParams();
        // Defina os valores padrão aqui
        const defaultValues = {
            showVolum: true,
            showDescriptor: true,
            showFood: true,
            showDimension: true,
            showIntensity: true,
        };
        Object.keys(defaultValues).forEach((key) => {
            if (urlParams[key] !== undefined) {
                this.listLayerShow[key] = JSON.parse(urlParams[key].toLowerCase());
            }
            else {
                this.listLayerShow[key] = defaultValues[key];
            }
        });
        this.modalContinueByJson = new window.bootstrap.Modal(document.getElementById("modalContinueByJson"), {
            keyboard: false,
        });
    }
    setVersionSoundSphere() {
        // console.log("Teste....");
        const divTitleSoundSphere = document.getElementById("brandText");
        if (divTitleSoundSphere) {
            divTitleSoundSphere.textContent = `SoundSphere ${this.soundSphereInfo.version}`;
        }
    }
    dependencyInjection() {
        // Injeção de dependencia sequenciador
        this.sequenciador.onNotifyStatus(this.showMessage.bind(this));
        // Injeção de dependencia painel
        this.painel.onNotifyStatus(this.showMessage.bind(this));
    }
    addEventsMenuNav() {
        // botão de limpar painel
        var _a;
        (_a = document
            .querySelector("#buttonUploadFileWav")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que o link tente navegar para "#"
            console.log("Botão upload file Wav clicado!");
            document.getElementById("filesWavStart").click();
        });
        this.onHideNavMenu();
        this.addEventsModalSalvarProjectSoundSphere();
        this.addEventsModalResetPainel();
        this.addEventModalExportWavFile();
        this.addEventLayers();
    }
    onHideNavMenu() {
        const navMenu = document.querySelector(".navbar-collapse");
        // Verifica se o navMenu existe
        if (navMenu) {
            // Adiciona o evento de "transitionend" que será disparado quando a animação de transição terminar
            navMenu.addEventListener("hidden.bs.collapse", () => {
                this.clearSelecionCumulativeItems();
                console.log("O menu foi ocultado!");
                this.updatePageWithLayers();
                const brandText = document.getElementById("brandText");
                if (brandText.classList.contains("hidden")) {
                    brandText === null || brandText === void 0 ? void 0 : brandText.classList.remove("hidden");
                }
            });
        }
    }
    resetSlicerVolum() {
        const slider = document.getElementById("inputVolumeSlider");
        const label = document.getElementById("volume-label");
        this.currentVolume = 100;
        if (slider) {
            slider.value = "100"; // Define o valor do range
        }
        if (label) {
            label.textContent = `Volume: 100%`; // Atualiza o texto visível
        }
    }
    updatePageWithLayers() {
        Object.keys(this.listLayerShow).forEach((key) => {
            // Substitui 'show' por 'container' para obter o id correspondente
            const elementId = key.replace("show", "container");
            // console.warn(`Valor ${elementId} ${this.listLayerShow[key]}`);
            const element = document.getElementById(elementId);
            if (element) {
                // Se o valor da chave for true, remove a classe 'hidden'
                if (this.listLayerShow[key]) {
                    element.removeAttribute("hidden");
                }
                else {
                    // Se o valor for false, adiciona a classe 'hidden'
                    if (key == "showVolum") {
                        this.resetSlicerVolum();
                    }
                    element.setAttribute("hidden", "");
                }
            }
        });
    }
    addEventLayers() {
        const divs = document.querySelectorAll(".input-layer"); // Seleciona todas as divs com a classe 'input-layer'
        //atualiza os checkbox com os atributos que temos
        divs.forEach((div) => {
            var _a;
            const checkbox = div.querySelector('input[type="checkbox"]');
            if (checkbox) {
                let data_name = (_a = checkbox.getAttribute("data-name")) !== null && _a !== void 0 ? _a : "";
                if (data_name in this.listLayerShow) {
                    checkbox.checked = this.listLayerShow[data_name]; // Atualiza o estado do checkbox
                }
            }
        });
        //ao alterar checkbox altera nossa listaShow
        divs.forEach((div) => {
            div.addEventListener("click", (event) => {
                var _a;
                // Verifica se o clique foi no checkbox diretamente, se sim, não faz nada
                if (event.target.tagName === "INPUT")
                    return;
                const checkbox = div.querySelector('input[type="checkbox"]');
                let data_name = (_a = checkbox.getAttribute("data-name")) !== null && _a !== void 0 ? _a : "";
                if (checkbox) {
                    checkbox.checked = !checkbox.checked; // Alterna o estado do checkbox
                    console.warn(`Param ${checkbox.id}  Name: ${data_name} Value: ${checkbox.checked}`);
                    this.listLayerShow[data_name] = checkbox.checked;
                    updateUrlParam(data_name, checkbox.checked.toString());
                }
                else {
                    console.warn("Checkbox não encontrado na div fornecida.");
                }
            }); // Adiciona o evento de clique
        });
    }
    toggleCheckbox(event) {
        const checkbox = event.target.previousElementSibling || event.target.nextElementSibling;
        if (checkbox && checkbox.type === "checkbox") {
            checkbox.checked = !checkbox.checked;
        }
    }
    addEventModalExportWavFile() {
        var _a, _b;
        const modal = new window.bootstrap.Modal(document.getElementById("modalExporWav"), {
            keyboard: false,
        });
        (_a = document
            .querySelector("#buttonExportWavFile")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que o link tente navegar para "#"
            console.log("Botão Save Projeto Soundsphere!");
            document
                .getElementById("inputNameFileExportWav")
                .setAttribute("placeholder", this.dao.getDefaultName());
            modal.show();
        });
        (_b = document
            .getElementById("buttonDownloadWavFile")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            var _a;
            console.warn("export wav file");
            this.sequenciador.startDownload(() => {
                modal.hide();
            }, (_a = document.getElementById("nameFile")) === null || _a === void 0 ? void 0 : _a.value);
            // this.generateHTML();
        });
    }
    addEventsModalResetPainel() {
        var _a, _b;
        //Abre modal e seta os valores padrões de input
        const modal = new window.bootstrap.Modal(document.getElementById("modalResetPainel"), {
            keyboard: false,
        });
        (_a = document
            .querySelector("#buttonClearPanel")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que o link tente navegar para "#"
            console.log("Botão Reset painel");
            modal.show();
        });
        //Abribui funcao dos botoes
        (_b = document
            .querySelector("#buttonReiniciarMixagem")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
            var _a;
            event.preventDefault(); // Evita que o link tente navegar para "#"
            console.log("Botão Limpar Painel clicado!");
            event.preventDefault(); // Evita o comportamento padrão do link
            document.getElementById;
            this.sequenciador.stop(function () { });
            this.painel.restartMixing();
            this.painel.reMake();
            (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.showMessage("Painel de mixagem reiniciado.");
            modal.hide();
        });
    }
    addEventsModalSalvarProjectSoundSphere() {
        var _a, _b;
        //Abre modal e seta os valores padrões de input
        const modal = new window.bootstrap.Modal(document.getElementById("modalSaveProjectJson"), {
            keyboard: false,
        });
        (_a = document
            .querySelector("#buttonOpenModalSaveSoundsphereFormat")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que o link tente navegar para "#"
            console.log("Botão Save Projeto Soundsphere!");
            document
                .getElementById("inputNameFileSaveProjectSoundsphere")
                .setAttribute("placeholder", this.dao.getDefaultName());
            document
                .getElementById("inputAuthorProjectSoundsphere")
                .setAttribute("placeholder", this.dao.getDefaultAuthor());
            modal.show();
        });
        //Abribui funcao dos botoes
        (_b = document
            .getElementById("buttonSaveSoundSphereFormat")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            var _a, _b;
            console.warn("save project soundsphere");
            this.dao.downloadJSON((_a = document.getElementById("inputNameFileSaveProjectSoundsphere")) === null || _a === void 0 ? void 0 : _a.value, (_b = document.getElementById("inputAuthorProjectSoundsphere")) === null || _b === void 0 ? void 0 : _b.value);
            modal.hide();
            this.showMessage("Download iniciado.");
        });
        document;
    }
    startWelcomeModal() {
        var _a, _b, _c, _d;
        const modalWelcome = new window.bootstrap.Modal(document.getElementById("welcomeModal"), {
            keyboard: false,
        });
        (_a = document
            .getElementById("button_start_upload_wav")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            modalWelcome.hide();
            document.getElementById("filesWavStart").click();
        });
        (_b = document
            .getElementById("buttonCancelarModalContinue")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.modalContinueByJson.hide();
            modalWelcome.show();
        });
        (_c = document
            .getElementById("show_modal_Continue_by_json")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            modalWelcome.hide();
            this.modalContinueByJson.show();
        });
        (_d = document
            .getElementById("buttonOkModalContinue")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            document.getElementById("fileJSON").click();
        });
        modalWelcome.show();
    }
    showErrorContinueJsonSoundSphereVersion(version_required) {
        const errorModalBody = document.getElementById("p_continue");
        errorModalBody.innerHTML = `Arquivo incompatível. Carregue arquivos gerados pela versão SoundSphere - ${version_required}.`;
    }
    updateModalContinueErrorJsonFile(message) {
        document.getElementById("p_continue").innerHTML = message;
    }
    showContinueLastMessage(erros) {
        console.log("updateModalContnueEnterWavFiles");
        document.getElementById("continueJsonTitle").innerHTML =
            "Passo 3 de 3 - Mensagens";
        const errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "";
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("alert", "alert-warning");
        errorMessage.innerHTML =
            "<h6> Arquivos não carregados pois não estão na composição original: </h6>";
        erros.forEach((erro) => {
            errorMessage.innerHTML += erro + "<br>";
        });
        errorContainer.appendChild(errorMessage);
        const botaoContinuar = document.getElementById("buttonOkModalContinue");
        const botaoCancelar = document.getElementById("buttonCancelarModalContinue");
        botaoCancelar.style.display = "none";
        const novoBotao = removeAllEvents(botaoContinuar);
        novoBotao.innerHTML = "Continuar";
        novoBotao.addEventListener("click", () => {
            this.modalContinueByJson.hide();
            this.render();
            this.painel.reMake();
        });
    }
    showErrorContineWavProblem(erros) {
        const errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "";
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("alert", "alert-warning");
        if (erros.length > 0) {
            errorMessage.innerHTML =
                "<h6> Arquivos não carregados pois não estão na composição original: </h6>";
            erros.forEach((erro) => {
                errorMessage.innerHTML += erro + "<br>";
            });
        }
        else {
            errorMessage.innerHTML =
                "Você deve enviar todos os arquivos solicitados.";
        }
        errorContainer.appendChild(errorMessage);
    }
    updateModalContinueEnterWavFiles(fileNames) {
        console.log("updateModalContnueEnterWavFiles");
        console.warn(fileNames);
        document.getElementById("continueJsonTitle").innerHTML =
            "Passo 2 de 3 - Enviar arquivo(s) Wav";
        console.warn("updateModalContnueEnterWavFiles");
        const paragrafo = document.getElementById("p_continue");
        if (fileNames.length > 0) {
            // Define o texto com quebras de linha interpretadas corretamente
            paragrafo.textContent = fileNames.join("\n");
            paragrafo.style.whiteSpace = "pre-line"; // Garante a interpretação das quebras de linha
        }
        else {
            paragrafo.textContent = "Faça upload de Arquivos Wav para iniciar.";
        }
        const botao = document.getElementById("buttonOkModalContinue");
        const novoBotao = removeAllEvents(botao);
        novoBotao.addEventListener("click", () => {
            document.getElementById("filesWavContinue").click();
        });
    }
    showMessage(message) {
        var _a;
        console.log(message);
        (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.showMessage(message);
    }
    startErrorModal(mensagens) {
        const errorModalBody = document.getElementById("errorModalBody");
        errorModalBody.innerHTML = "";
        mensagens.forEach((text) => {
            const paragraph = document.createElement("p"); // Cria o elemento <p>
            paragraph.textContent = text; // Define o conteúdo do parágrafo
            errorModalBody.appendChild(paragraph); // Adiciona ao contêiner
            errorModalBody.appendChild(document.createElement("br"));
        });
        //Exibe modal com os erros
        const modalElement = new window.bootstrap.Modal(document.getElementById("errorModal"), {
            keyboard: false,
        });
        modalElement.show();
    }
    addEventsVolume() {
        //Slicer
        const volumeSlider = document.getElementById("inputVolumeSlider");
        const volumeLabel = document.getElementById("volume-label");
        volumeSlider === null || volumeSlider === void 0 ? void 0 : volumeSlider.addEventListener("input", () => {
            let volumeValue = volumeSlider.value.padStart(3, "0");
            if (volumeLabel) {
                volumeLabel.textContent = `Volume: ${volumeValue}%`;
                this.currentVolume = parseInt(volumeValue);
                // console.warn(`Volume: ${volumeValue}%`);
            }
        });
        volumeSlider === null || volumeSlider === void 0 ? void 0 : volumeSlider.addEventListener("input", () => {
            let volumeValue = volumeSlider.value.padStart(3, "0");
            if (volumeLabel) {
                volumeLabel.textContent = `Volume: ${volumeValue}%`;
                this.currentVolume = parseInt(volumeValue);
                // console.warn(`Volume: ${volumeValue}%`);
            }
        });
        volumeSlider === null || volumeSlider === void 0 ? void 0 : volumeSlider.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        const containerVolume = document.getElementById("container-volume");
        containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.addEventListener("click", () => {
            const isActive = containerVolume.classList.contains("active");
            if (isActive) {
                if (this.selectedPanelMenu)
                    return;
                containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.classList.remove("active");
                volumeSlider.disabled = true;
            }
            else {
                containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.classList.add("active");
                volumeSlider.disabled = false;
            }
        });
    }
    loadContainerSemaitsDescriptors() {
        this.listSemanticDescriptors = generatorSemanticDescriptors();
        for (let index = 0; index < this.listSemanticDescriptors.length; index++) {
            const botao = document.createElement("button");
            // Adicionando classes do Bootstrap
            botao.classList.add("btn", "semantic-item", "btn-light", "m-2", "btn-rounded");
            botao.style.border = "2px solid white";
            // Definindo o texto do botão
            botao.textContent = `${this.listSemanticDescriptors[index].code} - ${this.listSemanticDescriptors[index].name}`;
            botao.setAttribute("data-tag", this.listSemanticDescriptors[index].code);
            botao.setAttribute("data-id", index.toString());
            const menuContainer = document.getElementById("container-semaits-descriptors");
            if (menuContainer) {
                menuContainer.appendChild(botao);
            }
        }
        this.addClickSemaitsDescriptors();
    }
    addClickSemaitsDescriptors() {
        const dimensionSemanticDescriptor = document.querySelectorAll("#container-semaits-descriptors .btn");
        if (dimensionSemanticDescriptor.length === 0) {
            // console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        dimensionSemanticDescriptor.forEach((button) => {
            button.addEventListener("click", () => {
                // console.warn("clicou no botao");
                var _a;
                // console.log("Semantic clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    if (this.selectedPanelMenu)
                        return;
                    console.log("11111");
                    button.classList.remove("active");
                    this.idSemanticDescriptor = undefined;
                    this.codeSemanticDescriptor = undefined;
                }
                else {
                    dimensionSemanticDescriptor.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    button.classList.add("active");
                    this.codeSemanticDescriptor =
                        (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    const dataId = button.getAttribute("data-id"); // Obtém o data-id
                    let id = parseInt(dataId !== null && dataId !== void 0 ? dataId : "");
                    if (id != undefined) {
                        this.idSemanticDescriptor = id;
                    }
                    // console.log("Semantic code:", this.codeSemanticDescriptor);
                    // console.log("Semantic id:", this.idSemanticDescriptor);
                }
            });
        });
    }
    getSequenciador() {
        return this.sequenciador;
    }
    isDeleteButtonActive() {
        var _a;
        return (_a = this.listButtonActiveModificadorPainel) === null || _a === void 0 ? void 0 : _a.includes("remove");
    }
    isPlayButtonActive() {
        var _a;
        return (_a = this.listButtonActiveModificadorPainel) === null || _a === void 0 ? void 0 : _a.includes("play");
    }
    isPauseButtonActive() {
        var _a;
        return (_a = this.listButtonActiveModificadorPainel) === null || _a === void 0 ? void 0 : _a.includes("pause");
    }
    isEraserButtonActive() {
        var _a;
        return (_a = this.listButtonActiveModificadorPainel) === null || _a === void 0 ? void 0 : _a.includes("eraser");
    }
    hasActivePanelMenuButton() {
        return this.listButtonActiveModificadorPainel.length > 0;
    }
    loadContainerIntensity() {
        let conteudo = "";
        this.listIntensity = generatorIntensity();
        for (let index = 0; index < this.listIntensity.length; index++) {
            const botao = document.createElement("button");
            // Adicionando classes do Bootstrap
            botao.classList.add("intensity-item", "btn", "btn-light", "m-2", "btn-rounded");
            botao.style.border = "2px solid white";
            // Definindo o texto do botão
            botao.textContent = `${this.listIntensity[index].name}`;
            botao.setAttribute("data-tag", this.listIntensity[index].tag.toString());
            const menuContainer = document.getElementById("container-intensity");
            if (menuContainer) {
                menuContainer.appendChild(botao);
            }
        }
        this.addClickEventToInensity();
    }
    addClickEventToInensity() {
        const intensity = document.querySelectorAll("#container-intensity .btn");
        if (intensity.length === 0) {
            // console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        intensity.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                // console.log("Dimensão clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    if (this.selectedPanelMenu)
                        return;
                    this.idIntensity = undefined;
                    button.classList.remove("active");
                }
                else {
                    intensity.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    button.classList.add("active");
                    this.idIntensity = (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    // console.log("Dimensão selecionada:", this.idIntensity);
                }
            });
        });
    }
    loadContainerDimension() {
        let conteudo = "";
        this.listDimension = generatorDimensions();
        for (let index = 0; index < this.listDimension.length; index++) {
            const botao = document.createElement("button");
            // Adicionando classes do Bootstrap
            botao.classList.add("dimension-item", "btn", "btn-light", "m-2", "btn-rounded");
            botao.style.border = "2px solid white";
            // Definindo o texto do botão
            botao.textContent = `${this.listDimension[index].name}`;
            botao.setAttribute("data-tag", this.listDimension[index].tag);
            const menuContainer = document.getElementById("container-dimensions");
            if (menuContainer) {
                menuContainer.appendChild(botao);
            }
        }
        this.addClickEventToDimension();
    }
    addClickEventToDimension() {
        const dimensionButtons = document.querySelectorAll("#container-dimensions .btn");
        if (dimensionButtons.length === 0) {
            // console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        dimensionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                // console.log("Dimensão clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    if (this.selectedPanelMenu)
                        return;
                    this.idDimension = undefined;
                    button.classList.remove("active");
                }
                else {
                    dimensionButtons.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    button.classList.add("active");
                    this.idDimension = (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    // console.log("Dimensão selecionada:", this.idDimension);
                }
            });
        });
    }
    loadContainerActionDescriptiveIcons() {
        let conteudo = "";
        this.listActionDescriptiveIcons = generatorActionDescriptiveIcon();
        for (let index = 0; index < this.listActionDescriptiveIcons.length; index++) {
            // Criação do elemento <a>
            const linkElement = document.createElement("a");
            linkElement.setAttribute("title", `Ação: ${this.listActionDescriptiveIcons[index].name}`);
            linkElement.setAttribute("data-bs-toggle", "tooltip");
            linkElement.style.border = "2px solid white";
            linkElement.style.padding = "6px";
            linkElement.style.margin = "5px";
            // linkElement.style.padding = "6px"; // Usando padding diretamente no estilo
            linkElement.classList.add("itemMenuDescriptiveIcon");
            // linkElement.style.backgroundColor = "rgb(248, 249, 250)";
            linkElement.setAttribute("data-html", this.listActionDescriptiveIcons[index].name);
            linkElement.setAttribute("data-tag", this.listActionDescriptiveIcons[index].tag);
            linkElement.setAttribute("data-id", index.toString());
            // Criação do elemento <img>
            const imgElement = document.createElement("img");
            imgElement.style.width = "40x"; // Definindo o tamanho da imagem
            imgElement.style.height = "40px";
            // imgElement.style.backgroundColor = "rgb(248, 249, 250)";
            imgElement.textContent = "Elemento Dinâmico";
            imgElement.setAttribute("src", this.listActionDescriptiveIcons[index].url);
            // Adicionando a imagem ao link
            linkElement.appendChild(imgElement);
            // Inserir o link (linkElement) no DOM, supondo que você tenha um container onde os itens serão adicionados
            // Vamos assumir que `menuContainer` é o ID do container onde você quer adicionar os elementos
            const menuContainer = document.getElementById("container-alimentos");
            if (menuContainer) {
                menuContainer.appendChild(linkElement);
            }
        }
        this.addClickEventToActionDescriptiveIcons();
    }
    addButtonEditMenu() {
        // Criação do elemento <a>
        const linkElement = document.createElement("a");
        linkElement.addEventListener("click", () => {
            if (!linkElement.classList.contains("active")) {
                linkElement.classList.add("active");
                this.disableAmostraAudio();
            }
        });
        linkElement.setAttribute("title", `Editar Itens de Mixagem`);
        linkElement.setAttribute("data-bs-toggle", "tooltip");
        linkElement.style.border = "2px solid white";
        linkElement.style.padding = "6px";
        linkElement.style.margin = "5px";
        linkElement.id = "button-edit";
        linkElement.classList.add("button-edit");
        linkElement.classList.add("active");
        linkElement.setAttribute("data-html", `Editar Itens de Mixagem`);
        linkElement.setAttribute("data-id", "id-button-edit");
        // Criação do elemento <img>
        const imgElement = document.createElement("img");
        imgElement.style.width = "35x"; // Definindo o tamanho da imagem
        imgElement.style.height = "35px";
        imgElement.textContent = "Elemento Dinâmico";
        imgElement.setAttribute("src", "img/icons/edit_pencil.png");
        // Adicionando a imagem ao link
        linkElement.appendChild(imgElement);
        const container_amostras = document.getElementById("container-amostras-audio");
        if (container_amostras) {
            container_amostras.appendChild(linkElement);
        }
    }
    loadContainerAudio() {
        var _a;
        document.getElementById("container-amostras-audio").innerHTML = "";
        this.addButtonEditMenu();
        let conteudo = "";
        if (this.dao.listItemBuffer.length != 0) {
            let itens = "";
            for (let index = 0; index < this.dao.listItemBuffer.length; index++) {
                if (this.dao.listItemBuffer[index].show) {
                    let element = this.createSvgItem(this.dao.listItemBuffer[index].name, this.dao.listItemBuffer[index].timeDuration.toString(), index.toString(), this.dao.listItemBuffer[index].color, `path${index.toString()}`);
                    (_a = document
                        .getElementById("container-amostras-audio")) === null || _a === void 0 ? void 0 : _a.appendChild(element);
                    // console.log(element);
                }
            }
            this.addClickEventToAmostraAudio();
        }
    }
    createSvgItem(dataName, dataDuration, dataId, color, id) {
        // Criação do div com classe 'svg-item' e estilo de fundo
        const svgItemDiv = document.createElement("div");
        svgItemDiv.classList.add("svg-item");
        svgItemDiv.style.backgroundColor = color;
        svgItemDiv.setAttribute("data-name", dataName);
        svgItemDiv.setAttribute("data-duration", sec2time(dataDuration));
        svgItemDiv.setAttribute("data-duration", sec2time(dataDuration));
        svgItemDiv.setAttribute("data-bs-toggle", "tooltip");
        svgItemDiv.setAttribute("data-id", dataId);
        svgItemDiv.setAttribute("id", id);
        // Criação do elemento SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "50");
        svg.setAttribute("height", "50");
        svg.setAttribute("viewBox", "0 0 50 50");
        // Criação do círculo
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "25");
        circle.setAttribute("cy", "25");
        circle.setAttribute("r", "10");
        circle.setAttribute("fill", "white");
        circle.classList.add("circle-svg");
        // Criação do polígono (ícone de play)
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", "15,10 15,40 35,25");
        polygon.setAttribute("fill", "white");
        polygon.classList.add("play-icon");
        // Anexando o círculo e o polígono ao SVG
        svg.appendChild(circle);
        svg.appendChild(polygon);
        // Anexando o SVG ao div
        svgItemDiv.appendChild(svg);
        return svgItemDiv;
    }
    //Remove todos os itens ativos dos que podem ser  combinados
    clearSelecionCumulativeItems() {
        var _a;
        const alimentosItems = document.querySelectorAll("#container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn");
        alimentosItems.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        });
        (_a = document.getElementById("button-edit")) === null || _a === void 0 ? void 0 : _a.classList.add("active");
        console.warn("chamou oclearSelecionCumulativeItems");
        this.idSelectedIcomAlbum = undefined;
        this.idActionDescriptiveIcon = undefined;
        this.idDimension = undefined;
        this.idIntensity = undefined;
        this.idSemanticDescriptor = undefined;
        this.codeSemanticDescriptor = undefined;
    }
    disableMenuPanel() {
        const botoesModificadores = document.querySelectorAll("#container-modificadores .btn");
        //document.getElementById("buttonStop")?.classList.add("active");
        botoesModificadores.forEach((button) => {
            if (button.classList.contains("active") &&
                button.getAttribute("data-action") != "stop") {
                button.classList.remove("active");
                // console.log("Removeu classe active");
            }
        });
        if (this.sequenciador.activePlay) {
            this.stopMixagem();
        }
        this.selectedPanelMenu = false;
        this.listButtonActiveModificadorPainel = [];
    }
    addClickEventToActionDescriptiveIcons() {
        const alimentosItems = document.querySelectorAll(".itemMenuDescriptiveIcon");
        if (alimentosItems.length === 0) {
            // console.warn("Nenhum item de alimento encontrado.");
            return;
        }
        alimentosItems.forEach((item) => {
            item.addEventListener("click", () => {
                // console.log("Item clicado:", item); // Teste para ver se o evento está funcionando
                const dataId = item.getAttribute("data-id");
                const data_tag = item.getAttribute("data-tag");
                if (item.classList.contains("active")) {
                    if (this.selectedPanelMenu)
                        return;
                    this.idActionDescriptiveIcon = undefined;
                    item.classList.remove("active");
                }
                else {
                    alimentosItems.forEach((otherItem) => {
                        otherItem.classList.remove("active");
                    });
                    item.classList.add("active");
                    let id = parseInt(dataId !== null && dataId !== void 0 ? dataId : "", 10);
                    if (!isNaN(id)) {
                        this.idActionDescriptiveIcon = data_tag !== null && data_tag !== void 0 ? data_tag : undefined;
                        // console.log("ID do alimento selecionado:", id);
                    }
                }
            });
        });
    }
    addTooltipEvents() {
        // Inicializa os tooltips do Bootstrap
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipEl) => {
            new window.bootstrap.Tooltip(tooltipEl);
        });
    }
    disableCumulativeItems() {
        // Alimentos;
        const items = document.querySelectorAll("#button-edit, #container-volume, #container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn");
        items.forEach((item) => {
            item.classList.add("disabled_");
        });
        const containerVolume = document.getElementById("container-volume");
        let volume_ativo = containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.classList.contains("active");
        const volume_slider = document.getElementById("inputVolumeSlider");
        if (volume_ativo) {
            volume_slider.disabled = true;
        }
    }
    addClickEventsToCumulativeItens() {
        const items = document.querySelectorAll("#button-edit, #container-volume, #container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn");
        items.forEach((item) => {
            item.addEventListener("click", () => {
                if (this.selectedPanelMenu) {
                    console.log("222");
                    this.disableMenuPanel();
                    this.enableCumulativeItems();
                }
            });
        });
    }
    enableCumulativeItems() {
        const items = document.querySelectorAll("#button-edit, #container-volume, #container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn");
        items.forEach((item) => {
            item.classList.remove("disabled_");
        });
        const containerVolume = document.getElementById("container-volume");
        let volume_ativo = containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.classList.contains("active");
        const volume_slider = document.getElementById("inputVolumeSlider");
        if (volume_ativo) {
            volume_slider.disabled = false;
        }
        //Botão de Editar
    }
    addClickEventToItensModificadoresPanel() {
        var _a, _b, _c, _d, _e;
        const botoesModificadoresPanel = document.querySelectorAll("#container-modificadores .btn");
        //Confifuração dos botoes do menu-botoes-painel
        botoesModificadoresPanel.forEach((button) => {
            button.addEventListener("click", () => {
                var _a, _b;
                //Se o botão de play estiver ativo e e estiver tocando a mixagem
                if (button.getAttribute("data-action") != "stop") {
                    if (button.classList.contains("active")) {
                        if (!this.sequenciador.activePlay &&
                            button.getAttribute("data-action") != "play") {
                            button.classList.remove("active");
                            this.listButtonActiveModificadorPainel = [];
                        }
                        this.enableCumulativeItems();
                        this.selectedPanelMenu = false;
                    }
                    else {
                        botoesModificadoresPanel.forEach((otherButton) => {
                            otherButton.classList.remove("active");
                        });
                        this.listButtonActiveModificadorPainel = [];
                        const action = button.getAttribute("data-action");
                        if (action) {
                            if (!((_a = this.listButtonActiveModificadorPainel) === null || _a === void 0 ? void 0 : _a.includes(action))) {
                                (_b = this.listButtonActiveModificadorPainel) === null || _b === void 0 ? void 0 : _b.push(action);
                            }
                        }
                        button.classList.add("active");
                        this.disableCumulativeItems();
                        this.selectedPanelMenu = true;
                    }
                }
            });
        });
        (_a = document.getElementById("buttonPlay")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            if (!this.sequenciador.activePlay) {
                this.sequenciador.play(() => {
                    // this.stopActived = false;
                    // this.pauseActived = false;
                }, () => {
                    document.getElementById("buttonPlay").classList.remove("active");
                    if (!this.isPauseButtonActive()) {
                        this.stopSimple();
                        console.log(this.listButtonActiveModificadorPainel);
                        if (this.isPlayButtonActive()) {
                            this.enableCumulativeItems();
                            this.listButtonActiveModificadorPainel = [];
                        }
                        // this.listButtonActiveModificadorPainel = [];
                    }
                });
            }
        });
        (_b = document.getElementById("buttonPause")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            console.warn(`Dentro do pause do page: ${this.isPauseButtonActive()}`);
            if (this.sequenciador.activePlay) {
                this.sequenciador.pause(() => { }, () => {
                    this.stopMixagem();
                });
            }
        });
        // document.getElementById("buttonStop")?.addEventListener("mousedown", () => {
        //   console.log("mouse up stop");
        //   document.getElementById("buttonStop")?.classList.add("active");
        // });
        // document.getElementById("buttonStop")?.addEventListener("mouseup", () => {
        //   console.log("mouse up stop");
        //   document.getElementById("buttonStop")?.classList.remove("active");
        // });
        (_c = document.getElementById("buttonStop")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            var _a;
            (_a = document.getElementById("buttonStop")) === null || _a === void 0 ? void 0 : _a.classList.add("active");
            this.stopMixagem();
        });
        (_d = document
            .getElementById("modificador-excluir")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            this.stopSimple();
        });
        (_e = document
            .getElementById("modificador-eraser")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            this.stopSimple();
        });
    }
    stopMixagem() {
        // this.stopActived = true;
        this.sequenciador.stop(() => {
            var _a;
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            (_a = document.getElementById("buttonStop")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            this.enableCumulativeItems();
        });
    }
    stopSimple() {
        // this.stopActived = true;
        this.sequenciador.stopSimple(() => {
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
        });
    }
    //Adiciona os eventos aos itens musicais
    disableAmostraAudio() {
        const items = document.querySelectorAll(".svg-item");
        items.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        });
        console.warn("disableAmostraAudio");
        this.idSelectedIcomAlbum = undefined;
    }
    addClickEventToAmostraAudio() {
        const svgItems = document.querySelectorAll(".svg-item");
        console.log("Svg Itens");
        console.log(svgItems);
        svgItems.forEach((item) => {
            //Configuração para selecionar e remover selecao dos itens svg-musicais
            item.addEventListener("click", () => {
                var _a, _b;
                if (item.classList.contains("active")) {
                    if (this.selectedPanelMenu)
                        return;
                    (_a = document.getElementById("button-edit")) === null || _a === void 0 ? void 0 : _a.classList.add("active");
                    console.warn("add event amostra");
                    this.idSelectedIcomAlbum = undefined;
                    item.classList.remove("active");
                    //E desabilita tbm o volume
                    // containerVoume?.classList.remove("active");
                    // if (volume_slider) {
                    //   volume_slider.disabled = true; // Agora o código não gera erro
                    // }
                }
                else {
                    svgItems.forEach(function (otherItem) {
                        otherItem.classList.remove("active");
                    });
                    item.classList.add("active");
                    (_b = document.getElementById("button-edit")) === null || _b === void 0 ? void 0 : _b.classList.remove("active");
                    //Verificação para saber se não é vazio
                    // e ativa o valume
                    // containerVoume?.classList.add("active");
                    // if (volume_slider) {
                    //   volume_slider.disabled = false; // Agora o código não gera erro
                    // }
                    const dataId = item.getAttribute("data-id"); // Obtém o data-id
                    let id = parseInt(dataId !== null && dataId !== void 0 ? dataId : "");
                    if (id != undefined) {
                        this.idSelectedIcomAlbum = id;
                    }
                }
            });
            //Tocar ao passar o mouse por cima
            item.addEventListener("mouseenter", () => {
                const dataId = item.getAttribute("data-id");
                // console.log("Mouse entrou");
                item.classList.add("playing_audio");
                let name = item.getAttribute("data-name");
                let duracao = item.getAttribute("data-duration");
                let text_volume = `Volume: ${this.getSlicerVolume()}%`;
                let text_descritor = `${this.idSemanticDescriptor
                    ? "Descritor semantico: " +
                        this.listSemanticDescriptors[this.idSemanticDescriptor].name
                    : ""}`;
                item.setAttribute("data-bs-original-title", `Nome: ${name} \n Duração: ${duracao}\n ${text_volume}
          ${text_descritor}`);
                // console.warn(this.idSemanticDescriptor);
                const id = this.idSemanticDescriptor;
                const descriptor = id !== undefined ? this.listSemanticDescriptors[id] : undefined;
                if (descriptor) {
                    // console.log("Chamou o play");
                    this.sequenciador.playOneSound(dataId !== null ? parseInt(dataId) : 0, function () {
                        item.classList.remove("playing_audio");
                    }, descriptor.getFilters(), this.getSlicerVolume());
                }
                else {
                    this.sequenciador.playOneSound(dataId !== null ? parseInt(dataId) : 0, function () {
                        item.classList.remove("playing_audio");
                    }, [], this.getSlicerVolume());
                }
            });
            //Tocar ao passar o mouse por cima
            item.addEventListener("mouseleave", () => {
                this.sequenciador.stopOneSound(function () {
                    item.classList.remove("playing_audio");
                });
            });
        });
    }
    getSlicerVolume() {
        const containerVolume = document.getElementById("container-volume");
        const isActiveVolume = containerVolume === null || containerVolume === void 0 ? void 0 : containerVolume.classList.contains("active");
        if (isActiveVolume) {
            return this.currentVolume;
        }
        //Se o volume nao for ativo retorna 0
        return 100;
    }
    activateModalLoading() {
        // console.error(" abrir modal loading");
        this.modal_loading = new window.bootstrap.Modal(document.getElementById("loadingModal"), {
            keyboard: false,
        });
        this.modal_loading.show();
    }
    disableModalLoading() {
        //se já tiver carregado ele fecha (porem quase sempre nao ta carregado), espera 1s e tenta fechar de novo
        this.modal_loading.hide();
        setTimeout(() => {
            this.modal_loading.hide();
        }, 1000);
    }
    getImgDescriptiveIcon(tag) {
        for (let index = 0; index < this.listActionDescriptiveIcons.length; index++) {
            if (tag == this.listActionDescriptiveIcons[index].tag) {
                return this.listActionDescriptiveIcons[index].img;
            }
        }
        return "";
    }
}
