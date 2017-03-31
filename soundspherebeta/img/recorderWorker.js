
function Worker(sampleRate) {
  "use strict";
  this.recLength = 0;
  this.recBuffersL = [];
  this.recBuffersR = [];
  this.sampleRate= sampleRate;
}


Worker.prototype.record = function (inputBuffer) {
  this.recBuffersL.push(inputBuffer[0]);
  this.recBuffersR.push(inputBuffer[1]);
  this.recLength += inputBuffer[0].length;
}


Worker.prototype.exportWAV = function () {
  console.log("entro no worker \n sample: "+this.sampleRate);
  var bufferL = this.mergeBuffers(this.recBuffersL, this.recLength);
  var bufferR = this.mergeBuffers(this.recBuffersR, this.recLength);
  var interleaved = this.interleave(bufferL, bufferR);
  var dataview = this.encodeWAV(interleaved);
  var audioBlob = new Blob([dataview], { type: 'audio/wav' });
  console.log("log: "+audioBlob);
  return audioBlob;
}

function getBuffer() {
  var buffers = [];
  buffers.push( mergeBuffers(this.recBuffersL, this.recLength) );
  buffers.push( mergeBuffers(this.recBuffersR, this.recLength) );
  this.postMessage(buffers);
}

function clear(){
  this.recLength = 0;
  this.recBuffersL = [];
  this.recBuffersR = [];
}

Worker.prototype.mergeBuffers = function (recBuffers, recLength) {
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < recBuffers.length; i++){
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
}

Worker.prototype.interleave = function (inputL, inputR) {
  var length = inputL.length + inputR.length;
  var result = new Float32Array(length);

  var index = 0,
  inputIndex = 0;

  while (index < length){
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

Worker.prototype.floatTo16BitPCM = function(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset+=2){
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

Worker.prototype.writeString = function(view, offset, string) {
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

Worker.prototype.encodeWAV = function (samples) {
  var buffer = new ArrayBuffer(44 + samples.length * 2);
  var view = new DataView(buffer);

  /* RIFF identifier */
  this.writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  this.writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  this.writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 2, true);
  /* sample rate */
  view.setUint32(24, this.sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, this.sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
view.setUint16(32, 4, true);
  /* bits per sample */
view.setUint16(34, 16, true);
  /* data chunk identifier */
  this.writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  this.floatTo16BitPCM(view, 44, samples);

  return view;
}
