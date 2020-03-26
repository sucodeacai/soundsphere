"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class FileAPI {
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     */
    constructor(sequenciador, dao) {
        this.listNamesInvalid = [];
        this.type = "FileApi Object";
        this.sequenciador = sequenciador;
        this.dao = dao;
    }
    //Função chamada pelo FileApi para inserir mensagens de erro a serem exibidas
    //Pode ser chamada pelo sequenciador e pelo proprio file API
    addErrorMensage(lista) {
        for (var i = 0; i < lista.length; i++) {
            this.listNamesInvalid.push(lista[i]);
        }
    }
    //função para desativar a tela de carregamento  
    desativaModalLoad() {
        let divLoading = document.getElementById('divLoading');
        if (divLoading) {
            divLoading.setAttribute('class', 'ui inverted dimmer desactive');
        }
    }
}
