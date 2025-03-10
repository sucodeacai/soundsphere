"use strict";
class Dimension {
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
}
function generatorDimensions() {
    let listDimension = [];
    listDimension.push(new Dimension("A - Amargo", "A"));
    listDimension.push(new Dimension("D - Doce", "D"));
    return listDimension;
}
