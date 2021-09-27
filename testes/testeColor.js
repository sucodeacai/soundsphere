
function validColor(color){
    var isOk =false;
    if(color.indexOf("#")>-1){
        console.log(color)
        isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
    }
    return isOk;
    
}

function  getColor(name){
    return name.substring(name.indexOf("#"), name.indexOf("#")+7);
}



console.log(validColor(getColor(" d35 asfasfsf #d35")))


