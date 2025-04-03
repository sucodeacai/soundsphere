class FileJsonLeitorJson extends FileJson {
  simplePage: PageLeitorJson;
  constructor(
    sequenciador: any,
    dao: DAO,
    tooltip: Tooltip,
    simplePage: PageLeitorJson
  ) {
    super(sequenciador, dao);
    this.simplePage = simplePage;
  }
  showMessageErrorJson(mensagem: string) {
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
      this.simplePage.showInfo();
    } else {
      this.simplePage.showErrorContinueJsonSoundSphereVersion(
        this.dao.soundSphereInfo.getFullName()
      );
    }
  }
}
