"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
document.addEventListener("DOMContentLoaded", function () {
    //pega parametros da url da pagina
    let data = getUrlParams();
    let pixelpersecond = data.pixelpersecond != undefined ? +data.pixelpersecond : 20;
    //fim pega parametros
    let soundSphereInfo = new SoundSphereInfo();
    let audioCtx = new (window.AudioContext ||
        window.webkitAudioContext)();
    let controlFiles = new ControlFiles();
    let tooltip = new Tooltip();
    let listSemanticDescriptors = generatorSemanticDescriptors();
    let sessionControl = new SessionControl();
    sessionControl.newEventSession();
    let daoHome = new DAOHome(soundSphereInfo, listSemanticDescriptors, audioCtx, controlFiles, sessionControl);
    let sequenciador = new Sequenciador(controlFiles, daoHome, audioCtx);
    let canvas = document.getElementById("canva_painel_mixagem");
    let contextCanvas = canvas.getContext("2d");
    let painel = new Painel(daoHome, contextCanvas, canvas, pixelpersecond, sequenciador);
    let pageSoundSphereHome = new PageSoundSphereHome(document.getElementById("bodyAplication"), " ", soundSphereInfo, daoHome, sequenciador, tooltip, sessionControl, painel);
    painel.pageSoundSphereHome = pageSoundSphereHome;
    let fileSoundSphereStart = new FileWavSoundSphereNew(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    let fileSoundSphereCotinue = new FileWavSoundSphereContinue(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    let fileHomeJson = new FileJsonSoundSphere(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    sequenciador.painel = painel;
    if (daoHome.listItemBuffer.length > 0) {
        painel.reMake();
    }
});
