export default class page {
    constructor(data){
        this.data = data;
    }
    fillSelect(select){
        console.log(select);
        let html = "";
        for(const facultate in this.data){
			html += `<option value=${facultate}>${this.data[facultate]}</option>`;
        }
		select.insertAdjacentHTML('beforeend',html);
    }
}

export class requestPage extends page{
    constructor(data){
        super(data);
    }

    async request(req){
        let baseUrl =  window.location.href + req;
        const res = await fetch(baseUrl,{
            method : 'GET'
        })		
        return await res.json();
    }
} 