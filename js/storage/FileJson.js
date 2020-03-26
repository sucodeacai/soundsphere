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
        $('#fileJSON').on('change', (evt) => {
            let name = evt.target.files[0].name;
            if (name.endsWith(".json")) {
                let reader = new FileReader();
                reader.onload = (evt) => {
                    this.onReaderJson(evt);
                };
                reader.readAsText(evt.target.files[0]);
            }
            else {
                this.showMessageErrorJson("O arquivo enviado não é do formato JSON");
            }
        });
    }
}
