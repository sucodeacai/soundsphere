"use strict";
class SessionInformation {
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
    getLastEventNameValid() {
        console.log("this.listEventSession: ");
        console.log(this.listEventSession);
        if (this.listEventSession[this.listEventSession.length - 2]) {
            return this.listEventSession[this.listEventSession.length - 2].name;
        }
        else {
            return undefined;
        }
    }
    getLastEventName() {
        return this.listEventSession[this.listEventSession.length - 1].name;
    }
    getLastStartWork() {
        return this.listEventSession[this.listEventSession.length - 1].dateStartWork;
    }
}
