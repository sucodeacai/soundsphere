"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ItemBuffer {
    constructor() {
        //listItemMix: ItemMixPanel[]=[];
        this.buffer = null;
        this.timeDuration = 0;
        this.numberOfChannels = 0;
        this.name = '';
        this.amount = 0;
        this.color = '';
        this.show = true;
    }
    getReducedName() {
        return this.name.slice(0, 9) + '...';
    }
}
