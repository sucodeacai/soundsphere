/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/

var painel;
var canvas;
var contextCanvas
var controlPainel;
var controlSoundIcon = new ControlSoundIcon();
var sequenciador = new Sequenciador();
$(document).ready(function() {
  canvas = document.getElementById("canvas2");
  contextCanvas = canvas.getContext("2d");


  painel = new Painel(contextCanvas, canvas);
  controlPainel = new ControlPainel(contextCanvas, canvas, painel);

  $('.musicicon').popup();
  $('.ui.button').popup();

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  document.getElementById('fileJSON').addEventListener('change', handleFileSelectJSON, false);
  document.getElementById('filesLS').addEventListener('change', handleFileSelectLS, false);
  document.getElementById('filesAudioToJson').addEventListener('change', handleFileSelectAudioToJSON, false);
  //  document.getElementById('fileJSON').addEventListener('change', handleFileSelectJSON, false);
  //Welcome
  $('#modalWelcome').modal({
    allowMultiple: false
  });
  startModalWelcome();
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
  } else {
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
  files.click();
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
