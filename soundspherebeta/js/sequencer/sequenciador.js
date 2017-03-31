/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function Sequenciador() {
    "use strict";
    this.activePlay = false;
    this.activeLoop = false;
    this.activePause = false;
    this.activeAudioIcon = false;
    this.mixing;
    this.bufferList = [];
    //Listas de controle de inserção
    this.newListBufferError =[];
    this.newListBufferOk =[];
    this.newListBufferProv = [];
    //
    this.startAt;
    this.pauseAt;
    this.controlIdItemMix = 1;
    this.audioIcon;
    this.stopFlag = true;
    this.nameList = [];
    //counterListDecode do buffer list da funcao de loadBufferList
    this.counterListDecode = 0;
    //   this.playList = [];
    this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    //gravar
}
Sequenciador.prototype.addBuffer = function(buffer, name) {
    var itemBuffer = new ItemBuffer();
    itemBuffer.buffer = buffer;
    itemBuffer.timeDuration = buffer.duration;
    itemBuffer.numberOfChannels = buffer.numberOfChannels;
    itemBuffer.name = name;
    //itemBuffer.listItemMix = [];
    return itemBuffer;
};

//Como passar argumentos pra uma função JS que estamos invocando por referência?
//http://pt.stackoverflow.com/questions/3924/como-passar-par%C3%A2metros-em-chamadas-de-fun%C3%A7%C3%B5es-por-refer%C3%AAncia-em-javascript
function tranforma(fn, meuThis, parametro) {
    return function(evento) {
        fn.call(meuThis, parametro);
    }
}

Sequenciador.prototype.loadBufferList = function(bufferList, nameList, callback) {
    "use strict";
    sequenciador.nameList = nameList;
    //this.onload = tranforma(callback, this, arguments[3])
    this.onloadBufferList =callback;
    var seq = this,
        i;
    var counterListDecode = 0;
    sequenciador.audioCtx.decodeAudioData(bufferList[sequenciador.counterListDecode]).then(buffer => continueDecode(bufferList, buffer));
};
function continueDecode(bufferList, buffer, nameList, dif) {
    //O Buffer só deve ser inserido se tiver 1 2 4 ou 6 canais. Caso seja inserido ele vai para o bufferList que é a biblioteca de amostras
    //é inserido na lista de de buffers OK para ser criado os icones
    //e é incrementado a contade no index.
    if (buffer.numberOfChannels == 1 || buffer.numberOfChannels == 2 || buffer.numberOfChannels == 4 || buffer.numberOfChannels == 6) {
        sequenciador.newListBufferProv.push(sequenciador.addBuffer(buffer, sequenciador.nameList[sequenciador.counterListDecode]));
        sequenciador.newListBufferOk.push(sequenciador.nameList[sequenciador.counterListDecode]);
    } else {
        //melhorar na 1.5
        //sequenciador.bufferList[sequenciador.index] = sequenciador.addBufferNull(sequenciador.nameList[sequenciador.counterListDecode]);
        //controlColor.removeFile(sequenciador.counterListDecode);
          sequenciador.newListBufferError.push(sequenciador.nameList[sequenciador.counterListDecode].concat(" só são permitidos arquivos mono, stereo, quad e 5.1."));
    }
    sequenciador.counterListDecode = sequenciador.counterListDecode + 1;
    //Quando percorrer toda lista de buffers carregados ele cria na ordem e exibe a mensagem de erro se houver
    if (sequenciador.counterListDecode == bufferList.length) {
      controlSoundIcon.addListIcons(sequenciador.newListBufferOk);
      var newListBufferOrdered = controlSoundIcon.orderListByName(sequenciador.newListBufferOk);
      for (var i = 0; i < newListBufferOrdered.length; i++) {
        for (var j = 0; j < sequenciador.newListBufferProv.length; j++) {
          if(newListBufferOrdered[i] == sequenciador.newListBufferProv[j].name){
            sequenciador.bufferList.push(sequenciador.newListBufferProv[j]);
            break;
          }
        }
      }
      //Informa os que estão com erro
      controlColor.addErrorMensage(sequenciador.newListBufferError);
        sequenciador.counterListDecode = 0;
        sequenciador.newListBufferProv = [];
        sequenciador.newListBufferOk = [];
        sequenciador.newListBufferError = [];
        sequenciador.nameList = [];
        sequenciador.onloadBufferList();
    } else {
        sequenciador.audioCtx.decodeAudioData(bufferList[sequenciador.counterListDecode]).then(buffer => continueDecode(bufferList, buffer));
    }
}
Sequenciador.prototype.stopOneSound = function() {
    this.activeAudioIcon = false;
    this.audioIcon.stop(0);
};
Sequenciador.prototype.playOneSound = function(id, callBack) {
    if (!this.activeAudioIcon) {
        this.activeAudioIcon = true;
        this.audioIcon = this.audioCtx.createBufferSource();
        this.audioIcon.buffer = this.bufferList[id].buffer;
        this.audioIcon.connect(this.audioCtx.destination);
        this.audioIcon.onended = function(e) {
            callBack(id);
            onEndSource();
        };
        this.audioIcon.start(0);
    }
};

function multCall(callback) {
    callback(arguments[1]);
    onEndSource();
}

function onEndSource() {
    sequenciador.activeAudioIcon = false;
}
Sequenciador.prototype.stop = function(bufferAudio) {
    if (!this.stopFlag) {
        this.pauseAt = null;
        this.mixing.stop(0);
        this.stopFlag = true;
        this.activePlay = false;
        $('img').attr('draggable', true);
        $('#buttonPlay').removeClass("active");
        $('#buttonPause').removeClass("active");
        $('#buttonStop').addClass("active");
        painel.stopDrawLoopMarker();
        controlPainel.releasePanel();
    }
};
Sequenciador.prototype.changeLoop = function(bufferAudio) {
    if (this.activeLoop) {
        $('#buttonLoop').toggleClass("active");
        this.activeLoop = false;
    } else {
        $('#buttonLoop').addClass("active");
        this.activeLoop = true;
    }
};

Sequenciador.prototype.getTotalTime = function() {
    var totalTime = 0;
    var l, o;
    for (l = 0; l < painel.listItemMixPanel.length; l = l + 1) {
        for (o = 0; o < painel.listItemMixPanel[l].length; o = o + 1) {
            if (this.bufferList[painel.listItemMixPanel[l][o].idBuffer].timeDuration + painel.listItemMixPanel[l][o].startTime > totalTime) {
                console.log("Start time: " + painel.listItemMixPanel[l][o].startTime + " Duração: " + this.bufferList[painel.listItemMixPanel[l][o].idBuffer].timeDuration);
                console.log("Alterando total time p/ : " + (this.bufferList[painel.listItemMixPanel[l][o].idBuffer].timeDuration + painel.listItemMixPanel[l][o].startTime));
                console.log("Tipo do objeto: " + typeof(painel.listItemMixPanel[l][o].startTime));
                totalTime = this.bufferList[painel.listItemMixPanel[l][o].idBuffer].timeDuration + painel.listItemMixPanel[l][o].startTime;
                console.log("Total time alterado p/: " + totalTime);
            }
        }
    }
    console.log("Total time final: " + totalTime);
    return totalTime;
};
Sequenciador.prototype.haveItemMix = function() {
    var possuiItemMix = false;
    for (l = 0; l < painel.listItemMixPanel.length; l = l + 1) {
        for (o = 0; o < painel.listItemMixPanel[l].length; o = o + 1) {
            possuiItemMix = true;
            break;
            break;
        }
    }
    return possuiItemMix;
}

Sequenciador.prototype.pause = function(bufferAudio) {
    if (this.activePlay) {
        this.activePause = true;

        this.activePlay = false;
        this.mixing.stop(0);
        this.pauseAt = Date.now() - this.startAt;
        painel.pauseDrawLoopMarker();
    }

}
Sequenciador.prototype.play = function(bufferAudio) {
        save();
        controlPainel.disableRemoveItem();

        if (this.haveItemMix()) {
            if (!this.activePlay) {
                controlPainel.blockPanel();
                this.activePause = false;
                var l, o;
                this.activePlay = true;
                this.stopFlag = false;
                $('#buttonPlay').addClass("active");
                $('#buttonStop').removeClass("active");

                $('#buttonPause').removeClass("active");
                var buffer = this.mix();
                this.mixing = this.audioCtx.createBufferSource();
                this.mixing.buffer = buffer;
                this.mixing.connect(this.audioCtx.destination);


                this.mixing.onended = onEndPlayList;
                if (this.pauseAt) {
                    this.startAt = Date.now() - this.pauseAt;

                    painel.continueLoopMarker(this.pauseAt);
                    this.mixing.start(0, this.pauseAt / 1000);

                    this.unPause();
                } else {


                    painel.startLoopMarker(this.getTotalTime());
                    this.startAt = Date.now();
                    this.mixing.start(0);
                }
            }
        } else {
            console.log("nao tem nada");
        }



    }
    //res
Sequenciador.prototype.unPause = function(bufferAudio) {
    this.activePause = false;
    this.pauseAt = null;
}
Sequenciador.prototype.getMaxChannelsPlayList = function() {
    var maxChannels = 0;
    var l, o;
    for (l = 0; l < painel.listItemMixPanel.length; l = l + 1) {
        for (o = 0; o < painel.listItemMixPanel[l].length; o = o + 1) {
            if (this.bufferList[painel.listItemMixPanel[l][o].idBuffer].numberOfChannels > maxChannels) {
                maxChannels = this.bufferList[painel.listItemMixPanel[l][o].idBuffer].numberOfChannels;
                console.log("maximo de canais: " + maxChannels);

            }
        }
    }

    return maxChannels;
};
Sequenciador.prototype.mix = function() {
    if (this.haveItemMix()) {
        var maxChannels = this.getMaxChannelsPlayList();
        var frameCount = this.audioCtx.sampleRate * this.getTotalTime();
        var out = this.audioCtx.createBuffer(maxChannels, frameCount, this.audioCtx.sampleRate);
        //Percorrer todos os buffers
        for (var l = 0; l < painel.listItemMixPanel.length; l = l + 1) {
            //percorrer os itensMixPanel de cada buffer
            for (var o = 0; o < painel.listItemMixPanel[l].length; o = o + 1) {
                //Percorrer os canais
                if (painel.listItemMixPanel[l][o].solo) {
                    for (var channel = 0; channel < maxChannels; channel++) {
                        if (channel <= (this.bufferList[painel.listItemMixPanel[l][o].idBuffer].numberOfChannels - 1)) {
                            var v = out.getChannelData(channel);
                            var mix = this.bufferList[painel.listItemMixPanel[l][o].idBuffer].buffer.getChannelData(channel);
                            for (var i = 0; i < mix.length; i++) {
                                var r = Math.floor(i + (this.audioCtx.sampleRate * painel.listItemMixPanel[l][o].startTime));
                                //   v[r] += mix[i];
                                v[r] += (mix[i] * (painel.listItemMixPanel[l][o].volume / 100));
                            }
                        }
                    }
                }
            }
        }
        return out;
    } else {
        console.log("não tem nada");
    }
};

Sequenciador.prototype.startDownload = function() {
    var index = 0,
        inputIndex = 0;
    var result = [];
    if (this.haveItemMix()) {
        var buffer = this.mix();
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var worker = new Worker(this.audioCtx.sampleRate);
        var buffer2 = [];
        var now = new Date();
        var nameFile = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "T" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds() + ".wav";
        var maxChannels = buffer.numberOfChannels;
        var i;
        for (i = 0; i < maxChannels; i = i + 1) {
            buffer2[i] = buffer.getChannelData(i);
        }
        // send the channel data from our buffer to the worker
        worker.record(buffer2);
        var blob2 = worker.exportWAV();
        var url = URL.createObjectURL(blob2);
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');
        au.controls = true;
        au.src = url;
        hf.href = url;
        hf.download = nameFile + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        hf.click();
    }
};
///Para consulta
//Metodo anterior usado para executar a reprodução
Sequenciador.prototype.Oldplay = function(bufferAudio) {
    "use strict";
    controlPainel.disableRemoveItem();

    if (this.haveItemMix()) {
        if (!this.activePlay) {
            var l, o;
            this.activePlay = true;
            this.stopFlag = false;
            $('#buttonPlay').addClass("active");
            $('img').attr('draggable', false);
            $('#buttonStop').removeClass("active");
            var i;
            this.sourceList = [];
            painel.drawLoopMarker(this.getTotalTime());
            for (l = 0; l < this.bufferList.length; l = l + 1) {
                for (o = 0; o < this.bufferList[l].listItemMix.length; o = o + 1) {
                    var source = this.audioCtx.createBufferSource();
                    source.buffer = this.bufferList[l].buffer;
                    source.connect(this.audioCtx.destination);
                    source.start(this.audioCtx.currentTime + this.bufferList[l].listItemMix[o].startTime);
                    if (this.bufferList[l].listItemMix[o].idBuffer == this.getIdLastItemMix()) {
                        source.onended = onEndPlayList;
                    }
                    this.sourceList.push(source);
                }
            }
        }
    } else {
        console.log("nao tem nada");
    }

};
//metodo usado para o antigo play
function onEndPlayList() {
    if (sequenciador.activeLoop && (!sequenciador.stopFlag) && (!sequenciador.activePause)) {

        sequenciador.activePlay = false;
        sequenciador.play();
    } else {

        if (sequenciador.activePause) {
            sequenciador.activePlay = false;
            $('#buttonPause').addClass("active");
            $('#buttonPlay').removeClass("active");
        } else {
            sequenciador.activePlay = false;
            sequenciador.unPause();
            controlPainel.releasePanel();
            $('#buttonStop').addClass("active");
            $('#buttonPlay').removeClass("active");
            $('#buttonPause').removeClass("active");
        }
    }
}
//Função utilizada pelo método anterior de reprodução
Sequenciador.prototype.getIdLastItemMix = function() {
    var idLastSoud;
    var totalTime = 0;
    var l, o;
    for (l = 0; l < this.bufferList.length; l = l + 1) {
        for (o = 0; o < this.bufferList[l].listItemMix.length; o = o + 1) {
            if (this.bufferList[l].timeDuration + this.bufferList[l].listItemMix[o].startTime > totalTime) {
                idLastSoud = this.bufferList[l].listItemMix[o].id;

                totalTime = this.bufferList[l].timeDuration + this.bufferList[l].listItemMix[o].startTime;
            }
        }
    }
    return idLastSoud;
};
//////////////////////////////////////
//Ultima ateração

Sequenciador.prototype.getTotalTime1 = function() {
    var totalTime = 0;
    var l, o;
    for (l = 0; l < this.bufferList.length; l = l + 1) {
        for (o = 0; o < this.bufferList[l].listItemMix.length; o = o + 1) {
            if (this.bufferList[l].timeDuration + this.bufferList[l].listItemMix[o].startTime > totalTime) {
                console.log("item start time no sequenciador e aew kd vc: " + this.bufferList[l].listItemMix[o].startTime);
                totalTime = this.bufferList[l].timeDuration + this.bufferList[l].listItemMix[o].startTime;
            }
        }
    }
    return totalTime;
};
Sequenciador.prototype.addItemMix = function(id, time) {
    var itemMix = new ItemMix();
    itemMix.id = this.controlIdItemMix;
    itemMix.startTime = time;
    this.bufferList[id].listItemMix.push(itemMix);
    this.controlIdItemMix = this.controlIdItemMix + 1;
};

Sequenciador.prototype.removeItemMix = function(id, time) {
    var i;
    for (i = 0; i < this.bufferList[id].listItemMix.length; i = i + 1) {
        if (this.bufferList[id].listItemMix[i].startTime == time) {
            this.bufferList[id].listItemMix.splice(i, 1);
        }
    }
};
Sequenciador.prototype.updateItemMix = function(id, time, solo, volume) {
    var i;
    console.log("dentro do update sequenciador ");
    for (i = 0; i < this.bufferList[id].listItemMix.length; i = i + 1) {
        console.log("time: " + time);
        console.log("this.bufferList[id].listItemMix[i].startTime: " + this.bufferList[id].listItemMix[i].startTime);

        if (this.bufferList[id].listItemMix[i].startTime == time) {

            this.bufferList[id].listItemMix[i].solo = solo;
            this.bufferList[id].listItemMix[i].volume = volume;

        }
    }
};

Sequenciador.prototype.deleteMixing = function() {
    var l;
    for (l = 0; l < this.bufferList.length; l = l + 1) {
        this.bufferList[l].listItemMix = [];
    }

};
