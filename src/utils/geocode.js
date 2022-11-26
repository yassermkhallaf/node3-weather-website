const request = require("request");

const geocode = (address, callback) => {
  const MAPBOX_KEY =
    "pk.eyJ1IjoieWFzc2Vya2hhbGxhZiIsImEiOiJjbGFjbjBsa3kwY3Q4M25sZDBpYm5xaXBnIn0.-8UJ2k7BjX_KUTLWnPyF_w";
  const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_KEY}&limit=1`;
  request({ url: MAPBOX_URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { center, place_name: location } = body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
