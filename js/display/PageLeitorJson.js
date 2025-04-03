"use strict";
class PageLeitorJson {
    constructor(soundSphereInfo) {
        this.listaOrdenada = [];
        this.soundSphereInfo = soundSphereInfo;
        this.setVersionSoundSphere();
        this.setEvents();
        this.modalStart = new window.bootstrap.Modal(document.getElementById("modalStart"));
        this.modalStart.show();
    }
    setVersionSoundSphere() {
        const title = document.getElementById("continueJsonTitle");
        title.innerHTML = `SoundSphere ${this.soundSphereInfo.version}`;
    }
    setEvents() {
        var _a;
        (_a = document.getElementById("buttonEnviar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            document.getElementById("fileJSON").click();
        });
    }
    updateModalContinueErrorJsonFile(message) {
        document.getElementById("p_message").innerHTML = message;
    }
    showErrorContinueJsonSoundSphereVersion(version_required) {
        const errorModalBody = document.getElementById("p_message");
        errorModalBody.innerHTML = `Arquivo incompatível. Carregue arquivos gerados pela versão SoundSphere - ${version_required}.`;
    }
    showInfo() {
        console.log("Tudo ok");
        this.modalStart.hide();
        this.showContainer();
        this.fillAudioSampleTable();
        this.fillSessionTable();
        this.fillHistoric();
        this.fillMixagem();
        this.fillGeneralData();
    }
    showContainer() {
        var _a;
        (_a = document.getElementById("mainContainer")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
        document.getElementById("title").innerHTML = `SoundSphere ${this.soundSphereInfo.version}`;
    }
    fillAudioSampleTable() {
        console.log(`Tamanho ${this.dao.listItemBuffer.length}`);
        this.dao.listItemBuffer.forEach((element) => {
            var _a;
            const tr = document.createElement("tr");
            const tdName = document.createElement("td");
            tdName.textContent = element.name;
            tr.appendChild(tdName);
            const tdTimeDuration = document.createElement("td");
            tdTimeDuration.textContent = element.timeDuration;
            tr.appendChild(tdTimeDuration);
            const tdNumberOfChannels = document.createElement("td");
            tdNumberOfChannels.textContent = element.numberOfChannels;
            tr.appendChild(tdNumberOfChannels);
            const tdAmount = document.createElement("td");
            tdAmount.textContent = element.amount;
            tr.appendChild(tdAmount);
            (_a = document.getElementById("tbodyAudioSampleTable")) === null || _a === void 0 ? void 0 : _a.appendChild(tr);
        });
    }
    fillSessionTable() {
        this.dao.sessionControl.listEventSession.forEach((element) => {
            var _a;
            if (element.datDateSave) {
                const dataStartObj = new Date(element.dateStartWork);
                const dataSaveObj = new Date(element.datDateSave);
                const dataStart = dataStartObj.toLocaleString("pt-BR");
                const dataSave = dataSaveObj.toLocaleString("pt-BR");
                // Calcular a diferença de tempo
                const diffMs = Math.abs(dataSaveObj.getTime() - dataStartObj.getTime());
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
                const diffFormatted = `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
                // Criar a linha da tabela
                const row = document.createElement("tr");
                // Criar as células
                const nameCell = document.createElement("td");
                nameCell.textContent = element.name;
                const authorCell = document.createElement("td");
                authorCell.textContent = element.author;
                const dataStartCell = document.createElement("td");
                dataStartCell.textContent = dataStart;
                const dataSaveCell = document.createElement("td");
                dataSaveCell.textContent = dataSave;
                const diffCell = document.createElement("td");
                diffCell.textContent = diffFormatted;
                // Adicionar as células à linha
                row.appendChild(nameCell);
                row.appendChild(authorCell);
                row.appendChild(dataStartCell);
                row.appendChild(dataSaveCell);
                row.appendChild(diffCell);
                // Adicionar a linha ao corpo da tabela
                (_a = document.getElementById("tbodySessionTable")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            }
        });
    }
    fillHistoric() {
        let historico = "";
        this.dao.sessionControl.listEventSession.forEach((session) => {
            if (session.name) {
                session.listEventItemMixPanel.forEach((element2) => {
                    var _a, _b, _c, _d;
                    console.log(element2.itemMixPanel.excluded);
                    historico += ` <tr>
            <td>${session.name}</td>
            <td>${new Date(element2.date).toLocaleString("pt-BR")}</td>
            <td>${this.crudName(element2.eventCrud)}</td>
            <td>${element2.itemMixPanel.id}</td>
            <td>${((_a = this.dao.listItemBuffer[element2.itemMixPanel.idBuffer]) === null || _a === void 0 ? void 0 : _a.name) ||
                        "-"}</td>
              <td style="color:${element2.itemMixPanel.color}">${element2.itemMixPanel.color}</td>
                  <td>${element2.itemMixPanel.linha}</td>
            <td>${element2.itemMixPanel.startTime}</td>
            <td>${element2.itemMixPanel.endTime}</td>
            <td>${element2.itemMixPanel.excluded ? `sim` : `não`}</td>
            <td>${element2.itemMixPanel.getVolume()}</td>
            <td>${(_b = element2.itemMixPanel.descriptiveIcon) !== null && _b !== void 0 ? _b : "nenhum"}</td>
    
          
            <td>${element2.itemMixPanel.getIdSemanticDescriptor()
                        ? this.dao.getNameSemanticDescriptor(element2.itemMixPanel.getIdSemanticDescriptor())
                        : "nenhum"}</td>
            <td>${(_c = element2.itemMixPanel.tag_dimension) !== null && _c !== void 0 ? _c : "nenhum"}</td>
            <td>${(_d = element2.itemMixPanel.tag_intensity) !== null && _d !== void 0 ? _d : "nenhum"}</td>
          </tr>`;
                });
            }
        });
        document.getElementById("tbodyHistoric").innerHTML = historico;
    }
    crudName(name) {
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
        if (name == 4) {
            return "Apagar modificadores ";
        }
        if (name == 5) {
            return "Apagado por Resetar painel";
        }
    }
    fillMixagem() {
        for (let i = 0; i < this.dao.listItemMixPanel.length; i++) {
            if (this.dao.listItemMixPanel[i]) {
                for (let j = 0; j < this.dao.listItemMixPanel[i].length; j++) {
                    let itemMixPanel = Object.assign(new ItemMixPanel(), {
                        nameDescritor: "Novo Nome",
                    });
                    itemMixPanel.id = this.dao.listItemMixPanel[i][j].id;
                    itemMixPanel.idBuffer = this.dao.listItemMixPanel[i][j].idBuffer;
                    itemMixPanel.startTime = this.dao.listItemMixPanel[i][j].startTime;
                    itemMixPanel.endTime = this.dao.listItemMixPanel[i][j].endTime;
                    itemMixPanel.solo = Boolean(this.dao.listItemMixPanel[i][j].solo);
                    itemMixPanel.setVolume(this.dao.listItemMixPanel[i][j].getVolume());
                    itemMixPanel.color = this.dao.listItemMixPanel[i][j].color;
                    itemMixPanel.descriptiveIcon =
                        this.dao.listItemMixPanel[i][j].descriptiveIcon == undefined
                            ? "nenhum"
                            : this.dao.listItemMixPanel[i][j].descriptiveIcon;
                    itemMixPanel.tag_dimension =
                        this.dao.listItemMixPanel[i][j].tag_dimension == undefined
                            ? "nenhum"
                            : this.dao.listItemMixPanel[i][j].tag_dimension;
                    itemMixPanel.tag_intensity =
                        this.dao.listItemMixPanel[i][j].tag_intensity == undefined
                            ? "nenhum"
                            : this.dao.listItemMixPanel[i][j].tag_intensity;
                    itemMixPanel.linha = this.dao.listItemMixPanel[i][j].linha + 1;
                    if (this.dao.listItemMixPanel[i][j].getidSemanticDescriptor()) {
                        itemMixPanel.nameDescritor = this.dao.getNameSemanticDescriptor(this.dao.listItemMixPanel[i][j].getidSemanticDescriptor());
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
                    this.listaOrdenada.push(itemMixPanel);
                }
            }
        }
        this.listaOrdenada.sort(function (a, b) {
            return a.id - b.id;
        });
        let dadosItens = "";
        this.listaOrdenada.forEach((element) => {
            if (!element.excluded) {
                dadosItens += `
        <tr>
        <td>${element.id}</td>
        <td>${this.dao.listItemBuffer[element.idBuffer].name}</td>
                <td style="color:${element.color}">${element.color}</td>

        <td>${element.startTime}</td>
        <td>${element.endTime}</td>
        <td>${element.getVolume()}</td>
        <td>${element.descriptiveIcon}</td>
          
        <td>${element.linha}</td>

        <td>${element.nameDescritor}</td>
        <td>${element.tag_dimension}</td>
        <td>${element.tag_intensity}</td>

        </tr>`;
            }
        });
        document.getElementById("tbodyMixing").innerHTML = dadosItens;
    }
    fillGeneralData() {
        const amostrasDiferentesUtilizadas = new Set(this.listaOrdenada.map((item) => item.idBuffer)).size;
        const amostrasDiferentesNoPainel = new Set(this.listaOrdenada
            .filter((item) => !item.excluded) // Filtra apenas os que não estão excluídos
            .map((item) => item.idBuffer) // Mapeia os idBuffers
        ).size;
        const reducerTempoTotal = (accumulator, element) => {
            if (element.endTime > accumulator && !element.excluded) {
                accumulator = element.endTime;
            }
            return accumulator;
        };
        const reducerAtivos = (accumulator, element) => {
            if (!element.excluded) {
                accumulator = accumulator + 1;
            }
            return accumulator;
        };
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
        let listaEventItemMixPanel = this.dao.sessionControl.getAllEventItemMixPanel();
        let dadosMixagem = `
    
    <tr>
    <td>${this.dao.listItemBuffer.length}</td>
    <td>${amostrasDiferentesUtilizadas}</td>
    <td>${amostrasDiferentesNoPainel}</td>
    <td>${this.listaOrdenada.reduce(reducerTempoTotal, 0)}</td>
    <td>${this.listaOrdenada.reduce(reducerAtivos, 0)}</td>
    <td>${listaEventItemMixPanel.reduce(reducerInseridos, 0)}</td>
    <td>${listaEventItemMixPanel.reduce(reducerAlterados, 0)}</td>
    <td>${listaEventItemMixPanel.reduce(reducerExcluidos, 0)}</td>
  
    
    </tr>`;
        document.getElementById("tbodyGeneralData").innerHTML = dadosMixagem;
    }
}
