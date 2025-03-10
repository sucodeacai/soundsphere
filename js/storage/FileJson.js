"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class FileJson extends FileAPI {
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     */
    constructor(sequenciador, dao) {
        super(sequenciador, dao);
        const fileJSONInput = document.getElementById("fileJSON");
        if (fileJSONInput) {
            fileJSONInput.addEventListener("change", (evt) => {
                const target = evt.target;
                if (target && target.files && target.files[0]) {
                    const name = target.files[0].name;
                    if (name.endsWith(".json")) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                            this.onReaderJson(evt);
                        };
                        reader.readAsText(target.files[0]);
                    }
                    else {
                        this.showMessageErrorJson("O arquivo enviado não é do formato JSON");
                    }
                }
            });
        }
    }
}
