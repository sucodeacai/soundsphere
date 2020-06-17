"use strict";
class VoiceCommand {
    constructor(tooltip, comands) {
        this.recognition = new webkitSpeechRecognition();
        this.speechRecognitionList = new webkitSpeechGrammarList();
        this.comands = comands;
        this.tooltip = tooltip;
        this.speechGrammarList = new webkitSpeechGrammarList();
        this.grammar = '#JSGF V1.0; grammar comands; public <comands> = ' + this.comands.join(' | ') + ' ;';
        this.speechRecognitionList.addFromString(this.grammar, 1);
        this.recognition.grammars = this.speechRecognitionList;
        //recognition.continuous = false;
        this.recognition.lang = 'pt-BR';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        //this.diagnostic = document.querySelector('.output');
        let bg = document.querySelector('html');
        let hints = document.querySelector('.hints');
        this.setSettings();
    }
    setSettings() {
        this.recognition.onresult = (event) => {
            console.log("Teve resultado");
            var last = event.results.length - 1;
            var comand = event.results[last][0].transcript;
            comand = comand.toLowerCase();
            this.voiceCommand = comand;
            console.log("Texto recebido: " + comand);
            this.actions(comand);
        };
        this.recognition.onspeechend = () => {
            this.recognition.stop();
        };
        this.recognition.onend = () => {
            this.recognition.stop();
            console.log("OnEndSpeech");
            this.callback();
            let comando = this.voiceCommand == undefined ? undefined : String(this.voiceCommand);
            let mensagem = this.comands.some(x => x === comando) ? "Executando comando: " + comando : (comando == undefined ? "Ops! Não entendi." : "Insrução: " + comando + " não encontrada");
            this.tooltip.showMessage(mensagem);
            console.log("this.grammar");
            console.log(this.grammar);
            this.voiceCommand = undefined;
        };
        this.recognition.onnomatch = (event) => {
            //  this.diagnostic.textContent = "I didn't recognise that color.";
            this.tooltip.showMessage("Comando não reconhecido");
        };
        this.recognition.onerror = (event) => {
            this.callback();
            //this.diagnostic.textContent = 'Atenção, mensagem de Erro: ' + event.error;
            if (event.error == 'not-allowed') {
                this.tooltip.showMessage('Atenção,  Erro: Microfone bloqueado, desbloquear no navegador.');
            }
            else {
                this.tooltip.showMessage('Atenção, mensagem de Erro: ' + event.error);
            }
        };
    }
    startRecognition(callback) {
        this.callback = callback;
        this.recognition.start();
        console.log('Ready to receive a color command.');
    }
}
