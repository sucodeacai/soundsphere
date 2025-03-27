"use strict";
//Oa painel é fixo, no caso os atributos displacingXaxis e displacingYaxis
//servem para saber onde o canvas vai ser inserido. A medida que a tela de amostra
//se move para a direita o canvas precisa ser desenhado mais a esquerda por isso o mesmo é
//negativo e o translate também.
class Painel {
    constructor(daoHome, ctxCanvas, canvas, pixelPerSecond, sequenciador) {
        this.drawGradient = true;
        this.pageSoundSphereHome = undefined;
        this.listenersNotifyStatus = [];
        this.drawDescritor = true;
        this.drawDimension = true;
        this.drawIntensity = true;
        this.itemMixOption = undefined;
        this.drawFood = true;
        this.flagDrawMarker = true;
        this.flagAnimationPlay = false;
        this.pixelPerSecond = 0;
        this.numberOfTrails = 0;
        this.totalTime = 0;
        this.sizeTrail = 40;
        this.heightPainel = 0;
        this.widthPainel = 0;
        this.lastX = 0;
        this.mouseDown = false;
        this.lastY = 0;
        this.mouseDownX = 0;
        this.lastClassCursor = "";
        this.deltaX = 0;
        this.deltaY = 0;
        this.mouseDownY = 0;
        this.displacingInsertX = 0;
        this.displacingInsertY = 0;
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
        this.displacingYAxis = 0;
        this.displacingXAxis = 0;
        this.xMarker = 0;
        this.lastMakerX = 0;
        this.lastxMarkerOnPlay = 0;
        this.firstPositionX = 0;
        this.firstPositionY = 0;
        this.moved = false;
        this.pixelPerSecond = pixelPerSecond;
        console.log("Pixel por segundo: " + pixelPerSecond);
        this.DAOHome = daoHome;
        this.canvas = canvas;
        this.sequenciador = sequenciador;
        this.halfPainelX = this.canvas.width / 2;
        this.halfPainelY = this.canvas.height / 2;
        this.ctxCanvas = ctxCanvas;
        this.make();
        this.setSettings();
        // this.unselectedAlbumItem();
        this.maxDisplacingXAxis = this.widthPainel - this.canvas.width;
        this.maxDisplacingYAxis = this.heightPainel - this.canvas.height;
    }
    actionMouseLeave(event) {
        this.reMake();
    }
    actionMouseEnter(event) {
        var _a, _b, _c;
        if ((_a = this.pageSoundSphereHome) === null || _a === void 0 ? void 0 : _a.isDeleteButtonActive()) {
            this.setCursorTrash();
        }
        else if (((_b = this.pageSoundSphereHome) === null || _b === void 0 ? void 0 : _b.idSelectedIcomAlbum) == undefined) {
            this.setCursorEdit();
            // console.log("set cursor lixo");
        }
        else {
            (_c = document.getElementById("canva_painel_mixagem")) === null || _c === void 0 ? void 0 : _c.classList.add("default");
        }
    }
    actionMouseDown(event) {
        //console.log("actionMouseDown")
        this.mouseDown = true;
        //console.log(" this.mouseDown ->" + this.move)
        this.mouseDownX = event.offsetX;
        //console.log(" this.mouseDownX ->" + this.mouseDownX)
        this.mouseDownY = event.offsetY - 1;
        //console.log(" this.mouseDownY ->" + this.mouseDownY)
    }
    actionMouseOut(event) {
        //console.log("actionMouseOut")
        this.endMove();
        this.removeClassCanvas();
    }
    setCursorTrash() {
        this.removeClassCanvas();
        document
            .getElementById("canva_painel_mixagem")
            .classList.add("cursorTrash");
    }
    setCursorEdit() {
        document
            .getElementById("canva_painel_mixagem")
            .classList.add("cursorEdit");
    }
    //O evento ocorre quando o usuário libera um botão do mouse sobre um elemento
    //O movimento do painel só e realizado enquanto se esitver preciosando a tecla
    //ao soltar é desfeita a ação independente se ele soltar no canvas ou não
    actionMouseUp(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.deltaX = 0;
        this.deltaY = 0;
        this.mouseDown = false;
        console.log("dentro action mouse up");
        let itemMixTemp = this.getItemMix();
        //Ele só vai verificar as opções no painel se não houver um movimento
        if (!this.moved) {
            // console.log("Mouse up " + this.pageSoundSphereHome.idSelectedIcomAlbum);
            //Se o botão de exclusão estiver ativado
            if ((_a = this.pageSoundSphereHome) === null || _a === void 0 ? void 0 : _a.isDeleteButtonActive()) {
                console.warn("Excluir dentro painel.");
                if (itemMixTemp) {
                    this.deleteItemMixPanel(itemMixTemp);
                    this.reMake();
                }
                else {
                    this.notifyStatus("Nenhum ítem de mixagem selecionado para exclusão. ");
                }
                //Se as opções estiverem ativadas
            }
            else if ((_b = this.pageSoundSphereHome) === null || _b === void 0 ? void 0 : _b.isPauseButtonActive()) {
                console.warn("pause dentro painel.");
                let seconds = this.getSecondsByXPosition(this.getPositionX(event) + this.displacingXAxis);
                if (seconds <= this.totalTime) {
                    this.xMarker = this.getPositionX(event) + this.displacingXAxis;
                    this.lastMakerX = this.xMarker;
                    this.sequenciador.continueFrom = seconds;
                    this.reMake();
                }
            }
            else if (((_c = this.pageSoundSphereHome) === null || _c === void 0 ? void 0 : _c.idSelectedIcomAlbum) != undefined) {
                // console.warn("Inserir dentro do painel");
                // console.log("Mouse up remove descriptiveIcon idSelectedIcomAlbum");
                // console.error(this.pageSoundSphereHome.idActionDescriptiveIcon);
                this.insertItemMixPanel(this.pageSoundSphereHome.idSelectedIcomAlbum, this.pageSoundSphereHome.idActionDescriptiveIcon, this.pageSoundSphereHome.idDimension, this.pageSoundSphereHome.idIntensity, this.pageSoundSphereHome.idSemanticDescriptor, this.pageSoundSphereHome.codeSemanticDescriptor, this.pageSoundSphereHome.getSlicerVolume());
            }
            else if (itemMixTemp) {
                itemMixTemp.descriptiveIcon =
                    (_d = this.pageSoundSphereHome) === null || _d === void 0 ? void 0 : _d.idActionDescriptiveIcon;
                itemMixTemp.tag_dimension = (_e = this.pageSoundSphereHome) === null || _e === void 0 ? void 0 : _e.idDimension;
                itemMixTemp.tag_intensity = (_f = this.pageSoundSphereHome) === null || _f === void 0 ? void 0 : _f.idIntensity;
                itemMixTemp.setIdSemanticDescriptor((_g = this.pageSoundSphereHome) === null || _g === void 0 ? void 0 : _g.idSemanticDescriptor);
                itemMixTemp.setCodeSemanticDescriptor((_h = this.pageSoundSphereHome) === null || _h === void 0 ? void 0 : _h.codeSemanticDescriptor);
                if (((_j = this.pageSoundSphereHome) === null || _j === void 0 ? void 0 : _j.getSlicerVolume()) !== undefined ||
                    ((_k = this.pageSoundSphereHome) === null || _k === void 0 ? void 0 : _k.getSlicerVolume()) === 0) {
                    // console.error("volume", volume);
                    itemMixTemp.setVolume((_l = this.pageSoundSphereHome) === null || _l === void 0 ? void 0 : _l.getSlicerVolume());
                }
                this.updateItemMixPanel(itemMixTemp);
                this.reMake();
                // this.pageSoundSphereHome.showModalOptions();
                this.notifyStatus("Item de mixagem alterado.");
            }
            else {
                console.warn("Nem excluir, nem pause, nem inserir amostra");
                this.notifyStatus("Nenhuma amostra de audio selecionada.");
            }
        }
        this.endMove();
    }
    //Função para setar um item mix temporario
    setItemMixTemp(itemMixTemp) {
        this.itemMixOption = new ItemMixPanel();
        this.itemMixOption.x = itemMixTemp.x;
        this.itemMixOption.y = itemMixTemp.y;
        this.itemMixOption.width = itemMixTemp.width;
        this.itemMixOption.height = itemMixTemp.height;
        this.itemMixOption.startTime = itemMixTemp.startTime;
        this.itemMixOption.endTime = itemMixTemp.endTime;
        this.itemMixOption.color = itemMixTemp.color;
        this.itemMixOption.seconds = itemMixTemp.seconds;
        this.itemMixOption.setVolume(itemMixTemp.getVolume());
        this.itemMixOption.solo = itemMixTemp.solo;
        this.itemMixOption.linha = itemMixTemp.linha;
        this.itemMixOption.setIdSemanticDescriptor(itemMixTemp.getidSemanticDescriptor());
        this.itemMixOption.setCodeSemanticDescriptor(itemMixTemp.getCodeSemanticDescriptor());
        this.itemMixOption.id = itemMixTemp.id;
        this.itemMixOption.descriptiveIcon = itemMixTemp.descriptiveIcon;
        this.itemMixOption.idBuffer = itemMixTemp.idBuffer;
    }
    //FUnção que gerencia o movimento do painel caso a opção move seja verdadeira
    //de modo que se o usuário estiver clicando e arrastando ele movimenta o painel
    actionMouseMove(e) {
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
                    }
                    else if (diferenceX >= 5 && diferenceX < 100) {
                        this.deltaX = -diferenceX * velocidade;
                    }
                    else if (diferenceX >= 100) {
                        this.deltaX = -100 * velocidade;
                    }
                    else if (diferenceX <= -5 && diferenceX > -100) {
                        this.deltaX = -diferenceX * velocidade;
                    }
                    else if (diferenceX <= -100) {
                        this.deltaX = 100 * velocidade;
                    }
                    const diferenceY = evt.offsetY - 1 - this.firstPositionY;
                    if (diferenceY > -5 && diferenceY < 5) {
                        this.deltaY = 0;
                    }
                    else if (diferenceY >= 5 && diferenceY < 100) {
                        this.deltaY = -diferenceY * velocidade;
                    }
                    else if (diferenceY >= 100) {
                        this.deltaY = -100 * velocidade;
                    }
                    else if (diferenceY <= -5 && diferenceY > -100) {
                        this.deltaY = -diferenceY * velocidade;
                    }
                    else if (diferenceY <= -100) {
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
            }
            else {
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
                    let textTimeToShow = sec2time(this.getSecondsByXPosition(e.offsetX + this.displacingXAxis));
                    if (e.offsetY + this.displacingYAxis >= 30 &&
                        e.offsetX + this.displacingXAxis < this.widthPainel - tamanhoTexto) {
                        this.ctxCanvas.fillText(textTimeToShow, e.offsetX + this.displacingXAxis, e.offsetY + this.displacingYAxis);
                    }
                    else if (e.offsetY + this.displacingYAxis > 30 &&
                        e.offsetX + this.displacingXAxis >= this.widthPainel - tamanhoTexto) {
                        this.ctxCanvas.fillText(textTimeToShow, this.widthPainel - tamanhoTexto, e.offsetY + this.displacingYAxis);
                    }
                    else if (e.offsetY + this.displacingYAxis < 30 &&
                        e.offsetX + this.displacingXAxis < this.widthPainel - tamanhoTexto) {
                        this.ctxCanvas.fillText(textTimeToShow, e.offsetX + this.displacingXAxis, margemSuperior);
                    }
                    else {
                        this.ctxCanvas.fillText(textTimeToShow, this.widthPainel - tamanhoTexto, margemSuperior);
                    }
                    this.ctxCanvas.stroke();
                }
            }
        }
    }
    removeClassCanvas() {
        document.getElementById("canva_painel_mixagem").className = "";
        document.getElementById("canva_painel_mixagem").classList.add("canvas");
    }
    changeCursorCanvas(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        let el1 = document.getElementById("canva_painel_mixagem");
        //console.log("Delta X: " + this.deltaX + " Delta Y: " + this.deltaY + " Displacing X " + this.displacingXAxis + "Displacing Y " + this.displacingYAxis)
        if (this.displacingXAxis + -this.deltaX < 0 &&
            this.displacingYAxis + -this.deltaY < 0) {
            (_a = document
                .getElementById("canva_painel_mixagem")) === null || _a === void 0 ? void 0 : _a.classList.add("shadowLeftTop");
        }
        else if (this.displacingXAxis + -this.deltaX < 0 &&
            this.displacingYAxis == this.maxDisplacingYAxis) {
            (_b = document
                .getElementById("canva_painel_mixagem")) === null || _b === void 0 ? void 0 : _b.classList.add("shadowLeftBottom");
        }
        else if (this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis &&
            this.displacingYAxis + -this.deltaY < 0) {
            (_c = document
                .getElementById("canva_painel_mixagem")) === null || _c === void 0 ? void 0 : _c.classList.add("shadowRightTop");
        }
        else if (this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis &&
            this.displacingYAxis == this.maxDisplacingYAxis) {
            (_d = document
                .getElementById("canva_painel_mixagem")) === null || _d === void 0 ? void 0 : _d.classList.add("shadowRightBottom");
        }
        else if (this.displacingXAxis + -this.deltaX < 0) {
            (_e = document
                .getElementById("canva_painel_mixagem")) === null || _e === void 0 ? void 0 : _e.classList.add("shadowLeft");
        }
        else if (this.displacingXAxis + -this.deltaX > this.maxDisplacingXAxis) {
            (_f = document
                .getElementById("canva_painel_mixagem")) === null || _f === void 0 ? void 0 : _f.classList.add("shadowRight");
        }
        else if (this.displacingYAxis + -this.deltaY < 0) {
            (_g = document
                .getElementById("canva_painel_mixagem")) === null || _g === void 0 ? void 0 : _g.classList.add("shadowTop");
        }
        else if (this.displacingYAxis == this.maxDisplacingYAxis) {
            (_h = document
                .getElementById("canva_painel_mixagem")) === null || _h === void 0 ? void 0 : _h.classList.add("shadowBottom");
        }
        if (this.deltaY >= 5 && this.deltaX == 0) {
            // console.log("---UP")
            if (!(this.lastClassCursor == "cursorUP")) {
                this.removeClassCanvas();
                el1.className += " cursorUp";
                this.lastClassCursor = "cursorUP";
            }
        }
        else if (this.deltaY <= -5 && this.deltaX == 0) {
            // console.log("---Down")
            if (!(this.lastClassCursor == "cursorDown")) {
                this.removeClassCanvas();
                (_j = document
                    .getElementById("canva_painel_mixagem")) === null || _j === void 0 ? void 0 : _j.classList.add("cursorDown");
                this.lastClassCursor = "cursorDown";
            }
        }
        else if (this.deltaX >= 5 && this.deltaY == 0) {
            //   console.log("---Left")
            if (!(this.lastClassCursor == "cursorLeft")) {
                this.removeClassCanvas();
                (_k = document
                    .getElementById("canva_painel_mixagem")) === null || _k === void 0 ? void 0 : _k.classList.add("cursorLeft");
                this.lastClassCursor = "cursorLeft";
            }
        }
        else if (this.deltaX <= -5 && this.deltaY == 0) {
            //  console.log("---Right")
            (_l = document
                .getElementById("canva_painel_mixagem")) === null || _l === void 0 ? void 0 : _l.classList.add("cursorRight");
            if (!(this.lastClassCursor == "cursorRight")) {
                this.removeClassCanvas();
                (_m = document
                    .getElementById("canva_painel_mixagem")) === null || _m === void 0 ? void 0 : _m.classList.add("cursorRight");
                this.lastClassCursor = "cursorRight";
            }
        }
        else if (this.deltaY >= 5 && this.deltaX <= -5) {
            //  console.log("---UP Right")
            if (!(this.lastClassCursor == "cursorUpRight")) {
                this.removeClassCanvas();
                (_o = document
                    .getElementById("canva_painel_mixagem")) === null || _o === void 0 ? void 0 : _o.classList.add("cursorUpRight");
                this.lastClassCursor = "cursorUpRight";
            }
        }
        else if (this.deltaY >= 5 && this.deltaX >= 5) {
            //    console.log("---Up Left")
            if (!(this.lastClassCursor == "cursorUpLeft")) {
                this.removeClassCanvas();
                (_p = document
                    .getElementById("canva_painel_mixagem")) === null || _p === void 0 ? void 0 : _p.classList.add("cursorUpLeft");
                this.lastClassCursor = "cursorUpLeft";
            }
        }
        else if (this.deltaY <= -5 && this.deltaX <= -5) {
            //     console.log("---down left")
            if (!(this.lastClassCursor == "cursorDownLeft")) {
                this.removeClassCanvas();
                (_q = document
                    .getElementById("canva_painel_mixagem")) === null || _q === void 0 ? void 0 : _q.classList.add("cursorDownLeft");
                this.lastClassCursor = "cursorDownLeft";
            }
        }
        else if (this.deltaY <= -5 && this.deltaX >= 5) {
            //  console.log("---down right")
            if (!(this.lastClassCursor == "cursorDownRight")) {
                this.removeClassCanvas();
                (_r = document
                    .getElementById("canva_painel_mixagem")) === null || _r === void 0 ? void 0 : _r.classList.add("cursorDownRight");
                this.lastClassCursor = "cursorDownRight";
            }
        }
    }
    moveAction(e) {
        var _a, _b, _c, _d;
        //Verifica a mudança do cursor
        if (this.deltaX != 0 || this.deltaY != 0) {
            this.changeCursorCanvas(e);
        }
        if (this.displacingXAxis >= 0 &&
            this.displacingXAxis <= this.maxDisplacingXAxis) {
            if (this.displacingXAxis + -this.deltaX >= this.maxDisplacingXAxis) {
                this.deltaX = -(this.maxDisplacingXAxis - this.displacingXAxis);
                this.displacingXAxis = this.maxDisplacingXAxis;
                this.ctxCanvas.translate(this.deltaX, 0);
            }
            else if (this.displacingXAxis + -this.deltaX <= 0) {
                this.deltaX = this.displacingXAxis;
                this.displacingXAxis = 0;
                this.ctxCanvas.translate(this.deltaX, 0);
            }
            else {
                this.displacingXAxis -= this.deltaX;
                this.ctxCanvas.translate(this.deltaX, 0);
            }
        }
        if (this.displacingYAxis >= 0 &&
            this.displacingYAxis <= this.maxDisplacingYAxis) {
            if (this.displacingYAxis + -this.deltaY >= this.maxDisplacingYAxis) {
                this.deltaY = -(this.maxDisplacingYAxis - this.displacingYAxis);
                this.displacingYAxis = this.maxDisplacingYAxis;
                this.ctxCanvas.translate(0, this.deltaY);
            }
            else if (this.displacingYAxis + -this.deltaY <= 0) {
                this.deltaY = this.displacingYAxis;
                this.displacingYAxis = 0;
                this.ctxCanvas.translate(0, this.deltaY);
            }
            else {
                this.displacingYAxis -= this.deltaY;
                this.ctxCanvas.translate(0, this.deltaY);
            }
        }
        this.reMake();
        if (this.mouseDown) {
            requestAnimationFrame(() => {
                this.moveAction(e);
            });
        }
        else {
            this.removeClassCanvas();
            this.lastClassCursor = "";
            if ((_a = this.pageSoundSphereHome) === null || _a === void 0 ? void 0 : _a.isDeleteButtonActive()) {
                this.setCursorTrash();
            }
            else if (((_b = this.pageSoundSphereHome) === null || _b === void 0 ? void 0 : _b.idSelectedIcomAlbum) == undefined) {
                console.log((_c = this.pageSoundSphereHome) === null || _c === void 0 ? void 0 : _c.idSelectedIcomAlbum);
                this.setCursorEdit();
                // console.log("set cursor lixo");
            }
            else {
                (_d = document
                    .getElementById("canva_painel_mixagem")) === null || _d === void 0 ? void 0 : _d.classList.add("default");
            }
        }
    }
    setSettings() {
        this.canvas.addEventListener("dblclick", (evt) => {
            evt.preventDefault();
        }, false);
        this.canvas.addEventListener("mousedown", (evt) => this.actionMouseDown(evt));
        this.canvas.addEventListener("mouseout", (evt) => this.actionMouseOut(evt));
        this.canvas.addEventListener("mouseup", (evt) => this.actionMouseUp(evt));
        this.canvas.addEventListener("mousemove", (evt) => this.actionMouseMove(evt));
        this.canvas.addEventListener("mouseleave", (evt) => this.actionMouseLeave(evt));
        this.canvas.addEventListener("mouseenter", (evt) => this.actionMouseEnter(evt));
    }
    reMake() {
        //Limpa tela para excluir os rastros
        this.ctxCanvas.clearRect(0, 0, this.widthPainel, this.heightPainel);
        this.drawTrails();
        this.reDrawAllItemMixPanel();
        this.drawGridTime();
        this.drawGridTrail();
        //if (this.sequenciador.activePlay || this.sequenciador.activePause || this.flagDrawMarker) {
        this.drawMarker();
        //}
    }
    //FUnção para desenhar/criar o painel
    //Definir parametros de criação do painel
    make() {
        this.setTimePanel(1);
        this.setTrailPanel(80);
        this.reDrawAllItemMixPanel();
        this.drawTrails();
        this.drawGridTime();
        this.drawGridTrail();
    }
    //COnfigura o comprimento do painel de mixagem de acordo com o tempo em
    //minutos informado
    setTimePanel(minutos) {
        var seconds = minutos * 3600;
        this.widthPainel = this.pixelPerSecond * seconds;
    }
    //Alterar o numero de trilhas para mixagem
    setTrailPanel(val) {
        this.numberOfTrails = val;
        this.heightPainel = val * this.sizeTrail;
    }
    //Função para atualizar a array de acordo com o numero de trilhas
    reDrawAllItemMixPanel() {
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
    getQtdTrails() {
        return this.heightPainel / this.sizeTrail;
    }
    //Desenha as linhas que divide as trilhas
    drawTrails() {
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
    drawGridTime() {
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
                this.ctxCanvas.fillText(time, x - 3 * timeLenght, 17 + this.displacingYAxis);
            }
            else {
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
    getTimeGrid(y) {
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
    drawGridTrail() {
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
    getNumberTrailByHeight(val) {
        var x = this.sizeTrail, trail = 1;
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
        remove.y = this.getMiddleHeigtTrail(this.getPositionY(event) + this.displacingYAxis);
        // }
        var listaRemove = this.checkItemMixPanel(remove);
        if (listaRemove.length >= 1) {
            //console.log("Retornando o primeiro item da lista encontrado")
            return listaRemove[0];
        }
        else {
            //console.log("Retornando false pq nao encontrou nehum item")
            return false;
        }
    }
    //Retorna o endereço que a o som deve ser inserido no Eixo y
    //para ser desenhaado de acordo com o height informado
    getMiddleHeigtTrail(val) {
        return (this.getNumberTrailByHeight(val) * this.sizeTrail - this.sizeTrail / 2);
    }
    //Retorna a lista de itemMixPanels com que o itemMixPanelenviado se colide
    checkItemMixPanel(itemMixPanel) {
        let listColisao = [], numeroTrilha = this.getNumberTrailByHeight(itemMixPanel.y);
        let listProvisoria = this.DAOHome.listItemMixPanel[numeroTrilha - 1]
            ? this.DAOHome.listItemMixPanel[numeroTrilha - 1]
            : [];
        let i;
        for (i = 0; i < listProvisoria.length; i = i + 1) {
            //Se o item não tiver sido excluido então ele deve ser checado
            //se tem colisoes ou nao
            if (!listProvisoria[i].excluded) {
                if (this.checkCollision(itemMixPanel.getColisao(), listProvisoria[i].getColisao())) {
                    listColisao.push(listProvisoria[i]);
                }
            }
        }
        return listColisao;
    }
    //Verifica se a colisões
    checkCollision(ret1, ret2) {
        return (ret1.x + ret1.width > ret2.x &&
            ret1.x < ret2.x + ret2.width &&
            ret1.y + ret1.height > ret2.y &&
            ret1.y < ret2.y + ret2.height);
    }
    changeToValidItem(itemMixPanel) {
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
                for (let index = 0; index < this.DAOHome.listItemMixPanel[newLinha].length; index++) {
                    //Se for diferente do item que estamos tentando inserir
                    //E o item a ser comparado não estiver excluido
                    if (this.DAOHome.listItemMixPanel[newLinha][index].id !=
                        itemMixPanel.id &&
                        !this.DAOHome.listItemMixPanel[newLinha][index].excluded) {
                        //Se teve colisao
                        if (this.checkCollision(this.DAOHome.listItemMixPanel[newLinha][index].getColisao(), itemMixPanel.getColisao())) {
                            teveColisao = true;
                            newLinha = newLinha + 1;
                            itemMixPanel.y = itemMixPanel.y + this.sizeTrail;
                            this.displacingInsertY += 40;
                            //console.log(" colidiu")
                            break;
                        }
                    }
                }
            }
            else {
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
        if (itemMixPanel.x < 0 ||
            itemMixPanel.x + itemMixPanel.width > this.widthPainel) {
            mensagem +=
                "Modificação não realizada pois o item teria um tempo invalído na mixagem.</br>";
        }
        if (this.getNumberTrailByHeight(itemMixPanel.y) <= this.getQtdTrails() &&
            itemMixPanel.x >= 0 &&
            itemMixPanel.x + itemMixPanel.width <= this.widthPainel) {
            return true;
        }
        else {
            this.notifyStatus(mensagem);
            return false;
        }
    }
    //Função que tentar inserir desenhar/inserir o item no Painel
    //caso não seja possivel ela da uma mensagem informando o usuario
    insertItemMixPanel(idSoundIconSelect, descriptiveIcon, tag_dimension, tag_intensity, idSemanticDescriptor, codeSemanticDescriptor, volume) {
        let idBuffer = idSoundIconSelect;
        let itemMixPanel = new ItemMixPanel();
        itemMixPanel.descriptiveIcon = descriptiveIcon;
        itemMixPanel.tag_dimension = tag_dimension;
        itemMixPanel.tag_intensity = tag_intensity;
        itemMixPanel.setIdSemanticDescriptor(idSemanticDescriptor);
        itemMixPanel.setCodeSemanticDescriptor(codeSemanticDescriptor);
        if (volume !== undefined || volume === 0) {
            // console.error("volume", volume);
            itemMixPanel.setVolume(volume);
        }
        itemMixPanel.seconds = this.DAOHome.listItemBuffer[idBuffer].timeDuration;
        itemMixPanel.color = this.DAOHome.listItemBuffer[idBuffer].color;
        itemMixPanel.idBuffer = idBuffer;
        itemMixPanel.width = itemMixPanel.seconds * this.pixelPerSecond;
        itemMixPanel.x = this.getPositionX(event) + this.displacingXAxis;
        itemMixPanel.y = this.getMiddleHeigtTrail(this.getPositionY(event) + this.displacingYAxis);
        let listColisoes = this.checkItemMixPanel(itemMixPanel);
        this.lastX = itemMixPanel.x;
        this.lastY = itemMixPanel.y;
        if (this.changeToValidItem(itemMixPanel)) {
            itemMixPanel.draw(this);
            itemMixPanel.startTime = this.getSecondsByXPosition(itemMixPanel.x);
            itemMixPanel.endTime = itemMixPanel.startTime + itemMixPanel.seconds;
            itemMixPanel.id = this.DAOHome.getNewIdItemMix();
            this.sequenciador.needGenerateBuffer = true;
            var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
            itemMixPanel.linha = linha;
            this.notifyStatus(`${this.DAOHome.listItemBuffer[itemMixPanel.idBuffer].name} inserido em: ${sec2time(itemMixPanel.startTime)}`);
            this.DAOHome.pushItemMixPanel(itemMixPanel);
            // if (this.displacingInsertY > 0 && this.getNumberTrailByHeight(itemMixPanel.y) - 2 > this.numberOfTrails) {
            if (this.displacingInsertY > 0 &&
                this.displacingInsertY + this.displacingYAxis <= this.maxDisplacingYAxis) {
                this.ctxCanvas.translate(0, -this.displacingInsertY);
                this.displacingYAxis += this.displacingInsertY;
                this.lastY += this.displacingInsertY;
                this.reMake();
            }
        }
    }
    //get quantidade de segundos de acordo com  X
    getSecondsByXPosition(xCoordate) {
        var seconds = xCoordate / this.pixelPerSecond;
        return seconds;
    }
    updateItemMixPanel(itemMixPanel) {
        var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
        itemMixPanel.x = this.getXbySeconds(itemMixPanel.startTime);
        if (this.changeToValidItem(itemMixPanel)) {
            console.log("Item valido");
            if (this.DAOHome.updateItemMixPane(itemMixPanel, linha, this.getNumberTrailByHeight(itemMixPanel.y) - 1, this.sizeTrail)) {
                this.sequenciador.needGenerateBuffer = true;
                this.reMake();
                // console.log("------------------------TEVE ALTERAÇÂO")
            }
        }
    }
    restartMixing() {
        this.DAOHome.restartMixing();
    }
    deleteItemMixPanel(itemMixPanel) {
        var linha = this.getNumberTrailByHeight(itemMixPanel.y) - 1;
        this.DAOHome.deleteItemMixPanel(itemMixPanel, linha);
        this.sequenciador.needGenerateBuffer = true;
        this.reMake();
    }
    //função para controlar o movimento no eixo x de acordo com a movimentaçãp do mouse
    endMove() {
        this.mouseDown = false;
        this.moved = false;
        this.firstPositionX = 0;
        this.firstPositionY = 0;
    }
    getPositionX(event) {
        // console.log("Chamou o getpistion xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        var x;
        x =
            event.offsetX !== undefined
                ? event.offsetX
                : event.layerX - event.target.offsetLeft;
        return x;
    }
    //Posição do mouse no eixo Y
    getPositionY(event) {
        var y;
        //Metodo funciona apenas no chrome
        y =
            event.offsetY - 1 !== undefined
                ? event.offsetY - 1
                : event.layerY - event.target.offsetTop;
        return y;
    }
    // função par controlar o movimento do marker caso passe da metade do canvas
    moveDisplacingXMarker(currentMarkerX) {
        //Condição para passar da metade
        //console.log("ENTROU NO xmarker")
        if (currentMarkerX > this.halfPainelX + this.displacingXAxis) {
            // console.log("ENTROU NO IF")
            let deltaX = currentMarkerX - this.lastMakerX;
            //if para verificar se o movimento do quadrante xDisplacingXaxis
            //é maior devido a mudança do marker no pause.
            //console.log("Delta x: "+deltaX)
            //console.log("Movendo normal")
            if (this.displacingXAxis >= 0 &&
                this.displacingXAxis <= this.maxDisplacingXAxis) {
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
            }
            else {
                // this.resetTranslate();
                this.reMake();
            }
        }
    }
    drawStoppedMarker(totalTime) {
        this.totalTime = totalTime;
        let xPositionBySeconds = this.getXbySeconds(totalTime);
        //O painel foi movido apenas até o tempo maximo (O tempo maximo aparece no painel)
        if (this.displacingXAxis < xPositionBySeconds) {
            this.xMarker = this.displacingXAxis + 0.5;
            this.lastMakerX = this.displacingXAxis + 0.5;
            //A mixagem não aparece no painel
        }
        else {
            //Menor ou igual a metade do painel que a metade do painel
            if (xPositionBySeconds <= this.halfPainelX) {
                this.resetTranslateX();
                this.xMarker = this.displacingXAxis + 0.5;
                this.lastMakerX = this.displacingXAxis + 0.5;
                this.ajustDisplacing();
            }
            else {
                const newXmarker = xPositionBySeconds - this.getXbySeconds(1);
                this.resetTranslateX();
                this.xMarker = newXmarker;
                this.lastMakerX = newXmarker;
                this.ajustDisplacing();
            }
        }
        let seconds = this.getSecondsByXPosition(this.xMarker);
        this.sequenciador.continueFrom = seconds;
        this.anterior = new Date().getTime();
        this.reMake();
    }
    continueLoopMarker(totalTime) {
        this.totalTime = totalTime;
        this.anterior = new Date().getTime();
        this.flagAnimationPlay = true;
        if (this.sequenciador.activePause) {
            this.ajustDisplacing();
        }
        this.animationPlayPanel();
    }
    startLoopMarker(totalTime) {
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
        if (this.xMarker > this.halfPainelX &&
            this.displacingXAxis < this.xMarker - this.halfPainelX) {
            this.resetTranslateX();
            this.ctxCanvas.translate(-(this.xMarker - this.halfPainelX), 0);
            this.displacingXAxis = this.xMarker - this.halfPainelX;
        }
        //Se o Traker (this.xMarker) estiver antes da metade do painel e se tiver translocação (this.displacingXAxis) ele joga a translocação para o inicio ou seja reset.
        if (this.xMarker < this.halfPainelX && this.displacingXAxis != 0) {
            this.resetTranslateX();
        }
        //Se o Traker (this.xMarker) e estiver depois da metade do painel e a translocação tiver passado do traker faz com que o traker fica centralizado no meio do painel
        if (this.xMarker > this.halfPainelX &&
            this.displacingXAxis > this.xMarker) {
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
    //Pause draw
    pauseDrawLoopMarker() {
        this.flagAnimationPlay = false;
    }
    //get position X de acordo com o tempo
    getXbySeconds(seconds) {
        var positionX = seconds * this.pixelPerSecond;
        return positionX;
    }
    onNotifyStatus(callback) {
        this.listenersNotifyStatus.push(callback);
    }
    notifyStatus(message) {
        this.listenersNotifyStatus.forEach((callback) => callback(message));
    }
}
