"use strict";
class PageLeitor {
    constructor(containerElement, titulo, soundSphereInfo, dao, tooltip) {
        this.containerElement = containerElement;
        this.titulo = titulo ? titulo : "";
        this.dao = dao;
        this.soundSphereInfo = soundSphereInfo;
        this.generateContent();
        this.setSettingsActions();
        this.showModalMessageInitial();
    }
    closeModal() {
        $('.ui.modal').modal('hide');
    }
    showData() {
        $('#content').css({ display: 'block' });
        this.showDataValues();
    }
    showDataValues() {
        console.log("show data values");
        let dadosAmostrasDiv = document.getElementById('dadosAmostras');
        let dadosSessionDiv = document.getElementById('dadosSession');
        let dadosItensDiv = document.getElementById('dadosItens');
        let historicoDIV = document.getElementById('historico');
        let dadosMixagemDiv = document.getElementById('dadosMixagem');
        var listaOrdenada = [];
        this.dao.listItemBuffer.forEach(element => {
            element.amount = 0;
        });
        for (var i = 0; i < this.dao.listItemMixPanel.length; i++) {
            if (this.dao.listItemMixPanel[i]) {
                for (var j = 0; j < this.dao.listItemMixPanel[i].length; j++) {
                    var itemMixPanel = new ItemMixPanel();
                    itemMixPanel.id = this.dao.listItemMixPanel[i][j].id;
                    itemMixPanel.idBuffer = this.dao.listItemMixPanel[i][j].idBuffer;
                    itemMixPanel.startTime = this.dao.listItemMixPanel[i][j].startTime;
                    itemMixPanel.endTime = this.dao.listItemMixPanel[i][j].endTime;
                    itemMixPanel.solo = Boolean(this.dao.listItemMixPanel[i][j].solo);
                    itemMixPanel.setVolume(this.dao.listItemMixPanel[i][j].getVolume());
                    itemMixPanel.color = this.dao.listItemMixPanel[i][j].color;
                    itemMixPanel.descriptiveIcon = this.dao.listItemMixPanel[i][j].descriptiveIcon == "0" ? "0" : this.dao.listItemMixPanel[i][j].descriptiveIcon;
                    itemMixPanel.linha = this.dao.listItemMixPanel[i][j].linha + 1;
                    if (this.dao.listItemMixPanel[i][j].getidSemanticDescriptor()) {
                        itemMixPanel.nameDescritor = (this.dao.getNameSemanticDescriptor(this.dao.listItemMixPanel[i][j].getidSemanticDescriptor()));
                    }
                    else {
                        itemMixPanel.nameDescritor = "nenhum";
                    }
                    itemMixPanel.x = this.dao.listItemMixPanel[i][j].x;
                    itemMixPanel.excluded = Boolean(this.dao.listItemMixPanel[i][j].excluded);
                    itemMixPanel.y = this.dao.listItemMixPanel[i][j].y;
                    itemMixPanel.seconds = this.dao.listItemMixPanel[i][j].seconds;
                    itemMixPanel.width = this.dao.listItemMixPanel[i][j].width;
                    itemMixPanel.height = this.dao.listItemMixPanel[i][j].height;
                    itemMixPanel.size = this.dao.listItemMixPanel[i][j].size;
                    itemMixPanel.style = this.dao.listItemMixPanel[i][j].style;
                    listaOrdenada.push(itemMixPanel);
                }
            }
        }
        listaOrdenada.sort(function (a, b) {
            return a.id - b.id;
        });
        let amostrasUtilizadas = [];
        amostrasUtilizadas[0] = listaOrdenada[0].idBuffer;
        listaOrdenada.forEach(element => {
            this.dao.listItemBuffer[element.idBuffer].amount += 1;
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
        var historico = `
    <table class="ui celled table">
    <thead>
      <tr>
      <th>Sessão</th>
      <th>Data</th>
      <th>Action</th>
      <th>IdItem</th>
      <th>Amostra</th>
      <th>Inicio</th>
      <th>Fim</th>
      <th>Solo/Mute</th>
      <th>Excluida</th>
      <th>Volume</th>
      <th>Ícone descritivo</th>
      <th>Linha</th>
      <th>Cor</th>
      <th>Descritor</th>
     
      </tr>
    </thead>
    <tbody>
    `;
        var dadosMixagem = `
    <table class="ui celled table">
    <thead>
      <tr>
        <th>Quantidade de Amostras Disponiveis</th>
        <th>Quantidade de Amostras Diferentes Utilizadas</th>
        <th>Tempo total da mixagem</th>
        <th>Quantidade de Itens de Mixagens no painel</th>
        <th>Quantidade de Itens de Mixagens Inseridos</th>
        <th>Quantidade de Itens de Mixagens alterados</th>
        <th>Quantidade de Itens de Mixagens excluidos</th>

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
        var dadosSession = `
    <table class="ui celled table">
    <thead>
      <tr>
  
        <th>Nome</th>
        <th>Autor</th>
        <th>Data de Inicio da Seção</th>
        <th>Data de Download da Seção</th>
        <th>Diferença</th>
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
        <th>Excluida</th>
        <th>Volume</th>
        <th>Ícone Descritivo</th>
        <th>Linha</th>
        <th>Cor</th>
        <th>Descritor</th>
      </tr>
    </thead>
    <tbody>
     
    `;
        this.dao.listItemBuffer.forEach(element => {
            dadosAmostras += `
      <tr>
      <td>${element.name}</td>
    
      <td>${element.timeDuration}</td>
      <td>${element.numberOfChannels}</td>
      <td>${element.amount}</td>
      </tr>`;
        });
        function formateDateBr(date) {
            const stringDate = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
            return stringDate;
        }
        this.dao.sessionControl.listEventSession.forEach(element => {
            if (element.datDateSave) {
                const dataStart = new Date(element.dateStartWork);
                const dataSave = new Date(element.datDateSave);
                // get total seconds between the times
                var delta = Math.abs(dataSave - dataStart) / 1000;
                // calculate (and subtract) whole days
                var days = Math.floor(delta / 86400);
                delta -= days * 86400;
                // calculate (and subtract) whole hours
                var hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;
                // calculate (and subtract) whole minutes
                var minutes = Math.floor(delta / 60) % 60;
                delta -= minutes * 60;
                // what's left is seconds
                var seconds = delta % 60;
                const stringDataStart = formateDateBr(dataStart);
                const stringDataSave = formateDateBr(dataSave);
                dadosSession += `
        <tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${stringDataStart}</td>
        <td>${stringDataSave}</td>
        <td>${days} - ${hours}:${minutes}:${Math.round(seconds)} </td>
        </tr>`;
            }
        });
        const array1 = [1, 2, 3, 4];
        const reducerAtivos = (accumulator, element) => {
            if (!element.excluded) {
                accumulator = accumulator + 1;
            }
            return accumulator;
        };
        //Se o elemento nao for excluido  verifica o seu tempo final
        //par se seja pego o tempo total da mixagem
        const reducerTempoTotal = (accumulator, element) => {
            if (element.endTime > accumulator && !element.excluded) {
                accumulator = element.endTime;
            }
            return accumulator;
        };
        let listaEventItemMixPanel = this.dao.sessionControl.getAllEventItemMixPanel();
        //Conta quantos itens foram inseridos
        const reducerInseridos = (accumulator, element) => {
            if (element.eventCrud == 0) {
                accumulator = accumulator + 1;
            }
            return accumulator;
        };
        //Conta quantos itens foram alterados
        const reducerAlterados = (accumulator, element) => {
            if (element.eventCrud == 2) {
                accumulator = accumulator + 1;
            }
            return accumulator;
        };
        //Conta quantos itens foram excluidos
        const reducerExcluidos = (accumulator, element) => {
            if (element.eventCrud == 1) {
                accumulator = accumulator + 1;
            }
            return accumulator;
        };
        //this.dao.sessionControl.listEventSession.reduce(reducerInseridos,0)
        dadosMixagem += `
      <tr>
      <td>${this.dao.listItemBuffer.length}</td>
      <td>${amostrasUtilizadas.length}</td>
      <td>${listaOrdenada.reduce(reducerTempoTotal, 0)}</td>
      <td>${listaOrdenada.reduce(reducerAtivos, 0)}</td>
      <td>${listaEventItemMixPanel.reduce(reducerInseridos, 0)}</td>
      <td>${listaEventItemMixPanel.reduce(reducerAlterados, 0)}</td>
      <td>${listaEventItemMixPanel.reduce(reducerExcluidos, 0)}</td>
    
      
  
      </tr>`;
        listaOrdenada.forEach(element => {
            if (!element.excluded) {
                dadosItens += `
        <tr>
        <td>${element.id}</td>
        <td>${this.dao.listItemBuffer[element.idBuffer].name}</td>
        <td>${element.startTime}</td>
        <td>${element.endTime}</td>
        <td>${element.solo ? `Solo` : `Mute`}</td>
        <td>${element.excluded ? `sim` : `não`}</td>
        <td>${element.getVolume()}</td>
        <td>${element.descriptiveIcon}</td>
        <td>${element.linha}</td>
        <td style="color:${element.color}">${element.color}</td>
        <td>${element.nameDescritor}</td>
        </tr>`;
            }
        });
        function crudName(name) {
            if (name == 0) {
                return "Inserir";
            }
            if (name == 1) {
                return "Deletar";
            }
            if (name == 2) {
                return "Alterar";
            }
            if (name == 3) {
                return "Ler";
            }
        }
        console.log("----------------");
        this.dao.sessionControl.listEventSession.forEach(element => {
            if (element.name) {
                element.listEventItemMixPanel.forEach(element2 => {
                    historico += ` <tr>
          <td>${element.name}</td>
      
        <td>${formateDateBr(new Date(element2.date))}</td>
        <td>${crudName(element2.eventCrud)}</td>
        <td>${element2.itemMixPanel.id}</td>
        <td>${this.dao.listItemBuffer[element2.itemMixPanel.idBuffer].name}</td>
        <td>${element2.itemMixPanel.startTime}</td>
        <td>${element2.itemMixPanel.endTime}</td>
        <td>${element2.itemMixPanel.solo}</td>
        <td>${element2.itemMixPanel.excluded ? `sim` : `não`}</td>
        <td>${element2.itemMixPanel.getVolume()}</td>
        <td>${element2.itemMixPanel.descriptiveIcon != "0" ? element2.itemMixPanel.descriptiveIcon : "nenhum"}</td>
        <td>${element2.itemMixPanel.linha}</td>
        <td style="color:${element2.itemMixPanel.color}">${element2.itemMixPanel.color}</td>
      
        <td>${element2.itemMixPanel.getIdSemanticDescriptor() ? this.dao.getNameSemanticDescriptor(element2.itemMixPanel.getIdSemanticDescriptor()) : "nenhum"}</td>
         </tr>
        `;
                });
            }
        });
        dadosAmostras += "</tbody></table>";
        dadosItens += "</tbody></table>";
        dadosMixagem += "</tbody></table>";
        dadosAmostrasDiv.innerHTML = dadosAmostras;
        dadosSessionDiv.innerHTML = dadosSession;
        dadosItensDiv.innerHTML = dadosItens;
        dadosMixagemDiv.innerHTML = dadosMixagem;
        historicoDIV.innerHTML = historico;
    }
    setSettingsActions() {
        $('#buttonIniciar').on('click', (e) => {
            this.closeModal();
            $('#step1').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
        });
    }
    generateContent() {
        this.generateContentofModalMessageInitial();
        this.generateContentofModalStep1();
        this.generateContentofData();
    }
    generateContentofData() {
        let conteudoHTML = `
    <h2 class="ui header centered">
      <div id="titulo">
        <font color="red">
         ${this.soundSphereInfo.getFullName()} - Leitor JSON
        </font>
      </div>
    </h2>
 
    <h1>Dados das amostras</h1>
    <div id="dadosAmostras"></div>
    <h1>Dados da Sessão</h1>
    <div id="dadosSession"></div>
    <h1>Historico</h1>
    <div id="historico"></div>
    <h1>Dados da Mixagem</h1>
    <div id="dadosItens"></div>
    <h1>Dados Gerais</h1>
    <div id="dadosMixagem"></div>
    `;
        $('#content').html(conteudoHTML);
    }
    generateContentofModalStep1() {
        let conteudoHTML = `
    <div class="ui ordered top attached steps">
      <div class="active step">
        <div class="content">
          <div class="title">JSON</div>
        </div>
      </div>
 
      <div class=" step">
        <div class="content">
          <div class="title">Informações</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="mensageStep1JSON"></div>
      <div> Selecione o arquivo JSON gerado pelo SoundSphere que você deseja analisar.</div>
    </div>
    <div class="actions">

      <div onclick="fileJSON.click()" class="ui green button">Selecionar</div>
    </div>
  </div>
  <div id="modalStep2JSON" class="ui small third coupled modal transition">
    <div class="ui ordered top attached steps">
      <div class="completed step">
        <div class="content">
          <div class="title">JSON</div>
        </div>
      </div>

      <div class=" step">
        <div class="content">
          <div class="title">Informações</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="mensageStep2JSON"> </div>
      <p id="fileName">Você deve enviar as seguintes amostras de audio: </p>
      <div id="filesRequireJSON" class="ui two column grid"></div>

    </div>
    <div class="actions">

      <div class="ui red button">Cancelar</div>
      <div onclick="filesAudioToJson.click()" class="ui green button">Selecionar</div>
    </div>
`;
        $('#step1').html(conteudoHTML);
    }
    generateContentofModalMessageInitial() {
        let conteudoHTML = `
    <div class="header">
    Bem vindo! Ao leitor JSON do SoundSphere ${this.soundSphereInfo.getVersion()}
  </div>
  <div id="mensagem" class="content">
    <div class="feature alternate ui stripe vertical segment">
      <div class="ui one column center aligned divided relaxed stackable grid container">
        <div class="row">
          <div class="column">

            <p></p>
            <div id="buttonIniciar" class="ui green large button">Iniciar</div>
          </div>
         </div>
      </div>
    </div>
  </div>
`;
        $('#messageInitial').html(conteudoHTML);
    }
    showModalMessageInitial() {
        $('#messageInitial').modal({ closable: false }).modal('setting', 'transition', 'horizontal flip').modal("show");
    }
    showMessageErrorJson(mensagem) {
        const message = `
    <div class="ui error message">
   
      <div class="header">
        Alguns problemas foram encontrados na submissão:
      </div>
      <ul class="list">
        <li>${mensagem}</li>

      </ul>
    </div>
    `;
        $('#mensageStep1JSON').html(message);
    }
}
