enum EventsCRUD {
    INSERT,
    DELETE,
    UPDATE,
    READ
}
class EventItemMixPanel {
    itemMixPanel:ItemMixPanel
    date:number
    eventCrud:EventsCRUD
    constructor(itemMixPanel:ItemMixPanel, eventCrud:EventsCRUD, date?:number){
        this.itemMixPanel=itemMixPanel
        this.date= date? date :this._getTime()
        this.eventCrud=eventCrud
    }
 
    private _getTime(){
        return new Date().getTime();
    }
}