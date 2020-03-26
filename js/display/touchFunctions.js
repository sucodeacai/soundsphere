"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
//functions found on the internet
//link: http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
class TouchFunctions {
    constructor() {
        this.keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    }
    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }
    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }
    disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', (e) => this.preventDefault, false);
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;
    }
    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', (e) => this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = function (e) {
        };
        document.onkeydown = null;
    }
    //functions found on the internet
    getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return { left: offsetLeft, top: offsetTop };
    }
}
