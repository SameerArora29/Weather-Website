const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
// const weatherData = require('../templates/views/weatherData');

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 5000

const publicStaticDirPath = path.join(__dirname,'../public');

const viewsPath = path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath)); 

app.get('',(req,res)=> {
    // res.send("Hi this is the weather app");
    res.render('index',{
        title:'Weather App'
    })
})

app.get('/weather',(req,res)=> {
   const address = req.query.address

   if(!address) {
       return res.send({
           error
       })
   }

    weatherData(address, (error,{temperature, description, cityName} = {})=> { 
        // console.log(result)
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('*',(req,res)=> {
    // res.send("Page not found");
    res.render('404',{
        title:"Page not Found"
    })
})

app.listen(port, ()=>{
    console.log("server is up and running on port",port);
});