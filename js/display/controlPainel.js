"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function ControlPainel(context, canvas, painel) {
    "use strict";
    this.itemMixOption;
    this.painel = painel;
    this.canvas = canvas;
    //this.audioOptionsActive = false;
    this.panelReleased = true;
    this.itemOptionEnabled = true;
    this.ctxCanvas = context;
    this.idSoundIconSelect = null;
    this.b = false;
    //add 1
    // canvas.addEventListener("touchstart", startTouchInPanel, false);
    // canvas.addEventListener('touchmove', moveTouchInPanel, false);
    // canvas.addEventListener("touchend", endNormalTouchInPanel, false);
    // canvas.addEventListener("touchleave", endTouchInPanel, false);
    // canvas.addEventListener("touchcancel", endTouchInPanel, false);
    // $('canvas').css("cursor", "cell");
    // canvas.onmousedown = function (event) {
    //   //if (controlPainel.panelReleased) {
    //   painel.move = true;
    //   painel.mouseDownX = event.offsetX;
    //   painel.mouseDownY = event.offsetY;
    //   //  }
    // };
    // canvas.onmouseout = function (event) {
    //   painel.endMove();
    // };
    // //O evento ocorre quando o usuário libera um botão do mouse sobre um elemento
    // //O movimento do painel só e realizado enquanto se esitver preciosando a tecla
    // //ao soltar é desfeita a ação idependente se ele soltar no canvas ou não
    // canvas.onmouseup = function () {
    //   if (controlPainel.panelReleased) {
    //     //Se as opções do painel tiverem ativada ele pega o item que esta sobre o mouse e
    //     //abre o modal
    //     if (!painel.moved && (controlPainel.itemOptionEnabled)) {
    //       console.log("movendo 2");
    //       var itemMixTemp = painel.getItemMix();
    //       if (itemMixTemp) {
    //         controlPainel.itemMixOption = new ItemMixPanel();
    //         controlPainel.itemMixOption.x = itemMixTemp.x;
    //         controlPainel.itemMixOption.y = itemMixTemp.y;
    //         controlPainel.itemMixOption.startTime = itemMixTemp.startTime;
    //         controlPainel.itemMixOption.endTime = itemMixTemp.endTime;
    //         controlPainel.itemMixOption.seconds = itemMixTemp.seconds;
    //         controlPainel.itemMixOption.volume = itemMixTemp.volume;
    //         controlPainel.itemMixOption.solo = itemMixTemp.solo;
    //         controlPainel.itemMixOption.idSemanticDescriptor = itemMixTemp.idSemanticDescriptor;
    //     controlPainel.itemMixOption.id = itemMixTemp.id;
    //         controlPainel.itemMixOption.idBuffer = itemMixTemp.idBuffer;
    //         controlPainel.createModalOptions();
    //       }
    //     } else if (!painel.moved && controlPainel.idSoundIconSelect && (!controlPainel.itemOptionEnabled)) {
    //       console.log("tenta inserir");
    //       painel.insertItemMixPanel(controlPainel.idSoundIconSelect);
    //     }
    //   }
    //   painel.endMove();
    // };
    // //FUnção que gerencia o movimento do painel caso a opção move seja verdadeira
    // //de modo que se o usuário estiver clicando e arrastando ele movimenta o painel
    // canvas.onmousemove = function (e) {
    //   // painel.drawCoordinate(getPositionX(event),getPositionY(event));
    //   console.log("movendo");
    //   var evt = e || event;
    //   //para poder mover o canvas ele tem que ser diferente da posição do click.
    //   // ta tendo um bug que quando clica ele lança um evento de move e isso contorna
    //   if ((painel.mouseDownX != evt.offsetX) || (painel.mouseDownY != evt.offsetY)) {
    //     if (painel.move) {
    //       var sizeMoviment = 10;
    //       var deltaX = evt.offsetX - painel.lastX;
    //       console.log("delta x: " + (evt.offsetX - painel.lastX));
    //       console.log("delta x: " + (evt.offsetX - painel.lastX));
    //       var deltaY = evt.offsetY - painel.lastY;
    //       console.log("delta Y: " + (evt.offsetY - painel.lastY));
    //       console.log("delta Y: " + (evt.offsetY));
    //       //normalizaDelta para não ficar se movimentao mto
    //       if (deltaX >= 1) {
    //         deltaX = sizeMoviment;
    //       }
    //       if (deltaX <= -1) {
    //         deltaX = -sizeMoviment;
    //       }
    //       var deltaY = evt.offsetY - painel.lastY;
    //       //normalizaDelta para não ficar se movimentao mto
    //       if (deltaY >= 1) {
    //         deltaY = sizeMoviment;
    //       }
    //       if (deltaY <= -1) {
    //         deltaY = -sizeMoviment;
    //       }
    //       painel.lastX = evt.offsetX;
    //       painel.lastY = evt.offsetY;
    //       var maxDisplacingXAxis = painel.widthPainel - canvas.width;
    //       var maxDisplacingYAxis = painel.heightPainel - canvas.height;
    //       if (painel.displacingXAxis >= 0 && painel.displacingXAxis <= maxDisplacingXAxis) {
    //         if (painel.displacingXAxis + (deltaX * -1) > maxDisplacingXAxis) {
    //           painel.displacingXAxis = maxDisplacingXAxis;
    //         } else if (painel.displacingXAxis + (deltaX * -1) < 0) {
    //           painel.displacingXAxis = 0;
    //         } else {
    //           painel.displacingXAxis -= deltaX;
    //           contextCanvas.translate(deltaX, 0);
    //         }
    //       }
    //       if (painel.displacingYAxis >= 0 && painel.displacingYAxis <= maxDisplacingYAxis) {
    //         if (painel.displacingYAxis + (deltaY * -1) > maxDisplacingYAxis) {
    //           painel.displacingYAxis = maxDisplacingYAxis;
    //         } else if (painel.displacingYAxis + (deltaY * -1) < 0) {
    //           painel.displacingYAxis = 0;
    //         } else {
    //           painel.displacingYAxis -= deltaY;
    //           contextCanvas.translate(0, deltaY);
    //         }
    //       }
    //       console.log("moveu");
    //       painel.moved = true;
    //       painel.reMake();
    //     }
    //   }
    // };
    //Evento ao alterar o inicio
    $('#startTime').on('keyup change', function () {
        controlPainel.itemMixOption.startTime = parseFloat($('#startTime').val());
        controlPainel.itemMixOption.endTime = controlPainel.itemMixOption.startTime + controlPainel.itemMixOption.seconds;
        $('#endTime').val(controlPainel.itemMixOption.startTime + controlPainel.itemMixOption.seconds);
        console.log("startTime time p/: " + controlPainel.itemMixOption.startTime);
        $('#formOptions').form('validate form');
    });
    //Evento ao alterar o fim
    $('#endTime').on('keyup change', function () {
        controlPainel.itemMixOption.endTime = parseFloat($('#endTime').val());
        controlPainel.itemMixOption.startTime = controlPainel.itemMixOption.endTime - controlPainel.itemMixOption.seconds;
        $('#startTime').val(controlPainel.itemMixOption.endTime - controlPainel.itemMixOption.seconds);
        console.log("end time p/: " + controlPainel.itemMixOption.endTime);
        $('#formOptions').form('validate form');
    });
    //OPlçoes dos botoes do modal
    $('#buttonMinus').on('click', function () {
        if (controlPainel.itemMixOption.volume > 0) {
            $('#volume').progress({
                percent: controlPainel.itemMixOption.volume - 10
            });
            controlPainel.itemMixOption.volume = controlPainel.itemMixOption.volume - 10;
        }
    });
    //Button plus
    $('#buttonPlus').on('click', function () {
        if (controlPainel.itemMixOption.volume < 100) {
            $('#volume').progress({
                percent: controlPainel.itemMixOption.volume + 10
            });
            controlPainel.itemMixOption.volume = controlPainel.itemMixOption.volume + 10;
        }
    });
    //Botao para controlar o Play do painel de acordo com as opcoes utilizadas
    $('#playAudioOptions').mouseover(function () {
        sequenciador.playOneSoundDescitor(controlPainel.itemMixOption.idBuffer, function () { }, listSemanticDescriptors[controlPainel.itemMixOption.idSemanticDescriptor] ? listSemanticDescriptors[controlPainel.itemMixOption.idSemanticDescriptor]._filters : null);
    });
    $('#playAudioOptions').mouseout(function () {
        sequenciador.stopOneSound();
    });
    //Botao para controlar o Play do painel de acordo com as opcoes utilizadas
    $('#playAudioSemFiltro').mouseover(function () {
        sequenciador.playOneSound(controlPainel.itemMixOption.idBuffer, function () { });
    });
    $('#playAudioSemFiltro').mouseout(function () {
        sequenciador.stopOneSound();
    });
    //Funcoes para fazer o controle das operacoes dos filtros
    //Controla o evento chamando ao mudar o valor do Range do Lowpass
    // $("#frequencyLowPassRange").on(' input', function (e) {
    //   $("#frequencyLowPass").val(calcule01tofrequency(this.value));
    //   setPainelItemMixLowPassFrequency();
    // });
    $("#QLowPass").on(' input', function (e) {
        console.log("chamou qualy");
        controlPainel.itemMixOption.filter.lowpass.Q = $("#QLowPass").val();
    });
    //Controla o evento chamando ao mudar o valor do input do lowpass
    $("#frequencyLowPass").on('input', function (e) {
        controleMaxAndMinValueFrequency(this.id);
        //chama a funcao para converter o valor digitado no input para um valor par ao range
        //  $("#frequencyLowPassRange").val(convertFrequencyTo01(this.value));
        setPainelItemMixLowPassFrequency();
    });
    //-----------------------------------------------------------------
    //Controla o evento chamando ao mudar o valor do Range do HighPass
    //$("#frequencyHighPassRange").on(' input', function (e) {
    //  $("#frequencyHighPass").val(calcule01tofrequency(this.value));
    //  setPainelItemMixHighPassFrequency();
    //});
    $("#QHighPass").on(' input', function (e) {
        controlPainel.itemMixOption.filter.highpass.Q = $("#QHighPass").val();
    });
    //Controla o evento chamando ao mudar o valor do input do lowpass
    $("#frequencyHighPass").on('input', function (e) {
        controleMaxAndMinValueFrequency(this.id);
        //chama a funcao para converter o valor digitado no input para um valor par ao range
        //$("#frequencyHighPassRange").val(convertFrequencyTo01(this.value));
        setPainelItemMixHighPassFrequency();
    });
    //Opções do checkbox
    $('#checkSoloMute').checkbox({
        beforeChecked: function () {
            document.getElementById("solo").innerHTML = "Ativo/Solo ";
            var i = document.createElement('i');
            i.setAttribute("class", "alarm icon");
            document.getElementById("solo").appendChild(i);
            controlPainel.itemMixOption.solo = true;
        },
        beforeUnchecked: function () {
            document.getElementById("solo").innerHTML = "Mudo/Mute ";
            var i = document.createElement('i');
            i.setAttribute("class", "alarm slash icon");
            document.getElementById("solo").appendChild(i);
            controlPainel.itemMixOption.solo = false;
        }
    });
    $.fn.form.settings.rules.minZero = function (value) {
        if (value < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    $.fn.form.settings.rules.validEnd = function (value) {
        if (value < controlPainel.itemMixOption.seconds) {
            return false;
        }
        else {
            return true;
        }
    };
    //Para o ENTER não submiter a pagina.
    //Aproveita e set o enter para salvarOptions
    $('#formOptions').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            controlOptions.saveOptions();
            return false;
        }
    });
}
//Descarta alterações
ControlPainel.prototype.discartOptions = function () {
    $('#modalOptions').modal('hide');
};
//Excluir item mix
ControlPainel.prototype.removeItemMix = function () {
    painel.removeItemMixPanel(this.itemMixOption);
};
//Salvar alterações item mix
ControlPainel.prototype.saveOptions = function () {
    if ($('#formOptions').form('is valid')) {
        $('#modalOptions').modal('hide');
        this.painel.updateItem(this.itemMixOption);
    }
    else {
        $('#formOptions').form('validate form');
    }
};
//Ao criar o modal options carrega as opcoes de acordo com o ItemMixOption
ControlPainel.prototype.createModalOptions = function () {
    //Minus
    //Set opçoes de acordo com o itemMixOption
    if (this.itemMixOption.solo) {
        $('#checkSoloMute').checkbox('check');
    }
    else {
        $('#checkSoloMute').checkbox('uncheck');
    }
    $('#startTime').val(this.itemMixOption.startTime);
    $('#endTime').val(this.itemMixOption.endTime);
    let itemSelecionado;
    let conteudo = `

        <select id="select-filter" class="ui fluid  dropdown">
     `;
    console.log("ao carregar ");
    console.log("controlPainel.itemMixOption.idSemanticDescriptor");
    console.log(controlPainel.itemMixOption.idSemanticDescriptor);
    if (!controlPainel.itemMixOption.idSemanticDescriptor) {
        conteudo += `<option value="false" selected="selected"  >Selecione um descritor</option>`;
    }
    else {
        conteudo += `<option value="false" >Selecione um descritor</option>`;
    }
    listSemanticDescriptors.forEach((element, index) => {
        console.log("id " + controlPainel.itemMixOption.idSemanticDescriptor + "index" + index);
        if (controlPainel.itemMixOption.idSemanticDescriptor === index.toString()) {
            console.log("if id " + controlPainel.itemMixOption.idSemanticDescriptor + "index" + index);
            conteudo += `<option selected="selected"  value="${index}">${element.name}</option>`;
        }
        else {
            console.log("else id " + controlPainel.itemMixOption.idSemanticDescriptor + "index" + index);
            conteudo += `<option  value="${index}">${element.name}</option>`;
        }
    });
    conteudo += `
        </select>
   `;
    $('#selectDescritor').html(conteudo);
    $("#select-filter").on('change ', function () {
        controlPainel.itemMixOption.idSemanticDescriptor = this.value;
        console.log("   controlPainel.itemMixOption.idSemanticDescriptor");
        console.log(controlPainel.itemMixOption.idSemanticDescriptor);
    });
    $('#volume').progress({
        percent: controlPainel.itemMixOption.volume
    });
    $("#modalOptions").modal("setting", {
        closable: false,
        onApprove: function () {
            return false;
        },
        onHide: function () {
            // controlPainel.stopAudioOptionsPanelControl();
            $('.ui .error .message').html('');
            $('#divStartTime').removeClass('error');
            $('#divEndTime').removeClass('error');
        }
    }).modal("show");
    $('#formOptions').form({
        on: 'blur',
        fields: {
            startTime: {
                identifier: 'startTime',
                rules: [{
                        type: 'empty',
                        prompt: 'Informe o início.'
                    },
                    {
                        type: 'minZero',
                        prompt: 'O valor de início minimo é 0.'
                    }]
            },
            endTime: {
                identifier: 'endTime',
                rules: [{
                        type: 'empty',
                        prompt: 'Informe o fim.'
                    },
                    {
                        type: 'validEnd',
                        prompt: 'O tempo final deve ser maior ou igual ao tempo total da amostra. Tempo da amostras: ' + controlPainel.itemMixOption.seconds + '.'
                    }]
            }
        }
    });
};
ControlPainel.prototype.releasePanel = function (event) {
    this.panelReleased = true;
};
//Ao iniciar o play deve-se bloquear o painel ao terminar deve-se liberar
ControlPainel.prototype.blockPanel = function (event) {
    this.panelReleased = false;
};
//show modal restart
ControlPainel.prototype.showModalRestart = function (event) {
    $('#modalRestart').modal('show');
};
//hide modal restart
ControlPainel.prototype.cancelRestart = function (event) {
    $('#modalRestart').modal('hide');
};
ControlPainel.prototype.restart = function (event) {
    var i;
    sequenciador.stop();
    for (i = 0; i < painel.listItemMixPanel.length; i = i + 1) {
        painel.listItemMixPanel[i].length = 0;
    }
    painel.reMake();
    sequenciador.deleteMixing();
    $('#modalRestart').modal('hide');
};
//Funcao que controla a libercao da edicao das amostras sonoras no painel
ControlPainel.prototype.releaseOptions = function (event) {
    sequenciador.stop();
    if (this.itemOptionEnabled) {
        this.itemOptionEnabled = false;
        $('canvas').css("cursor", "default");
        //  $('#buttonOptions').toggleClass("active");
    }
    else {
        this.itemOptionEnabled = true;
        $('canvas').css("cursor", "cell");
        //  $('#buttonOptions').addClass("active");
    }
};
//Funcao para desabilitar as opcoes do de edicao dos itens do painel
ControlPainel.prototype.disableOptionsItens = function (event) {
    if (this.itemOptionEnabled) {
        this.itemOptionEnabled = false;
        $('canvas').css("cursor", "default");
        console.log("chamou o disable");
        //  $('#buttonOptions').toggleClass("active");
    }
};
//Funcao para habilitar as opcoes do de edicao dos itens do painel
ControlPainel.prototype.enableOptionsItens = function (event) {
    if (!controlSoundIcon.checkIconSoundSelected()) {
        this.itemOptionEnabled = true;
        $('canvas').css("cursor", "cell");
    }
};
ControlPainel.prototype.playAudioOptionsPanelControl = function (idBuffer, chamador) {
    this.audioOptionsActive = true;
    sequenciador.playOptionsPanel(idBuffer, controlPainel.itemMixOption.volume, controlPainel.itemMixOption.filter, stopEndAudioOptionsPanelControl);
};
//Funcao para  setar o Valor da frequencia lowpasss no ItemMixOption o inputRange em Frequency
function setPainelItemMixLowPassFrequency() {
    controlPainel.itemMixOption.filter.lowpass.frequency = $("#frequencyLowPass").val();
}
//Funcao para  setar o Valor da frequencia hightpasss no ItemMixOption o inputRange em Frequency
function setPainelItemMixHighPassFrequency() {
    controlPainel.itemMixOption.filter.highpass.frequency = $("#frequencyHighPass").val();
}
function controleMaxAndMinValueFrequency(idInput) {
    console.log("Id controle max e min " + idInput);
    console.log("Id inputElment.value " + $("#" + idInput).val());
    var maxValue = sequenciador.audioCtx.sampleRate / 2;
    if ($("#" + idInput).val() > maxValue) {
        $("#" + idInput).val(maxValue);
        $("#" + idInput).change();
        console.log("Novo valor? " + $("#" + idInput).val());
    }
}
