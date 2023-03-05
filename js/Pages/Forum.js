import { requestPage } from "../Structures/templatePagina.js";

window.addEventListener('load', async()=>{
    const forum = new requestPage();
    const data = await forum.request('/get_info');

    var dataToInsert = `<h1>Facultatea de <br>  ${data[0].nume} </h1>`;
    titlu.insertAdjacentHTML('beforeend',dataToInsert);
})