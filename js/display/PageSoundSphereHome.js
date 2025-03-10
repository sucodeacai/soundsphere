"use strict";
class PageSoundSphereHome extends SimplePage {
    generateActions() {
        throw new Error("Method not implemented.");
    }
    setSettingsAttributes() {
        throw new Error("Method not implemented.");
    }
    getNameClass() {
        throw new Error("Method not implemented.");
    }
    generateHTML() {
        throw new Error("Method not implemented.");
    }
    generateAttributes() {
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
        this.buttonModificadorPainel = undefined;
        //pauseActived = false
        this.itemMixOption = undefined;
        this.itemOptionEnabled = true;
        this.mouseInsideIconAlbum = undefined;
        // this.canvas = canvas;
        // this.contextCanvas = contextCanvas;
        this.startWelcomeModal();
        this.pixelpersecond = pixelpersecond;
        this.setSettingsActions();
    }
    startWelcomeModal() {
        this.modal_welcome = new window.bootstrap.Modal(document.getElementById("welcomeModal"));
        this.modal_welcome.show();
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
        const modalElement = new window.bootstrap.Modal(document.getElementById("errorModal"));
        modalElement.show();
    }
    //Seta as configuracoes padroes da aplicacao
    setSettingsActions() {
        var _a, _b, _c, _d;
        (_a = document
            .getElementById("button_iniciar_upload")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.sequenciador.stop(function () { });
            this.modal_welcome.hide();
            document.getElementById("filesWav").click();
        });
        //Confifuração dos botoes do menu-botoes-painel
        (_b = document.getElementById("buttonPlay")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            if (!this.sequenciador.activePlay) {
                this.playMixagem();
            }
            else {
                console.warn("Play já está ativo");
            }
        });
        (_c = document.getElementById("buttonPause")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.pauseMixagem();
        });
        (_d = document.getElementById("buttonStop")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            this.stopMixagem();
        });
    }
    stopMixagem() {
        this.stopActived = true;
        this.sequenciador.stop(() => {
            // $('img').attr('draggable');
            document.getElementById("buttonPlay").classList.remove("active");
            document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonStop").classList.add("active");
        });
    }
    pauseMixagem() {
        this.sequenciador.pause(() => {
            document.getElementById("buttonPause").classList.add("active");
        }, () => {
            document.getElementById("buttonPause").classList.remove("active");
        });
    }
    playMixagem() {
        this.sequenciador.play(() => {
            document.getElementById("buttonPause").classList.remove("active");
            document.getElementById("buttonStop").classList.remove("active");
            document.getElementById("buttonPlay").classList.toggle("active");
            this.stopActived = false;
            // this.pauseActived = false;
        }, () => {
            //console.log("Terminou de executar")
            document.getElementById("buttonPlay").classList.remove("active");
        });
    }
    render() {
        this.loadContainerAudio();
        this.loadContainerSemaitsDescriptors();
        this.loadContainerActionDescriptiveIcons();
        this.loadContainerDimension();
        this.loadContainerIntensity();
        this.addClickEventToItensModificadoresPanel();
        this.addTooltipEvents();
    }
    loadContainerSemaitsDescriptors() {
        this.listSemanticDescriptors = generatorSemanticDescriptors();
        for (let index = 0; index < this.listSemanticDescriptors.length; index++) {
            const botao = document.createElement("button");
            // Adicionando classes do Bootstrap
            botao.classList.add("btn", "btn-light", "m-2", "btn-rounded");
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
            console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        dimensionSemanticDescriptor.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                this.idSemanticDescriptor = undefined;
                this.codeSemanticDescriptor = undefined;
                console.log("Semantic clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                }
                else {
                    dimensionSemanticDescriptor.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    button.classList.add("active");
                    this.disableItensModificadoresPanel();
                    this.codeSemanticDescriptor =
                        (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    const dataId = button.getAttribute("data-id"); // Obtém o data-id
                    let id = parseInt(dataId !== null && dataId !== void 0 ? dataId : "");
                    if (id != undefined) {
                        this.idSemanticDescriptor = id;
                    }
                    console.log("Semantic code:", this.codeSemanticDescriptor);
                    console.log("Semantic id:", this.idSemanticDescriptor);
                }
            });
        });
    }
    //Verifica se excluir está ativo
    isDeleteButtonActive() {
        if (this.buttonModificadorPainel == "remove") {
            return true;
        }
        return false;
    }
    loadContainerIntensity() {
        let conteudo = "";
        this.listIntensity = generatorIntensity();
        for (let index = 0; index < this.listIntensity.length; index++) {
            const botao = document.createElement("button");
            // Adicionando classes do Bootstrap
            botao.classList.add("btn", "btn-light", "m-2", "btn-rounded");
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
        const dimensionIntensity = document.querySelectorAll("#container-intensity .btn");
        if (dimensionIntensity.length === 0) {
            console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        dimensionIntensity.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                this.idIntensity = undefined;
                console.log("Dimensão clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                }
                else {
                    dimensionIntensity.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    this.disableItensModificadoresPanel();
                    button.classList.add("active");
                    this.idIntensity = (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    console.log("Dimensão selecionada:", this.idIntensity);
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
            botao.classList.add("btn", "btn-light", "m-2", "btn-rounded");
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
            console.warn("Nenhum botão de dimensão encontrado.");
            return;
        }
        dimensionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                this.idDimension = undefined;
                console.log("Dimensão clicada:", button.textContent);
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                }
                else {
                    dimensionButtons.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    this.disableItensModificadoresPanel();
                    button.classList.add("active");
                    this.idDimension = (_a = button.getAttribute("data-tag")) !== null && _a !== void 0 ? _a : undefined;
                    console.log("Dimensão selecionada:", this.idDimension);
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
            linkElement.setAttribute("data-html", this.listActionDescriptiveIcons[index].name);
            linkElement.setAttribute("data-tag", this.listActionDescriptiveIcons[index].tag);
            linkElement.setAttribute("data-id", index.toString());
            // Criação do elemento <img>
            const imgElement = document.createElement("img");
            imgElement.style.width = "40x"; // Definindo o tamanho da imagem
            imgElement.style.height = "40px";
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
    loadContainerAudio() {
        var _a;
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
        svgItemDiv.setAttribute("data-duration", this.painel.sec2time(dataDuration));
        svgItemDiv.setAttribute("data-duration", this.painel.sec2time(dataDuration));
        svgItemDiv.setAttribute("title", `Nome: ${dataName} \n Duração: ${this.painel.sec2time(dataDuration)} 
      
      `);
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
    disableItensCumulative() {
        const alimentosItems = document.querySelectorAll("#container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn");
        alimentosItems.forEach((item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
        });
        this.idSelectedIcomAlbum = undefined;
        this.idActionDescriptiveIcon = undefined;
        this.idDimension = undefined;
        this.idIntensity = undefined;
        this.idSemanticDescriptor = undefined;
        this.codeSemanticDescriptor = undefined;
    }
    disableItensModificadoresPanel() {
        const botoesModificadores = document.querySelectorAll("#container-modificadores .btn");
        botoesModificadores.forEach((button) => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");
            }
        });
        this.buttonModificadorPainel = undefined;
    }
    addClickEventToActionDescriptiveIcons() {
        const alimentosItems = document.querySelectorAll(".itemMenuDescriptiveIcon");
        if (alimentosItems.length === 0) {
            console.warn("Nenhum item de alimento encontrado.");
            return;
        }
        alimentosItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.idActionDescriptiveIcon = undefined;
                console.log("Item clicado:", item); // Teste para ver se o evento está funcionando
                const dataId = item.getAttribute("data-id");
                const data_tag = item.getAttribute("data-tag");
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
                else {
                    this.disableItensModificadoresPanel();
                    alimentosItems.forEach((otherItem) => {
                        otherItem.classList.remove("active");
                    });
                    item.classList.add("active");
                    let id = parseInt(dataId !== null && dataId !== void 0 ? dataId : "", 10);
                    if (!isNaN(id)) {
                        this.idActionDescriptiveIcon = data_tag !== null && data_tag !== void 0 ? data_tag : undefined;
                        console.log("ID do alimento selecionado:", id);
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
    addClickEventToItensModificadoresPanel() {
        const botoesModificadoresPanel = document.querySelectorAll("#container-modificadores .btn");
        botoesModificadoresPanel.forEach((button) => {
            button.addEventListener("click", () => {
                var _a;
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                }
                else {
                    botoesModificadoresPanel.forEach((otherButton) => {
                        otherButton.classList.remove("active");
                    });
                    this.buttonModificadorPainel =
                        (_a = button.getAttribute("data-action")) !== null && _a !== void 0 ? _a : undefined;
                    console.log(`Ação Modificadora: ${this.buttonModificadorPainel}`);
                    button.classList.add("active");
                    this.disableItensCumulative();
                }
            });
        });
    }
    //Adiciona os eventos aos itens musicais
    addClickEventToAmostraAudio() {
        const svgItems = document.querySelectorAll(".svg-item");
        svgItems.forEach((item) => {
            //Configuração para selecionar e remover selecao dos itens svg-musicais
            item.addEventListener("click", () => {
                this.idSelectedIcomAlbum = undefined;
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
                else {
                    svgItems.forEach(function (otherItem) {
                        otherItem.classList.remove("active");
                    });
                    this.disableItensModificadoresPanel();
                    item.classList.add("active");
                    //Verificação para saber se não é vazio
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
                console.log("Mouse entrou");
                item.classList.add("playing_audio");
                item.setAttribute("data-bs-original-title", `Nome: ${item.getAttribute("data-name")} \n Duração: ${item.getAttribute("data-duration")}
          ${this.idSemanticDescriptor
                    ? "Descritor semantico: " +
                        this.listSemanticDescriptors[this.idSemanticDescriptor].name
                    : ""}
          `);
                console.warn(this.idSemanticDescriptor);
                const id = this.idSemanticDescriptor;
                const descriptor = id !== undefined ? this.listSemanticDescriptors[id] : undefined;
                if (descriptor) {
                    console.log("Chamou o play");
                    this.sequenciador.playOneSound(dataId !== null ? parseInt(dataId) : 0, function () {
                        item.classList.remove("playing_audio");
                    }, descriptor.getFilters());
                }
                else {
                    this.sequenciador.playOneSound(dataId !== null ? parseInt(dataId) : 0, function () {
                        item.classList.remove("playing_audio");
                    }, []);
                }
            });
            //Tocar ao passar o mouse por cima
            item.addEventListener("mouseleave", () => {
                item.classList.remove("playing_audio");
                this.sequenciador.stopOneSound();
            });
        });
    }
    activateModalLoading() {
        // console.error(" abrir modal loading");
        this.modal_loading = new window.bootstrap.Modal(document.getElementById("loadingModal"));
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
