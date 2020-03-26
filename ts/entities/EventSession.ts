
class EventSession { 
    datDateSave: number=0
    dateStartWork: number= 0
    name:string=""
    author:string=""
    listEventItemMixPanel: EventItemMixPanel[]=[];
    putDateOfSave(){
        this.datDateSave= (this._getTime());
    }
    putDateOfStartWork(){
        
        this.dateStartWork = (this._getTime());
    }
    private _getTime(){
        return new Date().getTime();
    }

}

