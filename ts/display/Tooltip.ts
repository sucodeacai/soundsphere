class Tooltip {
    showMessages(lista: string[]): void {
        console.log("tooltip.showMessages Exibindo mensagem tooltip");
        for (let index = 0; index < lista.length; index++) {
            $("#mensagens").append(`<div id="lista${index}" class="modalClass">${lista[index]}</div>`);
            setTimeout(() => {
                $(`#lista${index}`).addClass("remover");
                setTimeout(() => {
                    $(`#lista${index}`).remove();
                }, 1000);
            }, 3000);
        }
    }
    showMessageFixed (mensagem:string){

        $("#mensagens").append(`<div id="messageAdmin1" class="modalClass">${mensagem}</div>`);
    }
    removeMessageFixed (){
        // console.log("chamou removeMessageFixed ")
        $(`#messageAdmin1`).addClass("remover");
     
            $(`#messageAdmin1`).remove();
      
    }
    showMessage(mensagem: string): void {
        $("#mensagens").append(`<div id="messageAdmin1" class="modalClass">${mensagem}</div>`);
        setTimeout(() => {
            $(`#messageAdmin1`).addClass("remover");
            setTimeout(() => {
                $(`#messageAdmin1`).remove();
            }, 1000);
        }, 3000);
    }
}