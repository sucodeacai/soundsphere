"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
document.addEventListener("DOMContentLoaded", function () {
    //pega parametros da url da pagina
    var query = location.search.slice(1);
    var partes = query.split("&");
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split("=");
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
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
    let sequenciador = new Sequenciador(controlFiles, tooltip, daoHome, audioCtx);
    let pageSoundSphereHome = new PageSoundSphereHome(document.getElementById("bodyAplication"), " ", soundSphereInfo, daoHome, sequenciador, tooltip, sessionControl, pixelpersecond);
    let fileMenuBar = new FileMenuBar(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    let fileHomeJson = new FileHomeJson(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    let fileHomeWav = new FileHomeWav(sequenciador, daoHome, tooltip, pageSoundSphereHome);
    let canvas = document.getElementById("canva_painel_mixagem");
    let contextCanvas = canvas.getContext("2d");
    let painel = new Painel(daoHome, contextCanvas, canvas, pageSoundSphereHome, tooltip, pixelpersecond);
    sequenciador.painel = painel;
    pageSoundSphereHome.painel = painel;
    if (daoHome.listItemBuffer.length > 0) {
        painel.reMake();
    }
});
