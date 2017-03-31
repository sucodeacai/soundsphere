/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function ControlPainel(context, canvas, painel) {
  "use strict";
  this.itemMixOption;
  this.painel = painel;
  this.canvas = canvas;
  this.panelReleased = true;
  this.checkOptionsItem = false;
  this.ctxCanvas = context;
  this.idSoundIconSelect = null;
  this.b = false;

  //add 1
  console.log("teste");
  canvas.addEventListener("touchstart", startTouchInPanel, false);
  canvas.addEventListener('touchmove', moveTouchInPanel, false);
  canvas.addEventListener("touchend", endNormalTouchInPanel, false);
  canvas.addEventListener("touchleave", endTouchInPanel, false);
  canvas.addEventListener("touchcancel", endTouchInPanel, false);

  canvas.onmousedown = function(event) {
    //if (controlPainel.panelReleased) {
      painel.move = true;
      painel.mouseDownX = event.offsetX;
      painel.mouseDownY = event.offsetY;

  //  }
  };
  canvas.onmouseout = function(event) {
    painel.endMove();
  };







  //O evento ocorre quando o usuário libera um botão do mouse sobre um elemento
  //O movimento do painel só e realizado enquanto se esitver preciosando a tecla
  //ao soltar é desfeita a ação idependente se ele soltar no canvas ou não
  canvas.onmouseup = function() {
    if (controlPainel.panelReleased) {
      //Se as opções do painel tiverem ativada ele pega o item que esta sobre o mouse e
      //abre o modal
      if (!painel.moved && (controlPainel.checkOptionsItem)) {
          console.log("movendo 2");
        var itemMixTemp = painel.getItemMix();
        if (itemMixTemp) {
          controlPainel.itemMixOption = new ItemMixPanel();
          controlPainel.itemMixOption.x = itemMixTemp.x;
          controlPainel.itemMixOption.y = itemMixTemp.y;

          controlPainel.itemMixOption.startTime = itemMixTemp.startTime;
          controlPainel.itemMixOption.endTime = itemMixTemp.endTime;
          controlPainel.itemMixOption.seconds = itemMixTemp.seconds;
          controlPainel.itemMixOption.volume = itemMixTemp.volume;
          controlPainel.itemMixOption.solo = itemMixTemp.solo;
          controlPainel.itemMixOption.id = itemMixTemp.id;

          controlPainel.createModalOptions();

        }
      } else if (!painel.moved && controlPainel.idSoundIconSelect && (!controlPainel.checkOptionsItem)) {
        console.log("tenta inserir");
        painel.insertItemMixPanel(controlPainel.idSoundIconSelect);
      }
    }
    painel.endMove();
  };

  //FUnção que gerencia o movimento do painel caso a opção move seja verdadeira
  //de modo que se o usuário estiver clicando e arrastando ele movimenta o painel
  canvas.onmousemove = function(e) {
    // painel.drawCoordinate(getPositionX(event),getPositionY(event));
    console.log("movendo");
    var evt = e || event;
      //para poder mover o canvas ele tem que ser diferente da posição do click.
        // ta tendo um bug que quando clica ele lança um evento de move e isso contorna
    if((painel.mouseDownX != evt.offsetX) || (painel.mouseDownY != evt.offsetY)){
    if (painel.move) {
      console.log("teste");
      var sizeMoviment = 10;
      var deltaX = evt.offsetX - painel.lastX;
      console.log("delta x: "+(evt.offsetX - painel.lastX));
      console.log("delta x: "+(evt.offsetX - painel.lastX));

      var deltaY = evt.offsetY - painel.lastY;
      console.log("delta Y: "+(evt.offsetY - painel.lastY));
      console.log("delta Y: "+(evt.offsetY));

      //normalizaDelta para não ficar se movimentao mto
      if (deltaX >= 1) {
        deltaX = sizeMoviment;
      }
      if (deltaX <= -1) {
        deltaX = -sizeMoviment;
      }
      var deltaY = evt.offsetY - painel.lastY;
      //normalizaDelta para não ficar se movimentao mto
      if (deltaY >= 1) {
        deltaY = sizeMoviment;
      }
      if (deltaY <= -1) {
        deltaY = -sizeMoviment;
      }

      painel.lastX = evt.offsetX;
      painel.lastY = evt.offsetY;
      var maxDisplacingXAxis = painel.widthPainel - canvas.width;
      var maxDisplacingYAxis = painel.heightPainel - canvas.height;

      if (painel.displacingXAxis >= 0 && painel.displacingXAxis <= maxDisplacingXAxis) {
        if (painel.displacingXAxis + (deltaX * -1) > maxDisplacingXAxis) {
          painel.displacingXAxis = maxDisplacingXAxis;
        } else if (painel.displacingXAxis + (deltaX * -1) < 0) {
          painel.displacingXAxis = 0;
        } else {
          painel.displacingXAxis -= deltaX;
          contextCanvas.translate(deltaX, 0);

        }

      }
      if (painel.displacingYAxis >= 0 && painel.displacingYAxis <= maxDisplacingYAxis) {
        if (painel.displacingYAxis + (deltaY * -1) > maxDisplacingYAxis) {
          painel.displacingYAxis = maxDisplacingYAxis;
        } else if (painel.displacingYAxis + (deltaY * -1) < 0) {
          painel.displacingYAxis = 0;
        } else {
          painel.displacingYAxis -= deltaY;
          contextCanvas.translate(0, deltaY);

        }

      }
      console.log("moveu");
      painel.moved = true;
      painel.reMake();
    }
  }
  };
  //Evento ao alterar o inicio
  $('#startTime').on('keyup change', function() {
    controlPainel.itemMixOption.startTime = parseFloat($('#startTime').val());
    controlPainel.itemMixOption.endTime = controlPainel.itemMixOption.startTime + controlPainel.itemMixOption.seconds;
    $('#endTime').val(controlPainel.itemMixOption.startTime + controlPainel.itemMixOption.seconds);
    console.log("startTime time p/: " + controlPainel.itemMixOption.startTime);
      $('#formOptions').form('validate form');
  });
  //Evento ao alterar o fim
  $('#endTime').on('keyup change', function() {
    controlPainel.itemMixOption.endTime = parseFloat($('#endTime').val());
    controlPainel.itemMixOption.startTime = controlPainel.itemMixOption.endTime - controlPainel.itemMixOption.seconds;
    $('#startTime').val(controlPainel.itemMixOption.endTime - controlPainel.itemMixOption.seconds);
    console.log("end time p/: " + controlPainel.itemMixOption.endTime);
      $('#formOptions').form('validate form');
  });
  //OPlçoes dos botoes do modal
  $('#buttonMinus').on('click', function() {
    if (controlPainel.itemMixOption.volume > 0) {
      $('#volume').progress({
        percent: controlPainel.itemMixOption.volume - 10
      });
      controlPainel.itemMixOption.volume = controlPainel.itemMixOption.volume - 10;
    }
  });
  //Button plus
  $('#buttonPlus').on('click', function() {
    if (controlPainel.itemMixOption.volume < 100) {
      $('#volume').progress({
        percent: controlPainel.itemMixOption.volume + 10
      });
      controlPainel.itemMixOption.volume = controlPainel.itemMixOption.volume + 10;
    }
  });
  //Opções do checkbox
  $('#checkSoloMute').checkbox({
    beforeChecked: function() {
      document.getElementById("solo").innerHTML = "Ativo/Solo ";
      var i = document.createElement('i');
      i.setAttribute("class", "alarm icon");
      document.getElementById("solo").appendChild(i);

      controlPainel.itemMixOption.solo = true;
    },
    beforeUnchecked: function() {
      document.getElementById("solo").innerHTML = "Mudo/Mute ";
      var i = document.createElement('i');
      i.setAttribute("class", "alarm slash icon");
      document.getElementById("solo").appendChild(i);

      controlPainel.itemMixOption.solo = false;
    }
  });
  $.fn.form.settings.rules.minZero = function(value) {

    if (value < 0) {
      return false;
    } else {
      return true;
    }
  }
  $.fn.form.settings.rules.validEnd = function(value) {

    if (value < controlPainel.itemMixOption.seconds) {
      return false;
    } else {
      return true;
    }
  }

  //Para o ENTER não submiter a pagina.
  //Aproveita e set o enter para salvarOptions
  $('#formOptions').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();

      controlOptions.saveOptions();
      return false;

    }
  });


}
//Descarta alterações
ControlPainel.prototype.discartOptions = function() {

    $('#modalOptions').modal('hide');
  }
  //Excluir item mix
ControlPainel.prototype.removeItemMix = function() {
  painel.removeItemMixPanel(this.itemMixOption);
};
//Salvar alterações item mix
ControlPainel.prototype.saveOptions = function() {

  if ($('#formOptions').form('is valid')) {
    $('#modalOptions').modal('hide');
    painel.updateItem(this.itemMixOption);
  } else {
    $('#formOptions').form('validate form');
  }
};

ControlPainel.prototype.createModalOptions = function() {
  //Minus

  //Set opçoes de acordo com o itemMixOption
  if (this.itemMixOption.solo) {
    $('#checkSoloMute').checkbox('check');
  } else {
    $('#checkSoloMute').checkbox('uncheck');
  }
  $('#startTime').val(this.itemMixOption.startTime);
  $('#endTime').val(this.itemMixOption.endTime);
  $('#volume').progress({
    percent: controlPainel.itemMixOption.volume
  });

  $("#modalOptions").modal("setting", {
    closable: false,
    onApprove: function() {
      return false;
    },
    onHide: function() {
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
ControlPainel.prototype.releasePanel = function(event) {

    this.panelReleased = true;
  }
  //Ao iniciar o play deve-se bloquear o painel ao terminar deve-se liberar
ControlPainel.prototype.blockPanel = function(event) {

  this.panelReleased = false;
}

//show modal restart
ControlPainel.prototype.showModalRestart = function(event) {
  $('#modalRestart').modal('show');
};
//hide modal restart
ControlPainel.prototype.cancelRestart = function(event) {

  $('#modalRestart').modal('hide');
};
ControlPainel.prototype.restart = function(event) {

  var i;
  sequenciador.stop();
  for (i = 0; i < painel.listItemMixPanel.length; i = i + 1) {
    painel.listItemMixPanel[i].length = 0;
  }
  painel.reMake();
  sequenciador.deleteMixing();
  $('#modalRestart').modal('hide');
};
ControlPainel.prototype.releaseOptions = function(event) {
  sequenciador.stop();
  if (this.checkOptionsItem) {
    this.checkOptionsItem = false;
    $('canvas').css("cursor", "default");
    $('#buttonOptions').toggleClass("active");
  } else {

    this.checkOptionsItem = true;
    $('canvas').css("cursor", "not-allowed");
    $('#buttonOptions').addClass("active");
  }

}
ControlPainel.prototype.disableRemoveItem = function(event) {

  if (this.checkOptionsItem) {
    this.checkOptionsItem = false;
    $('canvas').css("cursor", "default");
    $('#buttonOptions').toggleClass("active");
  }

}
