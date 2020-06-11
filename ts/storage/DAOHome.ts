class DAOHome extends DAO {
    soundSphereDBToJson(listItemBuffer: ItemBuffer[], listItemMixPanel: ItemMixPanel[][], listSemanticDescriptor: SemanticDescriptor[]) {
        return new SoundSphereBD(listItemBuffer, listItemMixPanel, this.listSemanticDescriptors, this.soundSphereInfo, this.sessionControl);
    }
    pushItemMixPanel(itemMixPanel: ItemMixPanel) {
       let newItem = new ItemMixPanel();
       newItem.x = itemMixPanel.x;
       newItem.y = itemMixPanel.y;
       newItem.width = itemMixPanel.width;
       newItem.height = itemMixPanel.height;
       newItem.startTime = itemMixPanel.startTime;
       newItem.endTime = itemMixPanel.endTime;
       newItem.color = itemMixPanel.color;
       newItem.seconds = itemMixPanel.seconds;
       newItem.setVolume(itemMixPanel.getVolume())
       newItem.solo = itemMixPanel.solo;
       newItem.linha = itemMixPanel.linha;
       newItem.setIdSemanticDescriptor(itemMixPanel.getidSemanticDescriptor())
       newItem.setCodeSemanticDescriptor(itemMixPanel.getCodeSemanticDescriptor())
       newItem.id = itemMixPanel.id;
       newItem.descriptiveIcon = itemMixPanel.descriptiveIcon;
       newItem.idBuffer = itemMixPanel.idBuffer;
    
        this.sessionControl.addEventItemMixPanel(new EventItemMixPanel(newItem, EventsCRUD.INSERT));
        
        if (this.listItemMixPanel[itemMixPanel.linha] == undefined) {
            this.listItemMixPanel[itemMixPanel.linha] = new Array();
            this.listItemMixPanel[itemMixPanel.linha].push(itemMixPanel);
        } else {
            this.listItemMixPanel[itemMixPanel.linha].push(itemMixPanel);
        }
    }
    restartMixing(): void {
      
        for (let linha = 0; linha < this.listItemMixPanel.length; linha++) {
            if(this.listItemMixPanel[linha]){
                for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
                    if (this.listItemMixPanel[linha][index].excluded == false) {
                        this.deleteItemMixPanel(this.listItemMixPanel[linha][index], linha);
                    }
                }
            }
         
        }
    }
    deleteItemMixPanel(itemMixPanel: ItemMixPanel, linha: number) {
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
    updateItemMixPane(itemMixPanel: ItemMixPanel, linha: number, newLinha: number, sizeTrail: number) {
        console.log("LINHA: "+linha+" new linha: "+newLinha);
        console.log("Description:: "+itemMixPanel.descriptiveIcon);
        let alteração = false;
        if (linha == newLinha) {
            for (let index = 0; index < this.listItemMixPanel[linha].length; index++) {
                //Se for diferente do item que estamos tentando inserir
                if (this.listItemMixPanel[linha][index].id == itemMixPanel.id) {
                    //Se teve alguma alteração no item ele faz a alteração e retorna true iformando que teve alterações
                    //se nao ele retorna false
                    console.log("Entrou no  id == id");
                    console.log("this.listItemMixPanel[linha][index].descriptiveIcon: "+this.listItemMixPanel[linha][index].descriptiveIcon);
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
                        console.log("xxxitemMixPanel.descriptiveIcon: "+itemMixPanel.descriptiveIcon);
                        this.listItemMixPanel[linha][index].descriptiveIcon = itemMixPanel.descriptiveIcon;
                        this.listItemMixPanel[linha][index].changeStardValues();
                    }
                }
            }

        } else {
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
            } else {
                this.listItemMixPanel[newLinha].push(itemMixPanel);
            }
        }
        if (alteração) {
            console.log("TEVE ALTERAÇão");
            this.sessionControl.addEventItemMixPanel(new EventItemMixPanel(itemMixPanel, EventsCRUD.UPDATE));
            return alteração;
        } else {
            return alteração;
        }
    }
}



