
class DescriptiveIcon {
    id:number;
    url:string;
    name:string;
    tag:string;
    img:any;
    constructor(id:number,url:string,name:string,tag:string){
        this.id=id;
        this.url= url;
        this.name=name;
        this.tag=tag;
        this.img = document.createElement("img");
        this.img.src=this.url;
    }
 
}