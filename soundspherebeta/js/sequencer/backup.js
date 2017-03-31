/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
Sequenciador.prototype.addBuffer = function(buffer) {
    var itemBuffer = new ItemBuffer();
    itemBuffer.buffer = buffer;
    itemBuffer.timeDuration = buffer.duration;
    itemBuffer.numberOfChannels = buffer.numberOfChannels;
      itemBuffer.name = name;
    //itemBuffer.listItemMix = [];
    return itemBuffer;
};
Sequenciador.prototype.addBufferNull = function() {
    var itemBuffer = new ItemBuffer();
    itemBuffer.buffer = this.audioCtx.createBuffer(2, 22050, 44100);
  itemBuffer.name = name;
    itemBuffer.listItemMix = [];
    return itemBuffer;
};
//Como passar argumentos pra uma função JS que estamos invocando por referência?
//http://pt.stackoverflow.com/questions/3924/como-passar-par%C3%A2metros-em-chamadas-de-fun%C3%A7%C3%B5es-por-refer%C3%AAncia-em-javascript
function tranforma(fn, meuThis, parametro) {
    return function(evento) {
        fn.call(meuThis, parametro);
    }
}
Sequenciador.prototype.loadBufferList = function(bufferList, callback) {
    "use strict";

    this.onload = callback;
    var seq = this,
        i = 0;
    var index = seq.bufferList.length;


    sequenciador.audioCtx.decodeAudioData(bufferList[sequenciador.contador]).then(buffer => continueDecode(bufferList, buffer));

};

function continueDecode(bufferList, buffer) {
    if (buffer.numberOfChannels == 1 || buffer.numberOfChannels == 2 || buffer.numberOfChannels == 4 || buffer.numberOfChannels == 6) {
        sequenciador.bufferList[sequenciador.index] = sequenciador.addBuffer(buffer);
        console.log("Numer of chanels: " + buffer.numberOfChannels);
    } else {
        //melhorar na 1.5
        sequenciador.bufferList[sequenciador.index] = sequenciador.addBufferNull();
        controlColor.removeFile(sequenciador.contador);


    }
    sequenciador.contador = sequenciador.contador + 1;
    sequenciador.index = sequenciador.index + 1;
    if (sequenciador.contador == bufferList.length) {
        sequenciador.contador = 0;
        sequenciador.onload();
    } else {
        sequenciador.audioCtx.decodeAudioData(bufferList[sequenciador.contador]).then(buffer => continueDecode(bufferList, buffer));
    }
}
