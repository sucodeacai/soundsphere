"use strict";
/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ItemMixPanel {
    constructor() {
        this.tag_dimension = undefined;
        this.tag_intensity = undefined;
        this.linha = 0;
        this.excluded = false;
        this.startTime = 0;
        this.endTime = 0;
        this.id = 0;
        this.idBuffer = 0;
        this.descriptiveIcon = undefined;
        this.idSemanticDescriptor = undefined;
        this.codeSemanticDescriptor = undefined;
        this.x = 0;
        this.y = 0;
        this.solo = true;
        this.color = "";
        this.volume = 100;
        this.standardValue = true;
        this.seconds = 0;
        this.width = 0;
        this.height = 2;
        this.size = 0;
        this.style = "black";
    }
    calculaHSLbyVolume(volume) {
        // console.warn(`Volume dentro do calcula HSL ${volume}`);
        if (volume != 200) {
            let a = [];
            for (let i = 100; i >= 1; i--) {
                a.push(i);
            }
            return a[Math.round(volume / 2)];
        }
        else {
            return 0;
        }
    }
    drawPadrao(painel, y, height, yDescritor) {
        //Desenhar gradient
        if (this.solo) {
            if (painel.drawGradient) {
                // console.warn(`Volume desenho: ${this.volume}`);
                const [hue, saturation, lightnessValue] = this.hexToHsl(this.color);
                const lightnessFinal = this.getLightnessByVolume(this.volume);
                // console.log(`valor ${lightnessFinal}`);
                const gradiente = painel.ctxCanvas.createLinearGradient(this.x + this.width / 2, y, this.x + this.width / 2, y + height);
                gradiente.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightnessFinal}%)`);
                gradiente.addColorStop(1, `hsl(${hue}, ${saturation}%, ${50}%)`);
                painel.ctxCanvas.fillStyle = gradiente;
                gradiente.addColorStop(1, `${this.color}`);
                painel.ctxCanvas.fillStyle = gradiente;
            }
            else {
                painel.ctxCanvas.fillStyle = this.color;
            }
            //Antes cor simples
            //
        }
        else {
            painel.ctxCanvas.fillStyle = "#C0C0C0";
        }
        painel.ctxCanvas.fillRect(this.x, y, this.width, height);
        let verticalSpacing = 12;
        if (this.idSemanticDescriptor != undefined) {
            if (painel.drawDescritor) {
                for (var i = 0; i < 3; i++) {
                    if (this.codeSemanticDescriptor[i] != undefined) {
                        painel.ctxCanvas.save();
                        painel.ctxCanvas.font = "12px verdana";
                        painel.ctxCanvas.shadowColor = "black";
                        painel.ctxCanvas.shadowBlur = 0;
                        painel.ctxCanvas.lineWidth = 4;
                        painel.ctxCanvas.strokeText(this.codeSemanticDescriptor[i], this.x + 3, yDescritor + 10 + i * verticalSpacing);
                        painel.ctxCanvas.shadowBlur = 0;
                        painel.ctxCanvas.fillStyle = "white";
                        painel.ctxCanvas.fillText(this.codeSemanticDescriptor[i], this.x + 3, yDescritor + 10 + i * verticalSpacing);
                        painel.ctxCanvas.restore();
                    }
                }
            }
        }
        if (this.tag_dimension != undefined) {
            if (painel.drawDimension) {
                painel.ctxCanvas.save();
                painel.ctxCanvas.font = "12px verdana";
                painel.ctxCanvas.shadowColor = "black";
                painel.ctxCanvas.shadowBlur = 0;
                painel.ctxCanvas.lineWidth = 4;
                painel.ctxCanvas.strokeText(this.tag_dimension, this.x + 52, yDescritor + verticalSpacing + 1);
                painel.ctxCanvas.shadowBlur = 0;
                painel.ctxCanvas.fillStyle = "white";
                painel.ctxCanvas.fillText(this.tag_dimension, this.x + 52, yDescritor + verticalSpacing + 1);
                painel.ctxCanvas.beginPath();
                painel.ctxCanvas.lineWidth = 2;
                painel.ctxCanvas.strokeStyle = "#FFFFFF";
                painel.ctxCanvas.arc(this.x + 56, yDescritor + verticalSpacing - 2, 9, 0, 2 * Math.PI);
                painel.ctxCanvas.stroke();
                painel.ctxCanvas.restore();
            }
        }
        if (this.tag_intensity != undefined) {
            if (painel.drawIntensity) {
                painel.ctxCanvas.save();
                painel.ctxCanvas.font = "12px verdana";
                painel.ctxCanvas.shadowColor = "black";
                painel.ctxCanvas.shadowBlur = 0;
                painel.ctxCanvas.lineWidth = 4;
                painel.ctxCanvas.strokeText(this.tag_intensity, this.x + 52, yDescritor + verticalSpacing + 22);
                painel.ctxCanvas.shadowBlur = 0;
                painel.ctxCanvas.fillStyle = "white";
                painel.ctxCanvas.fillText(this.tag_intensity, this.x + 52, yDescritor + verticalSpacing + 22);
                painel.ctxCanvas.beginPath();
                painel.ctxCanvas.lineWidth = 2;
                painel.ctxCanvas.strokeStyle = "#FFFFFF";
                painel.ctxCanvas.arc(this.x + 56, yDescritor + verticalSpacing + 18, 9, 0, 2 * Math.PI);
                painel.ctxCanvas.stroke();
                painel.ctxCanvas.restore();
            }
        }
        if (this.descriptiveIcon != undefined) {
            // console.log("******* desenhar food )");
            if (painel.drawFood) {
                painel.ctxCanvas.drawImage(painel.pageSoundSphereHome.getImgDescriptiveIcon(this.descriptiveIcon), this.x + 20, this.y - 15, 30, 30);
            }
        }
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // linhasRetaslinhasRetas(painel: any, y: number, height: number){
    //   y = this.y-19;
    //   height = sizeVolume;
    //   console.log("100 height: "+height);
    //   let count = 0;
    //   let passo = 10;
    //   let borda = 2;
    //   for (let dif = 2; dif < this.width; dif += passo) {
    //     painel.ctxCanvas.beginPath();
    //     painel.ctxCanvas.strokeStyle = "red";
    //     painel.ctxCanvas.lineWidth  = 2;
    //     painel.ctxCanvas.moveTo(this.x + dif + borda, y + borda);
    //     if (this.x + dif + 20 < this.width + this.x) {
    //       painel.ctxCanvas.lineTo(this.x + dif + borda, y + height - borda);
    //     } else {
    //       count++;
    //       painel.ctxCanvas.lineTo(this.x + dif + borda, y + height - borda);
    //     }
    //     painel.ctxCanvas.stroke();
    //     painel.ctxCanvas.closePath();
    //   }
    // }
    // linhasAngular(painel: any, y: number, height: number){
    //   let count = 0;
    //   let passo = 10;
    //   let borda = 0;
    //   let lastXvalid=0;
    //   for (let dif = 0; this.x + dif + borda < this.width+this.x; dif += passo) {
    //     painel.ctxCanvas.beginPath();
    //     painel.ctxCanvas.strokeStyle = "black";
    //     painel.ctxCanvas.moveTo(this.x + dif + borda, y + borda);
    //     if (this.x + dif + 20 <= this.width + this.x) {
    //       painel.ctxCanvas.lineTo(this.x + dif +20, y + height - borda);
    //       lastXvalid = this.x + dif +20;
    //     }else{
    //       //  count++
    //       //  painel.ctxCanvas.lineTo(this.x+this.width, y + height - borda -(count*passo));
    //     }
    //     painel.ctxCanvas.stroke();
    //     painel.ctxCanvas.closePath();
    //   }
    // }
    draw(painel) {
        painel.ctxCanvas.beginPath();
        let yVolume;
        let height;
        let sizeVolume = 38;
        yVolume = this.y - (sizeVolume * this.volume) / 100 / 2;
        let yDescritor = this.y - sizeVolume / 2;
        //Antes quando reduzia tamanho
        // if (this.volume == 0) {
        //   yVolume = (this.y - ((sizeVolume * 10 / 100) / 2))
        //   height = (sizeVolume * 10 / 100)
        //   painel.ctxCanvas.fillStyle = "#C0C0C0";
        //   painel.ctxCanvas.fillRect(this.x, yVolume - 2, this.width, height + 4);
        //   this.drawPadrao(painel, yVolume, height, yDescritor);
        // } else {
        // const volumeNormatizado = this.volume > 100 ? 100 : this.volume;
        // yVolume = (this.y - ((sizeVolume * volumeNormatizado / 100) / 2))
        // height = (sizeVolume * volumeNormatizado / 100)
        // this.drawPadrao(painel, yVolume, height, yDescritor);
        // }
        yVolume = this.y - (sizeVolume * 100) / 100 / 2;
        height = (sizeVolume * 100) / 100;
        this.drawPadrao(painel, yVolume, height, yDescritor);
        painel.ctxCanvas.globalCompositeOperation = "source-over";
        //Converte os segundos no tamanho a ser inserid
    }
    getLightnessByVolume(porcentagem) {
        const porcentagens = [0, 50, 100, 150, 200];
        const valores = [100, 75, 50, 25, 0];
        // Encontrar os dois pontos próximos
        for (let i = 0; i < porcentagens.length - 1; i++) {
            if (porcentagem >= porcentagens[i] &&
                porcentagem <= porcentagens[i + 1]) {
                const p1 = porcentagens[i];
                const p2 = porcentagens[i + 1];
                const v1 = valores[i];
                const v2 = valores[i + 1];
                // Fórmula linear
                const valorProporcional = v1 + ((porcentagem - p1) / (p2 - p1)) * (v2 - v1);
                return valorProporcional;
            }
        }
        return null; // Caso a porcentagem esteja fora do intervalo
    }
    setVolume(volume) {
        this.volume = volume;
        this.changeStardValues();
    }
    getVolume() {
        return this.volume;
    }
    setIdSemanticDescriptor(idSemanticDescriptor) {
        this.idSemanticDescriptor = idSemanticDescriptor;
        this.changeStardValues();
    }
    getIdSemanticDescriptor() {
        return this.idSemanticDescriptor;
    }
    setCodeSemanticDescriptor(codeSemanticDescriptor) {
        this.codeSemanticDescriptor = codeSemanticDescriptor;
        this.changeStardValues();
    }
    getStandardValues() {
        return this.standardValue;
    }
    changeStardValues() {
        if (this.volume == 100 && this.idSemanticDescriptor == undefined) {
            //console.log("Set true ITEm mix")
            this.standardValue = true;
        }
        else {
            //console.log("Set false ITEm mix")
            this.standardValue = false;
        }
    }
    getidSemanticDescriptor() {
        return this.idSemanticDescriptor;
    }
    getCodeSemanticDescriptor() {
        return this.codeSemanticDescriptor;
    }
    getColisao() {
        "use strict";
        let colisao = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
        return colisao;
    }
    colidiu() {
        //console.log('Colidiu');
    }
    hexToHsl(hex) {
        // Remove o '#' se existir no início da string hex
        if (hex.startsWith("#")) {
            hex = hex.slice(1);
        }
        // Extrai os valores de RGB e normaliza para o intervalo [0, 1]
        let r = parseInt(hex.slice(0, 2), 16) / 255;
        let g = parseInt(hex.slice(2, 4), 16) / 255;
        let b = parseInt(hex.slice(4, 6), 16) / 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h = 0, // Inicializa h com um valor padrão
        s, l = (max + min) / 2;
        if (max === min) {
            s = 0; // Sem saturação
        }
        else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        // Converter para grau e valor de saturação
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        // Retorna o valor como um array de [h, s, l]
        return [h, s, l];
    }
    getCodeIdentificationItemMixPanel() {
        return {
            idBuffer: this.idBuffer,
            volume: this.volume,
            idSemanticDescriptor: this.getidSemanticDescriptor(),
        };
    }
    // x: number
    // y: number
    // private standardValue: boolean;
    // solo: boolean
    // linha: number=0
    // excluded: boolean = false
    // startTime: number = 0
    // endTime: number = 0
    // id: number = 0
    // idBuffer: number = 0
    // color: string
    // //Teste de descritor com gradiente
    // //  colorGray: string[] = ["rgb(0,0,0)", "rgb(112,128,144)", "	rgb(105,105,105)", "rgb(128,128,128)",
    // //    "rgb(169,169,169)", "rgb(192,192,192)", "rgb(211,211,211)", "rgb(220,220,220)", "rgb(240,240,240)"]
    // private volume: number
    // private idSemanticDescriptor: number | undefined = undefined
    // private codeSemanticDescriptor: string | undefined = undefined
    // seconds: number
    // width: number
    // height: number
    // size: number
    // style: string
    equals(other) {
        // console.log("EQUALS")
        // console.log(this.x)
        // console.log(other.x)
        // console.log(this.y)
        // console.log(other.y)
        // console.log(this.standardValue)
        // console.log(other.standardValue)
        // console.log(this.solo)
        // console.log(other.solo)
        // console.log(this.linha)
        // console.log(other.linha)
        // console.log(this.excluded)
        // console.log(other.excluded)
        // console.log(this.startTime)
        // console.log(other.startTime)
        // console.log(this.endTime)
        // console.log(other.endTime)
        // console.log(this.id)
        // console.log(other.id)
        // console.log(this.idBuffer)
        // console.log(other.idBuffer)
        // console.log(this.color)
        // console.log(other.color)
        // console.log(this.volume)
        // console.log(other.volume)
        // console.log(this.idSemanticDescriptor)
        // console.log(other.idSemanticDescriptor)
        // console.log(this.codeSemanticDescriptor)
        // console.log(other.codeSemanticDescriptor)
        // console.log(this.seconds)
        // console.log(other.seconds)
        // console.log(this.width)
        // console.log(other.width)
        // console.log(this.height)
        // console.log(other.height)
        // console.log(this.size)
        // console.log(other.size)
        // console.log(this.style)
        // console.log(other.style)
        return (this.x === other.x &&
            this.y === other.y &&
            this.descriptiveIcon === other.descriptiveIcon &&
            this.tag_dimension === other.tag_dimension &&
            this.tag_intensity === other.tag_intensity &&
            this.y === other.y &&
            this.standardValue === other.standardValue &&
            this.solo === other.solo &&
            this.linha === other.linha &&
            this.excluded === other.excluded &&
            this.startTime === other.startTime &&
            this.endTime === other.endTime &&
            this.id === other.id &&
            this.idBuffer === other.idBuffer &&
            this.color === other.color &&
            this.volume === other.volume &&
            this.idSemanticDescriptor === other.idSemanticDescriptor &&
            this.codeSemanticDescriptor === other.codeSemanticDescriptor &&
            this.seconds === other.seconds &&
            this.width === other.width &&
            this.height === other.height &&
            this.size === other.size &&
            this.style === other.style);
    }
}
