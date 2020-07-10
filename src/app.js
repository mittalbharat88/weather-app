const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode= require('./utils/geocode')

const dirPathHtml = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname ,'../templates/partials')

const app = express();

app.set('view engine','hbs')
app.set('views' , viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(dirPathHtml));

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'bharat mittal'
    });
})
app.get('/about',(req, res)=> {
    res.render('about',{
        title: 'About me',
        name: 'bharat mittal'
    });
})

app.get('/help',(req, res)=> {
    res.render('help',{
        helpText: 'page is under development',
        title: 'Need any help?',
        name: 'bharat mittal'
    });
})

app.get('/product',(req, res)=>{
    res.send({product:['bharat mittal', 23, 'bti']});
    
})

app.get('/weather', (req,res)=>{
    
    if(!req.query.location){
        return res.send({error: 'please fill in the location'})
    }

    geocode(req.query.location, (error,{latitude, longitude} = {})=>{
            if(error){
               return res.send({error});
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    location: req.query.location,
                    temperature:forecastData.temperature,
                    feelslike: forecastData.feelslike
                })
            })

        })
    })

app.get('*',(req,res)=>{
    res.render('error',{
        error : '404 Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('listening at port 3000');
})