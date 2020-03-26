class FileSemanticJson extends FileJson {
    tooltip: Tooltip;
    simplePage: SimplePage
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     * @param  {Tooltip} tooltip
     * @param  {PageAdminDescriptors} SimplePage
     */
    //teste
    constructor(  sequenciador: any, dao: DAO, tooltip: Tooltip, simplePage: SimplePage) {
        super( sequenciador, dao)
        this.tooltip = tooltip;
        this.simplePage = simplePage;
        //   var self = this;
    }
    showMessageErrorJson(mensagem: string) {
        this.tooltip.showMessage(mensagem);
    }
    onReaderJson(evt: any): any {
        console.log("evt.target.result");
        console.log(evt.target.result);
        console.log(evt.target);
        console.log(evt);
        this.dao.synchronizeSemanticDescriptor(JSON.parse(evt.target.result));
        this.simplePage.generateHTML();
    }


}


