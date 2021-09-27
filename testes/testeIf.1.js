

function teste (meuCarro){
    let carro2 = meuCarro
    carro2.fabricacao = "uno"
    console.log(meuCarro)
    console.log(carro2)
}
//let meuCarro = new Object();
function start(){
    let meuCarro = new Object();
    meuCarro.fabricacao = "Ford";
    meuCarro.modelo = "Mustang";
    meuCarro.ano = 1969;
    console.log(meuCarro)
    teste(meuCarro);
    console.log(meuCarro)
}
let meuCarro = new Object();
start()
console.log(meuCarro)