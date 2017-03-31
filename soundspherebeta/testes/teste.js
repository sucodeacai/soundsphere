Sequenciador.prototype.play = function (bufferAudio) {
  "use strict";
  controlPainel.disableRemoveItem();
  var possuiItemMix = false, l, o;
  for (l = 0; l<this.bufferList.length; l= l+1){
    for (o = 0; o<this.bufferList[l].listItemMix.length; o= o+1){
      possuiItemMix = true;
      break;break;
    }
  }
  if(possuiItemMix){
    if(!this.clickedPlay){
      this.clickedPlay = true;
      this.stopFlag = false;
      $('#buttonPlay').addClass("active");
      $('img').attr('draggable', false);
      $('#buttonStop').removeClass("active");
      var i;
      this.sourceList =[];
      painel.drawLoopMarker(this.getTotalTime());
      for (l = 0; l<this.bufferList.length; l= l+1){
        for (o = 0; o<this.bufferList[l].listItemMix.length; o= o+1){
          var source = this.audioCtx.createBufferSource();
          source.buffer = this.bufferList[l].buffer;
          source.connect(this.audioCtx.destination);
          console.log("this.bufferList[l].listItemMix[o].timeStart: "+this.bufferList[l].listItemMix[o].timeStart)
          source.start(this.audioCtx.currentTime+this.bufferList[l].listItemMix[o].timeStart);
          if(this.bufferList[l].listItemMix[o].id == this.getIdLastItemMix()){
            source.onended = onEndPlayList;
          }
          this.sourceList.push(source);
        }
      }

    }
  }

};

/*
for (var j = 0; j<buffers.length; j++){
for (var channel = 0; channel < maxChannels; channel++){
var v = out.getChannelData(channel)

var mix = buffers[j].getChannelData(channel);
for (var i = 0; i<mix.length; i++){
v[i]+= mix[i];
}
}
}
*/
