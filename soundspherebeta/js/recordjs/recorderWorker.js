function Worker(sampleRate) {
    "use strict";
    this.recLength = 0;
    this.recBuffers = [];
    this.sampleRate = sampleRate;
    this.numChannels = 0;
}


Worker.prototype.record = function(inputBuffer) {
    console.log("quantidade de canais worker: " + inputBuffer.length);
    for (var i = 0; i < inputBuffer.length; i++) {
        this.recBuffers[i] = inputBuffer[i];
    }
    for (var i = 0; i < inputBuffer.length; i++) {
        if (this.recLength < inputBuffer[i].length) {
            this.recLength += inputBuffer[i].length;
        }
    }
    this.numChannels = inputBuffer.length;
    console.log("QTD de recBuffes: " + this.recBuffers.length);
}


Worker.prototype.exportWAV = function() {
    console.log("entro no worker \n sample: " + this.sampleRate);
    var bufferExport = [];
    for (var i = 0; i < this.recBuffers.length; i++) {
        bufferExport[i] = this.mergeBuffers(this.recBuffers[i], this.recLength);
    }
    console.log("bufferExport lengt" + bufferExport.length);
        var interleaved = this.interleave(bufferExport);

    var dataview = this.encodeWAV(interleaved);
    var audioBlob = new Blob([dataview], {
        type: 'audio/wav'
    });
    console.log("log: " + audioBlob);
    return audioBlob;
}

function getBuffer() {da
    var buffers = [];
    buffers.push(mergeBuffers(this.recBuffersL, this.recLength));
    buffers.push(mergeBuffers(this.recBuffersR, this.recLength));
    this.postMessage(buffers);
}

function clear() {
    this.recLength = 0;
    this.recBuffersL = [];
    this.recBuffersR = [];
}

Worker.prototype.mergeBuffers = function(recBuffMerg, recLengthMerg) {
    var result = new Float32Array(recLengthMerg);
    var offset = 0;
    result.set(recBuffMerg, offset);

    return result;
}

Worker.prototype.interleave = function(bufferExport) {
    var length = 0;
    for (var i = 0; i < bufferExport.length; i++) {
        length += bufferExport[i].length;
    }
    var result = new Float32Array(length);
    var inputIndex = 0;
    var index = 0;
    while (index < length) {
        for (var i = 0; i < bufferExport.length; i++) {
            result[index++] = bufferExport[i][inputIndex];
        }
        inputIndex++;
    }

    return result;
}

Worker.prototype.floatTo16BitPCM = function(output, offset, input) {
    for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

Worker.prototype.writeString = function(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}


Worker.prototype.encodeWAV = function(samples) {
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);
    var bitsPerSample = 16;

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
    view.setUint16(22, this.numChannels, true);
    /* sample rate */
    view.setUint32(24, this.sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, this.sampleRate * this.numChannels * (bitsPerSample/8), true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, (this.numChannels * (bitsPerSample/8)), true);
    /* bits per sample */
    view.setUint16(34, bitsPerSample, true);
    /* data chunk identifier */
    this.writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * this.numChannels  * (bitsPerSample/8), true);

    this.floatTo16BitPCM(view, 44, samples);

    return view;
}
