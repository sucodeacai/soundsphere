"use strict";
class DAOHome extends DAO {
    soundSphereDBToJson(listItemBuffer, listItemMixPanel, listSemanticDescriptor) {
        return new SoundSphereBD(listItemBuffer, listItemMixPanel, this.listSemanticDescriptors, this.soundSphereInfo, this.sessionControl);
    }
    pushItemMixPanel(itemMixPanel) {
        this.sessionControl.addEventItemMixPanel(new EventItemMixPanel(itemMixPanel, EventsCRUD.INSERT));
        if (this.listItemMixPanel[itemMixPanel.linha] == undefined) {
            this.listItemMixPanel[itemMixPanel.linha] = new Array();
            this.listItemMixPanel[itemMixPanel.linha].push(itemMixPanel);
        }
        else {
            this.listItemMixPanel[itemMixPanel.linha].push(itemMixPanel);
        }
    }
    restartMixing() {
        for (let linha = 0; linha < this.listItemMixPanel.length; linha++) {
            if (this.listItemMixPanel[linha]) {
                for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
                    if (this.listItemMixPanel[linha][index].excluded == false) {
                        this.deleteItemMixPanel(this.listItemMixPanel[linha][index], linha);
                    }
                }
            }
        }
    }
    deleteItemMixPanel(itemMixPanel, linha) {
        //console.log("this.DAOHome.listItemMixPanel[linha].push(itemMixPanel)")
        //console.log(this.DAOHome.listItemMixPanel)
        for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
            if (this.listItemMixPanel[linha][index].id == itemMixPanel.id) {
                this.listItemMixPanel[linha][index].excluded = true;
                this.sessionControl.addEventItemMixPanel(new EventItemMixPanel(this.listItemMixPanel[linha][index], EventsCRUD.DELETE));
                //Informar para o sequencaidor que é necessario refazer a mixagem do play/download
                break;
            }
        }
    }
    updateItemMixPane(itemMixPanel, linha, newLinha, sizeTrail) {
        let alteração = false;
        if (linha == newLinha) {
            for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
                //Se for diferente do item que estamos tentando inserir
                if (this.listItemMixPanel[linha][index].id == itemMixPanel.id) {
                    //Se teve alguma alteração no item ele faz a alteração e retorna true iformando que teve alterações
                    //se nao ele retorna false
                    if (!this.listItemMixPanel[linha][index].equals(itemMixPanel)) {
                        alteração = true;
                        console.log("ALTERANDO: " + itemMixPanel.getCodeSemanticDescriptor());
                        this.listItemMixPanel[linha][index].setVolume(itemMixPanel.getVolume());
                        this.listItemMixPanel[linha][index].setIdSemanticDescriptor(itemMixPanel.getidSemanticDescriptor());
                        this.listItemMixPanel[linha][index].setCodeSemanticDescriptor(itemMixPanel.getCodeSemanticDescriptor());
                        console.log("itemMixPanel.getCodeSemanticDescriptor() " + itemMixPanel.getCodeSemanticDescriptor());
                        this.listItemMixPanel[linha][index].startTime = itemMixPanel.startTime;
                        this.listItemMixPanel[linha][index].x = itemMixPanel.x;
                        this.listItemMixPanel[linha][index].endTime = itemMixPanel.endTime;
                        this.listItemMixPanel[linha][index].solo = itemMixPanel.solo;
                        this.listItemMixPanel[linha][index].changeStardValues();
                    }
                }
            }
        }
        else {
            //Se ele entra no segundo else então teve alteração ao menos da linha, e se alterou a linha é pq alterou o tempo
            //e teve colisão
            alteração = true;
            //console.log("Teve que mduar para a linha: " + newLinha)
            for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
                //Se for diferente do item que estamos tentando inserir
                if (this.listItemMixPanel[linha][index].id == itemMixPanel.id) {
                    this.listItemMixPanel[linha].splice(index, 1);
                }
            }
            //Atualiza a nova linha no item
            itemMixPanel.linha = newLinha;
            if (this.listItemMixPanel[newLinha] == undefined) {
                itemMixPanel.y = ((newLinha * sizeTrail) + (sizeTrail / 2));
                this.listItemMixPanel[newLinha] = new Array();
                this.listItemMixPanel[newLinha].push(itemMixPanel);
            }
            else {
                this.listItemMixPanel[newLinha].push(itemMixPanel);
            }
        }
        if (alteração) {
            this.sessionControl.addEventItemMixPanel(new EventItemMixPanel(itemMixPanel, EventsCRUD.UPDATE));
            return alteração;
        }
        else {
            return alteração;
        }
    }
}
