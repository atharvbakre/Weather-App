const request = require('request')
const API_Key = 'f83302fd8e5c4001a3d134441201610';

const forecast = (address, callback) => {
    
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${encodeURIComponent(address)}`

    request({ url, json: true }, (error, { body }) =>{
        if(error){
            callback('Unable to connect to the Location Services!', undefined)
        }else if(body.error){
            callback(body.error.message, undefined)
        }else{
            callback(undefined, `${address}, ${body.location.country} Temperature ${body.current.temp_c}°C Chance of Rain ${body.current.cloud}%`)
        }
    })

}

module.exports = forecast;