"use strict";
class ActionDescriptiveIcon {
    constructor(id, url, name, tag) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.tag = tag;
        this.img = document.createElement("img");
        this.img.src = this.url;
    }
}
function generatorActionDescriptiveIcon() {
    let listDescriptiveIcons = [];
    listDescriptiveIcons.push(new ActionDescriptiveIcon(1, "img/icons/chocolate_tradicional.png", "Chocolate Tradicional", "chocolate_tradicioinal"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(2, "img/icons/chocolate_branco.png", "Chocolate Branco", "chocolate_branco"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(3, "img/icons/agua.png", "Agua", "agua"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(4, "img/icons/agua_vazio.png", "Agua vazio", "agua_vazio"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(5, "img/icons/cafe.png", "Café", "cafe"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(6, "img/icons/cafe_vazio.png", "Café vazio", "cafe_vazio"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(7, "img/icons/laranja.png", "Laranja", "laranja"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(8, "img/icons/laranja_vazio.png", "Laranja vazio", "laranja_vazio"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(9, "img/icons/limao.png", "Limão", "limao"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(10, "img/icons/limao_vazio.png", "Limão vazio", "limao_vazio"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(10, "img/icons/maca.png", "Maçã", "maca"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(11, "img/icons/maca_vazio.png", "Maçã vazio", "maca_vazio"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(12, "img/icons/tomate.png", "Tomate", "tomate"));
    listDescriptiveIcons.push(new ActionDescriptiveIcon(13, "img/icons/tomate_vazio.png", "tomate vazio", "tomate_vazio"));
    return listDescriptiveIcons;
}
