const request=require('request')
const forecast =(latitude,longitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=86d2a9d9ba372e59e2be5d754aac3d0b&query=' + latitude + ',' + longitude + '&units=f'
    request({url:url,json:true},(error,{ body })=>{
        if(error){
          callback('Unable connect to location services!',undefined)
        }
        else if(body.error){
          callback('Unable find location,Try another search',undefined)
        }else{
          callback(undefined,body.current.weather_descriptions+".It is currently " + body.current.temperature + " degrees out.It feels like "+ body.current.feelslike +" .There is a "+ body.current.precip +"% chance of rain."+"Humidity "+ body.current.humidity + "%.Wind Speed "+body.current.wind_speed +"Km/h.")
         }
    })
  }

  module.exports=forecast