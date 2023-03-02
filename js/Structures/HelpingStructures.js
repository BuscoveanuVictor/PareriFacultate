export class el{
    constructor(){};

    id(elmnt){return document.getElementById(elmnt);}
    class(elmnt){return document.getElementsByClassName(elmnt);}
    tag(elmnt){return document.getElementsByTagName(elmnt);}

    out(el){
        console.log(el);    
    }
}