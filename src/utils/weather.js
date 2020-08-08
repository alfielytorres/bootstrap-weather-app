
const request = require('postman-request')

const getWeather =  ( latitude, longitude, callback)=>{
    const weatherURL = `http://api.weatherstack.com/current?access_key=20d28bf2d50c4f0a41e06032c1c06086&query=${longitude},${latitude}&unit=m`



     request( 
    {
        url:weatherURL ,
        json:true
    }, (error, {body}) => {


    if(error){
        callback('no internet', undefined) 
    }else if (body.error){
        callback(body.error.info, undefined)
    }else{
        const {weather_descriptions, temperature,feelslike} =body.current
        const {country, region} = body.location

        callback(
            undefined,
            {
                description: weather_descriptions[0],
                temperature,
                feelslike,
                country,
                region

        })
    }
    
} )}

module.exports = getWeather