const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFudWpzaW5naCIsImEiOiJjazl5bGFmODIwdHZhM3Nxc3J0aHJ5am14In0.pztB2Awq9w3Jmzbu3Wlw9A&limit=1';
    request({url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to call geo service service!', undefined);
        }else if(body.features.length == 0){
            callback('Unable to find location, please try another search', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                place: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;