/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
document.addEventListener("DOMContentLoaded", function () {
  let soundSphereInfo = new SoundSphereInfo();
  let audioCtx: AudioContext | any = new (window.AudioContext ||
    window.webkitAudioContext)();
  let controlFiles = new ControlFiles();
  let tooltip = new Tooltip();
  let listSemanticDescriptors = generatorSemanticDescriptors();
  console.log("Inicia SoundSphere app");
  let sessionControl = new SessionControl();
  let daoHome = new DAOHome(
    soundSphereInfo,
    listSemanticDescriptors,
    audioCtx,
    controlFiles,
    sessionControl
  );
  let sequenciador = new Sequenciador(controlFiles, daoHome, audioCtx);
  let pageLeitor = new PageLeitorJson(soundSphereInfo);
  let fileHomeJson = new FileJsonLeitorJson(
    sequenciador,
    daoHome,
    tooltip,
    pageLeitor
  );
  pageLeitor.dao = daoHome;
});
