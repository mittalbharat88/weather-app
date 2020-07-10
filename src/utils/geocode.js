const request = require('request');

const geocode = function(address, callback){
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYmhhcmF0bWl0dGFsIiwiYSI6ImNrYjdqOXc3eDA2YjMzMm9ldjR1ZnZwcHgifQ.WS9UF0AThWTs6M-RQftUUQ&limit=1';

    request({url, json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to internet!", undefined);
        }else if(body.features.length ==0){
            callback('invalid URL entered!', undefined);
        }else{
           callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name });
            
        } 
    })
}

module.exports = geocode;