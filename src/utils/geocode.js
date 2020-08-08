const request = require('postman-request')

const getCoordinates =  (address, callback) => {

    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxmaWV0b3JyZXMiLCJhIjoiY2tkZnY0Zjk5MXdoZjJxcDgwYzhzdnEwaSJ9.lqg1-ejrKs1tLuq5EZZaog`

    request({url: geocodeURL, json:true}, (error, {body}) =>{

        if(error){
            callback('no internet', undefined)
        }else if(body.message){
            callback(body.message, undefined)
        }else if(body.features.length===0){
            callback('No place found', undefined)
        }else{
            const {center,place_name} = body.features[0]
            
            callback(undefined,{
                longitude:center[1],
                latitude:center[0],
                place_name
            })
            
        }
    
    })
}

module.exports = getCoordinates