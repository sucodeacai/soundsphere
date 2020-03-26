class VoiceMenuBar extends VoiceCommand{
    pageSoundSphereHome:PageSoundSphereHome
    constructor(tooltip: Tooltip,  pageSoundSphereHome:PageSoundSphereHome){
        super(tooltip,['iniciar','pausar','parar'])
        this.pageSoundSphereHome =pageSoundSphereHome
    }
    actions(comand:string){
        switch (comand) {
            case "iniciar":
              console.log("Comando de voz Play")
              this.pageSoundSphereHome.playMixagem();
              break;
            case "pausar":
              console.log("Comando de voz pause")
              this.pageSoundSphereHome.pauseMixagem();
              break;
            case "parar":
              console.log("Comando de voz stop")
              //sequenciador.stop();
              this.pageSoundSphereHome.stopMixagem()
              break;
            default:
              console.log("Comando não encontrado.");
          }

    }
}