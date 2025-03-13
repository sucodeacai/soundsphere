class PageSoundSphereHome extends SimplePage {
  render(): void {
    this.loadContainerAudio();
    this.loadContainerSemaitsDescriptors();
    this.loadContainerActionDescriptiveIcons();
    this.loadContainerDimension();
    this.loadContainerIntensity();
    this.addClickEventToItensModificadoresPanel();
    this.addEventsVolume();
    this.addEventsMenuNav();
    this.addTooltipEvents();
    this.updatePageWithLayers();
  }
  generateActions(): string {
    throw new Error("Method not implemented.");
  }

  setSettingsAttributes(): void {
    throw new Error("Method not implemented.");
  }
  getNameClass(): string {
    throw new Error("Method not implemented.");
  }
  generateHTML(): void {
    throw new Error("Method not implemented.");
  }
  generateAttributes(): string {
    throw new Error("Method not implemented.");
  }

  startTemplate(): void {
    throw new Error("Method not implemented.");
  }
  canvas: any = [];
  contextCanvas: any = [];
  // stopActived = true;
  reloadPainel = false;

  listActionDescriptiveIcons: ActionDescriptiveIcon[] = [];
  listDimension: Dimension[] = [];
  listIntensity: Intensity[] = [];
  listSemanticDescriptors: SemanticDescriptor[] = [];

  //COntrolar Caracteristicas empilhaveis
  idActionDescriptiveIcon: string | undefined = undefined;
  idDimension: string | undefined = undefined;
  idIntensity: string | undefined = undefined;
  idSemanticDescriptor: number | undefined = undefined;
  codeSemanticDescriptor: string | undefined = undefined;
  idSelectedIcomAlbum: number | undefined = undefined;
  //Controlar Modificadores Painel
  listButtonActiveModificadorPainel: string[] = [];
  listLayerShow: any = {};

  //pauseActived = false
  itemOptionEnabled: boolean = true;
  voiceCommandMenuBar?: VoiceCommand;
  voiceCommandModalOptions?: VoiceCommand;

  painel: Painel;

  currentVolume: number = 100;
  mouseInsideIconAlbum: number | undefined = undefined;

  tooltip: Tooltip | undefined;

  sessionControl: SessionControl | undefined;
  modal_loading: any;
  //itemOptionitemOptionEnabled: boolean = true;
  // constructor(containerElement: JQuery, titulo: string, soundSphereInfo: SoundSphereInfo, dao: DAO, sequenciador: any, canvas: any, contextCanvas: any) {
  constructor(
    containerElement: HTMLElement | null,
    titulo: string,
    soundSphereInfo: SoundSphereInfo,
    dao: DAO,
    sequenciador: Sequenciador,
    tooltip: Tooltip,
    sessionControl: SessionControl,
    painel: Painel
  ) {
    super(containerElement, titulo, soundSphereInfo, dao, sequenciador);
    // this.canvas = canvas;
    // this.contextCanvas = contextCanvas;
    this.tooltip = tooltip;
    this.startWelcomeModal();
    this.setSettingsActions();

    this.painel = painel;
    this.dependencyInjection();

    //Pega  URL aprams e atualiza a a configuracao
    let urlParams = getUrlParams();

    // Defina os valores padrão aqui
    const defaultValues: Record<string, boolean> = {
      showVolum: true,
      showDescriptor: true,
      showFood: false,
      showDimension: false,
      showIntensity: false,
    };

    Object.keys(defaultValues).forEach((key) => {
      if (urlParams[key] !== undefined) {
        this.listLayerShow[key] = JSON.parse(urlParams[key].toLowerCase());
      } else {
        this.listLayerShow[key] = defaultValues[key];
      }
    });
  }
  dependencyInjection(): void {
    // Injeção de dependencia sequenciador
    this.sequenciador.onNotifyStatus(this.showMessage.bind(this));
    // Injeção de dependencia painel
    this.painel.onNotifyStatus(this.showMessage.bind(this));
  }

  addEventsMenuNav() {
    // botão de limpar painel
    document
      .querySelector<HTMLAnchorElement>("#buttonClearPanel")
      ?.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que o link tente navegar para "#"
        console.log("Botão Limpar Painel clicado!");
        event.preventDefault(); // Evita o comportamento padrão do link
        document.getElementById;
        this.sequenciador.stop(function () {});
        this.painel.restartMixing();
        this.painel.reMake();
        this.tooltip?.showMessage("Painel de mixagem reiniciado.");
      });
    document
      .querySelector<HTMLAnchorElement>("#buttonUploadFileWav")
      ?.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que o link tente navegar para "#"
        console.log("Botão upload file Wav clicado!");
        document.getElementById("filesWav")!.click();
      });
    this.onHideNavMenu();
    this.addEventsModalSalvarProjectSoundSphere();
    this.addEventModalExportWavFile();
    this.addEventLayers();
  }
  onHideNavMenu() {
    const navMenu = document.querySelector(".navbar-collapse");

    // Verifica se o navMenu existe
    if (navMenu) {
      // Adiciona o evento de "transitionend" que será disparado quando a animação de transição terminar
      navMenu.addEventListener("hidden.bs.collapse", () => {
        console.log("O menu foi ocultado!");
        this.updatePageWithLayers();
        const brandText = document.getElementById("brandText");
        if (brandText!.classList.contains("hidden")) {
          brandText?.classList.remove("hidden");
        }
      });
    }
  }
  updatePageWithLayers() {
    Object.keys(this.listLayerShow).forEach((key) => {
      // Substitui 'show' por 'container' para obter o id correspondente
      const elementId = key.replace("show", "container");
      console.warn(`Valor ${elementId} ${this.listLayerShow[key]}`);
      const element = document.getElementById(elementId);

      if (element) {
        // Se o valor da chave for true, remove a classe 'hidden'
        if (this.listLayerShow[key]) {
          element.removeAttribute("hidden");
        } else {
          // Se o valor for false, adiciona a classe 'hidden'
          element.setAttribute("hidden", "");
        }
      }
    });
  }
  addEventLayers() {
    const divs = document.querySelectorAll(".input-layer"); // Seleciona todas as divs com a classe 'input-layer'
    //atualiza os checkbox com os atributos que temos
    divs.forEach((div) => {
      const checkbox = div.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      if (checkbox) {
        let data_name = checkbox.getAttribute("data-name") ?? "";

        if (data_name in this.listLayerShow) {
          checkbox.checked = this.listLayerShow[data_name]; // Atualiza o estado do checkbox
        }
      }
    });
    //ao alterar checkbox altera nossa listaShow
    divs.forEach((div) => {
      div.addEventListener("click", (event) => {
        // Verifica se o clique foi no checkbox diretamente, se sim, não faz nada
        if ((event.target as HTMLElement).tagName === "INPUT") return;

        const checkbox = div.querySelector(
          'input[type="checkbox"]'
        ) as HTMLInputElement;
        let data_name = checkbox.getAttribute("data-name") ?? "";
        if (checkbox) {
          checkbox.checked = !checkbox.checked; // Alterna o estado do checkbox
          console.warn(
            `Param ${checkbox.id}  Name: ${data_name} Value: ${checkbox.checked}`
          );
          this.listLayerShow[data_name] = checkbox.checked;
          updateUrlParam(data_name, checkbox.checked.toString());
        } else {
          console.warn("Checkbox não encontrado na div fornecida.");
        }
      }); // Adiciona o evento de clique
    });
  }
  toggleCheckbox(event: any) {
    const checkbox =
      event.target.previousElementSibling || event.target.nextElementSibling;
    if (checkbox && checkbox.type === "checkbox") {
      checkbox.checked = !checkbox.checked;
    }
  }
  addEventModalExportWavFile() {
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById("modalExporWav"),
      {
        keyboard: false,
      }
    );
    document
      .querySelector<HTMLAnchorElement>("#buttonExportWavFile")
      ?.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que o link tente navegar para "#"
        console.log("Botão Save Projeto Soundsphere!");

        document
          .getElementById("inputNameFileExportWav")!
          .setAttribute("placeholder", this.dao.getDefaultName()!);

        modal.show();
      });

    document
      .getElementById("buttonDownloadWavFile")
      ?.addEventListener("click", () => {
        console.warn("export wav file");
        this.sequenciador.startDownload(() => {
          modal.hide();
        }, (document.getElementById("nameFile") as HTMLInputElement)?.value);
        // this.generateHTML();
      });
  }

  addEventsModalSalvarProjectSoundSphere() {
    //Abre modal e seta os valores padrões de input
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById("modalSaveProjectJson"),
      {
        keyboard: false,
      }
    );
    document
      .querySelector<HTMLAnchorElement>("#buttonOpenModalSaveSoundsphereFormat")
      ?.addEventListener("click", (event) => {
        event.preventDefault(); // Evita que o link tente navegar para "#"
        console.log("Botão Save Projeto Soundsphere!");

        document
          .getElementById("inputNameFileSaveProjectSoundsphere")!
          .setAttribute("placeholder", this.dao.getDefaultName()!);
        document
          .getElementById("inputAuthorProjectSoundsphere")!
          .setAttribute("placeholder", this.dao.getDefaultAuthor()!);

        modal.show();
      });
    //Abribui funcao dos botoes
    document
      .getElementById("buttonSaveSoundSphereFormat")
      ?.addEventListener("click", () => {
        console.warn("save project soundsphere");
        this.dao.downloadJSON(
          (
            document.getElementById(
              "inputNameFileSaveProjectSoundsphere"
            ) as HTMLInputElement
          )?.value,
          (
            document.getElementById(
              "inputAuthorProjectSoundsphere"
            ) as HTMLInputElement
          )?.value
        );
        modal.hide();
      });

    document;
  }

  startWelcomeModal() {
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById("welcomeModal"),
      {
        keyboard: false,
      }
    );
    document
      .getElementById("button_iniciar_upload")
      ?.addEventListener("click", () => {
        this.sequenciador.stop(function () {});
        modal.hide();
        document.getElementById("filesWav")!.click();
      });
    modal.show();
  }
  showMessage(message: string): void {
    console.log(message);
    this.tooltip?.showMessage(message);
  }

  startErrorModal(mensagens: string[]) {
    const errorModalBody = document.getElementById(
      "errorModalBody"
    ) as HTMLElement;
    errorModalBody.innerHTML = "";
    mensagens.forEach((text) => {
      const paragraph = document.createElement("p"); // Cria o elemento <p>
      paragraph.textContent = text; // Define o conteúdo do parágrafo
      errorModalBody.appendChild(paragraph); // Adiciona ao contêiner
      errorModalBody.appendChild(document.createElement("br"));
    });
    //Exibe modal com os erros
    const modalElement = new (window as any).bootstrap.Modal(
      document.getElementById("errorModal"),
      {
        keyboard: false,
      }
    );
    modalElement.show();
  }

  //Seta as configuracoes padroes da aplicacao
  setSettingsActions(): void {}
  addEventsVolume(): void {
    //Slicer
    const volumeSlider = document.getElementById(
      "volume-slider"
    ) as HTMLInputElement;
    const volumeLabel = document.getElementById("volume-label");

    volumeSlider?.addEventListener("input", () => {
      let volumeValue = volumeSlider.value.padStart(3, "0");
      if (volumeLabel) {
        volumeLabel.textContent = `Volume: ${volumeValue}%`;
        this.currentVolume = parseInt(volumeValue);
        // console.warn(`Volume: ${volumeValue}%`);
      }
    });
  }
  loadContainerSemaitsDescriptors(): void {
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

      const menuContainer = document.getElementById(
        "container-semaits-descriptors"
      );
      if (menuContainer) {
        menuContainer.appendChild(botao);
      }
    }
    this.addClickSemaitsDescriptors();
  }
  addClickSemaitsDescriptors(): void {
    const dimensionSemanticDescriptor = document.querySelectorAll(
      "#container-semaits-descriptors .btn"
    );

    if (dimensionSemanticDescriptor.length === 0) {
      // console.warn("Nenhum botão de dimensão encontrado.");
      return;
    }
    dimensionSemanticDescriptor.forEach((button) => {
      button.addEventListener("click", () => {
        this.idSemanticDescriptor = undefined;
        this.codeSemanticDescriptor = undefined;
        // console.log("Semantic clicada:", button.textContent);
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        } else {
          dimensionSemanticDescriptor.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          button.classList.add("active");
          this.disableItensModificadoresPanel();
          this.codeSemanticDescriptor =
            button.getAttribute("data-tag") ?? undefined;

          const dataId: string | null = button.getAttribute("data-id"); // Obtém o data-id

          let id = parseInt(dataId ?? "");
          if (id != undefined) {
            this.idSemanticDescriptor = id;
          }
          // console.log("Semantic code:", this.codeSemanticDescriptor);
          // console.log("Semantic id:", this.idSemanticDescriptor);
        }
      });
    });
  }
  getSequenciador(): Sequenciador {
    return this.sequenciador;
  }

  isDeleteButtonActive(): boolean | undefined {
    return this.listButtonActiveModificadorPainel?.includes("remove");
  }
  isPlayButtonActive(): boolean | undefined {
    return this.listButtonActiveModificadorPainel?.includes("play");
  }
  isPauseButtonActive(): boolean | undefined {
    return this.listButtonActiveModificadorPainel?.includes("pause");
  }
  loadContainerIntensity(): void {
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
  addClickEventToInensity(): void {
    const dimensionIntensity = document.querySelectorAll(
      "#container-intensity .btn"
    );

    if (dimensionIntensity.length === 0) {
      // console.warn("Nenhum botão de dimensão encontrado.");
      return;
    }
    dimensionIntensity.forEach((button) => {
      button.addEventListener("click", () => {
        this.idIntensity = undefined;
        // console.log("Dimensão clicada:", button.textContent);
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        } else {
          dimensionIntensity.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          this.disableItensModificadoresPanel();
          button.classList.add("active");
          this.idIntensity = button.getAttribute("data-tag") ?? undefined;

          // console.log("Dimensão selecionada:", this.idIntensity);
        }
      });
    });
  }
  loadContainerDimension(): void {
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

  addClickEventToDimension(): void {
    const dimensionButtons = document.querySelectorAll(
      "#container-dimensions .btn"
    );

    if (dimensionButtons.length === 0) {
      // console.warn("Nenhum botão de dimensão encontrado.");
      return;
    }
    dimensionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.idDimension = undefined;
        // console.log("Dimensão clicada:", button.textContent);
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        } else {
          dimensionButtons.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          this.disableItensModificadoresPanel();
          button.classList.add("active");
          this.idDimension = button.getAttribute("data-tag") ?? undefined;

          // console.log("Dimensão selecionada:", this.idDimension);
        }
      });
    });
  }
  loadContainerActionDescriptiveIcons(): void {
    let conteudo = "";
    this.listActionDescriptiveIcons = generatorActionDescriptiveIcon();
    for (
      let index = 0;
      index < this.listActionDescriptiveIcons.length;
      index++
    ) {
      // Criação do elemento <a>
      const linkElement = document.createElement("a");

      linkElement.setAttribute(
        "title",
        `Ação: ${this.listActionDescriptiveIcons[index].name}`
      );
      linkElement.setAttribute("data-bs-toggle", "tooltip");

      linkElement.style.border = "2px solid white";
      linkElement.style.padding = "6px";

      linkElement.style.margin = "5px";
      // linkElement.style.padding = "6px"; // Usando padding diretamente no estilo
      linkElement.classList.add("itemMenuDescriptiveIcon");
      linkElement.setAttribute(
        "data-html",
        this.listActionDescriptiveIcons[index].name
      );
      linkElement.setAttribute(
        "data-tag",
        this.listActionDescriptiveIcons[index].tag
      );
      linkElement.setAttribute("data-id", index.toString());

      // Criação do elemento <img>
      const imgElement = document.createElement("img");
      imgElement.style.width = "40x"; // Definindo o tamanho da imagem
      imgElement.style.height = "40px";
      imgElement.textContent = "Elemento Dinâmico";
      imgElement.setAttribute(
        "src",
        this.listActionDescriptiveIcons[index].url
      );
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
  loadContainerAudio(): void {
    document.getElementById("container-amostras-audio")!.innerHTML = "";

    let conteudo = "";
    if (this.dao.listItemBuffer.length != 0) {
      let itens = "";
      for (let index = 0; index < this.dao.listItemBuffer.length; index++) {
        if (this.dao.listItemBuffer[index].show) {
          let element = this.createSvgItem(
            this.dao.listItemBuffer[index].name,
            this.dao.listItemBuffer[index].timeDuration.toString(),
            index.toString(),
            this.dao.listItemBuffer[index].color,
            `path${index.toString()}`
          );
          document
            .getElementById("container-amostras-audio")
            ?.appendChild(element);
          // console.log(element);
        }
      }
      this.addClickEventToAmostraAudio();
    }
  }

  createSvgItem(
    dataName: string,
    dataDuration: string,
    dataId: string,
    color: string,
    id: string
  ): HTMLDivElement {
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
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", "25");
    circle.setAttribute("cy", "25");
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "white");
    circle.classList.add("circle-svg");

    // Criação do polígono (ícone de play)
    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
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
    const alimentosItems = document.querySelectorAll(
      "#container-dimensions .btn, .itemMenuDescriptiveIcon, .svg-item, #container-semaits-descriptors .btn, #container-intensity .btn"
    );
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
    const botoesModificadores = document.querySelectorAll(
      "#container-modificadores .btn"
    );
    document.getElementById("buttonStop")?.classList.add("active");
    botoesModificadores.forEach((button) => {
      if (
        button.classList.contains("active") &&
        button.getAttribute("data-action") != "stop"
      ) {
        button.classList.remove("active");
        // console.log("Removeu classe active");
      }
    });
    if (this.sequenciador.activePlay) {
      this.stopMixagem();
    }

    this.listButtonActiveModificadorPainel = [];
  }
  addClickEventToActionDescriptiveIcons(): void {
    const alimentosItems = document.querySelectorAll(
      ".itemMenuDescriptiveIcon"
    );

    if (alimentosItems.length === 0) {
      // console.warn("Nenhum item de alimento encontrado.");
      return;
    }

    alimentosItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.idActionDescriptiveIcon = undefined;

        // console.log("Item clicado:", item); // Teste para ver se o evento está funcionando
        const dataId: string | null = item.getAttribute("data-id");
        const data_tag: string | null = item.getAttribute("data-tag");

        if (item.classList.contains("active")) {
          item.classList.remove("active");
        } else {
          this.disableItensModificadoresPanel();
          alimentosItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
          });
          item.classList.add("active");

          let id = parseInt(dataId ?? "", 10);
          if (!isNaN(id)) {
            this.idActionDescriptiveIcon = data_tag ?? undefined;
            // console.log("ID do alimento selecionado:", id);
          }
        }
      });
    });
  }
  addTooltipEvents() {
    // Inicializa os tooltips do Bootstrap
    const tooltipTriggerList: NodeListOf<Element> = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipEl) => {
      new (window as any).bootstrap.Tooltip(tooltipEl);
    });
  }
  addClickEventToItensModificadoresPanel() {
    const botoesModificadoresPanel = document.querySelectorAll(
      "#container-modificadores .btn"
    );
    //Confifuração dos botoes do menu-botoes-painel

    botoesModificadoresPanel.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("active")) {
          if (
            !this.sequenciador.activePlay &&
            button.getAttribute("data-action") != "play"
          ) {
            console.warn(
              "Removendo todas os botoes modificadores painel na funcaobotoesModificadoresPanel"
            );
            button.classList.remove("active");
            this.listButtonActiveModificadorPainel = [];
          }
        } else {
          botoesModificadoresPanel.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          this.listButtonActiveModificadorPainel = [];
          const action = button.getAttribute("data-action");

          if (action) {
            if (!this.listButtonActiveModificadorPainel?.includes(action)) {
              this.listButtonActiveModificadorPainel?.push(action);
            }
          }

          console.log(
            `Ação Modificadora: ${this.listButtonActiveModificadorPainel}`
          );
          button.classList.add("active");

          this.disableItensCumulative();
        }
      });
    });

    document.getElementById("buttonPlay")?.addEventListener("click", () => {
      if (!this.sequenciador.activePlay) {
        this.sequenciador.play(
          () => {
            // this.stopActived = false;
            // this.pauseActived = false;
          },
          () => {
            //console.log("Terminou de executar")
            console.warn("callback do botão play");
            console.log(this.listButtonActiveModificadorPainel);
            document.getElementById("buttonPlay")!.classList.remove("active");

            if (!this.isPauseButtonActive()) {
              this.stopMixagem();
              this.listButtonActiveModificadorPainel = [];
            }
          }
        );
      } else {
        // console.warn("Play já está ativo");
      }
    });
    document.getElementById("buttonPause")?.addEventListener("click", () => {
      console.warn(`Dentro do pause do page: ${this.isPauseButtonActive()}`);
      this.sequenciador.pause(
        () => {},
        () => {
          this.stopMixagem();
        }
      );
    });
    document.getElementById("buttonStop")?.addEventListener("click", () => {
      this.stopMixagem();
    });
    let button_element_excluir = document.getElementById("modificador-excluir");
    document
      .getElementById("modificador-excluir")
      ?.addEventListener("click", () => {
        this.stopMixagem();
        console.log("this.listButtonActiveModificadorPainel");
        document.getElementById("buttonStop")!.classList.add("active");
        console.log(this.listButtonActiveModificadorPainel);
      });
  }
  stopMixagem() {
    // this.stopActived = true;

    this.sequenciador.stopSimple(() => {
      // $('img').attr('draggable');
      document.getElementById("buttonPlay")!.classList.remove("active")!;
      document.getElementById("buttonPause")!.classList.remove("active");
      document.getElementById("buttonStop")!.classList.add("active");
    });
  }
  //Adiciona os eventos aos itens musicais
  addClickEventToAmostraAudio() {
    const svgItems = document.querySelectorAll(".svg-item");
    const containerVoume = document.getElementById("container-volume");
    const volume_slider = document.getElementById(
      "inputVolumeSlider"
    ) as HTMLInputElement;
    svgItems.forEach((item) => {
      //Configuração para selecionar e remover selecao dos itens svg-musicais
      item.addEventListener("click", () => {
        this.idSelectedIcomAlbum = undefined;
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          //E desabilita tbm o volume
          containerVoume?.classList.remove("active");
          if (volume_slider) {
            volume_slider.disabled = true; // Agora o código não gera erro
          }
        } else {
          svgItems.forEach(function (otherItem) {
            otherItem.classList.remove("active");
          });

          this.disableItensModificadoresPanel();
          item.classList.add("active");
          //Verificação para saber se não é vazio
          // e ativa o valume
          containerVoume?.classList.add("active");
          if (volume_slider) {
            volume_slider.disabled = false; // Agora o código não gera erro
          }
          const dataId: string | null = item.getAttribute("data-id"); // Obtém o data-id

          let id = parseInt(dataId ?? "");
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
        let text_volume = `Volume: ${this.currentVolume}`;
        let text_descritor = `${
          this.idSemanticDescriptor
            ? "Descritor semantico: " +
              this.listSemanticDescriptors[this.idSemanticDescriptor].name
            : ""
        }`;

        item.setAttribute(
          "data-bs-original-title",
          `Nome: ${name} \n Duração: ${duracao}\n ${text_volume}
          ${text_descritor}`
        );
        // console.warn(this.idSemanticDescriptor);
        const id = this.idSemanticDescriptor;
        const descriptor =
          id !== undefined ? this.listSemanticDescriptors[id] : undefined;
        if (descriptor) {
          // console.log("Chamou o play");

          this.sequenciador.playOneSound(
            dataId !== null ? parseInt(dataId) : 0,
            function () {
              item.classList.remove("playing_audio");
            },
            descriptor.getFilters(),
            this.currentVolume
          );
        } else {
          this.sequenciador.playOneSound(
            dataId !== null ? parseInt(dataId) : 0,
            function () {
              item.classList.remove("playing_audio");
            },
            [],
            this.currentVolume
          );
        }
      });
      //Tocar ao passar o mouse por cima
      item.addEventListener("mouseleave", () => {
        item.classList.remove("playing_audio");
        this.sequenciador.stopOneSound();
      });
    });
  }
  activateModalLoading(): void {
    // console.error(" abrir modal loading");
    this.modal_loading = new (window as any).bootstrap.Modal(
      document.getElementById("loadingModal"),
      {
        keyboard: false,
      }
    );

    this.modal_loading.show();
  }
  disableModalLoading(): void {
    //se já tiver carregado ele fecha (porem quase sempre nao ta carregado), espera 1s e tenta fechar de novo
    this.modal_loading.hide();
    setTimeout(() => {
      this.modal_loading.hide();
    }, 1000);
  }
  getImgDescriptiveIcon(tag: string): string {
    for (
      let index = 0;
      index < this.listActionDescriptiveIcons.length;
      index++
    ) {
      if (tag == this.listActionDescriptiveIcons[index].tag) {
        return this.listActionDescriptiveIcons[index].img;
      }
    }
    return "";
  }
}
