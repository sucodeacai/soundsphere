"use strict";
class Tooltip {
    showMessages(lista) {
        // console.log("tooltip.showMessages Exibindo mensagem tooltip");
        // for (let index = 0; index < lista.length; index++) {
        //   document
        //     .getElementById("mensagens")
        //     .append(
        //       `<div id="lista${index}" class="modalClass">${lista[index]}</div>`
        //     );
        //   setTimeout(() => {
        //     $(`#lista${index}`)?.classList.add("remover");
        //     setTimeout(() => {
        //       $(`#lista${index}`).remove();
        //     }, 1000);
        //   }, 3000);
        // }
    }
    showMessageFixed(mensagem) {
        // document
        //   .getElementById("mensagens")
        //   .append(`<div  id="messageAdmin1" class="modalClass">${mensagem}</div>`);
    }
    removeMessageFixed() {
        // $(`#messageAdmin1`)?.classList.add("remover");
        // $(`#messageAdmin1`).remove();
    }
    showMessageFixedId(mensagem, id) {
        // document
        //   .getElementById("mensagens")
        //   .append(
        //     `<div id="messageAdmin${id}" class="modalClass">${mensagem}</div>`
        //   );
    }
    removeMessageFixedId(id) {
        // $(`#messageAdmin${id}`)?.classList.add("remover");
        // $(`#messageAdmin${id}`).remove();
    }
    showMessage(mensagem) {
        // console.log(mensagem);
        var tooltipContainer = document.getElementById("tooltipContainer");
        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add("tooltip", "bs-tooltip-top", "show");
        tooltipElement.setAttribute("role", "tooltip");
        // Remover o triângulo (a seta)
        tooltipElement.innerHTML = `
      <div class="tooltip-inner top-page">${mensagem}</div>
    `;
        // Adicionar o tooltip ao container
        tooltipContainer.appendChild(tooltipElement);
        // Iniciar o tooltip com o método do Bootstrap
        const tooltip = new window.bootstrap.Tooltip(tooltipElement);
        // Habilitar o tooltip para exibir
        tooltip.show();
        // Fechar o tooltip após 2 segundos
        setTimeout(() => {
            tooltip.hide();
            tooltipElement.remove();
        }, 2000);
    }
}
