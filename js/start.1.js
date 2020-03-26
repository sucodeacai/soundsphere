"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
var testes;
var painel;
var canvas;
var contextCanvas;
var controlPainel;
var controlSoundIcon = new ControlSoundIcon();
//var sequenciador = new Sequenciador();
var listSemanticDescriptors;
var myModal;
$(document).ready(function () {
    // let soundSphereInfo = new SoundSphereInfo();
    // let audioCtx: AudioContext| any = new (window.AudioContext || window.webkitAudioContext)();
    // canvas = document.getElementById("canvas2");
    // contextCanvas = canvas.getContext("2d");
    painel = new Painel(contextCanvas, canvas);
    controlPainel = new ControlPainel(contextCanvas, canvas, painel);
    listSemanticDescriptors = generatorSemaitsDescriptors();
    $('.musicicon').popup();
    $('.ui.button').popup();
    //  document.getElementById('fileJSON').addEventListener('change', handleFileSelectJSON, false);
    //Welcome
    $('#modalWelcome').modal({
        allowMultiple: false
    });
    //Verifica se #filtros esta como parametro e chama o modal filtros
    if (window.location.href.indexOf('#filtros') != -1) {
        let controlFiles = new ControlFiles();
        let tooltip = new Tooltip();
        console.log("controlFiles");
        console.log(controlFiles.getColor(0));
        let descriptorPage;
        let daoAdminDescriptor = new DAOAdminDescriptors(soundSphereInfo, listSemanticDescriptors, audioCtx);
        let sequenciador = new Sequenciador(controlFiles, tooltip, daoAdminDescriptor, audioCtx);
        descriptorPage = new PageAdminDescriptors($('#bodyAplication'), "Opções Filtros", soundSphereInfo, sequenciador, daoAdminDescriptor);
        let filesAdminDescriptor = new FilesAdminDescriptor(controlFiles, sequenciador, daoAdminDescriptor, tooltip, descriptorPage);
    }
    else {
        document.getElementById('filesLS').addEventListener('change', handleFileSelectLS, false);
        document.getElementById('filesAudioToJson').addEventListener('change', handleFileSelectAudioToJSON, false);
        setSettingsStorageHome();
        setSettingsFileApiHome();
        startModalWelcome();
    }
});
function startModalWelcome() {
    $('#modalWelcome').modal({
        blurring: true
    }).modal('setting', 'transition', 'fade up').modal('show');
    $('#optionsDownload').modal({
        blurring: true
    }).modal('setting', 'transition', 'fade up');
    $('#modalContinue').modal({
        blurring: true
    }).modal('setting', 'transition', 'horizontal flip').modal('attach events', '.first.modal .button.orange');
    $('#modalStep1JSON').modal({
        blurring: true
    }).modal('setting', 'transition', 'horizontal flip').modal('attach events', '.first.modal .button.green');
    $('#modalOkLS').modal({
        blurring: true
    }).modal('setting', 'transition', 'horizontal flip');
    if (localStorage.getItem('allData') == null) {
        $('#buttonContinueLocal').attr("data-title", "Atenção").removeClass("orange")
            .attr("data-content", "Ainda não foi realizado nenhum projeto nesse dispositivo.")
            .popup({
            inline: true,
            hoverable: true,
            position: 'top left',
            delay: {
                show: 300,
                hide: 200
            }
        });
    }
    else {
        var listFiles = document.getElementById('mensagemLS');
        var listName = getNameBuffersLS();
        for (var i = 0; i < listName.length; i++) {
            var divColumn = document.createElement("div");
            divColumn.className = "column";
            var divUiBL = document.createElement("div");
            divUiBL.className = "ui bulleted list";
            var divItem = document.createElement("div");
            divItem.className = "item";
            var conteudoNovo = document.createTextNode(listName[i]);
            divItem.appendChild(conteudoNovo);
            divUiBL.appendChild(divItem);
            divColumn.appendChild(divUiBL);
            listFiles.appendChild(divColumn);
        }
    }
}
function closeModalWelcome() {
    $('#modalWelcome').modal('hide');
    sequenciador.stop();
    filesWav.click();
}
function closeModalOKLS() {
    $('#modalOkLS').modal('hide');
}
function closeModalContinue() {
    $('#modalContinue').modal('hide');
}
function closeModalStep1JSON() {
    $('#modalStep1JSON').modal('hide');
}
function showOptionsDownload() {
    $('#optionsDownload').modal('show');
}
function closeOptionsDownload() {
    $('#optionsDownload').modal('hide');
}
