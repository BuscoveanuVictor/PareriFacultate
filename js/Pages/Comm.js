submit.addEventListener('click',async(e)=>{

    if(!(nume.value && email.value && password.value))return;
    
    var baseUrl = window.location.href + '/upload';
    const data={
        nume : nume.value,
        email: email.value,
        password : password.value
    }

    const options ={
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(baseUrl,options)
    console.log(res);

    if(res){
       // window.location.href=window.location.origin+'/status/1';
    }else{
        //window.location.href=window.location.origin+'/status/0';
    }
    
});
