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
function sec2time(timeInSeconds) {
    let time = parseFloat(timeInSeconds).toFixed(3);
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time - minutes * 60);
    let milliseconds = time.slice(-3);
    return (pad(hours, 2) +
        ":" +
        pad(minutes, 2) +
        ":" +
        pad(seconds, 2) +
        "." +
        pad(milliseconds, 3));
}
function pad(num, size) {
    return ("000" + num).slice(size * -1);
}
