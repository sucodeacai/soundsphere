/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/

abstract class FileJson extends FileAPI {
  abstract showMessageErrorJson(mensagem: string): void;
  abstract onReaderJson(evt: any): any;
  /**
   * @param  {any} sequenciador
   * @param  {DAO} dao
   */
  constructor(sequenciador: any, dao: DAO) {
    super(sequenciador, dao);
    const fileJSONInput = document.getElementById(
      "fileJSON"
    ) as HTMLInputElement | null;

    if (fileJSONInput) {
      fileJSONInput.addEventListener("change", (evt) => {
        const target = evt.target as HTMLInputElement;

        if (target && target.files && target.files[0]) {
          const name = target.files[0].name;

          if (name.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = (evt) => {
              this.onReaderJson(evt);
            };
            reader.readAsText(target.files[0]);
          } else {
            this.showMessageErrorJson(
              "O arquivo enviado não é do formato JSON"
            );
          }
        }
      });
    }
  }
}
