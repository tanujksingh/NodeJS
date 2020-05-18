const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=351f2ce43eaf4eb6a09a163d185131f2&query=' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to call weather service!', undefined);
        }else if(body.error){
            callback(response.body.error.info, undefined);
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions,
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
};

module.exports=forecast;