/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
$(document).ready(function () {
  let soundSphereInfo = new SoundSphereInfo();
  let audioCtx: AudioContext | any = new (window.AudioContext || window.webkitAudioContext)();
  let controlFiles = new ControlFiles();
  let tooltip = new Tooltip();
  let listSemanticDescriptors = generatorSemaitsDescriptors();
  console.log("Inicia SoundSphere app")
  let sessionControl = new SessionControl();
  sessionControl.newEventSession();

  let pageAdminDescriptors;
  let daoAdminDescriptor = new DAOAdminDescriptors(soundSphereInfo, listSemanticDescriptors, audioCtx, controlFiles,sessionControl);
  let sequenciador = new Sequenciador(controlFiles, tooltip, daoAdminDescriptor, audioCtx);
  pageAdminDescriptors = new PageAdminDescriptors($('#bodyAplication'), " TOE - Semantics-Timbre Operator Editor", soundSphereInfo, sequenciador, daoAdminDescriptor);
  let fileSemanticJson = new FileSemanticJson(sequenciador, daoAdminDescriptor, tooltip, pageAdminDescriptors);
  let fileSemanticWav = new FileSemanticWav(sequenciador, daoAdminDescriptor, tooltip, pageAdminDescriptors);

});
