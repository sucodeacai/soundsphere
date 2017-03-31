/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
var allDataJSONFile;
function save() {
  var allData = new AllData(sequenciador.bufferList, painel.listItemMixPanel);
  localStorage.setItem("allData", JSON.stringify(allData));
}

function downloadJson() {
  var allData = new AllData(sequenciador.bufferList, painel.listItemMixPanel);
  var a = document.createElement('a');
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
  a.href = 'data:' + data;
  a.download = 'data.json';
  a.click();
}

function downloadLocal() {
  var allData = JSON.parse(localStorage.getItem('allData'));
  console.log("NOME file: " + allData.bufferList[0].name);
  var a = document.getElementById("downloadLocal");
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
  a.href = 'data:' + data;
  a.download = 'data.json';
  a.click();
}
//Função que retorna a lista de buffers no Local Storage
//para informar ao usuario quais arquivos devem ser carregados
function getNameBuffersLS() {
  var allData = JSON.parse(localStorage.getItem('allData'));
  var bufferList = allData.bufferList;
  var nameList = [];
  console.log("bufferList " + bufferList.length);
  for (var i = 0; i < bufferList.length; i++) {


      nameList[i] = bufferList[i].name;

  }
  console.log("name list: " + nameList);
  return nameList;
}
//Função que retorna a lista de do allDataJSONFile
//para informar ao usuario quais arquivos devem ser carregados
function getNameBuffersJSON() {

  var bufferList = allDataJSONFile.bufferList;
  var nameList = [];
  console.log("bufferList " + bufferList.length);
  for (var i = 0; i < bufferList.length; i++) {


      nameList[i] = bufferList[i].name;

  }
  console.log("name list: " + nameList);
  return nameList;
}
//Verificar se o arquivo que esta sendo inserido é valido
function checkFileLoadedLS(name) {
  var allData = JSON.parse(localStorage.getItem('allData'));
  var bufferList = allData.bufferList;
  for (var i = 0; i < bufferList.length; i++) {
    if (bufferList[i].name == name) {
      return true;
    }
  }
  return false;
}
//Verificar se o arquivo que esta sendo inserido é valido
function checkFileLoadedJSON(name) {
  var bufferList = allDataJSONFile.bufferList;
  for (var i = 0; i < bufferList.length; i++) {
    if (bufferList[i].name == name) {
      return true;
    }
  }
  return false;
}
//Função para sincronizar o LS com o SoundSPhere
function synchronizeSoundSphereLS(){
    var allData = JSON.parse(localStorage.getItem('allData'));
    for (var i = 0; i < allData.listItemMixPanel.length; i++) {
      for (var j = 0; j < allData.listItemMixPanel[i].length; j++) {
          var itemMixPanel = new ItemMixPanel();
          itemMixPanel.x = allData.listItemMixPanel[i][j].x;
          itemMixPanel.y = allData.listItemMixPanel[i][j].y;
          itemMixPanel.solo = Boolean(allData.listItemMixPanel[i][j].solo);
          itemMixPanel.startTime = allData.listItemMixPanel[i][j].startTime;
          itemMixPanel.endTime = allData.listItemMixPanel[i][j].endTime;
          itemMixPanel.id = allData.listItemMixPanel[i][j].id;
          itemMixPanel.idBuffer = allData.listItemMixPanel[i][j].idBuffer;
          itemMixPanel.color = allData.listItemMixPanel[i][j].color;
          itemMixPanel.volume = allData.listItemMixPanel[i][j].volume;
          itemMixPanel.seconds = allData.listItemMixPanel[i][j].seconds;
          itemMixPanel.width = allData.listItemMixPanel[i][j].width;
          itemMixPanel.height = allData.listItemMixPanel[i][j].height;
          itemMixPanel.size = allData.listItemMixPanel[i][j].size;
          itemMixPanel.style = allData.listItemMixPanel[i][j].style;
          painel.listItemMixPanel[i][j] = itemMixPanel;
      }
    }
    painel.reMake();
}
//Função para sincronizar o LS com o SoundSPhere
function synchronizeSoundSphereJSON(){
    var allData = allDataJSONFile;
    for (var i = 0; i < allData.listItemMixPanel.length; i++) {
      for (var j = 0; j < allData.listItemMixPanel[i].length; j++) {
          var itemMixPanel = new ItemMixPanel();
          itemMixPanel.x = allData.listItemMixPanel[i][j].x;
          itemMixPanel.y = allData.listItemMixPanel[i][j].y;
          itemMixPanel.solo = Boolean(allData.listItemMixPanel[i][j].solo);
          itemMixPanel.startTime = allData.listItemMixPanel[i][j].startTime;
          itemMixPanel.endTime = allData.listItemMixPanel[i][j].endTime;
          itemMixPanel.id = allData.listItemMixPanel[i][j].id;
          itemMixPanel.idBuffer = allData.listItemMixPanel[i][j].idBuffer;
          itemMixPanel.color = allData.listItemMixPanel[i][j].color;
          itemMixPanel.volume = allData.listItemMixPanel[i][j].volume;
          itemMixPanel.seconds = allData.listItemMixPanel[i][j].seconds;
          itemMixPanel.width = allData.listItemMixPanel[i][j].width;
          itemMixPanel.height = allData.listItemMixPanel[i][j].height;
          itemMixPanel.size = allData.listItemMixPanel[i][j].size;
          itemMixPanel.style = allData.listItemMixPanel[i][j].style;
          painel.listItemMixPanel[i][j] = itemMixPanel;
      }
    }
    painel.reMake();
}
//Informa a quantidade de buffers no LS
function checkBufferListLenghtLS() {
  var allData = JSON.parse(localStorage.getItem('allData'));
  var bufferList = allData.bufferList;
  return bufferList.length;
}
//Informa a quantidade de buffers no JSON
function checkBufferListLenghtJSON() {
  var bufferList = allDataJSONFile.bufferList;
  return bufferList.length;
}
//Verificar se e um arquivo gerado pelo SoundSPhere
function checkValidJSONFile(){
  var allData = JSON.parse(localStorage.getItem('allData'));
  if(allData.bufferList != null && allData.listItemMixPanel != null){
    return true;
  }else{
    return false;
  }
}
