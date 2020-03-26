/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ItemBuffer {
     //listItemMix: ItemMixPanel[]=[];
     buffer:any=null;
     timeDuration:number=0;
     numberOfChannels:number=0;
     name:string='';
     amount:number=0;
     color:string='';
     getReducedName():string{
        return this.name.slice(0, 9) + '...';
  
     }
  }
