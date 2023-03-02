	import  page from "../Structures/templatePagina.js"; 
	import  { facultati } from "../Data/data.js";
	
	window.addEventListener("load", (event) => {

		const firstPage =  new page(facultati);
		firstPage.fillSelect(select);
	
		button.addEventListener('click',()=>{		
			window.location.href = `http://localhost/selectare/${select.value}`;
		})

		window.addEventListener("resize",()=>{
			console.log()
		})

		/*
		var html = "";
		var i = 0;
	    facultati.forEach(element => {
			html += `<option value=${i++}>${element}</option>`;
		});
		select.insertAdjacentHTML('beforeend',html);

		//const res=  fetch('http://localhost/selectare/index=1',{method : 'GET'});
		//data=res.json();
		//console.log(data.info);
	
		/*
		if(window.location.href.indexOf("Selectare")!=-1){
			
			switch(facultatea_selectata){
				case '1' : console.log("s-a selectat UPB");
					facultatea = '<option>Facultatea de Inginerie Electrică</option>'
					_("id-select").insertAdjacentHTML('beforeend', facultatea);
				break;
				case '2' : 
					
				break;
				case '3' : 
				break;
			}
		}
		*/
	});
	


	let myWindow;
	function openWin(pagina){
		
		var link='http://localhost/';
		var e = document.getElementById("id-select");
		if(e){var value = e.value;} 
		
		if(pagina==='selectare'){
			link= link + 'selectare/' + value;  
			window.location.href = link;
		}
		else if(pagina==='forum'){
			link= link + 'forum/' + value;  
			window.location.href = link;	
		}
		else if(pagina==='scrie_comentariu'){
			let l= window.location.href.length;
			let value = window.location.href[l-1];
			link= link + 'comment/' + value;
			window.location.href = link;
		}
	}
