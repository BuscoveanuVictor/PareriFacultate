import { requestPage } from "../Structures/templatePagina.js";

window.addEventListener('load', async()=>{
    const forum = new requestPage();

    var data = await forum.request('/get_info');
    var dataToInsert = `<h1>Facultatea de <br>  ${data[0].nume} </h1>`;
    titluFacultate.insertAdjacentHTML('beforeend',dataToInsert);

    var data = await forum.request('/get_comm');


    comm.addEventListener('click',()=>{
        let link = window.location.href;
        let n = link.match(/\d/g);  
        window.location.href = 'http://localhost/comment/' + n;
    })


})