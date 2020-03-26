"use strict";
class EventSession {
    constructor() {
        this.datDateSave = 0;
        this.dateStartWork = 0;
        this.name = "";
        this.author = "";
        this.listEventItemMixPanel = [];
    }
    putDateOfSave() {
        this.datDateSave = (this._getTime());
    }
    putDateOfStartWork() {
        this.dateStartWork = (this._getTime());
    }
    _getTime() {
        return new Date().getTime();
    }
}
