"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ControlFiles {
    constructor() {
        // listUploadedFileNames: string[] = [];
        // listFilesInvalid: string[] = [];
        this.listColors = [
            "#f44336",
            "#4caf50",
            "#2196f3",
            "#ffeb3b",
            "#9c27b0",
            "#ff9800",
            "#3f51b5",
            "#00bcd4",
            "#8bc34a",
            "#ff5722",
            "#607d8b",
            "#e91e63",
            "#673ab7",
            "#cdcdcd",
            "#795548",
            "#9e9e9e",
            "#c2185b",
            "#00e5ff",
            "#009688",
            "#e57373",
            "#81c784",
            "#64b5f6",
            "#ffb74d",
            "#ba68c8",
            "#d32f2f",
            "#388e3c",
            "#1976d2",
            "#fbc02d",
            "#7b1fa2",
            "#0288d1",
            "#ff7043",
            "#c2185b",
            "#f57c00",
            "#0288d1",
            "#7e57c2",
            "#3949ab",
            "#8e24aa",
            "#0097a7",
            "#f44336",
            "#1976d2",
            "#388e3c",
            "#7b1fa2",
            "#ffeb3b",
            "#3f51b5",
            "#ff9800",
            "#795548",
            "#8bc34a",
            "#c2185b",
            "#00bcd4",
            "#607d8b",
            "#f57c00",
            "#2196f3",
            "#9c27b0",
            "#00e5ff",
            "#ff5722",
            "#4caf50",
            "#009688",
            "#00bcd4",
            "#8bc34a",
            "#ff9800",
            "#673ab7",
            "#00bcd4",
            "#795548",
            "#9c27b0",
            "#f44336",
            "#3f51b5",
            "#ffeb3b",
            "#e91e63",
            "#ff5722",
            "#00bcd4",
            "#009688",
            "#2196f3",
            "#ffeb3b",
            "#9c27b0",
            "#4caf50",
            "#ff9800",
            "#2196f3",
            "#ff5722",
            "#4caf50",
            "#9c27b0",
            "#f44336",
            "#ffeb3b",
            "#3f51b5",
            "#e91e63",
            "#ff9800",
            "#607d8b",
            "#00e5ff",
            "#8bc34a",
            "#795548",
            "#2196f3",
            "#9c27b0",
            "#ff5722",
            "#388e3c",
            "#ff9800",
            "#ff7043",
            "#673ab7",
            "#3f51b5",
            "#00e5ff",
            "#f57c00",
            "#8bc34a",
            "#ffeb3b",
            "#1976d2",
            "#e91e63",
            "#673ab7",
            "#ff5722",
            "#9c27b0",
            "#c2185b",
            "#8bc34a",
            "#2196f3",
            "#ff9800",
            "#4caf50",
            "#9c27b0",
            "#9e9e9e",
            "#f44336",
            "#ff9800",
            "#c2185b",
            "#2196f3",
            "#ff5722",
            "#388e3c",
            "#7e57c2",
            "#8bc34a",
            "#d32f2f",
            "#1976d2",
            "#00bcd4",
            "#ff7043",
            "#0288d1",
            "#9c27b0",
            "#8bc34a",
            "#7b1fa2",
            "#00e5ff",
            "#f44336",
            "#ffeb3b",
            "#795548",
            "#8bc34a",
            "#ff9800",
            "#ff5722",
            "#9c27b0",
            "#2196f3",
            "#3f51b5",
            "#e91e63",
            "#8bc34a",
            "#ff7043",
            "#00bcd4",
            "#0288d1",
            "#ff5722",
            "#9c27b0",
            "#00bcd4",
            "#4caf50",
            "#3f51b5",
            "#ff9800",
            "#ff5722",
            "#388e3c",
            "#ff9800",
            "#4caf50",
            "#9c27b0",
            "#00bcd4",
            "#ff5722",
            "#8bc34a",
            "#2196f3",
            "#3f51b5",
            "#f44336",
            "#e91e63",
            "#ff9800",
            "#4caf50",
            "#7e57c2",
            "#ff5722",
            "#c2185b",
            "#4caf50",
            "#2196f3",
            "#ff5722",
            "#ff9800",
            "#9c27b0",
            "#8bc34a",
            "#00bcd4",
            "#795548",
            "#e91e63",
            "#9c27b0",
            "#ff9800",
            "#ff5722",
            "#4caf50",
            "#2196f3",
            "#00bcd4",
            "#ff9800",
            "#9c27b0",
            "#ff5722",
            "#f44336",
            "#ffeb3b",
            "#8bc34a",
            "#4caf50",
            "#3f51b5",
            "#00bcd4",
            "#ff9800",
            "#8bc34a",
            "#673ab7",
            "#ff5722",
            "#9c27b0",
            "#2196f3",
            "#4caf50",
            "#ff9800",
            "#00bcd4",
            "#9c27b0",
            "#ffeb3b",
        ];
        //Funções para ordenação
    }
    //Verifica se o arquivoo já foi carregado
    // fileLoaded(name: string): boolean {
    //     for (var i = 0; i < this.listUploadedFileNames.length; i++) {
    //         console.log(`Verificando nome: ${this.listUploadedFileNames[i]} se é igual a ${name}`)
    //         if (this.listUploadedFileNames[i] == name) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    //Adiciona a lista passada como parametro no final da lista existente
    // addList(lista: any): void {
    //     this.listUploadedFileNames = this.listUploadedFileNames.concat(lista.sort(sortByDataString));
    // };
    getColor(j) {
        return this.listColors[j];
    }
    orderListByName(lista) {
        // console.log("Order by name");
        // console.log(lista);
        //Adiciona a lista passada como parametro no final da lista existente
        return lista.sort(sortByDataString);
    }
}
function isNumber(n) {
    "use strict";
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// String sorting function
function sortByDataString(a1, b2) {
    let a = a1.toLowerCase();
    let b = b2.toLowerCase();
    // console.log("A1 " + a1 + "a " + a);
    if (a === null) {
        return 1;
    }
    if (b === null) {
        return -1;
    }
    if (isNumber(a) && isNumber(b)) {
        if (parseInt(a, 10) === parseInt(b, 10)) {
            return 0;
        }
        return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
    }
    if (isNumber(a)) {
        return -1;
    }
    if (isNumber(b)) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
}
//Função antiga para remvoer itens invalidos
//Remover item da lista de arquivos validos por ser diferente de stero
//ControlColor.prototype.removeFile = function(index) {
//  console.log("vai ser removido: " + this.listUploadedFileNames[index]);
//    var node = document.getElementById(index+"div");
//    node.style.display="none";
//    listNamesInvalid.push(this.listUploadedFileNames[index] + ": só são permitidos arquivos mono, stereo, quad e 5.1  ");
//}
//Get tamanho
// ControlColor.prototype.listUploadedFileNamesLenght = function (j) {
//     return this.listUploadedFileNames.length;
// };
//Passa a posição de acordo com o nome
// ControlColor.prototype.getPosition = function (fileName) {
//     "use strict";
//     var i;
//     for (i = 0; i < this.listUploadedFileNames.length; i = i + 1) {
//         if (this.listUploadedFileNames[i] === fileName) {
//             return i;
//         }
//     }
// };
// //Passa o nome de acordo com a posição
// ControlColor.prototype.getName = function (j) {
//     "use strict";
//     return this.listUploadedFileNames[j];
// };
