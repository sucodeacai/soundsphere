"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ControlFiles {
    constructor() {
        // listUploadedFileNames: string[] = [];
        // listFilesInvalid: string[] = [];
        this.listColors = [
            "#D50000",
            "#C51162",
            "#AA00FF",
            "#6200EA",
            "#0091EA",
            "#00B8D4",
            "#00BFA5",
            "#00C853",
            "#AEEA00",
            "#FFD600",
            "#FFAB00",
            "#FF6D00",
            "#DD2C00",
            "#FFCDD2",
            "#f8bbd0",
            "#E1BEE7",
            "#D1C4E9",
            "#B3E5FC",
            "#B2EBF2",
            "#B2DFDB",
            "#C8E6C9",
            "#F0F4C3",
            "#FFF9C4",
            "#FFECB3",
            "#FFE0B2",
            "#FFCCBC",
            "#FF1744",
            "#F50057",
            "#D500F9",
            "#651FFF",
            "#00B0FF",
            "#00E5FF",
            "#1DE9B6",
            "#00E676",
            "#C6FF00",
            "#FFEA00",
            "#FFC400",
            "#FF9100",
            "#FF3D00",
            "#EF9A9A",
            "#F48FB1",
            "#CE93D8",
            "#B39DDB",
            "#81D4FA",
            "#80DEEA",
            "#80CBC4",
            "#A5D6A7",
            "#E6EE9C",
            "#FFF59D",
            "#FFE082",
            "#FFCC80",
            "#FFAB91",
            "#FF5252",
            "#FF4081",
            "#E040FB",
            "#7C4DFF",
            "#40C4FF",
            "#18FFFF",
            "#64FFDA",
            "#69F0AE",
            "#EEFF41",
            "#FFFF00",
            "#FFD740",
            "#FFAB40",
            "#FF6E40",
            "#E57373",
            "#F06292",
            "#BA68C8",
            "#9575CD",
            "#4FC3F7",
            "#4DD0E1",
            "#4DB6AC",
            "#81C784",
            "#DCE775",
            "#FFF176",
            "#FFD54F",
            "#FFB74D",
            "#FF8A65",
            "#FF8A80",
            "#FF80AB",
            "#EA80FC",
            "#B388FF",
            "#80D8FF",
            "#84FFFF",
            "#A7FFEB",
            "#B9F6CA",
            "#F4FF81",
            "#FFFF8D",
            "#FFE57F",
            "#FFD180",
            "#FF9E80",
            "#EF5350",
            "#EC407A",
            "#AB47BC",
            "#7E57C2",
            "#29B6F6",
            "#26C6DA",
            "#26A69A",
            "#66BB6A",
            "#D4E157",
            "#FFEE58",
            "#FFCA28",
            "#FFA726",
            "#FF7043",
            "#B71C1C",
            "#880E4F",
            "#4A148C",
            "#311B92",
            "#01579B",
            "#006064",
            "#004D40",
            "#1B5E20",
            "#827717",
            "#F57F17",
            "#FF6F00",
            "#E65100",
            "#BF360C",
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#C62828",
            "#AD1457",
            "#6A1B9A",
            "#4527A0",
            "#0277BD",
            "#00838F",
            "#00695C",
            "#2E7D32",
            "#9E9D24",
            "#F9A825",
            "#FF8F00",
            "#EF6C00",
            "#D84315",
            "#E53935",
            "#D81B60",
            "#8E24AA",
            "#5E35B1",
            "#039BE5",
            "#00ACC1",
            "#00897B",
            "#43A047",
            "#C0CA33",
            "#FDD835",
            "#FFB300",
            "#FB8C00",
            "#F4511E",
            "#D32F2F",
            "#C2185B",
            "#7B1FA2",
            "#512DA8",
            "#0288D1",
            "#0097A7",
            "#00796B",
            "#388E3C",
            "#AFB42B",
            "#FBC02D",
            "#FFA000",
            "#F57C00",
            "#E64A19"
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
    ;
    orderListByName(lista) {
        console.log("Order by name");
        console.log(lista);
        //Adiciona a lista passada como parametro no final da lista existente
        return lista.sort(sortByDataString);
    }
    ;
}
function isNumber(n) {
    "use strict";
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// String sorting function
function sortByDataString(a1, b2) {
    let a = a1.toLowerCase();
    let b = b2.toLowerCase();
    console.log("A1 " + a1 + "a " + a);
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
