/*  Código desenvolvido por: W. Ramon Bessa e o NAP - Núcleo Amazônico de Pesquisa Musical
Registrado sob a licença  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

*/
class ItemMixPanel {

  x: number
  y: number
  private standardValue: boolean;
  solo: boolean
  linha: number = 0
  excluded: boolean = false
  startTime: number = 0
  endTime: number = 0
  id: number = 0
  idBuffer: number = 0
  color: string
  colorGray = ["#F2F2F2", "#F0F0F0", "#EDEDED", "#EBEBEB", "#E8E8E8", "#E5E5E5", "#E3E3E3", "#E0E0E0", "#DEDEDE", "#DBDBDB", "#D9D9D9", "#D6D6D6", "#D4D4D4", "#D1D1D1", "#CFCFCF", "#CCCCCC", "#C9C9C9", "#C7C7C7", "#C4C4C4", "#C2C2C2", "#BFBFBF", "#BDBDBD", "#BABABA", "#B8B8B8", "#B5B5B5", "#B3B3B3", "#B0B0B0", "#ADADAD", "#ABABAB", "#A8A8A8", "#A6A6A6", "#A3A3A3", "#A1A1A1", "#9E9E9E", "#9C9C9C", "#999999", "#969696", "#949494", "#919191", "#8F8F8F", "#8C8C8C", "#8A8A8A", "#878787", "#858585", "#828282", "#7F7F7F", "#7D7D7D", "#7A7A7A", "#787878", "#757575", "#737373", "#707070", "#6E6E6E", "#6B6B6B", "#696969", "#666666", "#636363", "#616161", "#5E5E5E", "#5C5C5C", "#595959", "#575757", "#545454", "#525252", "#4F4F4F", "#4D4D4D", "#4A4A4A", "#474747", "#454545", "#424242", "#404040", "#3D3D3D", "#3B3B3B", "#383838", "#363636", "#333333", "#303030", "#2E2E2E", "#2B2B2B", "#292929", "#262626", "#242424", "#212121", "#1F1F1F", "#1C1C1C", "#1A1A1A", "#171717", "#141414", "#121212", "#0F0F0F", "#0D0D0D", "#0A0A0A", "#080808", "#050505", "#030303",
    "#F2F2F2", "#F0F0F0", "#EDEDED", "#EBEBEB", "#E8E8E8", "#E5E5E5", "#E3E3E3", "#E0E0E0", "#DEDEDE", "#DBDBDB", "#D9D9D9", "#D6D6D6", "#D4D4D4", "#D1D1D1", "#CFCFCF", "#CCCCCC", "#C9C9C9", "#C7C7C7", "#C4C4C4", "#C2C2C2", "#BFBFBF", "#BDBDBD", "#BABABA", "#B8B8B8", "#B5B5B5", "#B3B3B3", "#B0B0B0", "#ADADAD", "#ABABAB", "#A8A8A8", "#A6A6A6", "#A3A3A3", "#A1A1A1", "#9E9E9E", "#9C9C9C", "#999999", "#969696", "#949494", "#919191", "#8F8F8F", "#8C8C8C", "#8A8A8A", "#878787", "#858585", "#828282", "#7F7F7F", "#7D7D7D", "#7A7A7A", "#787878", "#757575", "#737373", "#707070", "#6E6E6E", "#6B6B6B", "#696969", "#666666", "#636363", "#616161", "#5E5E5E", "#5C5C5C", "#595959", "#575757", "#545454", "#525252", "#4F4F4F", "#4D4D4D", "#4A4A4A", "#474747", "#454545", "#424242", "#404040", "#3D3D3D", "#3B3B3B", "#383838", "#363636", "#333333", "#303030", "#2E2E2E", "#2B2B2B", "#292929", "#262626", "#242424", "#212121", "#1F1F1F", "#1C1C1C", "#1A1A1A", "#171717", "#141414", "#121212", "#0F0F0F", "#0D0D0D", "#0A0A0A", "#080808", "#050505", "#030303",
    "#F2F2F2", "#F0F0F0", "#EDEDED", "#EBEBEB", "#E8E8E8", "#E5E5E5", "#E3E3E3", "#E0E0E0", "#DEDEDE", "#DBDBDB", "#D9D9D9"];


  //Teste de descritor com gradiente
  //  colorGray: string[] = ["rgb(0,0,0)", "rgb(112,128,144)", "	rgb(105,105,105)", "rgb(128,128,128)",
  //    "rgb(169,169,169)", "rgb(192,192,192)", "rgb(211,211,211)", "rgb(220,220,220)", "rgb(240,240,240)"]
  private volume: number
  descriptiveIcon: string | undefined = undefined;
  private idSemanticDescriptor: number | undefined = undefined
  private codeSemanticDescriptor: string | undefined = undefined
  seconds: number
  width: number
  height: number
  size: number
  style: string
  constructor() {
    this.x = 0;
    this.y = 0;
    this.solo = true;
    this.color = '';
    this.volume = 100;
    this.standardValue = true
    this.seconds = 0;
    this.width = 0;
    this.height = 2;
    this.size = 0;
    this.style = 'black';
  
   

  }


  calculaHSLbyVolume(volume: number) {
    if (volume != 200) {
      let a = [];
      for (let i = 100; i >= 1; i--) {
        a.push(i);
      }
      return (a[Math.round(volume / 2)]);
    } else {
      return 0;
    }
  }
  drawPadrao(painel: any, y: number, height: number, yDescritor: number) {
    //Desenhar gradient
    if (this.solo) {

      if (painel.drawGradient) {
        var my_gradient = painel.ctxCanvas.createLinearGradient((this.x + (this.width / 2)), y, (this.x + (this.width / 2)), y + (height));


        var my_gradient = painel.ctxCanvas.createLinearGradient((this.x + (this.width / 2)), y, (this.x + (this.width / 2)), y + (height));
        //  console.log(`this.x + (this.width / 2)) ${this.x + (this.width / 2)} y ${y}  (this.x + (this.width / 2)) ${(this.x + (this.width / 2))}  y + (height) ${ y + (height)}`)
        my_gradient.addColorStop(0, `hsl(0, 0%, ${this.calculaHSLbyVolume(this.volume)}%)`);

        my_gradient.addColorStop(1, `${this.color}`);
        //Gradiente duas cores
        // my_gradient.addColorStop(0, `hsl(0, 0%, ${(this.volume/2)}%)`);
        // my_gradient.addColorStop(0.45, this.color);
        // my_gradient.addColorStop(0.5, this.color);
        // my_gradient.addColorStop(0.55, this.color);
        // my_gradient.addColorStop(1, `hsl(0, 0%, ${(this.volume/2)}%)`);
        painel.ctxCanvas.fillStyle = my_gradient;
      } else {
        painel.ctxCanvas.fillStyle = this.color;
      }

      //Antes cor simples
      // 
    } else {
      painel.ctxCanvas.fillStyle = "#C0C0C0";
    }
    painel.ctxCanvas.fillRect(this.x, y, this.width, height);
    let verticalSpacing = 12;
    if (this.idSemanticDescriptor != undefined) {
      if (painel.drawDescritor) {

        for (var i = 0; i < 3; i++) {
          if (this.codeSemanticDescriptor![i] != undefined) {
            painel.ctxCanvas.save();
            painel.ctxCanvas.font = "12px verdana";
            painel.ctxCanvas.shadowColor = "black";
            painel.ctxCanvas.shadowBlur = 0;
            painel.ctxCanvas.lineWidth = 4;
            painel.ctxCanvas.strokeText(this.codeSemanticDescriptor![i], this.x + 3, yDescritor + 10 + i * verticalSpacing);
            painel.ctxCanvas.shadowBlur = 0;
            // painel.ctxCanvas.shadowOffsetX = -1;
            // painel.ctxCanvas.shadowOffsetY = 0;
            // painel.ctxCanvas.shadowBlur = 0;
            // painel.ctxCanvas.shadowColor = "rgb(255,255,255)";
            // painel.ctxCanvas.font = "bold 12px Verdana";
            // painel.ctxCanvas.fillStyle = "black";
            //  painel.ctxCanvas.fillText(this.codeSemanticDescriptor![i], this.x + 3, yDescritor + 10 + i * verticalSpacing);
            painel.ctxCanvas.fillStyle = "white";
            painel.ctxCanvas.fillText(this.codeSemanticDescriptor![i], this.x + 3, yDescritor + 10 + i * verticalSpacing);
            painel.ctxCanvas.restore();
          }
        }
      }
    }
    if (this.descriptiveIcon != undefined ) {
        painel.ctxCanvas.drawImage(painel.pageSoundSphereHome.getImgDescriptiveIcon(this.descriptiveIcon), this.x + 20,  this.y-15 ,30,30);
     
 
     
    }
  }

  getRandomIntInclusive(min: number, max: number) {
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
  draw(painel: any): void {
    painel.ctxCanvas.beginPath();
    let yVolume;
    let height;
    let sizeVolume = 38;
    yVolume = (this.y - ((sizeVolume * this.volume / 100) / 2));
    let yDescritor = this.y - (sizeVolume / 2);
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
    yVolume = (this.y - ((sizeVolume * 100 / 100) / 2))
    height = (sizeVolume * 100 / 100)
    this.drawPadrao(painel, yVolume, height, yDescritor);

    painel.ctxCanvas.globalCompositeOperation = 'source-over';
    //Converte os segundos no tamanho a ser inserid

  }
  setVolume(volume: number) {
    this.volume = volume;
    this.changeStardValues()
  }
  getVolume(): number {
    return this.volume
  }
  setIdSemanticDescriptor(idSemanticDescriptor: number | undefined) {
    this.idSemanticDescriptor = idSemanticDescriptor;
    this.changeStardValues()
  }
  getIdSemanticDescriptor() {
    return this.idSemanticDescriptor;
  }
  setCodeSemanticDescriptor(codeSemanticDescriptor: string | undefined) {
    this.codeSemanticDescriptor = codeSemanticDescriptor;
    this.changeStardValues()
  }
  getStandardValues(): boolean {
    return this.standardValue
  }
  changeStardValues() {
    if (this.volume == 100 && this.idSemanticDescriptor == undefined) {
      //console.log("Set true ITEm mix")
      this.standardValue = true
    } else {
      //console.log("Set false ITEm mix")
      this.standardValue = false
    }
  }
  getidSemanticDescriptor(): number | undefined {
    return this.idSemanticDescriptor
  }
  getCodeSemanticDescriptor(): string | undefined {
    return this.codeSemanticDescriptor
  }

  getColisao(): any {
    "use strict";
    let colisao = { x: this.x, y: this.y, width: this.width, height: this.height };

    return colisao;
  };
  colidiu(): void {
    //console.log('Colidiu');
  };
  getCodeIdentificationItemMixPanel() {
    return {
      idBuffer: this.idBuffer,
      volume: this.volume,
      idSemanticDescriptor: this.getidSemanticDescriptor()

    }
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
  equals(other: ItemMixPanel) {
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
    return this.x === other.x &&
      this.y === other.y &&
      this.descriptiveIcon === other.descriptiveIcon &&
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
      this.style === other.style;
  }
}
