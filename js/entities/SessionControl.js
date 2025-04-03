"use strict";
class SessionControl {
    constructor() {
        this.listEventSession = [];
    }
    newEventSession() {
        this.listEventSession.push(new EventSession());
        this.listEventSession[this.listEventSession.length - 1].putDateOfStartWork();
    }
    putEndEventSession() {
        this.listEventSession[this.listEventSession.length - 1].putDateOfSave();
    }
    putName(name) {
        this.listEventSession[this.listEventSession.length - 1].name = name;
    }
    putAuthor(author) {
        this.listEventSession[this.listEventSession.length - 1].author = author;
    }
    getLastEventNameValid() {
        // console.log("this.listEventSession: ")
        // console.log(this.listEventSession);
        if (this.listEventSession[this.listEventSession.length - 1].name) {
            return this.listEventSession[this.listEventSession.length - 1].name;
        }
        else if (this.listEventSession[this.listEventSession.length - 2]) {
            return this.listEventSession[this.listEventSession.length - 2].name;
        }
        else {
            return undefined;
        }
    }
    getLastAuthorValid() {
        // console.log("this.listEventSession: ")
        // console.log(this.listEventSession);
        if (this.listEventSession[this.listEventSession.length - 1].author) {
            return this.listEventSession[this.listEventSession.length - 1].author;
        }
        else if (this.listEventSession[this.listEventSession.length - 2]) {
            return this.listEventSession[this.listEventSession.length - 2].author;
        }
        else {
            return undefined;
        }
    }
    getLastEventName() {
        return this.listEventSession[this.listEventSession.length - 1].name;
    }
    getLastStartWork() {
        return this.listEventSession[this.listEventSession.length - 1]
            .dateStartWork;
    }
    addEventItemMixPanel(item) {
        this.listEventSession[this.listEventSession.length - 1].listEventItemMixPanel.push(item);
    }
    getAllEventItemMixPanel() {
        //Pegar o id dentro da lista
        //Pegar todos os itens dentro da lista
        // const getListItens = list => list.listEventItemMixPanel
        // Array.prototype.flatMap = function (callback) {
        //     return Array.prototype.concat.apply([], this.map(callback))
        // }
        // return this.listEventSession.flatMap(getListItens)
        return this.listEventSession.flatMap((list) => list.listEventItemMixPanel);
    }
}
