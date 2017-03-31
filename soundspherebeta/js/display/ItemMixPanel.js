/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
function ItemMixPanel(context) {
  "use strict";
  this.x = 0;
  this.y = 0;
  this.solo = true;

  this.startTime;
  this.endTime;
  this.id;
  this.idBuffer;
  this.color = '';
  this.volume = 100;
  this.seconds = 0;
  this.width = 0;
  this.height = 2;

  this.size = 0;
  // Atributos de desenho padrão
  this.style = 'black';

}
ItemMixPanel.prototype.draw = function(val) {
  "use strict";
  painel.ctxCanvas.beginPath();
  if (this.solo) {
    painel.ctxCanvas.fillStyle = this.color;
  } else {

      painel.ctxCanvas.fillStyle = "#C0C0C0";
  }
  painel.ctxCanvas.globalCompositeOperation = 'source-over';
  //Converte os segundos no tamanho a ser inserido
  painel.ctxCanvas.fillRect(this.x, this.y, this.width, this.height);
};
ItemMixPanel.prototype.getColisao = function() {
  "use strict";
  var colisao = new Object();
  colisao['x'] = this.x;
  colisao['y'] = this.y;
  colisao['width'] = this.width;
  colisao['height'] = this.height;
  return colisao;
};
ItemMixPanel.prototype.colidiu = function(otherTrack) {
  "use strict";
  console.log('Colidiu');
};
