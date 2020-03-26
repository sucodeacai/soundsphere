function getPositionX(event) {
  var x;
  if (navigator.userAgent.match(/Android/i)) {
    var offset = getOffset(canvas);
    x = event.touches[0].pageX - offset.left;
    console.log("Android: calculando a posição X: "+x);
  } else {
    x = anOffsetX = (event.offsetX !== undefined) ? event.offsetX : (event.layerX - event.target.offsetLeft);

  }
  return x;
}
//Posição do mouse no eixo Y
function getPositionY(event) {
  var y;
  //Metodo funciona apenas no chrome
  if (navigator.userAgent.match(/Android/i)) {
    var offset = getOffset(canvas);

    y = event.touches[0].pageY - offset.top;

        console.log("Android: calculando a posição Y"+y);
  }else{
      y = anOffsetX = (event.offsetY !== undefined) ? event.offsetY : (event.layerY - event.target.offsetTop);
  }
  return y;
}
//Metodo temporario para gerar uma cor
function getColor() {
  "use strict";
  var r = String(Math.floor(Math.random() * (255 + 1))),
    g = String(Math.floor(Math.random() * (255 + 1))),
    b = String(Math.floor(Math.random() * (255 + 1))),
    rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
  return rgb;
}
//Metodo temporario para gerar o taamnho do som
function getTamanhoSom() {
  "use strict";
  var min = 1,
    max = 15;
  return min + Math.floor(Math.random() * (max - min + 1));
}







function Painel(context, canvas) {
  "use strict";
  this.controlTimes = 0;
  this.ctxCanvas = context;
  this.canvas = canvas;
  this.pixelPerSecond = 10;
  this.sizeTrail = 40;
  this.c = 0;
  this.heightPainel = 0;
  this.listItemMixPanel = [];
  this.xMarker;
  this.lastMakerX;
  this.move = false;
  this.lastX = 0;
  this.lastY = 0;
  this.displacingXAxis = 0;

  this.displacingYAxis = 0;
  this.make();


}



//Alterar o tamanho da trilha em relação ao tempo
Painel.prototype.changeTime = function(val) {
  "use strict";
  var seconds = val * 60;
  this.widthPainel = this.pixelPerSecond * seconds;
  // this.canvas.setAttribute("width", this.widthPainel);
  this.reMake();
};

//Quantidade de Track na Trilha
Painel.prototype.getQtdTrackByTrail = function(val) {
  "use strict";
  var numberTrail = this.getNumberTrailByHeight(val);
  var listaTrack = this.listItemMixPanel[numberTrilha];
  return listaTrack.length;
};


//Alterar o numero de trilhas para mixagem
Painel.prototype.changeTrail = function(val) {
  "use strict";
  var oldSize = this.getQtdTrails();
  this.heightPainel = val * this.sizeTrail;


  var newSize = this.getQtdTrails();
  var i, j;
  for (i = 0; i < newSize; i = i + 1) {
    if (this.listItemMixPanel[i] == null) {
      this.listItemMixPanel[i] = [];
    }
  }

  for (j = 0; j < oldSize; j = j + 1) {

    if (j >= newSize) {
      this.listItemMixPanel[j] = [];
    }
  }
  //  this.canvas.setAttribute("height", this.heightPainel);
  this.reMake();

};
//Ao iniciar o Painel e chamado esse metodo para inicializar o painei com as configuracoes
//corretas alem de definir o numero de trilhas que estarao disponiveis na array
Painel.prototype.make = function() {
  "use strict";
  this.changeTime('300');
  this.changeTrail('40');
  this.reDrawAllItemMixPanel();
  this.drawTrails();
  this.drawGridTime();

  this.drawGridTrail();

};


Painel.prototype.reMake = function() {
  "use strict";
  //Limpa tela para excluir os rastros
  this.ctxCanvas.clearRect(0, 0, this.widthPainel, this.heightPainel);
  this.drawTrails();
  this.reDrawAllItemMixPanel();
  this.drawGridTime();
  this.drawGridTrail();
};



//Função para atualizar a array de acordo com o numero de trilhas
Painel.prototype.reDrawAllItemMixPanel = function() {
  "use strict";

  var i, j;
  for (i = 0; i < this.getQtdTrails(); i = i + 1) {
    if (this.listItemMixPanel[i] != null) {

      for (j = 0; j < this.listItemMixPanel[i].length; j = j + 1) {
        this.listItemMixPanel[i][j].draw();
      }
    }
  }
};

//Desenha as linhas que divide as trilhas
Painel.prototype.drawTrails = function() {
  "use strict";

  var x = this.sizeTrail;


  this.ctxCanvas.beginPath();
  this.ctxCanvas.fillStyle = '#FFFFFF';
  //Converte os segundos no tamanho a ser inserido
  this.ctxCanvas.fillRect(0, 0, this.widthPainel, this.heightPainel);

  this.ctxCanvas.beginPath();


  for (x; x < this.heightPainel; x += this.sizeTrail) {

    this.ctxCanvas.moveTo(0, x);
    this.ctxCanvas.lineTo(this.widthPainel, x);

  }
  this.ctxCanvas.strokeStyle = "#000";
  this.ctxCanvas.stroke();
};
//Retorna a quantidade de trilhas que o painel possui
Painel.prototype.getQtdTrails = function() {
  "use strict";
  return this.heightPainel / this.sizeTrail;
};
//Retorna o endereço que a o som deve ser inserido no Eixo y
//para ser desenhaado de acordo com o height informado
Painel.prototype.getMiddleHeigtTrail = function(val) {
  "use strict";


  return (this.getNumberTrailByHeight(val) * this.sizeTrail) - (this.sizeTrail / 2);
};
//Retorna em que trilha foi inserido o som de acordo com
//height informado
Painel.prototype.getNumberTrailByHeight = function(val) {
  "use strict";
  var x = this.sizeTrail,
    trail = 1;

  for (x; x <= this.heightPainel; x += this.sizeTrail) {
    if (val <= x) {
      break;
    }
    trail += 1;
  }
  return trail;



};
//Desenha a referençia/Coordenada no painel de acordo com a posiçao X e Y
Painel.prototype.drawCoordinate = function(x, y) {
  "use strict";

  this.ctxCanvas.font = "15px";
  this.reMake();
  this.ctxCanvas.fillStyle = 'black';
  var distanceOfMouse = 10;

  this.ctxCanvas.fillText('T: ' + this.getNumberTrailByHeight(y + this.displacingYAxis) + ' ' + this.getTimeByWidth(x), (x + this.displacingXAxis + distanceOfMouse), (y + this.displacingYAxis));


};
//Desenha o itemMixPaneler
Painel.prototype.stopDrawLoopMarker = function(totalTime) {
  this.flagDrawMaker = false;
  this.resetTranslate();
  this.reMake();

};
//Pause draw
Painel.prototype.pauseDrawLoopMarker = function(totalTime) {
  this.flagDrawMaker = false;

};
Painel.prototype.startLoopMarker = function(totalTime) {
  "use strict"
  this.totalTime = totalTime;

  this.xMarker = 0;
  this.lastMakerX = 0;
  this.anterior = new Date().getTime();
  this.flagDrawMaker = true;
  this.resetTranslate();
  this.drawMarker();

};
Painel.prototype.continueLoopMarker = function(pausedAt) {
  "use strict"

  this.anterior = new Date().getTime();
  this.flagDrawMaker = true;
  this.drawMarker();

};
Painel.prototype.drawMarker = function() {
  if (painel.flagDrawMaker) {
    var agora = new Date().getTime();
    var decorrido = agora - painel.anterior;
    painel.moveDisplacingXMarker(painel.xMarker);
    console.log("------decorrido: "+decorrido);
    console.log("---------------------agora: "+agora);
    var ctx = painel.ctxCanvas;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    painel.reMake();
    painel.ctxCanvas.beginPath();
    painel.ctxCanvas.moveTo((painel.xMarker), 0);
    painel.ctxCanvas.lineTo((painel.xMarker), painel.heightPainel);
    painel.ctxCanvas.strokeStyle = "#000";
    painel.ctxCanvas.stroke();
    var velocidade = painel.pixelPerSecond;
    painel.xMarker += velocidade * decorrido / 1000;
    painel.anterior = agora;
    if (painel.getSecondsByXPosition(painel.xMarker) < painel.totalTime) {
      requestAnimationFrame(painel.drawMarker);
    } else {
      painel.resetTranslate();
      painel.reMake();
    }
  } else {
    console.log("Pausa animação")
  }
};




//Desenha as grades do tempo
Painel.prototype.drawGridTime = function() {
  "use strict";
  var x = this.pixelPerSecond;
  var y = 0;
  this.ctxCanvas.beginPath();

  for (x; x <= this.widthPainel; x += this.pixelPerSecond) {
    var xcoodenate = x + 0.5;
    var time = this.getTimeGrid(x);
    var timeString = String(time);
    var timeLenght = timeString.length;
    if ((y % 2) == 0) {

      this.ctxCanvas.moveTo(xcoodenate, 0 + this.displacingYAxis);
      this.ctxCanvas.lineTo(xcoodenate, 8 + this.displacingYAxis);
      this.ctxCanvas.fillStyle = '#000';
      this.ctxCanvas.fillText(time, (x - 3 * timeLenght), (17 + this.displacingYAxis));


    } else {

      this.ctxCanvas.moveTo(xcoodenate, 0 + this.displacingYAxis);
      this.ctxCanvas.lineTo(xcoodenate, 4 + this.displacingYAxis);
    }
    y = y + 1;

  }
  this.ctxCanvas.strokeStyle = "#000";
  this.ctxCanvas.stroke();
};
//Desenha as grades das trilhas
Painel.prototype.drawGridTrail = function() {
  "use strict";
  var y = (this.sizeTrail / 2);
  for (y; y <= this.heightPainel; y += this.sizeTrail) {
    var trail = this.getNumberTrailByHeight(y);

    this.ctxCanvas.fillStyle = 'black';
    this.ctxCanvas.fillText(trail, (1 + this.displacingXAxis), y);



  }
  this.ctxCanvas.stroke();
};
//Get Time para ser usado na grid
Painel.prototype.getTimeGrid = function(y) {

  var time = '';
  var segundos = y / this.pixelPerSecond;
  var segundo = segundos % 60;
  var minutos = segundos / 60;
  var minuto = minutos % 60;
  var hora = minutos / 60;
  if (Math.floor(segundos) <= 0) {

    time = '00' + time;
  }
  if (Math.floor(segundos) > 0) {

    time = Math.floor(segundo) + time;
  }
  if (Math.floor(minutos) > 0) {
    time = Math.floor(minuto) + ':' + time;
  }
  if (Math.floor(hora) > 0) {
    time = ':' + Math.floor(hora) + ':' + time;
  }
  return time;

};
//get quantidade de segundos de acordo com  X
Painel.prototype.getSecondsByWidth = function(xCoordate) {

  xCoordate = xCoordate + this.displacingXAxis;
  seconds = xCoordate / this.pixelPerSecond;
  return seconds;
}; //get quantidade de segundos de acordo com  X
Painel.prototype.getSecondsByXPosition = function(xCoordate) {

  var seconds = xCoordate / this.pixelPerSecond;
  return seconds;
};
//Retorna o tempo de acordo com a width
Painel.prototype.getTimeByWidth = function(xCoordate) {
  "use strict"
  xCoordate = xCoordate + this.displacingXAxis;
  var x = this.pixelPerSecond;
  var qtdSecond = 0;
  for (x; x <= this.widthPainel; x += this.pixelPerSecond) {
    if (xCoordate <= x) {
      break;
    }
    qtdSecond += 1;
  }
  var time = '';
  var segundos = qtdSecond;
  var segundo = segundos % 60;
  var minutos = segundos / 60;
  var minuto = minutos % 60;
  var hora = minutos / 60;
  if (Math.floor(segundos) <= 0) {

    time = 'S: 00' + time;
  }
  if (Math.floor(segundos) > 0) {

    time = 'S: ' + Math.floor(segundo) + time;
  }
  if (Math.floor(minutos) > 0) {
    time = 'M: ' + Math.floor(minuto) + ' ' + time;
  }
  if (Math.floor(hora) > 0) {
    time = 'H: ' + Math.floor(hora) + ' ' + time;
  }
  return time;
};
//Verifica se o itemMixPanelpode ser desenhado no painel ou não
Painel.prototype.removeItemMixPanel = function() {
  var remove = new ItemMixPanel();

  remove.width = (this.pixelPerSecond);
  remove.x = getPositionX(event) + this.displacingXAxis;
  remove.y = this.getMiddleHeigtTrail(getPositionY(event) + this.displacingYAxis);

  var listaRemove = this.checkItemMixPanel(remove);

  if (listaRemove.length >= 1) {
    var numberTrail = this.getNumberTrailByHeight(listaRemove[0].y) - 1;
    var listaTrail = this.listItemMixPanel[numberTrail];

    var linha = this.getNumberTrailByHeight(listaRemove[0].y) - 1;
    var i;
    for (i = 0; i < listaTrail.length; i = i + 1) {
      if (listaRemove[0].x == listaTrail[i].x) {
        sequenciador.removeSoundToPlayList(listaTrail[i].id, this.getSecondsByWidth(listaTrail[i].x));

        listaTrail.splice(i, 1);
      }
    }
    this.reMake();
  }


};

//Retorna a lista de itemMixPanels com que o itemMixPanelenviado se colide
Painel.prototype.checkItemMixPanel = function(itemMixPanel) {
  "use strict";
  console.log("itemMixPanel,Y: "+itemMixPanel.y);
  var listColisao = [],
    numeroTrilha = this.getNumberTrailByHeight(itemMixPanel.y);
  var listProvisoria = this.listItemMixPanel[numeroTrilha - 1];
  var i;


  for (i = 0; i < listProvisoria.length; i = i + 1) {
    if (this.checkCollision(itemMixPanel.getColisao(), listProvisoria[i].getColisao())) {

      listColisao.push(listProvisoria[i]);
    }

  }
  return listColisao;
};
Painel.prototype.drawItemMixPanel = function(idSoundIconSelect) {
  var id = idSoundIconSelect;
  var g = document.getElementById(id);
  var gg = g.firstChild;
  var path = gg.firstChild;
  var color = path.style.fill;
  var itemMixPanel = new ItemMixPanel(this.ctxCanvas);
  itemMixPanel.seconds = sequenciador.bufferList[id].timeDuration;
  itemMixPanel.color = color;
  itemMixPanel.id = id;
  itemMixPanel.width = (itemMixPanel.seconds * this.pixelPerSecond);
  itemMixPanel.x = getPositionX(event) + this.displacingXAxis;
  itemMixPanel.y = this.getMiddleHeigtTrail(getPositionY(event) + this.displacingYAxis);
  var listColisoes = this.checkItemMixPanel(itemMixPanel);
  var qt
  var i;
  var desenha = false;
  if (listColisoes.length === 1) {
    //caso o itemMixPanelseja colado sobre outro ele direciona ele para a direita do mesmo
    if (itemMixPanel.x >= listColisoes[0].x && itemMixPanel.x <= listColisoes[0].x + listColisoes[0].width) {
      itemMixPanel.x = listColisoes[0].x + listColisoes[0].width;
      if (this.checkItemMixPanel(itemMixPanel).length === 0) {
        desenha = true;
      }
    }
    if ((itemMixPanel.x + itemMixPanel.width) > listColisoes[0].x && itemMixPanel.x < listColisoes[0].x) {
      itemMixPanel.x = itemMixPanel.x - ((itemMixPanel.x + itemMixPanel.width) - listColisoes[0].x);
      if (this.checkItemMixPanel(itemMixPanel).length === 0) {
        desenha = true;
      }
    }
  } else if (listColisoes.length === 0) {
    desenha = true;
  }
  if (itemMixPanel.x < 0 || (itemMixPanel.x + itemMixPanel.width) > this.widthPainel) {
    desenha = false;
    console.log(".....entrou aqui....")
  }
  if (desenha) {
    itemMixPanel.draw();
    this.pushItemMixPanel(itemMixPanel);
    sequenciador.addSoundToPlayList(id, this.getSecondsByXPosition(itemMixPanel.x));
    var i;
  } else {
    console.log('não desenhoa');
    $('.canvas')
      .popup({
        title: 'Popup Title',
        content: 'Hello I am a popup'
      });
  }
};


//Verifica se a colisões
Painel.prototype.checkCollision = function(ret1, ret2) {
  "use strict";
  return (ret1.x + ret1.width) > ret2.x &&
    ret1.x < (ret2.x + ret2.width) &&
    (ret1.y + ret1.height) > ret2.y &&
    ret1.y < (ret2.y + ret2.height);
};
//Adiciona itemMixPanel
Painel.prototype.pushItemMixPanel = function(itemMixPanel) {
  "use strict";
  var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;

  this.listItemMixPanel[linha].push(itemMixPanel);
};
//Posição do mouse no eixo X









//FUnção que gerencia o movimento do painel caso a opção move seja verdadeira
//de modo que se o usuário estiver clicando e arrastando ele movimenta o painel
window.onmousemove = function(e) {
  var evt = e || event;
  if (painel.move) {
    var sizeMoviment = 10;
    var deltaX = evt.offsetX - painel.lastX;

    var deltaY = evt.offsetY - painel.lastY;

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
    console.log("pageX: " + evt.offsetX);
    console.log("pageY: " + evt.offsetY);
    console.log("Delta X: " + deltaX);
    console.log("Delta Y: " + deltaY);
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
    painel.reMake();
  }
};

//funcao touch move



//Levar para o inicio do canvas
Painel.prototype.resetTranslate = function() {
  contextCanvas.translate(this.displacingXAxis, this.displacingYAxis);
  this.displacingXAxis = 0;
  this.displacingYAxis = 0;
  this.lastX = 0;
  this.lastY = 0;


};
//função para controlar o movimento no eixo x de acordo com a movimentaçãp do mouse
Painel.prototype.endMove = function() {
  painel.move = false;
  painel.lastX = null;
  painel.lastY = null;
}
//Função responsavel por mover o painel dentro do canvas
Painel.prototype.moveDisplacingX = function(x) {
  if (x > (canvas.width / 2)) {
    var deltaX = x - painel.lastX;
    var maxDisplacingXAxis = painel.widthPainel - canvas.width;
    if (painel.displacingXAxis >= 0 && painel.displacingXAxis <= maxDisplacingXAxis) {
      if (painel.displacingXAxis + (deltaX * 1) > maxDisplacingXAxis) {
        painel.displacingXAxis = maxDisplacingXAxis;
      } else if (painel.displacingXAxis + (deltaX * 1) < 0) {
        painel.displacingXAxis = 0;
      } else {
        painel.displacingXAxis += deltaX;
        contextCanvas.translate(-deltaX, 0);
      }
    }
    painel.reMake();
  }
  painel.lastX = x;
};
// função par controlar o movimento do marker caso passe da metade do canvas
//Função responsavel por mover o painel dentro do canvas
Painel.prototype.moveDisplacingXMarker = function(currentMarkerX) {
  if (currentMarkerX > (canvas.width / 2)) {
    var deltaX = currentMarkerX - painel.lastMakerX;
    var maxDisplacingXAxis = painel.widthPainel - canvas.width;
    if (painel.displacingXAxis >= 0 && painel.displacingXAxis <= maxDisplacingXAxis) {
      if (painel.displacingXAxis + (deltaX * 1) > maxDisplacingXAxis) {
        painel.displacingXAxis = maxDisplacingXAxis;
      } else if (painel.displacingXAxis + (deltaX * 1) < 0) {
        painel.displacingXAxis = 0;
      } else {
        painel.displacingXAxis += deltaX;
        contextCanvas.translate(-deltaX, 0);
      }
    }
    painel.reMake();
  }
  painel.lastMakerX = currentMarkerX;
};


//O movimento do painel só e realizado enquanto se esitver preciosando a tecla
//ao soltar é desfeita a ação idependente se ele soltar no canvas ou não
window.onmouseup = function() {

  painel.endMove();
}

window.touchend = function() {
  painel.move = false;
}

window.touchleave = function() {
  painel.move = false;
}

window.touchcancel = function() {
  painel.move = false;
}
