class SoundSphereInfo {
  name: string;
  version: string;
  JSONFileStructureVersion: string;

  beta: boolean;
  constructor() {
    this.name = "SoundSphere";

    //**************************************** */
    // ATENÇÃO LEMBRAR DE TROCAR VERSÃO
    //**************************************** */

    this.version = "1.7";
    this.JSONFileStructureVersion = "1.7";
    this.beta = true;
  }
  getVersion(): string {
    return this.version;
  }
  getFullName(): string {
    return `${this.name} - ${this.version}`;
  }
  getColorTitle(): string {
    return this.beta ? "red" : "black";
  }
}
