"use strict";
//Substitui o   $(".x").classList.remove(".y");
function removeClassFromElements(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        element.classList.remove(className);
    });
}
//substitui o $(".x").children("y")!.classList.toggle("black white");
//o Seletor deve ser alterado
function toggleClasses(selector, class1, class2) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        element.classList.toggle(class1);
        element.classList.toggle(class2);
    });
}
