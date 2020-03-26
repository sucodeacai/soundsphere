class FileHomeWav extends FileWav {
    listNamesValid: any = [];
    simplePage: PageSoundSphereHome
    constructor(sequenciador: any, dao: DAO, tooltip: Tooltip, simplePage: PageSoundSphereHome) {
        super(sequenciador, dao)


        this.simplePage = simplePage;
        $('#fileHomeWav').on('change', (evt: any) => {
            "use strict";
            console.log("Chamou handledFIleselect file home")
            console.log(this.dao.getListNameOfBuffers())
            this.listNamesInvalid = [];
            this.listNamesValid = this.dao.getListNameOfBuffers();

            let files = [], divLoading = document.getElementById('divLoading'), i, f, reader, audio, result;
            if (navigator.userAgent.match(/Android/i)) {
                files = evt.target.files;
            }
            else {
                for (let i = 0; i < evt.target.files.length; i++) {
                    let sameName = false
                    for (let index = 0; index < this.listNamesValid.length; index++) {
                        if (evt.target.files[i].name == this.listNamesValid[index]) {
                            sameName = true;
                        }

                    }
                    if (sameName) {
                        files.push(evt.target.files[i]);
                    } else {
                        this.listNamesInvalid.push(evt.target.files[i].name + ": - Arquivo não carregado, pois não está na lista");
                    }
                }
            }
            //Se os arquivos carregados tiver algum que pode ser utilizado e que atenda os requisitos
            //ele entra no primeiro IF, se não é exibido logo a mensagem de erro  
            if (files.length == this.listNamesValid.length) {
                if (divLoading) {
                    divLoading.setAttribute('class', 'ui inverted dimmer active');
                }
                //this.dao.listItemBuffer = [];
                this.loadFilesWav(files);
            }
            else {
                this.desativaModalLoad()
                this.showMessageErrorWav();
            }
        });

    }


    onReaderWav(bufferList: any[]): void {
        let callBackToLoadWav = function (this: FileHomeWav) {
            this.desativaModalLoad();
            this.listNamesInvalid = this.listNamesInvalid.concat(this.dao.listMessagesError)
            if (this.listNamesInvalid.length > 0) {
                this.simplePage.showErrorMessageJson3(this.listNamesInvalid)
            }
            console.log("CHEGOUIUUUUUUUUUUUUUUUU")
            this.simplePage.nextStepJson2To3()
        }.bind(this)
        this.dao.loadBufferList(bufferList, callBackToLoadWav, false);
    }

    showMessageErrorWav(): void {

        this.simplePage.showErrorMessageJson2(this.listNamesInvalid)
    }

}




