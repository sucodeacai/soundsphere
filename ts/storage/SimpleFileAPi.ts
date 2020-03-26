class SimpleFileAPi extends FileApi {
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
        var self = this;
    }
    showMessageErrorJson(mensagem: string) {
        this.tooltip.showMessage(mensagem);
    }
    showMessageErrorWav(): void {
        var messages = this.listNamesInvalid.concat(this.dao.listMessagesError)
        console.log("Mensagens de erro")
        console.log(messages)
        if(messages.length>0){
            console.log(messages)
            this.tooltip.showMessages(messages);
        }   
        this.simplePage.render();
    }
    onReaderJson(evt: any): any {
        console.log("evt.target.result");
        console.log(evt.target.result);
        console.log(evt.target);
        console.log(evt);
        this.dao.synchronizeSemanticDescriptor(JSON.parse(evt.target.result));
        this.simplePage.generateHTML();
    }

    callBackToLoadWav: (void) = function (this: SimpleFileAPi) {
         this.desativaModalLoad();
        this.showMessageErrorWav();
        this.simplePage.generateHTML();
    }.bind(this)
    onReaderWav(bufferList: any[]): void {

        this.dao.loadBufferList(bufferList, this.callBackToLoadWav);

    }
}


