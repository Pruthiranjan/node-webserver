const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { error } = require('console')
const app = express()
const viewspath = path.join(__dirname, '../templetes/views')
const partialspath = path.join(__dirname, '../templetes/partials')
app.use(express.static(path.join(__dirname, '../public')))

app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.get('',(req,res)=>{
    res.render('index',{
        Title:'Wheather App',
        Name:'Pruthiranjan'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        Title:'About me',
        Name:'Pruthiranjan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        Title:'Help',
        Name:'Pruthiranjan'
    })
})
app.set('view engine', 'hbs')
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
             error: 'You must provide an  address'
         })
     }
     
    geocode(req.query.address,(error,{latitude, longitude, location}={}) =>{
            if(error){
                return res.send({error})
            }
    forecast(latitude, longitude,(error, forecastdata) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
    })
 })


})
app.get('/products',(req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must providee a  serach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        Title:'404',
        Name:'Pruthiranjan',
        errorMsg:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        Title:'404',
        Name:'Pruthiranjan',
        errorMsg:'Page not Found'
    })
})
app.listen(3000, ()=>{
    console.log('sever is runnig on port 3000.')
})