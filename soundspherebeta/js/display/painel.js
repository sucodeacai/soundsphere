/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function getPositionX(event) {
  console.log("teste");
  var x;
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
    var offset = getOffset(canvas);
    x = event.touches[0].pageX - offset.left;
  } else {
    x = anOffsetX = (event.offsetX !== undefined) ? event.offsetX : (event.layerX - event.target.offsetLeft);

  }
  return x;
}
//Posição do mouse no eixo Y
function getPositionY(event) {
  var y;
  //Metodo funciona apenas no chrome
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
    var offset = getOffset(canvas);

    y = event.touches[0].pageY - offset.top;

  } else {
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
  console.log("teste");
  "use strict";
  this.contId = 0;
  this.pixelPerSecond = 20;
  this.sizeTrail = 40;
  this.heightPainel = 0;
  this.widthPainel = 0;
  this.lastX = 0;
  this.lastY = 0;
  this.mouseDownX = 0;
  this.mouseDownY = 0;
  this.displacingYAxis = 0;
  this.displacingXAxis = 0;
  this.listItemMixPanel = [];
  this.ctxCanvas = context;
  this.canvas = canvas;
  this.lastMove;
  this.xMarker;
  this.lastMakerX;
  this.move = false;
  this.moved = false;
  this.make();
}
//Tempo total do painel
Painel.prototype.setTimePanel = function(val) {
  "use strict";
  var seconds = val * 60;
  this.widthPainel = this.pixelPerSecond * seconds;
};

//Quantidade de Track na Trilha
Painel.prototype.getQtdItemMixPanelByTrail = function(val) {
  "use strict";
  var numberTrail = this.getNumberTrailByHeight(val);
  var listaTrack = this.listItemMixPanel[numberTrilha];
  return listaTrack.length;
};


//Alterar o numero de trilhas para mixagem
Painel.prototype.setTrailPanel = function(val) {
  "use strict";
  this.heightPainel = val * this.sizeTrail;
  var i;
  for (i = 0; i < val; i = i + 1) {
    this.listItemMixPanel[i] = [];
  }

};
//Ao iniciar o Painel e chamado esse metodo para inicializar o painei com as configuracoes
//corretas alem de definir o numero de trilhas que estarao disponiveis na array
Painel.prototype.make = function() {
  "use strict";
  this.setTimePanel('300');
  this.setTrailPanel('80');
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
Painel.prototype.stopDrawLoopMarker = function() {
  this.flagDrawMaker = false;
  this.resetTranslate();
  this.reMake();

};
//Pause draw
Painel.prototype.pauseDrawLoopMarker = function() {
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
    console.log("Pausa animação");
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
//get position X de acordo com o tempo
Painel.prototype.getXbySeconds = function(seconds) {
  var positionX = seconds * this.pixelPerSecond;
  return positionX;
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
//De modo que ele cria um itemMix e checa a colisao dele
//Colocando o width que é o comprimento em 1 segundo
//Ele pode ter mais de um tendo em vista que podem ter amostrar
//com um segundo o menos, mas ele trabalha apenas com a primeira
//Se a lista for maior que um e que ele encontrou/colidiu com algum  item
//entao ele busca na listaTrail para remover o item
Painel.prototype.removeItemMixPanel = function(item) {
  var numberTrail = this.getNumberTrailByHeight(item.y) - 1;
  var listaTrail = this.listItemMixPanel[numberTrail];
  //Verifica se a opcap solo do item é igual a do painel e caso for, ele deve
  //passar a informacao para o sequenciador
  var i;
  for (i = 0; i < listaTrail.length; i = i + 1) {
    if (item.x == listaTrail[i].x) {
      //  sequenciador.removeItemMix(listaTrail[i].id, this.getSecondsByXPosition(listaTrail[i].x));
      listaTrail.splice(i, 1);
    }
  }
  this.reMake();

};
//Salvar alterações
Painel.prototype.updateItem = function(item) {
  var numberTrail = this.getNumberTrailByHeight(item.y) - 1;
  console.log("Numero da trilha: " + this.getNumberTrailByHeight(item.y));
  var listaTrail = this.listItemMixPanel[numberTrail];
  //Verifica se a opcap solo do item é igual a do painel e caso for, ele deve
  //passar a informacao para o sequenciador
  var i;
  console.log("dentro paine.update item")
  for (i = 0; i < listaTrail.length; i = i + 1) {
    console.log("item.x" + item.x);
    console.log("listatrail.x" + listaTrail[i].x);
    if (item.id == listaTrail[i].id) {
      listaTrail[i].solo = item.solo;
      listaTrail[i].volume = item.volume;
      listaTrail[i].startTime = item.startTime;
      listaTrail[i].endTime = item.endTime;
      listaTrail[i].x = this.getXbySeconds(item.startTime);
      var collided = this.checkItemMixPanelUpdate(listaTrail[i]);
      var newTrail = numberTrail + 1;
      var itemMixProv = listaTrail[i];;
      while (collided) {



        var novaLista = this.listItemMixPanel[this.getNumberTrailByHeight(itemMixProv.y) - 1];
        for (j = 0; j < novaLista.length; j = j + 1) {
          if (novaLista[j].id == itemMixProv.id) {
            novaLista.splice(j, 1);
          }
        }
        itemMixProv.y += this.sizeTrail;
        this.listItemMixPanel[newTrail].push(itemMixProv);
        collided = this.checkItemMixPanelUpdate(itemMixProv);
        newTrail = newTrail + 1;
      }
      //sequenciador.updateItemMix(item.idBuffer, this.getSecondsByXPosition(item.x), item.solo, item.volume);
    }
  }
  this.reMake();


};
//Atraves da ultima posição do cursor ele joga para a função que o chamou
//o itemMix daquela posição
Painel.prototype.getItemMix = function() {
  console.log("getItem");
  var remove = new ItemMixPanel();
  remove.width = (this.pixelPerSecond);

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
    remove.x = getPositionX(this.lastMove) + this.displacingXAxis;
    remove.y = this.getMiddleHeigtTrail(getPositionY(this.lastMove) + this.displacingYAxis);

  } else {
    remove.x = getPositionX(event) + this.displacingXAxis;
    remove.y = this.getMiddleHeigtTrail(getPositionY(event) + this.displacingYAxis);

  }
  var listaRemove = this.checkItemMixPanel(remove);
  if (listaRemove.length >= 1) {

    return listaRemove[0];
  } else {
    return false;
  }
};



//Retorna a lista de itemMixPanels com que o itemMixPanelenviado se colide
Painel.prototype.checkItemMixPanel = function(itemMixPanel) {
  "use strict";
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
//Retorna se um itemMixPanel colide com algum outro (com exeção dele mesmo)
Painel.prototype.checkItemMixPanelUpdate = function(itemMixPanel) {
  "use strict";
  var colide = false,
    numeroTrilha = this.getNumberTrailByHeight(itemMixPanel.y);
  console.log("numeroTrilha - 1: " + (numeroTrilha - 1));
  console.log("numeroTrilha - 1: ");
  var listProvisoria = this.listItemMixPanel[numeroTrilha - 1];
  var i;
  for (i = 0; i < listProvisoria.length; i = i + 1) {
    if (itemMixPanel.id != listProvisoria[i].id) {
      if (this.checkCollision(itemMixPanel.getColisao(), listProvisoria[i].getColisao())) {
        colide = true;
      }
    }
  }
  return colide;
};
//Função para verificar se pode ou nao desenhar/inserir o item no Painel
Painel.prototype.insertItemMixPanel = function(idSoundIconSelect) {
  console.log("Tentou inserir");
  var idBuffer = idSoundIconSelect;
  var g = document.getElementById(idBuffer);
  var gg = g.firstChild;
  var path = gg.firstChild;
  var color = path.style.fill;
  var itemMixPanel = new ItemMixPanel();
  itemMixPanel.seconds = sequenciador.bufferList[idBuffer].timeDuration;
  itemMixPanel.color = color;
  itemMixPanel.idBuffer = idBuffer;
  itemMixPanel.width = (itemMixPanel.seconds * this.pixelPerSecond);
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
    itemMixPanel.x = getPositionX(this.lastMove) + this.displacingXAxis;
    itemMixPanel.y = this.getMiddleHeigtTrail(getPositionY(this.lastMove) + this.displacingYAxis);
  } else {
    itemMixPanel.x = getPositionX(event) + this.displacingXAxis;
    itemMixPanel.y = this.getMiddleHeigtTrail(getPositionY(event) + this.displacingYAxis);
  }
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
  }
  if (desenha) {
    //Caso seja possivel inserir ele é desenhado no painel e é definido o tempo de inicio,
    //é definido um ID
    itemMixPanel.draw();
    itemMixPanel.startTime = this.getSecondsByXPosition(itemMixPanel.x);
    itemMixPanel.endTime = itemMixPanel.startTime + itemMixPanel.seconds;
    this.contId = this.contId + 1;

    itemMixPanel.id = this.contId;
    this.pushItemMixPanel(itemMixPanel);
    var i;
    //Salva no local storage
    save();
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
    painel.moved = false;
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


//Funções para controle do touch no painel
function moveTouchInPanel(e) {
  console.log("move toush");
  if (!e)
    var e = event;
  if (painel.move) {
    var offset = getOffset(canvas);

    var sizeMoviment = 50;
    var moveX = e.touches[0].pageX - offset.left;
    var moveY = e.touches[0].pageY - offset.top;
    var deltaX = moveX - painel.lastX;

    var deltaY = moveY - painel.lastY;

    //normalizaDelta para não ficar se movimentao mto
    if (deltaX >= 1) {
      deltaX = sizeMoviment;
    }
    if (deltaX <= -1) {
      deltaX = -sizeMoviment;
    }
    //normalizaDelta para não ficar se movimentao mto
    if (deltaY >= 1) {
      deltaY = sizeMoviment;
    }
    if (deltaY <= -1) {
      deltaY = -sizeMoviment;
    }
    painel.lastX = moveX;
    painel.lastY = moveY;

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

    } else {}
    if (painel.displacingYAxis >= 0 && painel.displacingYAxis <= maxDisplacingYAxis) {
      if (painel.displacingYAxis + (deltaY * -1) > maxDisplacingYAxis) {
        painel.displacingYAxis = maxDisplacingYAxis;
      } else if (painel.displacingYAxis + (deltaY * -1) < 0) {
        painel.displacingYAxis = 0;
      } else {
        painel.displacingYAxis -= deltaY;
        contextCanvas.translate(0, deltaY);

      }

    } else {
      console.log("não moveu")
    }
    console.log("teste movimendo");
    painel.moved = true;
    painel.reMake();
  }
}
//Ao cancelar/encerrar touch
function endTouchInPanel(evt) {
  //enableScroll();

  Options.log("end touch 1");

  painel.endMove();
}
//aofinalizar touch normalmente
function endNormalTouchInPanel(evt) {
  console.log("tenta inserir");
  //enableScroll();
  if (controlPainel.panelReleased) {
    if (!painel.moved && (controlPainel.checkOptionsItem)) {
      var itemMixTemp = painel.getItemMix();

      if (itemMixTemp) {
        controlPainel.itemMixOption = new ItemMix();
        controlPainel.itemMixOption.x = itemMixTemp.x;
        controlPainel.itemMixOption.y = itemMixTemp.y;
        controlPainel.itemMixOption.volume = itemMixTemp.volume;
        controlPainel.itemMixOption.solo = itemMixTemp.solo;
        controlPainel.itemMixOption.idBuffer = itemMixTemp.idBuffer;
        controlPainel.createModalOptions();

      }
    } else if (!painel.moved && controlPainel.idSoundIconSelect && (!controlPainel.checkOptionsItem)) {
      painel.insertItemMixPanel(controlPainel.idSoundIconSelect);
    }
  }
  painel.endMove();
}






function startTouchInPanel(evt) {
  //  var meta = document.createElement('meta');
  //  meta.name="viewport";
  //  meta.id="metaScroll";
  //  meta.content="width=device-width, initial-scale=1.0, user-scalable=no";
  //  document.getElementsByTagName('head')[0].appendChild(meta);
  //  disableScroll();
  if (controlPainel.panelReleased) {
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
      evt.preventDefault();
      console.log("e android");
      painel.lastMove = event;
    }
    painel.move = true;
  }
}
