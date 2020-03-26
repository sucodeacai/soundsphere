"use strict";
class FileSemanticJson extends FileJson {
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     * @param  {Tooltip} tooltip
     * @param  {PageAdminDescriptors} SimplePage
     */
    //teste
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.tooltip = tooltip;
        this.simplePage = simplePage;
        //   var self = this;
    }
    showMessageErrorJson(mensagem) {
        this.tooltip.showMessage(mensagem);
    }
    onReaderJson(evt) {
        console.log("evt.target.result");
        console.log(evt.target.result);
        console.log(evt.target);
        console.log(evt);
        this.dao.synchronizeSemanticDescriptor(JSON.parse(evt.target.result));
        this.simplePage.generateHTML();
    }
}
