"use strict";
class SimpleFileAPi extends FileApi {
    /**
     * @param  {any} sequenciador
     * @param  {DAO} dao
     * @param  {Tooltip} tooltip
     * @param  {PageAdminDescriptors} SimplePage
     */
    //teste
    constructor(sequenciador, dao, tooltip, simplePage) {
        super(sequenciador, dao);
        this.callBackToLoadWav = function () {
            this.desativaModalLoad();
            this.showMessageErrorWav();
            this.simplePage.generateHTML();
        }.bind(this);
        this.tooltip = tooltip;
        this.simplePage = simplePage;
        var self = this;
    }
    showMessageErrorJson(mensagem) {
        this.tooltip.showMessage(mensagem);
    }
    showMessageErrorWav() {
        var messages = this.listNamesInvalid.concat(this.dao.listMessagesError);
        console.log("Mensagens de erro");
        console.log(messages);
        if (messages.length > 0) {
            console.log(messages);
            this.tooltip.showMessages(messages);
        }
        this.simplePage.render();
    }
    onReaderJson(evt) {
        console.log("evt.target.result");
        console.log(evt.target.result);
        console.log(evt.target);
        console.log(evt);
        this.dao.synchronizeSemanticDescriptor(JSON.parse(evt.target.result));
        this.simplePage.generateHTML();
    }
    onReaderWav(bufferList) {
        this.dao.loadBufferList(bufferList, this.callBackToLoadWav);
    }
}
