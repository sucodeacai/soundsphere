class FileSoundSphere extends FileWav {
  simplePage: PageSoundSphereHome;
  // simplapage2:PageSoundSphereHome;

  constructor(
    sequenciador: any,
    dao: DAO,
    tooltip: Tooltip,
    simplePage: PageSoundSphereHome
  ) {
    super(sequenciador, dao);
    // this.simplapage2 = simplePage;
    this.simplePage = simplePage;
    document
      .getElementById("filesWav")
      ?.addEventListener("change", (evt: Event) => {
        "use strict";

        // console.log("Chamou handledFIleselect xx");
        this.listNamesInvalid = [];
        let files: File[] = [],
          divLoading = null,
          i: number,
          f: File,
          reader: FileReader,
          audio: HTMLAudioElement,
          result: any;

        const target = evt.target as HTMLInputElement;

        if (navigator.userAgent.match(/Android/i)) {
          // files = target.files as FileList;
        } else {
          for (i = 0; i < target.files!.length; i++) {
            if (
              target.files![i].type === "audio/wav" &&
              !this.dao.isItemBufferLoadedByName(target.files![i].name)
            ) {
              files.push(target.files![i]);
            } else if (target.files![i].type === "audio/wav") {
              this.listNamesInvalid.push(
                target.files![i].name +
                  ": -Arquivo já carregado/ File already loaded"
              );
            } else {
              console.log("Arquivo repetido");
              this.listNamesInvalid.push(
                target.files![i].name + ": -Formato inválido/ Invalid format"
              );
            }
          }
        }

        // Se os arquivos carregados tiver algum que pode ser utilizado e que atendisableModalLoadingdisableModalLoadingda os requisitos
        // entra no primeiro IF, se não é exibido logo a mensagem de erro
        if (files.length > 0) {
          this.simplePage.activateModalLoading();
          this.loadFilesWav(files);
        } else {
          this.showMessageErrorWav();
          this.simplePage.disableModalLoading();
        }
      });
  }

  onReaderWav(bufferList: any[]): void {
    let callBackToLoadWav = function (this: FileSoundSphere) {
      this.showMessageErrorWav();
    }.bind(this);
    this.dao.loadBufferList(bufferList, callBackToLoadWav);
  }

  showMessageErrorWav(): void {
    var messages = this.listNamesInvalid.concat(this.dao.listMessagesError);
    console.log("showMessageErrorWav Mensagens de erro");
    console.log(messages);
    if (messages.length > 0) {
      this.simplePage.startErrorModal(messages);
      this.simplePage.render();
    } else {
      console.info("Nenhum arquivo encontrado com erro");
      // console.log("Verificando buffes disponiveis");
      //         console.log(this.dao.listItembuffer)
      this.simplePage.render();
    }
    this.simplePage.disableModalLoading();
  }
}
