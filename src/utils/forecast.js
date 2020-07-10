const request = require('request');

const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e563281641c87a5b9a22dda7ed3862c4&query='+latitude+','+longitude;

    request({url, json: true},(error,{body} )=>{
        if(error){
            callback('no internet connection available!', undefined);
        }else if(body.error){
            callback('Error - please check the url!',undefined);
        }else{
            callback(undefined,{temperature: body.current.temperature, feelslike: body.current.feelslike, weather_description: body.current.weather_descriptions});
        }
    })
}

module.exports= forecast;