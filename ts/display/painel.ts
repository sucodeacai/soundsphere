//Oa painel é fixo, no caso os atributos displacingXaxis e displacingYaxis
//servem para saber onde o canvas vai ser inserido. A medida que a tela de amostra
//se move para a direita o canvas precisa ser desenhado mais a esquerda por isso o mesmo é
//negativo e o translate também.
class Painel {
  drawGradient: boolean = true;
  drawDescritor: boolean = true;
  drawDimension: boolean = true;
  drawIntensity: boolean = true;

  drawFood: boolean = true;
  touchFunctions: TouchFunctions = new TouchFunctions();
  DAOHome: DAOHome;
  pageSoundSphereHome: PageSoundSphereHome;
  flagDrawMarker: boolean = true;
  flagAnimationPlay: boolean = false;
  anterior: any;
  pixelPerSecond: number = 0;
  numberOfTrails: number = 0;
  totalTime = 0;
  sizeTrail = 40;
  halfPainelX: number;
  halfPainelY: number;
  heightPainel = 0;
  widthPainel = 0;
  lastX: number = 0;
  mouseDown: boolean = false;
  lastY: number = 0;
  tooltip: Tooltip;
  mouseDownX = 0;
  lastClassCursor: string = "";
  deltaX: number = 0;
  deltaY: number = 0;
  mouseDownY = 0;
  displacingInsertX = 0;
  displacingInsertY = 0;

  //Atributo displacingYAxis funciona para controlar/transaladar a posição do canvas
  // + move para ->, - move para <-
  //Mas vale lembrar que o canvas funciona assim:
  // translate 0,0
  // ______________________
  // |    |                |
  // |____|                |
  // |                     |
  // |                     |
  // |                     |
  // |_____________________|

  // Translate -5
  // ______________________
  // |    |    |           |
  // |    |____|           |
  // |                     |
  // |                     |
  // |                     |
  // |_____________________|
  displacingYAxis = 0;
  displacingXAxis = 0;
  ctxCanvas: any;
  xMarker: number = 0;
  lastMakerX: number = 0;
  lastxMarkerOnPlay: number = 0;

  firstPositionX: number = 0;
  firstPositionY: number = 0;
  moved: boolean = false;
  maxDisplacingXAxis: number;
  maxDisplacingYAxis: number;
  canvas: any;
  constructor(
    daoHome: DAOHome,
    ctxCanvas: any,
    canvas: any,
    pageSoundSphereHome: PageSoundSphereHome,
    tooltip: Tooltip,
    pixelPerSecond: number
  ) {
    this.pixelPerSecond = pixelPerSecond;
    console.log("Pixel por segundo: " + pixelPerSecond);
    this.DAOHome = daoHome;
    this.tooltip = tooltip;
    this.pageSoundSphereHome = pageSoundSphereHome;
    this.canvas = canvas;
    this.halfPainelX = this.canvas.width / 2;
    this.halfPainelY = this.canvas.height / 2;
    this.ctxCanvas = ctxCanvas;
    this.make();

    this.setSettings();
    // this.unselectedAlbumItem();
    this.maxDisplacingXAxis = this.widthPainel - this.canvas.width;
    this.maxDisplacingYAxis = this.heightPainel - this.canvas.height;
  }
  actionMouseLeave(event: any) {
    this.reMake();
  }
  actionMouseDown(event: any) {
    //console.log("actionMouseDown")
    this.mouseDown = true;
    //console.log(" this.mouseDown ->" + this.move)
    this.mouseDownX = event.offsetX;
    //console.log(" this.mouseDownX ->" + this.mouseDownX)
    this.mouseDownY = event.offsetY - 1;
    //console.log(" this.mouseDownY ->" + this.mouseDownY)
  }
  actionMouseOut(event: any) {
    //console.log("actionMouseOut")
    this.endMove();
  }
  setCursorTrash() {
    document
      .getElementById("canva_painel_mixagem")!
      .classList.add("cursorTrash");
  }
  unsetCursorTrash() {
    document
      .getElementById("canva_painel_mixagem")!
      .classList.remove("cursorTrash");
  }
  setCursorEdit() {
    document
      .getElementById("canva_painel_mixagem")!
      .classList.add("cursorEdit");
  }
  unsetCursorEdit() {
    document
      .getElementById("canva_painel_mixagem")!
      .classList.remove("cursorEdit");
  }
  //O evento ocorre quando o usuário libera um botão do mouse sobre um elemento
  //O movimento do painel só e realizado enquanto se esitver preciosando a tecla
  //ao soltar é desfeita a ação independente se ele soltar no canvas ou não
  actionMouseUp(event: any) {
    this.deltaX = 0;
    this.deltaY = 0;
    this.mouseDown = false;
    //Ele só vai verificar as opções no painel se não houver um movimento
    if (!this.moved) {
      console.log("Mouse up " + this.pageSoundSphereHome.idSelectedIcomAlbum);
      //Se o botão de exclusão estiver ativado
      if (this.pageSoundSphereHome.isDeleteButtonActive()) {
        console.log("Mouse up remove status");
        let itemMixTemp = this.getItemMix();
        if (itemMixTemp) {
          this.setItemMixTemp(itemMixTemp);
          this.deleteItemMixPanel(itemMixTemp);
          this.reMake();
        } else {
          this.tooltip.showMessage("Nenhum ítem de mixagem selecionado. 1");
        }
        //Se as opções estiverem ativadas
        // } else if (this.pageSoundSphereHome.sequenciador.activePause) {
        //   console.log("Mouse up remove pause");
        //   let seconds = this.getSecondsByXPosition(
        //     this.getPositionX(event) + this.displacingXAxis
        //   );
        //   if (seconds <= this.totalTime) {
        //     this.xMarker = this.getPositionX(event) + this.displacingXAxis;
        //     this.lastMakerX = this.xMarker;
        //     this.pageSoundSphereHome.sequenciador.continueFrom = seconds;
        //     this.reMake();
        //   }
      } else if (this.pageSoundSphereHome.idSelectedIcomAlbum != undefined) {
        console.log("Mouse up remove descriptiveIcon idSelectedIcomAlbum");
        console.error(this.pageSoundSphereHome.idActionDescriptiveIcon);
        this.insertItemMixPanel(
          this.pageSoundSphereHome.idSelectedIcomAlbum,
          this.pageSoundSphereHome.idActionDescriptiveIcon,
          this.pageSoundSphereHome.idDimension,
          this.pageSoundSphereHome.idIntensity,
          this.pageSoundSphereHome.idSemanticDescriptor,
          this.pageSoundSphereHome.codeSemanticDescriptor
        );
      } else {
        this.tooltip.showMessage("Nenhum item de mixagem selecionado.");
      }
    }
    this.endMove();
    console.log("teste");
  }
  //Função para setar um item mix temporario
  setItemMixTemp(itemMixTemp: any) {
    this.pageSoundSphereHome.itemMixOption = new ItemMixPanel();
    this.pageSoundSphereHome.itemMixOption.x = itemMixTemp.x;
    this.pageSoundSphereHome.itemMixOption.y = itemMixTemp.y;
    this.pageSoundSphereHome.itemMixOption.width = itemMixTemp.width;
    this.pageSoundSphereHome.itemMixOption.height = itemMixTemp.height;
    this.pageSoundSphereHome.itemMixOption.startTime = itemMixTemp.startTime;
    this.pageSoundSphereHome.itemMixOption.endTime = itemMixTemp.endTime;
    this.pageSoundSphereHome.itemMixOption.color = itemMixTemp.color;
    this.pageSoundSphereHome.itemMixOption.seconds = itemMixTemp.seconds;
    this.pageSoundSphereHome.itemMixOption.setVolume(itemMixTemp.getVolume());
    this.pageSoundSphereHome.itemMixOption.solo = itemMixTemp.solo;
    this.pageSoundSphereHome.itemMixOption.linha = itemMixTemp.linha;
    this.pageSoundSphereHome.itemMixOption.setIdSemanticDescriptor(
      itemMixTemp.getidSemanticDescriptor()
    );
    this.pageSoundSphereHome.itemMixOption.setCodeSemanticDescriptor(
      itemMixTemp.getCodeSemanticDescriptor()
    );
    this.pageSoundSphereHome.itemMixOption.id = itemMixTemp.id;
    this.pageSoundSphereHome.itemMixOption.descriptiveIcon =
      itemMixTemp.descriptiveIcon;
    this.pageSoundSphereHome.itemMixOption.idBuffer = itemMixTemp.idBuffer;
  }
  //FUnção que gerencia o movimento do painel caso a opção move seja verdadeira
  //de modo que se o usuário estiver clicando e arrastando ele movimenta o painel
  actionMouseMove(e: any) {
    var evt = e || event;
    //para poder mover o canvas ele tem que ser diferente da posição do click.
    // ta tendo um bug que quando clica ele lança um evento de move e isso contorna
    if (this.mouseDownX != evt.offsetX || this.mouseDownY != evt.offsetY - 1) {
      if (this.mouseDown) {
        if (this.moved) {
          //Velocidade
          let velocidade = 1;
          const diferenceX = evt.offsetX - this.firstPositionX;

          if (diferenceX > -5 && diferenceX < 5) {
            this.deltaX = 0;
          } else if (diferenceX >= 5 && diferenceX < 100) {
            this.deltaX = -diferenceX * velocidade;
          } else if (diferenceX >= 100) {
            this.deltaX = -100 * velocidade;
          } else if (diferenceX <= -5 && diferenceX > -100) {
            this.deltaX = -diferenceX * velocidade;
          } else if (diferenceX <= -100) {
            this.deltaX = 100 * velocidade;
          }
          const diferenceY = evt.offsetY - 1 - this.firstPositionY;
          if (diferenceY > -5 && diferenceY < 5) {
            this.deltaY = 0;
          } else if (diferenceY >= 5 && diferenceY < 100) {
            this.deltaY = -diferenceY * velocidade;
          } else if (diferenceY >= 100) {
            this.deltaY = -100 * velocidade;
          } else if (diferenceY <= -5 && diferenceY > -100) {
            this.deltaY = -diferenceY * velocidade;
          } else if (diferenceY <= -100) {
            this.deltaY = 100 * velocidade;
          }
        }
        if (!this.moved) {
          this.firstPositionX = evt.offsetX;
          this.firstPositionY = evt.offsetY - 1;
          this.moveAction(e);
        }
        // console.error("moveu");

        this.moved = true;
      } else {
        //Escrever o timecode do cursor
        if (e.offsetX + this.displacingXAxis >= 0) {
          var evt = e || event;
          // requestAnimationFrame(() => { this.reMake() });
          this.reMake();
          //Tempo no painel indicação de tempo do painel
          //Verifica limite do painel para que a indicação do tempo do painel
          //não passe do painel
          let tamanhoTexto = 60;
          let margemSuperior = 30;
          let textTimeToShow = this.sec2time(
            this.getSecondsByXPosition(e.offsetX + this.displacingXAxis)
          );
          if (
            e.offsetY + this.displacingYAxis >= 30 &&
            e.offsetX + this.displacingXAxis < this.widthPainel - tamanhoTexto
          ) {
            this.ctxCanvas.fillText(
              textTimeToShow,
              e.offsetX + this.displacingXAxis,
              e.offsetY + this.displacingYAxis
            );
          } else if (
            e.offsetY + this.displacingYAxis > 30 &&
            e.offsetX + this.displacingXAxis >= this.widthPainel - tamanhoTexto
          ) {
            this.ctxCanvas.fillText(
              textTimeToShow,
              this.widthPainel - tamanhoTexto,
              e.offsetY + this.displacingYAxis
            );
          } else if (
            e.offsetY + this.displacingYAxis < 30 &&
            e.offsetX + this.displacingXAxis < this.widthPainel - tamanhoTexto
          ) {
            this.ctxCanvas.fillText(
              textTimeToShow,
              e.offsetX + this.displacingXAxis,
              margemSuperior
            );
          } else {
            this.ctxCanvas.fillText(
              textTimeToShow,
              this.widthPainel - tamanhoTexto,
              margemSuperior
            );
          }
          this.ctxCanvas.stroke();
        }
      }
    }
  }
  removeClassCanvas() {
    document.getElementById("canva_painel_mixagem")!.classList.remove();
    document.getElementById("canva_painel_mixagem")!.classList.add("canvas");
  }
  changeCursorCanvas(e: any) {
    let el1 = document.getElementById("canva_painel_mixagem");
    //console.log("Delta X: " + this.deltaX + " Delta Y: " + this.deltaY + " Displacing X " + this.displacingXAxis + "Displacing Y " + this.displacingYAxis)
    if (
      this.displacingXAxis + -this.deltaX < 0 &&
      this.displacingYAxis + -this.deltaY < 0
    ) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowLeftTop");
    } else if (
      this.displacingXAxis + -this.deltaX < 0 &&
      this.displacingYAxis == this.maxDisplacingYAxis
    ) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowLeftBottom");
    } else if (
      this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis &&
      this.displacingYAxis + -this.deltaY < 0
    ) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowRightTop");
    } else if (
      this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis &&
      this.displacingYAxis == this.maxDisplacingYAxis
    ) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowRightBottom");
    } else if (this.displacingXAxis + -this.deltaX < 0) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowLeft");
    } else if (this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowRight");
    } else if (this.displacingYAxis + -this.deltaY < 0) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowTop");
    } else if (this.displacingYAxis == this.maxDisplacingYAxis) {
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("shadowBottom");
    }

    if (this.deltaY >= 5 && this.deltaX == 0) {
      // console.log("---UP")
      if (!(this.lastClassCursor == "cursorUP")) {
        this.removeClassCanvas();
        el1!.className += " cursorUp";
        this.lastClassCursor = "cursorUP";
      }
    } else if (this.deltaY <= -5 && this.deltaX == 0) {
      // console.log("---Down")
      if (!(this.lastClassCursor == "cursorDown")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorDown");
        this.lastClassCursor = "cursorDown";
      }
    } else if (this.deltaX >= 5 && this.deltaY == 0) {
      //   console.log("---Left")
      if (!(this.lastClassCursor == "cursorLeft")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorLeft");
        this.lastClassCursor = "cursorLeft";
      }
    } else if (this.deltaX <= -5 && this.deltaY == 0) {
      //  console.log("---Right")
      document
        .getElementById("canva_painel_mixagem")
        ?.classList.add("cursorRight");
      if (!(this.lastClassCursor == "cursorRight")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorRight");
        this.lastClassCursor = "cursorRight";
      }
    } else if (this.deltaY >= 5 && this.deltaX <= -5) {
      //  console.log("---UP Right")
      if (!(this.lastClassCursor == "cursorUpRight")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorUpRight");
        this.lastClassCursor = "cursorUpRight";
      }
    } else if (this.deltaY >= 5 && this.deltaX >= 5) {
      //    console.log("---Up Left")
      if (!(this.lastClassCursor == "cursorUpLeft")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorUpLeft");
        this.lastClassCursor = "cursorUpLeft";
      }
    } else if (this.deltaY <= -5 && this.deltaX <= -5) {
      //     console.log("---down left")
      if (!(this.lastClassCursor == "cursorDownLeft")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorDownLeft");
        this.lastClassCursor = "cursorDownLeft";
      }
    } else if (this.deltaY <= -5 && this.deltaX >= 5) {
      //  console.log("---down right")
      if (!(this.lastClassCursor == "cursorDownRight")) {
        this.removeClassCanvas();
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("cursorDownRight");
        this.lastClassCursor = "cursorDownRight";
      }
    }
  }
  moveAction(e: any) {
    //Verifica a mudança do cursor
    if (this.deltaX != 0 || this.deltaY != 0) {
      this.changeCursorCanvas(e);
    }

    if (
      this.displacingXAxis >= 0 &&
      this.displacingXAxis <= this.maxDisplacingXAxis
    ) {
      if (this.displacingXAxis + -this.deltaX >= this.maxDisplacingXAxis) {
        this.deltaX = -(this.maxDisplacingXAxis - this.displacingXAxis);
        this.displacingXAxis = this.maxDisplacingXAxis;
        this.ctxCanvas.translate(this.deltaX, 0);
      } else if (this.displacingXAxis + -this.deltaX <= 0) {
        this.deltaX = this.displacingXAxis;
        this.displacingXAxis = 0;
        this.ctxCanvas.translate(this.deltaX, 0);
      } else {
        this.displacingXAxis -= this.deltaX;
        this.ctxCanvas.translate(this.deltaX, 0);
      }
    }
    if (
      this.displacingYAxis >= 0 &&
      this.displacingYAxis <= this.maxDisplacingYAxis
    ) {
      if (this.displacingYAxis + -this.deltaY >= this.maxDisplacingYAxis) {
        this.deltaY = -(this.maxDisplacingYAxis - this.displacingYAxis);
        this.displacingYAxis = this.maxDisplacingYAxis;
        this.ctxCanvas.translate(0, this.deltaY);
      } else if (this.displacingYAxis + -this.deltaY <= 0) {
        this.deltaY = this.displacingYAxis;
        this.displacingYAxis = 0;
        this.ctxCanvas.translate(0, this.deltaY);
      } else {
        this.displacingYAxis -= this.deltaY;
        this.ctxCanvas.translate(0, this.deltaY);
      }
    }

    this.reMake();
    if (this.mouseDown) {
      requestAnimationFrame(() => {
        this.moveAction(e);
      });
    } else {
      this.removeClassCanvas();
      this.lastClassCursor = "";
      console.log("---Default");
      if (this.pageSoundSphereHome.itemOptionEnabled) {
        this.setCursorEdit();
      } else if (this.pageSoundSphereHome.buttonRemoveStatus) {
        this.setCursorTrash();
      } else {
        document
          .getElementById("canva_painel_mixagem")
          ?.classList.add("default");
      }
    }
  }

  setSettings() {
    this.canvas.addEventListener(
      "touchcancel",
      (evt: any) => this.actionEndTouchInPanel(evt),
      false
    );

    this.canvas.addEventListener(
      "dblclick",
      (evt: any) => {
        evt.preventDefault();
      },
      false
    );
    this.canvas.addEventListener("mousedown", (evt: any) =>
      this.actionMouseDown(evt)
    );
    this.canvas.addEventListener("mouseout", (evt: any) =>
      this.actionMouseOut(evt)
    );
    this.canvas.addEventListener("mouseup", (evt: any) =>
      this.actionMouseUp(evt)
    );
    this.canvas.addEventListener("mousemove", (evt: any) =>
      this.actionMouseMove(evt)
    );
    this.canvas.addEventListener("mouseleave", (evt: any) =>
      this.actionMouseLeave(evt)
    );
  }

  reMake(): void {
    //Limpa tela para excluir os rastros
    this.ctxCanvas.clearRect(0, 0, this.widthPainel, this.heightPainel);
    this.drawTrails();
    this.reDrawAllItemMixPanel();
    this.drawGridTime();
    this.drawGridTrail();
    //if (this.pageSoundSphereHome.sequenciador.activePlay || this.pageSoundSphereHome.sequenciador.activePause || this.flagDrawMarker) {
    this.drawMarker();
    //}
  }

  //aofinalizar touch normalmente
  actionEndNormalTouchInPanel(evt: any) {
    if (!this.moved && this.pageSoundSphereHome.itemOptionEnabled) {
      var itemMixTemp = this.getItemMix();
      if (itemMixTemp) {
        this.pageSoundSphereHome.itemMixOption = new ItemMixPanel();
        this.pageSoundSphereHome.itemMixOption.x = itemMixTemp.x;
        this.pageSoundSphereHome.itemMixOption.y = itemMixTemp.y;
        this.pageSoundSphereHome.itemMixOption.startTime =
          itemMixTemp.startTime;
        this.pageSoundSphereHome.itemMixOption.endTime = itemMixTemp.endTime;
        this.pageSoundSphereHome.itemMixOption.seconds = itemMixTemp.seconds;
        this.pageSoundSphereHome.itemMixOption.setVolume(
          itemMixTemp.getVolume()
        );
        this.pageSoundSphereHome.itemMixOption.solo = itemMixTemp.solo;
        this.pageSoundSphereHome.itemMixOption.setIdSemanticDescriptor(
          itemMixTemp.getidSemanticDescriptor()
        );
        this.pageSoundSphereHome.itemMixOption.id = itemMixTemp.id;
        this.pageSoundSphereHome.itemMixOption.idBuffer = itemMixTemp.idBuffer;
        this.pageSoundSphereHome.showModalOptions();
      }
    } else if (
      !this.moved &&
      this.pageSoundSphereHome.idSelectedIcomAlbum &&
      !this.pageSoundSphereHome.itemOptionEnabled
    ) {
      this.insertItemMixPanel(
        this.pageSoundSphereHome.idSelectedIcomAlbum,
        undefined,
        undefined
      );
    }

    this.endMove();
  }

  //FUnção para desenhar/criar o painel
  //Definir parametros de criação do painel
  make(): void {
    this.setTimePanel(1);
    this.setTrailPanel(80);
    this.reDrawAllItemMixPanel();
    this.drawTrails();
    this.drawGridTime();
    this.drawGridTrail();
  }
  //COnfigura o comprimento do painel de mixagem de acordo com o tempo em
  //minutos informado
  setTimePanel(minutos: number): void {
    var seconds = minutos * 3600;
    this.widthPainel = this.pixelPerSecond * seconds;
  }
  //Alterar o numero de trilhas para mixagem
  setTrailPanel(val: number): void {
    this.numberOfTrails = val;
    this.heightPainel = val * this.sizeTrail;
  }
  //Função para atualizar a array de acordo com o numero de trilhas
  reDrawAllItemMixPanel(): void {
    var i, j;
    for (i = 0; i < this.getQtdTrails(); i = i + 1) {
      if (this.DAOHome.listItemMixPanel[i] != null) {
        for (j = 0; j < this.DAOHome.listItemMixPanel[i].length; j = j + 1) {
          if (!this.DAOHome.listItemMixPanel[i][j].excluded) {
            this.DAOHome.listItemMixPanel[i][j].draw(this);
          }
        }
      }
    }
  }
  //Retorna a quantidade de trilhas que o painel possui
  getQtdTrails(): number {
    return this.heightPainel / this.sizeTrail;
  }

  //Desenha as linhas que divide as trilhas
  drawTrails(): void {
    var x = this.sizeTrail - 0.5;
    // //Converte os segundos no tamanho a ser inserido
    for (x; x < this.heightPainel; x += this.sizeTrail) {
      this.ctxCanvas.beginPath();
      this.ctxCanvas.lineWidth = 2;
      this.ctxCanvas.strokeStyle = "#000";
      this.ctxCanvas.moveTo(0, x);
      this.ctxCanvas.lineTo(this.widthPainel, x);
      this.ctxCanvas.stroke();
    }
  }
  //Desenha as linha das trilhas
  drawGridTime(): void {
    var x = this.pixelPerSecond;
    var y = 0;
    this.ctxCanvas.beginPath();
    this.ctxCanvas.lineWidth = 1;
    this.ctxCanvas.strokeStyle = "red";
    for (x; x <= this.widthPainel; x += this.pixelPerSecond) {
      var xcoodenate = x;
      var time = this.getTimeGrid(x);
      var timeString = String(time);
      var timeLenght = timeString.length;
      if (y % 2 == 0) {
        this.ctxCanvas.moveTo(xcoodenate, 0 + this.displacingYAxis);
        this.ctxCanvas.lineTo(xcoodenate, 8 + this.displacingYAxis);
        this.ctxCanvas.fillStyle = "#000";
        this.ctxCanvas.fillText(
          time,
          x - 3 * timeLenght,
          17 + this.displacingYAxis
        );
      } else {
        this.ctxCanvas.moveTo(xcoodenate, 0 + this.displacingYAxis);
        this.ctxCanvas.lineTo(xcoodenate, 4 + this.displacingYAxis);
      }
      y = y + 1;
    }
    this.ctxCanvas.strokeStyle = "#000";
    this.ctxCanvas.stroke();
    this.ctxCanvas.closePath();
  }
  //Get Time para ser usado na grid
  getTimeGrid(y: number) {
    var time = "";
    var segundos = y / this.pixelPerSecond;
    var segundo = segundos % 60;
    var minutos = segundos / 60;
    var minuto = minutos % 60;
    var hora = minutos / 60;
    if (Math.floor(segundos) > 0) {
      time =
        Math.floor(segundo).toString().length == 1
          ? "0" + Math.floor(segundo).toString()
          : Math.floor(segundo).toString();
    }
    if (Math.floor(minutos) > 0) {
      time = Math.floor(minuto) + ":" + time;
    }
    if (Math.floor(hora) > 0) {
      time = Math.floor(hora) + ":" + time;
    }
    return time;
  }
  drawGridTrail(): void {
    var y = this.sizeTrail / 2;
    for (y; y <= this.heightPainel; y += this.sizeTrail) {
      var trail = this.getNumberTrailByHeight(y);
      this.ctxCanvas.fillStyle = "black";
      this.ctxCanvas.fillText(trail, 1 + this.displacingXAxis, y);
    }
    this.ctxCanvas.stroke();
  }
  //Retorna em que trilha foi inserido o som de acordo com
  //height informado
  getNumberTrailByHeight(val: number) {
    var x = this.sizeTrail,
      trail = 1;
    for (x; x <= this.heightPainel; x += this.sizeTrail) {
      if (val <= x) {
        break;
      }
      trail += 1;
    }
    return trail;
  }
  //Atraves da ultima posição do cursor ele joga para a função que o chamou
  //o itemMix daquela posição
  getItemMix() {
    var remove = new ItemMixPanel();
    remove.width = this.pixelPerSecond;
    remove.x = this.getPositionX(event) + this.displacingXAxis;
    remove.y = this.getMiddleHeigtTrail(
      this.getPositionY(event) + this.displacingYAxis
    );
    // }
    var listaRemove = this.checkItemMixPanel(remove);
    if (listaRemove.length >= 1) {
      //console.log("Retornando o primeiro item da lista encontrado")
      return listaRemove[0];
    } else {
      //console.log("Retornando false pq nao encontrou nehum item")
      return false;
    }
  }
  //Retorna o endereço que a o som deve ser inserido no Eixo y
  //para ser desenhaado de acordo com o height informado
  getMiddleHeigtTrail(val: number) {
    return (
      this.getNumberTrailByHeight(val) * this.sizeTrail - this.sizeTrail / 2
    );
  }

  //Retorna a lista de itemMixPanels com que o itemMixPanelenviado se colide
  checkItemMixPanel(itemMixPanel: ItemMixPanel) {
    let listColisao = [],
      numeroTrilha = this.getNumberTrailByHeight(itemMixPanel.y);
    let listProvisoria = this.DAOHome.listItemMixPanel[numeroTrilha - 1]
      ? this.DAOHome.listItemMixPanel[numeroTrilha - 1]
      : [];
    let i;
    for (i = 0; i < listProvisoria.length; i = i + 1) {
      //Se o item não tiver sido excluido então ele deve ser checado
      //se tem colisoes ou nao
      if (!listProvisoria[i].excluded) {
        if (
          this.checkCollision(
            itemMixPanel.getColisao(),
            listProvisoria[i].getColisao()
          )
        ) {
          listColisao.push(listProvisoria[i]);
        }
      }
    }
    return listColisao;
  }
  //Verifica se a colisões
  checkCollision(ret1: any, ret2: any) {
    return (
      ret1.x + ret1.width > ret2.x &&
      ret1.x < ret2.x + ret2.width &&
      ret1.y + ret1.height > ret2.y &&
      ret1.y < ret2.y + ret2.height
    );
  }

  changeToValidItem(itemMixPanel: ItemMixPanel) {
    var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
    let newLinha = linha;
    let teveColisao = false;
    let podeInserir = false;
    this.displacingInsertY = 0;
    let continua = true;
    do {
      teveColisao = false;
      //percorre toda a lista de de itens da newLinha
      //console.log("Indicou o do")
      if (this.DAOHome.listItemMixPanel[newLinha] != undefined) {
        //console.log("Verificando lista != UNDEFINID")
        for (
          let index = 0;
          index < this.DAOHome.listItemMixPanel[newLinha].length;
          index++
        ) {
          //Se for diferente do item que estamos tentando inserir
          //E o item a ser comparado não estiver excluido
          if (
            this.DAOHome.listItemMixPanel[newLinha][index].id !=
              itemMixPanel.id &&
            !this.DAOHome.listItemMixPanel[newLinha][index].excluded
          ) {
            //Se teve colisao
            if (
              this.checkCollision(
                this.DAOHome.listItemMixPanel[newLinha][index].getColisao(),
                itemMixPanel.getColisao()
              )
            ) {
              teveColisao = true;
              newLinha = newLinha + 1;
              itemMixPanel.y = itemMixPanel.y + this.sizeTrail;
              this.displacingInsertY += 40;
              //console.log(" colidiu")
              break;
            }
          }
        }
      } else {
        //console.log("Lista undefinde")
        teveColisao = false;
      }
      //Se não teve colisao entao pode inserir
      if (!teveColisao) {
        continua = false;
      }
    } while (continua);
    let mensagem = "Atenção! </br> ";
    if (this.getNumberTrailByHeight(itemMixPanel.y) > this.getQtdTrails()) {
      mensagem +=
        "Modificação não realizada pois o item passaria do número máximo de trilhas.</br> ";
    }
    if (
      itemMixPanel.x < 0 ||
      itemMixPanel.x + itemMixPanel.width > this.widthPainel
    ) {
      mensagem +=
        "Modificação não realizada pois o item teria um tempo invalído na mixagem.</br>";
    }
    if (
      this.getNumberTrailByHeight(itemMixPanel.y) <= this.getQtdTrails() &&
      itemMixPanel.x >= 0 &&
      itemMixPanel.x + itemMixPanel.width <= this.widthPainel
    ) {
      return true;
    } else {
      this.tooltip.showMessage(mensagem);
      return false;
    }
  }
  //Função que tentar inserir desenhar/inserir o item no Painel
  //caso não seja possivel ela da uma mensagem informando o usuario
  insertItemMixPanel(
    idSoundIconSelect: number,
    descriptiveIcon: string | undefined,
    tag_dimension: string | undefined,
    tag_intensity: string | undefined,
    idSemanticDescriptor: number | undefined,
    codeSemanticDescriptor: string | undefined
  ) {
    let idBuffer = idSoundIconSelect;
    let itemMixPanel = new ItemMixPanel();
    itemMixPanel.descriptiveIcon = descriptiveIcon;
    itemMixPanel.tag_dimension = tag_dimension;
    itemMixPanel.tag_intensity = tag_intensity;
    itemMixPanel.setIdSemanticDescriptor(idSemanticDescriptor);
    itemMixPanel.setCodeSemanticDescriptor(codeSemanticDescriptor);

    itemMixPanel.seconds = this.DAOHome.listItemBuffer[idBuffer].timeDuration;
    itemMixPanel.color = this.DAOHome.listItemBuffer[idBuffer].color;
    itemMixPanel.idBuffer = idBuffer;
    itemMixPanel.width = itemMixPanel.seconds * this.pixelPerSecond;
    itemMixPanel.x = this.getPositionX(event) + this.displacingXAxis;
    itemMixPanel.y = this.getMiddleHeigtTrail(
      this.getPositionY(event) + this.displacingYAxis
    );
    let listColisoes = this.checkItemMixPanel(itemMixPanel);
    this.lastX = itemMixPanel.x;
    this.lastY = itemMixPanel.y;

    if (this.changeToValidItem(itemMixPanel)) {
      itemMixPanel.draw(this);
      itemMixPanel.startTime = this.getSecondsByXPosition(itemMixPanel.x);
      itemMixPanel.endTime = itemMixPanel.startTime + itemMixPanel.seconds;
      itemMixPanel.id = this.DAOHome.getNewIdItemMix();
      this.pageSoundSphereHome.sequenciador.needGenerateBuffer = true;
      var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
      itemMixPanel.linha = linha;
      this.tooltip.showMessage(
        `${
          this.DAOHome.listItemBuffer[itemMixPanel.idBuffer].name
        } inserido em: ${this.sec2time(itemMixPanel.startTime)}`
      );
      this.DAOHome.pushItemMixPanel(itemMixPanel);

      // if (this.displacingInsertY > 0 && this.getNumberTrailByHeight(itemMixPanel.y) - 2 > this.numberOfTrails) {
      if (
        this.displacingInsertY > 0 &&
        this.displacingInsertY + this.displacingYAxis <= this.maxDisplacingYAxis
      ) {
        this.ctxCanvas.translate(0, -this.displacingInsertY);
        this.displacingYAxis += this.displacingInsertY;
        this.lastY += this.displacingInsertY;
        this.reMake();
      }
    }
  }
  //get quantidade de segundos de acordo com  X
  getSecondsByXPosition(xCoordate: number): number {
    var seconds = xCoordate / this.pixelPerSecond;
    return seconds;
  }
  updateItemMixPanel(itemMixPanel: ItemMixPanel) {
    var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
    itemMixPanel.x = this.getXbySeconds(itemMixPanel.startTime);
    if (this.changeToValidItem(itemMixPanel)) {
      console.log("Item valido");
      if (
        this.DAOHome.updateItemMixPane(
          itemMixPanel,
          linha,
          this.getNumberTrailByHeight(itemMixPanel.y) - 1,
          this.sizeTrail
        )
      ) {
        this.pageSoundSphereHome.sequenciador.needGenerateBuffer = true;
        this.reMake();
        // console.log("------------------------TEVE ALTERAÇÂO")
      }
    }
  }
  restartMixing() {
    this.DAOHome.restartMixing();
  }
  deleteItemMixPanel(itemMixPanel: ItemMixPanel) {
    var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
    this.DAOHome.deleteItemMixPanel(itemMixPanel, linha);
    this.pageSoundSphereHome.sequenciador.needGenerateBuffer = true;
    this.reMake();
  }
  //função para controlar o movimento no eixo x de acordo com a movimentaçãp do mouse
  endMove() {
    this.mouseDown = false;
    this.moved = false;
    this.firstPositionX = 0;
    this.firstPositionY = 0;
  }
  //Ao cancelar/encerrar touch
  actionEndTouchInPanel(evt: any) {
    //enableScroll();
    //console.log("end touch 1");
    this.endMove();
  }
  getPositionX(event: any) {
    console.log("Chamou o getpistion xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    var x;
    x =
      event.offsetX !== undefined
        ? event.offsetX
        : event.layerX - event.target.offsetLeft;
    return x;
  }
  //Posição do mouse no eixo Y
  getPositionY(event: any) {
    var y;
    //Metodo funciona apenas no chrome
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      var offset = this.touchFunctions.getOffset(this.canvas);

      y = event.touches[0].pageY - offset.top;
    } else {
      y =
        event.offsetY - 1 !== undefined
          ? event.offsetY - 1
          : event.layerY - event.target.offsetTop;
    }
    return y;
  }
  // função par controlar o movimento do marker caso passe da metade do canvas
  moveDisplacingXMarker(currentMarkerX: number) {
    //Condição para passar da metade
    //console.log("ENTROU NO xmarker")
    if (currentMarkerX > this.halfPainelX + this.displacingXAxis) {
      // console.log("ENTROU NO IF")
      let deltaX = currentMarkerX - this.lastMakerX;
      //if para verificar se o movimento do quadrante xDisplacingXaxis
      //é maior devido a mudança do marker no pause.
      //console.log("Delta x: "+deltaX)
      //console.log("Movendo normal")
      if (
        this.displacingXAxis >= 0 &&
        this.displacingXAxis <= this.maxDisplacingXAxis
      ) {
        // console.log("ENTROU NO IF 2")
        if (this.displacingXAxis + deltaX < this.maxDisplacingXAxis) {
          // console.log("ENTROU NO IF3")
          //console.log("Move Displacing")
          //console.log(this.displacingXAxis)
          this.displacingXAxis += deltaX;
          this.ctxCanvas.translate(-deltaX, 0);
        }
      }

      //this.reMake();
    }
    this.lastMakerX = currentMarkerX;
  }
  drawMarker() {
    this.ctxCanvas.beginPath();
    this.ctxCanvas.moveTo(this.xMarker, 0);
    this.ctxCanvas.lineTo(this.xMarker, this.heightPainel);
    this.ctxCanvas.strokeStyle = "#000";
    this.ctxCanvas.stroke();
  }
  animationPlayPanel() {
    if (this.flagAnimationPlay) {
      let agora = new Date().getTime();
      let decorrido = agora - this.anterior;
      this.moveDisplacingXMarker(this.xMarker);
      this.reMake();
      const velocidade = this.pixelPerSecond;
      this.xMarker += (velocidade * decorrido) / 1000;
      this.anterior = agora;
      if (this.getSecondsByXPosition(this.xMarker) <= this.totalTime) {
        requestAnimationFrame(() => {
          this.animationPlayPanel();
        });
      } else {
        // this.resetTranslate();
        this.reMake();
      }
    }
  }
  drawStoppedMarker(totalTime: number) {
    this.totalTime = totalTime;
    let xPositionBySeconds = this.getXbySeconds(totalTime);
    //O painel foi movido apenas até o tempo maximo (O tempo maximo aparece no painel)
    if (this.displacingXAxis < xPositionBySeconds) {
      this.xMarker = this.displacingXAxis + 0.5;
      this.lastMakerX = this.displacingXAxis + 0.5;
      //A mixagem não aparece no painel
    } else {
      //Menor ou igual a metade do painel que a metade do painel
      if (xPositionBySeconds <= this.halfPainelX) {
        this.resetTranslateX();
        this.xMarker = this.displacingXAxis + 0.5;
        this.lastMakerX = this.displacingXAxis + 0.5;
        this.ajustDisplacing();
      } else {
        const newXmarker = xPositionBySeconds - this.getXbySeconds(1);
        this.resetTranslateX();
        this.xMarker = newXmarker;
        this.lastMakerX = newXmarker;
        this.ajustDisplacing();
      }
    }
    let seconds = this.getSecondsByXPosition(this.xMarker);
    this.pageSoundSphereHome.sequenciador.continueFrom = seconds;
    this.anterior = new Date().getTime();
    this.reMake();
  }
  continueLoopMarker(totalTime: number) {
    this.totalTime = totalTime;
    this.anterior = new Date().getTime();
    this.flagAnimationPlay = true;
    if (this.pageSoundSphereHome.sequenciador.activePause) {
      this.ajustDisplacing();
    }
    this.animationPlayPanel();
  }
  startLoopMarker(totalTime: number) {
    "use strict";
    this.totalTime = totalTime;
    this.xMarker = 0;
    this.lastMakerX = 0;
    this.anterior = new Date().getTime();
    this.flagAnimationPlay = true;
    this.resetTranslateX();
    this.animationPlayPanel();
  }

  //Ajusta a translocação do painel
  ajustDisplacing() {
    //Se o Traker (this.xMarker) estiver depois da metade do painel e a translocação (this.displacingXAxis) fizer com que o traker fica centralizado na metade do painel
    //ele transloca e deixa o traker no meio do painel
    if (
      this.xMarker > this.halfPainelX &&
      this.displacingXAxis < this.xMarker - this.halfPainelX
    ) {
      this.resetTranslateX();
      this.ctxCanvas.translate(-(this.xMarker - this.halfPainelX), 0);
      this.displacingXAxis = this.xMarker - this.halfPainelX;
    }
    //Se o Traker (this.xMarker) estiver antes da metade do painel e se tiver translocação (this.displacingXAxis) ele joga a translocação para o inicio ou seja reset.
    if (this.xMarker < this.halfPainelX && this.displacingXAxis != 0) {
      this.resetTranslateX();
    }
    //Se o Traker (this.xMarker) e estiver depois da metade do painel e a translocação tiver passado do traker faz com que o traker fica centralizado no meio do painel
    if (
      this.xMarker > this.halfPainelX &&
      this.displacingXAxis > this.xMarker
    ) {
      this.resetTranslateX();
      this.ctxCanvas.translate(-(this.xMarker - this.halfPainelX), 0);
      this.displacingXAxis = this.xMarker - this.halfPainelX;
    }
  }
  // //Levar para o inicio do canvas
  resetTranslate() {
    // console.log("chamou o reset translate");
    //console.log("xsxsxsxsResete")
    //console.log("xsxsxsxsResete :"+this.displacingXAxis)
    this.ctxCanvas.translate(this.displacingXAxis, this.displacingYAxis);
    this.displacingXAxis = 0;
    this.displacingYAxis = 0;
    // this.lastX = 0;
    // this.lastY = 0;
  }
  resetTranslateX() {
    //console.log("xsxsxsxsResete")
    //console.log("xsxsxsxsResete :"+this.displacingXAxis)
    console.log("RESTE DISPLACING X: " + this.displacingXAxis);
    this.ctxCanvas.translate(this.displacingXAxis, 0);
    this.displacingXAxis = 0;
    this.lastX = 0;
  }
  resetTranslateY() {
    //console.log("xsxsxsxsResete")
    //console.log("xsxsxsxsResete :"+this.displacingXAxis)
    console.log("RESTE DISPLACING Y: " + this.displacingXAxis);
    this.ctxCanvas.translate(0, this.displacingYAxis);
    this.displacingYAxis = 0;
    this.lastY = 0;
  }
  //Desenha o itemMixPaneler
  stopDrawLoopMarker() {
    this.flagAnimationPlay = false;
    this.xMarker = 0;
    this.lastMakerX = 0;
    this.lastxMarkerOnPlay = 0;
    this.resetTranslate();
    this.reMake();
  }
  stopSimple() {
    this.flagAnimationPlay = false;
    this.reMake();
  }
  //Despausar
  cancelPause() {
    this.flagAnimationPlay = false;
    //   this.resetTranslate();
    this.reMake();
  }
  pad(num: any, size: any) {
    return ("000" + num).slice(size * -1);
  }
  sec2time(timeInSeconds: any) {
    let time: any = parseFloat(timeInSeconds).toFixed(3);
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time - minutes * 60);
    let milliseconds = time.slice(-3);

    return (
      this.pad(hours, 2) +
      ":" +
      this.pad(minutes, 2) +
      ":" +
      this.pad(seconds, 2) +
      "." +
      this.pad(milliseconds, 3)
    );
  }

  //Pause draw
  pauseDrawLoopMarker() {
    this.flagAnimationPlay = false;
  }
  //get position X de acordo com o tempo
  getXbySeconds(seconds: number) {
    var positionX = seconds * this.pixelPerSecond;
    return positionX;
  }
}
