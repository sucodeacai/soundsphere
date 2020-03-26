"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
var listNamesInvalid;
var controlColor = new ControlColor();
var desativarLoading;
//Função para desativar o loading
function setShowErorMessageModal() {
    showErrorValidation = function () {
        "use strict";
        desativaModalLoad();
        //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
        if (listNamesInvalid.length > 0) {
            var contentInvalidNames = document.getElementById("contentInvalidNames");
            while (contentInvalidNames.firstChild) {
                contentInvalidNames.removeChild(contentInvalidNames.firstChild);
            }
            for (var i = 0; i < listNamesInvalid.length; i++) {
                var p = document.createElement('p');
                p.innerHTML = listNamesInvalid[i];
                contentInvalidNames.appendChild(p);
            }
            $('#modalInvalidFiles').modal({
                onHide: function () {
                    listNamesInvalid = [];
                    contentInvalidNames.innerHTML = "";
                }
            }).modal('show');
        }
    };
}
function setShowErorMessageToast() {
    showErrorValidation = function () {
        "use strict";
        desativaModalLoad();
        //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
        if (listNamesInvalid.length > 0) {
            for (var i = 0; i < listNamesInvalid.length; i++) {
                myModal.showErroMessage(listNamesInvalid[i]);
            }
        }
        myModal.render();
    };
}
function desativaModalLoad() {
    var divLoading = document.getElementById('divLoading');
    divLoading.setAttribute('class', 'ui inverted dimmer desactive');
}
//Função responsavel por fazer o carregamento dos arquivos de audio
function handleFileSelect(evt) {
    "use strict";
    sequenciador.stop();
    listNamesInvalid = [];
    var files = [], divLoading = document.getElementById('divLoading'), i, f, reader, audio, result;
    if (navigator.userAgent.match(/Android/i)) {
        files = evt.target.files;
    }
    else {
        for (var i = 0; i < evt.target.files.length; i++) {
            if (evt.target.files[i].type == "audio/wav" && !(controlColor.fileLoaded(evt.target.files[i].name))) {
                files.push(evt.target.files[i]);
            }
            else if (evt.target.files[i].type == "audio/wav") {
                listNamesInvalid.push(evt.target.files[i].name + ": -Arquivo já carregado/ File already loaded");
            }
            else {
                listNamesInvalid.push(evt.target.files[i].name + ": -Formanto inválido/ Invalid format");
            }
        }
    }
    if (files.length > 0) {
        divLoading.setAttribute('class', 'ui inverted dimmer active');
        loadFiles(files, showErrorValidation);
    }
    else {
        showErrorValidation();
    }
}
;
function loadFiles(files, callback) {
    var listNames = [], bufferList = [], nameList = [], contador = 0;
    //Nome dos arquivos que vao ser carregados
    for (i = 0; i < files.length; i = i + 1) {
        listNames[i] = files[i].name;
    }
    for (i = 0; i < files.length; i = i + 1) {
        f = files[i];
        reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (evt) {
                bufferList[contador] = evt.target.result;
                nameList[contador] = theFile.name;
                contador = contador + 1;
                if (contador == files.length) {
                    sequenciador.loadBufferList(bufferList, nameList, callback);
                }
            };
        })(f);
        reader.readAsArrayBuffer(f);
    }
}
//Função para o carregamento dos arquivos para continuação caso o usuário
//decida utilizar o Local Storage
function handleFileSelectLS(evt) {
    "use strict";
    sequenciador.stop();
    listNamesInvalid = [];
    var files = [], divLoading = document.getElementById('divLoading'), i, f, reader, audio, result;
    if (navigator.userAgent.match(/Android/i)) {
        files = evt.target.files;
    }
    else {
        for (var i = 0; i < evt.target.files.length; i++) {
            if (evt.target.files[i].type == "audio/wav" && (checkFileLoadedLS(evt.target.files[i].name))) {
                files.push(evt.target.files[i]);
            }
            else if (evt.target.files[i].type == "audio/wav") {
                listNamesInvalid.push(evt.target.files[i].name + ": - O arquivo não foi carregado pois não esta na lista.");
            }
            else {
                listNamesInvalid.push(evt.target.files[i].name + ": - Formanto inválido/ Invalid format");
            }
        }
    }
    //A lista de arquivos validos deve ser igual ao tamanho da listBuffer LS
    //se nao o sistema nao faz a leitura dos arquivos
    if (checkBufferListLenghtLS() == files.length) {
        divLoading.setAttribute('class', 'ui inverted dimmer active');
        loadFiles(files, desativarLoadingLSOK);
    }
    else {
        listNamesInvalid.push("Não foram enviados todos os arquivos da lista.");
        desativarLoadingLSError(listNamesInvalid);
    }
}
//Função para o carregamento dos arquivos para continuação caso o usuário
//decida utilizar o JSON
function handleFileSelectAudioToJSON(evt) {
    "use strict";
    sequenciador.stop();
    listNamesInvalid = [];
    var files = [], divLoading = document.getElementById('divLoading'), i, f, reader, audio, result;
    if (navigator.userAgent.match(/Android/i)) {
        files = evt.target.files;
    }
    else {
        for (var i = 0; i < evt.target.files.length; i++) {
            if (evt.target.files[i].type == "audio/wav" && (checkFileLoadedJSON(evt.target.files[i].name))) {
                files.push(evt.target.files[i]);
            }
            else if (evt.target.files[i].type == "audio/wav") {
                listNamesInvalid.push(evt.target.files[i].name + ": - O arquivo não foi carregado pois não esta na lista.");
            }
            else {
                listNamesInvalid.push(evt.target.files[i].name + ": - Formanto inválido/ Invalid format");
            }
        }
    }
    //A lista de arquivos validos deve ser igual ao tamanho da listBuffer LS
    //se nao o sistema nao faz a leitura dos arquivos
    if (checkBufferListLenghtJSON() == files.length) {
        divLoading.setAttribute('class', 'ui inverted dimmer active');
        loadFiles(files, desativarLoadingJSONOK);
    }
    else {
        listNamesInvalid.push("Não foram enviados todos os arquivos da lista.");
        desativarLoadingJSONError(listNamesInvalid);
    }
}
//Desativa loading especifico para se o usuario optar por continuar a partir do
//local storage, caso não tenha enviado os arquivos solicitados
function desativarLoadingLSError() {
    "use strict";
    var divLoading = document.getElementById('divLoading');
    divLoading.setAttribute('class', 'ui inverted dimmer desactive');
    //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
    if (listNamesInvalid.length > 0) {
        var divMessageError = document.getElementById('messageErrorModalContinue');
        var divError = document.createElement('div');
        divError.setAttribute('class', 'ui error message');
        var icon = document.createElement('i');
        icon.setAttribute('class', 'close icon');
        var divHeader = document.createElement('div');
        divHeader.setAttribute('class', 'header');
        divHeader.innerHTML = "Atenção!";
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'list');
        for (var i = 0; i < listNamesInvalid.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = listNamesInvalid[i];
            ul.appendChild(li);
        }
        divError.appendChild(icon);
        divError.appendChild(divHeader);
        divError.appendChild(ul);
        divMessageError.innerHTML = "";
        divMessageError.appendChild(divError);
    }
}
//Desativa loading especifico para se o usuario optar por continuar a partir do
//JSON, caso não tenha enviado os arquivos solicitados
function desativarLoadingJSONError() {
    "use strict";
    var divLoading = document.getElementById('divLoading');
    divLoading.setAttribute('class', 'ui inverted dimmer desactive');
    //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
    if (listNamesInvalid.length > 0) {
        var divMessageError = document.getElementById('mensageStep2JSON');
        var divError = document.createElement('div');
        divError.setAttribute('class', 'ui error message');
        var icon = document.createElement('i');
        icon.setAttribute('class', 'close icon');
        var divHeader = document.createElement('div');
        divHeader.setAttribute('class', 'header');
        divHeader.innerHTML = "Atenção!";
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'list');
        for (var i = 0; i < listNamesInvalid.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = listNamesInvalid[i];
            ul.appendChild(li);
        }
        divError.appendChild(icon);
        divError.appendChild(divHeader);
        divError.appendChild(ul);
        divMessageError.innerHTML = "";
        divMessageError.appendChild(divError);
    }
}
//Desativa loading especifico para se o usuario optar por continuar a partir do
//local storage, caso o usuario tenha enviado os arquivos solicitados
//e caso ele tenha enviado os arquivos solicitados e arquivos a mais
function desativarLoadingLSOK() {
    "use strict";
    $('#modalOkLS').modal('show');
    var divLoading = document.getElementById('divLoading');
    divLoading.setAttribute('class', 'ui inverted dimmer desactive');
    //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
    if (listNamesInvalid.length > 0) {
        var divFather = document.getElementById('messageAttentionModalOkLS');
        var divMessageAT = document.createElement('div');
        divMessageAT.setAttribute('class', 'ui warning icon message');
        var icon = document.createElement('i');
        icon.setAttribute('class', 'warning sign icon');
        var divContent = document.createElement('div');
        divContent.setAttribute('class', 'content');
        var divHeader = document.createElement('div');
        divHeader.setAttribute('class', 'header');
        divHeader.innerHTML = "Atenção! Os seguintes itens não foram carregados pois:";
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'list');
        for (var i = 0; i < listNamesInvalid.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = listNamesInvalid[i];
            ul.appendChild(li);
        }
        divMessageAT.appendChild(icon);
        divMessageAT.appendChild(divContent);
        divContent.appendChild(divHeader);
        divContent.appendChild(ul);
        divFather.appendChild(divMessageAT);
    }
    //Simcroniza  o LS com o Soundsphere
    synchronizeSoundSphereLS();
}
//Desativa loading especifico para se o usuario optar por continuar a partir do
//json, caso o usuario tenha enviado os arquivos solicitados
//e caso ele tenha enviado os arquivos solicitados e arquivos a mais
function desativarLoadingJSONOK() {
    "use strict";
    $('#modalOkLS').modal('show');
    var divLoading = document.getElementById('divLoading');
    divLoading.setAttribute('class', 'ui inverted dimmer desactive');
    //Se tiver algum listNamesInvalid então ele carrega um modal avisando ao usuario sobre os arquivos nao carregados
    if (listNamesInvalid.length > 0) {
        var divFather = document.getElementById('messageAttentionModalOkLS');
        var divMessageAT = document.createElement('div');
        divMessageAT.setAttribute('class', 'ui warning icon message');
        var icon = document.createElement('i');
        icon.setAttribute('class', 'warning sign icon');
        var divContent = document.createElement('div');
        divContent.setAttribute('class', 'content');
        var divHeader = document.createElement('div');
        divHeader.setAttribute('class', 'header');
        divHeader.innerHTML = "Atenção! Os seguintes itens não foram carregados pois:";
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'list');
        for (var i = 0; i < listNamesInvalid.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = listNamesInvalid[i];
            ul.appendChild(li);
        }
        divMessageAT.appendChild(icon);
        divMessageAT.appendChild(divContent);
        divContent.appendChild(divHeader);
        divContent.appendChild(ul);
        divFather.appendChild(divMessageAT);
    }
    //Simcroniza  o LS com o Soundsphere
    synchronizeSoundSphereJSON();
}
//Função para gerenciar o JSON file eniado pelo usuario
/// FOnte:  http://stackoverflow.com/questions/23344776/access-data-of-uploaded-json-file-using-javascript
function handleFileSelectJSON(evt) {
    var name = event.target.files[0].name;
    if (name.endsWith(".json")) {
        if (checkValidJSONFile()) {
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(event.target.files[0]);
        }
        else {
            mensagemJSON("O arquivo JSON não é valido.");
        }
    }
    else {
        mensagemJSON("O arquivo enviado não é do formato JSON");
    }
}
function onReaderLoad(event) {
    modalStep1JSON;
    $('#modalStep1JSON').modal('hide');
    $('#content').css({ display: 'block' });
    var allData = JSON.parse(event.target.result);
    allDataJSONFile = allData;
    allDataJSONFile.bufferList.length;
    var dadosAmostrasDiv = document.getElementById('dadosAmostras');
    var dadosItensDiv = document.getElementById('dadosItens');
    var dadosMixagemDiv = document.getElementById('dadosMixagem');
    var listaOrdenada = [];
    allDataJSONFile.bufferList.forEach(element => {
        element.contador = 0;
    });
    for (var i = 0; i < allDataJSONFile.listItemMixPanel.length; i++) {
        for (var j = 0; j < allDataJSONFile.listItemMixPanel[i].length; j++) {
            var itemMixPanel = new ItemMixPanel();
            itemMixPanel.id = allDataJSONFile.listItemMixPanel[i][j].id;
            itemMixPanel.idBuffer = allDataJSONFile.listItemMixPanel[i][j].idBuffer;
            itemMixPanel.startTime = allDataJSONFile.listItemMixPanel[i][j].startTime;
            itemMixPanel.endTime = allDataJSONFile.listItemMixPanel[i][j].endTime;
            itemMixPanel.solo = Boolean(allDataJSONFile.listItemMixPanel[i][j].solo);
            itemMixPanel.volume = allDataJSONFile.listItemMixPanel[i][j].volume;
            itemMixPanel.color = allDataJSONFile.listItemMixPanel[i][j].color;
            itemMixPanel.linha = i + 1;
            itemMixPanel.x = allDataJSONFile.listItemMixPanel[i][j].x;
            itemMixPanel.y = allDataJSONFile.listItemMixPanel[i][j].y;
            itemMixPanel.seconds = allDataJSONFile.listItemMixPanel[i][j].seconds;
            itemMixPanel.width = allDataJSONFile.listItemMixPanel[i][j].width;
            itemMixPanel.height = allDataJSONFile.listItemMixPanel[i][j].height;
            itemMixPanel.size = allDataJSONFile.listItemMixPanel[i][j].size;
            itemMixPanel.style = allDataJSONFile.listItemMixPanel[i][j].style;
            listaOrdenada.push(itemMixPanel);
        }
    }
    listaOrdenada.sort(function (a, b) {
        return a.id - b.id;
    });
    let amostrasUtilizadas = [];
    amostrasUtilizadas[0] = listaOrdenada[0].idBuffer;
    listaOrdenada.forEach(element => {
        allDataJSONFile.bufferList[element.idBuffer].contador += 1;
        var insere = true;
        for (let index = 0; index < amostrasUtilizadas.length; index++) {
            if (amostrasUtilizadas[index] == element.idBuffer) {
                insere = false;
            }
        }
        if (insere) {
            amostrasUtilizadas.push(element.idBuffer);
        }
    });
    var dadosMixagem = `
  <table class="ui celled table">
  <thead>
    <tr>
      <th>Quantidade de Amostras Disponiveis</th>
      <th>Quantidade de Amostras Diferentes Utilizadas</th>
      <th>Quantidade de Itens de Mixagens Inseridos</th>
 
   
    </tr>
  </thead>
  <tbody>
  `;
    var dadosAmostras = `
  <table class="ui celled table">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Tempo da Amostra</th>
      <th>Número de Canais</th>
      <th>Quantidade de Vezes Utilizado</th>
    </tr>
  </thead>
  <tbody>
  `;
    var dadosItens = `
  <table class="ui celled table">
  <thead>
    <tr>
      <th>Identificador</th>
      <th>Amostra</th>
      <th>Inicio</th>
      <th>Fim</th>
      <th>Solo/Mute</th>
      <th>Volume</th>
      <th>Linha</th>
      <th>Cor</th>
    </tr>
  </thead>
  <tbody>
   
  `;
    allDataJSONFile.bufferList.forEach(element => {
        dadosAmostras += `
    <tr>
    <td>${element.name}</td>
    <td>${element.timeDuration}</td>
    <td>${element.numberOfChannels}</td>
    <td>${element.contador}</td>
    </tr>`;
    });
    dadosMixagem += `
    <tr>
    <td>${allDataJSONFile.bufferList.length}</td>
    <td>${amostrasUtilizadas.length}</td>
    <td>${listaOrdenada.length}</td>
    

    </tr>`;
    listaOrdenada.forEach(element => {
        dadosItens += `
    <tr>
    <td>${element.id}</td>
    <td>${allDataJSONFile.bufferList[element.idBuffer].name}</td>
    <td>${element.startTime}</td>
    <td>${element.endTime}</td>
    <td>${element.solo ? `Solo` : `Mute`}</td>
    <td>${element.volume}</td>
    <td>${element.linha}</td>
    <td style="color:${element.color}">${element.color}</td>
    </tr>`;
    });
    dadosAmostras += "</tbody></table>";
    dadosItens += "</tbody></table>";
    dadosMixagem += "</tbody></table>";
    dadosAmostrasDiv.innerHTML = dadosAmostras;
    dadosItensDiv.innerHTML = dadosItens;
    dadosMixagemDiv.innerHTML = dadosMixagem;
}
/////////////// fim
function mensagemJSON(msg) {
    var divMessageError = document.getElementById('mensageStep1JSON');
    var divError = document.createElement('div');
    divError.setAttribute('class', 'ui error message');
    var icon = document.createElement('i');
    icon.setAttribute('class', 'close icon');
    var divHeader = document.createElement('div');
    divHeader.setAttribute('class', 'header');
    divHeader.innerHTML = "Atenção!";
    var para = document.createElement('p');
    para.innerHTML = msg;
    divError.appendChild(icon);
    divError.appendChild(divHeader);
    divError.appendChild(para);
    divMessageError.innerHTML = "";
    divMessageError.appendChild(divError);
}
