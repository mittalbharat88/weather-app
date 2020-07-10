//client side js
console.log('client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg_1 = document.querySelector('#msg-1');
const msg_2 = document.querySelector('#msg-2');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location = search.value
    
    fetch('http://localhost:3000/weather?location='+ location).then((response)=>{
        response.json().then(data=>{
            if(data.error){
                msg_1.textContent= data.error;
            }else{
                msg_1.textContent= data.location;
                msg_2.textContent= 'current temperature is - ' + data.temperature;
            }
        })
    })

})




