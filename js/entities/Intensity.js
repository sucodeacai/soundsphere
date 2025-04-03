"use strict";
class Intensity {
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
}
function generatorIntensity() {
    let listIntensity = [];
    listIntensity.push(new Intensity("1 - Mínimo", 1));
    listIntensity.push(new Intensity("2 - Pouco", 2));
    listIntensity.push(new Intensity("3 - Moderado", 3));
    listIntensity.push(new Intensity("4 - Muito", 4));
    listIntensity.push(new Intensity("5 - Máximo", 5));
    return listIntensity;
}
