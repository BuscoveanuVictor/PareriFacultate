import page from "../Structures/templatePagina.js"; 
import { domenii } from "../Data/data.js";

window.addEventListener('load',()=>{

    let text = window.location.pathname;
    let length = text.length;
    let part = text.slice(11, length);

    console.log(part);

    const secondPage =  new page(domenii[part]);
    secondPage.fillSelect(select);

    button.addEventListener('click',()=>{
        window.location.href = `http://localhost/prezentare/${select.value}`;
    })


})