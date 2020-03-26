"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
$(document).ready(function () {
    let soundSphereInfo = new SoundSphereInfo();
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let controlFiles = new ControlFiles();
    let tooltip = new Tooltip();
    let listSemanticDescriptors = generatorSemaitsDescriptors();
    console.log("Inicia SoundSphere app");
    if (window.location.href.indexOf('#filtros') != -1) {
        let pageAdminDescriptors;
        let daoAdminDescriptor = new DAOAdminDescriptors(soundSphereInfo, listSemanticDescriptors, audioCtx, controlFiles);
        let sequenciador = new Sequenciador(controlFiles, tooltip, daoAdminDescriptor, audioCtx);
        pageAdminDescriptors = new PageAdminDescriptors($('#bodyAplication'), "Opções Filtros", soundSphereInfo, sequenciador, daoAdminDescriptor);
        let fileSemanticJson = new FileSemanticJson(sequenciador, daoAdminDescriptor, tooltip, pageAdminDescriptors);
        let fileSemanticWav = new FileSemanticWav(sequenciador, daoAdminDescriptor, tooltip, pageAdminDescriptors);
    }
    else {
        let daoHome = new DAOHome(soundSphereInfo, listSemanticDescriptors, audioCtx, controlFiles);
        let sequenciador = new Sequenciador(controlFiles, tooltip, daoHome, audioCtx);
        let pageSoundSphereHome = new PageSoundSphereHome($('#bodyAplication'), "Opções Filtros", soundSphereInfo, daoHome, sequenciador, tooltip);
        let fileMenuBar = new FileMenuBar(sequenciador, daoHome, tooltip, pageSoundSphereHome);
        let fileHomeJson = new FileHomeJson(sequenciador, daoHome, tooltip, pageSoundSphereHome);
        let fileHomeWav = new FileHomeWav(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    }
});
