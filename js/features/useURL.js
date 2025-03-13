"use strict";
function getUrlParams() {
    var query = location.search.slice(1);
    var partes = query.split("&");
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split("=");
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    return data;
}
function updateUrlParam(param, value) {
    // Obtém a URL atual
    console.log(value);
    console.log(param);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(param, value);
    // Atualiza a URL no navegador sem recarregar a página
    window.history.pushState({}, "", currentUrl.toString());
}
function removeUrlParam(param) {
    // Cria a URL atual
    let urlObj = new URL(window.location.href);
    // Remove o parâmetro da URL
    urlObj.searchParams.delete(param);
    // Atualiza a URL no navegador sem recarregar a página
    window.history.pushState({}, "", urlObj.toString());
}
