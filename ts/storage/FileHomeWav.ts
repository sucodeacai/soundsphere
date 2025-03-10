class FileHomeWav extends FileWav {
  listNamesValid: any = [];
  simplePage: PageSoundSphereHome;
  constructor(
    sequenciador: any,
    dao: DAO,
    tooltip: Tooltip,
    simplePage: PageSoundSphereHome
  ) {
    super(sequenciador, dao);

    this.simplePage = simplePage;
    const fileHomeWavInput = document.getElementById(
      "fileHomeWav"
    ) as HTMLInputElement | null;

    if (fileHomeWavInput) {
      fileHomeWavInput.addEventListener("change", (evt) => {
        "use strict";

        this.listNamesInvalid = [];
        this.listNamesValid = this.dao.getListNameOfBuffers();

        let files: File[] = []; // Agora usamos File[], que é um array real

        console.warn("xxxxxxxxxxxxxx. div loading");
        let divLoading = document.getElementById("divLoading");

        // Verificando se o dispositivo é Android
        if (navigator.userAgent.match(/Android/i)) {
          files = Array.from((evt.target as HTMLInputElement).files || []); // Converte o FileList para um array
        } else {
          const targetFiles = (evt.target as HTMLInputElement).files;

          if (targetFiles) {
            for (let i = 0; i < targetFiles.length; i++) {
              let sameName = false;
              for (let index = 0; index < this.listNamesValid.length; index++) {
                if (targetFiles[i].name === this.listNamesValid[index]) {
                  sameName = true;
                }
              }

              if (sameName) {
                files.push(targetFiles[i]);
              } else {
                this.listNamesInvalid.push(
                  `${targetFiles[i].name}: - Arquivo não carregado, pois não foi utilizado na mixagem anterior.`
                );
              }
            }
          }
        }

        // Se os arquivos carregados atendem os requisitos
        if (files.length === this.listNamesValid.length) {
          if (divLoading) {
            divLoading.setAttribute("class", "ui inverted dimmer active");
          }
          this.loadFilesWav(files);
        } else {
          this.desativaModalLoad();
          this.showMessageErrorWav();
        }
      });
    }
  }

  onReaderWav(bufferList: any[]): void {
    let callBackToLoadWav = function (this: FileHomeWav) {
      this.desativaModalLoad();
      this.listNamesInvalid = this.listNamesInvalid.concat(
        this.dao.listMessagesError
      );
      if (this.listNamesInvalid.length > 0) {
        this.simplePage.showErrorMessageJson3(this.listNamesInvalid);
      }
      console.log("CHEGOUIUUUUUUUUUUUUUUUU");
      this.simplePage.nextStepJson2To3();
    }.bind(this);
    this.dao.loadBufferList(bufferList, callBackToLoadWav, false);
  }

  showMessageErrorWav(): void {
    this.simplePage.showErrorMessageJson2(this.listNamesInvalid);
  }
}
