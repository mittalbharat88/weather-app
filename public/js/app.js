//client side js
console.log('client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg_1 = document.querySelector('#msg-1');
const msg_2 = document.querySelector('#msg-2');
const msg_3 = document.querySelector('#msg-3');
const msg_4 = document.querySelector('#msg-4');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location = search.value
    
    fetch('/weather?location='+ location).then((response)=>{
        response.json().then(data=>{
            msg_2.textContent='';
            msg_3.textContent='';
            msg_4.textContent='';
            if(data.error){
                msg_1.textContent= data.error;
            }else{
                msg_1.textContent= 'Location : ' + data.location;
                msg_2.textContent = 'Weather-description : '+ data.weather_description;
                msg_3.textContent= 'Current Temperature : ' + data.temperature;
                msg_4.textContent = 'Feels-like : '+data.feelslike;     
               
            }
        })
    })

})




