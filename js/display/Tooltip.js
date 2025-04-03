"use strict";
class Tooltip {
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
