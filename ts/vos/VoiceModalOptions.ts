class VoiceModalOptions extends VoiceCommand{
    pageSoundSphereHome:PageSoundSphereHome
    constructor(tooltip: Tooltip,  pageSoundSphereHome:PageSoundSphereHome){
        super(tooltip,['nenhum','pesado','leve','grande','pequeno','escuro','brilhante','quente','frio'])
        this.pageSoundSphereHome =pageSoundSphereHome
    }
    actions(comand:string){
        switch (comand) {
            case "nenhum":
              console.log("-Comando de voz Nennhum")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(0)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(undefined);
               break;
            case "pesado":
              console.log("-Comando de voz abafado")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(1)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(0);
              break;
            case "leve":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(2)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "grande":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(3)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "pequeno":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(4)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "escuro":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(5)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "brilhante":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(6)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "quente":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(7)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            case "frio":
              console.log("-Comando de voz estridente")
              $('#select-filter option:selected').removeAttr('selected');
              $('select>option:eq(8)').prop('selected', true);
              this.pageSoundSphereHome.setSemanticDescriptor(1);
              break;
            default:
              console.log("-Comando não encontrado.");
          }

    }
}