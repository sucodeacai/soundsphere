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
