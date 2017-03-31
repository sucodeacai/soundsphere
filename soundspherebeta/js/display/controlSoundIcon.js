/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function ControlSoundIcon() {
  "use strict";
  this.classSoundIcon = 'ui small centered image';
  this.xmlns = "http://www.w3.org/2000/svg";
  this.circleColor = "black";
  this.iconPlay = "M941 784l0 1594c0,210 398,-94 454,-126l865 -511c312,-183 18,-317 -160,-413l-864 -513c-20,-12 -295,-209 -295,-31z";
  this.nodeFather = "containerSoundIcons";
  this.iconSound = "M1095 954l0 809c-20,0 0,0 -20,0 -20,0 0,0 -20,-20 -263,-101 -546,283 -364,465 121,142 344,40 425,-101 40,-61 61,-121 61,-202 0,-223 0,-465 0,-688l748 -202c20,0 81,-20 101,-40l0 607c-40,0 -40,-40 -142,-40 -81,0 -182,61 -223,101 -20,20 -61,61 -61,101 -101,182 20,344 142,344 121,0 202,-20 283,-121 61,-61 101,-142 101,-243l0 -1052c-40,0 -465,121 -506,142l-506 142 -20 0z";
  //this.drawing = "M96 85l0 146c0,19 44,-9 50,-12l95 -47c34,-17 2,-29 -18,-38l-95 -47c-2,-1 -32,-19 -32,-3z";
  //gravar
}

ControlSoundIcon.prototype.orderListByName = function(listNames) {
  return controlColor.orderListByName(listNames);
}
ControlSoundIcon.prototype.addListIcons = function(listNames) {
  console.log("Chegou: ControlSoundIcon.prototype.addListIcons");
  var listNamesOrdened =controlColor.addList(listNames);
  var dif = controlColor.listFilesNamesLenght() - listNames.length;
  for (var j = 0; j < listNames.length; j++) {
        controlSoundIcon.create((j + dif), "audio/wav", controlColor.getName((j + dif)), controlColor.getColor((j + dif)));
  }

};
ControlSoundIcon.prototype.create = function(id, tipo, name, color) {
  console.log("cirando icon svg: " + name);
  if (name.length >= 12) {
    var name = name.slice(0, 9) + '...';
  }


  var svg = document.createElementNS(this.xmlns, 'svg');
  svg.setAttribute('data-content', ('Tipo: ' + tipo));
  svg.setAttribute('data-title', (name + id));
  svg.setAttribute("xmlns", this.xmlns);
  svg.setAttribute("xml:space", "preserve");
  svg.setAttribute("height", "60px");
  svg.setAttribute("width", "60px");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewBox", "0 0 3002 3002");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  svg.setAttribute('class', this.classSoundIcon);
  var g = document.createElementNS(this.xmlns, 'g');
  svg.appendChild(g);
  svg.setAttribute("id", id);
  var path = document.createElementNS(this.xmlns, 'path');
  path.setAttribute("d", this.iconSound);
  path.setAttribute("style", ("fill:" + color));
  path.setAttribute("id", ("p" + id));
  g.appendChild(path);
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPod/i))) {
    svg.addEventListener("touchstart", handleStart, false);
    svg.addEventListener("touchend", handleEnd, false);
    svg.addEventListener("touchleave", handleEnd, false);
    svg.addEventListener("touchcancel", handleEnd, false);
  } else {
    svg.setAttribute("onclick", "togle(id)");
    svg.setAttribute("onmouseenter", "playOneSound(id)");
    svg.setAttribute("onmouseleave", "stopOneSound(id)");
  }


  // If there's exactly one finger inside this element

  var divSegment = document.createElement('div');
  var divElement = document.createElement('div');
  divSegment.setAttribute('class', 'ui segment');
  divElement.setAttribute('class', 'column');
    divElement.setAttribute('id', id+"div");
  var nameFile = document.createElement('p');
  var node = document.createTextNode(name);


  nameFile.appendChild(node);
  divSegment.appendChild(svg);

  divSegment.appendChild(nameFile);
  divElement.appendChild(divSegment);





  document.getElementById(this.nodeFather).appendChild(divElement);

};

function playOneSound(id) {
  //Caso no painel esta avita a opção e o usuário passar o mouse o selecionar
  //uma amostra ele desativa as opções
  if (controlPainel.checkOptionsItem) {
    controlPainel.releaseOptions();
  }
  var controlSoundIcon = new ControlSoundIcon();
  document.getElementById("p" + id).setAttribute("d", controlSoundIcon.iconPlay);

  sequenciador.playOneSound(id, changeIcon);
}

function changeIcon(id) {
  var controlSoundIcon = new ControlSoundIcon();
  document.getElementById("p" + id).setAttribute("d", controlSoundIcon.iconSound);

}


function stopOneSound(id) {

  sequenciador.stopOneSound(id);

  var controlSoundIcon = new ControlSoundIcon();
  document.getElementById("p" + id).setAttribute("d", controlSoundIcon.iconSound);
}

function handleStart(evt) {
  evt.preventDefault();
  var idElement = event.target.id;
  if (idElement[0] == 'p') {
    idElement = idElement.replace("p", "");
  }
  togle(idElement);
  playOneSound(idElement);
}

function handleEnd(evt) {
  evt.preventDefault();
  var idElement = event.target.id;
  if (idElement[0] == 'p') {
    idElement = idElement.replace("p", "");
  }
  stopOneSound(idElement);
}

function togle(id) {
  console.log("---- id: " + id);
  var sgv = document.getElementById(id);
  var controlSoundIcon = new ControlSoundIcon();
  controlPainel.idSoundIconSelect = id;
  if (sgv.childNodes.length == 1) {
    var container = document.getElementsByTagName('svg');
    for (var i = 0; i < container.length; i++) {

      if (container[i].childNodes.length > 1) {

        var circle = document.getElementById(i + 'circle');
        container[i].removeChild(circle);
      }
    }
    var circle = document.createElementNS(controlSoundIcon.xmlns, 'circle');
    circle.setAttribute("style", "stroke:" + controlSoundIcon.circleColor + "; stroke-width:130; fill:none");
    circle.setAttribute("transform", "matrix(0.988396 -0.151897 0.151897 0.988396 1501.05 1501.05)");
    circle.setAttribute("r", "1436");
    circle.setAttribute("id", id + "circle");
    sgv.appendChild(circle);
  } else {
    var circle = document.getElementById(id + 'circle');
    console.log("--- Circle: " + circle);
    sgv.removeChild(circle);
    controlPainel.idSoundIconSelect = "";
  }

};
