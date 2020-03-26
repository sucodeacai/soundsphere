
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class SoundSphereBD {
  soundSphereInfo:SoundSphereInfo
  listItemBuffer:ItemBuffer[]
  listItemMixPanel:ItemMixPanel[][]
  listSemanticDescriptor:SemanticDescriptor[]
  sessionControl: SessionControl;
  
  constructor(listItemBuffer:ItemBuffer[],listItemMixPanel:ItemMixPanel[][],listSemanticDescriptor:SemanticDescriptor[], soundSphereInfo:SoundSphereInfo, sessionControl: SessionControl){
    this.listItemBuffer = listItemBuffer;
    this.listItemMixPanel = listItemMixPanel
    this.soundSphereInfo = soundSphereInfo;
    this.listSemanticDescriptor = listSemanticDescriptor;
    this.sessionControl = sessionControl;
  }
  
}
