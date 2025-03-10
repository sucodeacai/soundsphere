abstract class SimplePage {
  abstract generateAttributes(): string;
  abstract generateActions(): string;
  abstract setSettingsActions(): void;
  abstract setSettingsAttributes(): void;
  abstract getNameClass(): string;
  abstract generateHTML(): void;
  abstract render(): void;
  abstract startTemplate(): void;
  abstract activateModalLoading(): void;
  abstract disableModalLoading(): void;
  containerElement: HTMLElement | null;
  titulo: string;
  soundSphereInfo: SoundSphereInfo;
  dao: DAO;
  sequenciador: Sequenciador;

  constructor(
    containerElement: HTMLElement | null,
    titulo: string,
    soundSphereInfo: SoundSphereInfo,
    dao: DAO,
    sequenciador: Sequenciador
  ) {
    this.containerElement = containerElement;
    this.titulo = titulo ? titulo : "";
    this.dao = dao;
    this.sequenciador = sequenciador;
    this.soundSphereInfo = soundSphereInfo;
  }
}
