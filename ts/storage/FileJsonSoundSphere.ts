class FileJsonSoundSphere extends FileJson {
  simplePage: PageSoundSphereHome;
  constructor(
    sequenciador: any,
    dao: DAO,
    tooltip: Tooltip,
    simplePage: PageSoundSphereHome
  ) {
    super(sequenciador, dao);
    this.simplePage = simplePage;
  }
  showMessageErrorJson(mensagem: string) {
    console.log("showMessageErrorJson");
    console.log(mensagem);
    this.simplePage.updateModalContinueErrorJsonFile(mensagem);
  }
  onReaderJson(evt: any): any {
    let soundSphereDB = JSON.parse(evt.target.result);
    //console.log(soundSphereDB)
    if (
      soundSphereDB.soundSphereInfo != undefined &&
      soundSphereDB.soundSphereInfo.JSONFileStructureVersion ==
        this.dao.soundSphereInfo.JSONFileStructureVersion
    ) {
      this.dao.synchronizeSoundSphereDB(soundSphereDB);
      //Se nao tem nenhum arquivo obrigatorio para carregar
      this.simplePage.updateModalContinueEnterWavFiles(
        this.dao.getListNameOfBuffers()
      );
    } else {
      this.simplePage.showErrorContinueJsonSoundSphereVersion(
        this.dao.soundSphereInfo.getFullName()
      );
    }
  }
}
