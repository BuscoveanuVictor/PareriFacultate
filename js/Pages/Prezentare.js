import { requestPage } from "../Structures/templatePagina.js";

window.addEventListener("load", async (event) =>{
    event.preventDefault();

    const ThirdPage = new requestPage();
    const data = await ThirdPage.request('/get_info');

    console.log(data);
    
    var dataToInsert = `<h1>Facultatea de <br>  ${data[0].facultate} </h1>`;
    content.insertAdjacentHTML('beforeend',dataToInsert);

    button.onclick = ()=>{
       window.location.href =  `http://localhost/forum/${data[0].id}`;
    }


})
