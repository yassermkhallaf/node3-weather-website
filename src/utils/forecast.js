const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const WEATHERSTACK__KEY = "2bd5200c61cc663ffdc62285812ae710";
  if (!latitude || !longitude) {
    callback("can't get Lat or long", undefined);
  } else if ((latitude, longitude)) {
    request(
      {
        url: `http://api.weatherstack.com/current?access_key=${WEATHERSTACK__KEY}&query=${latitude},${longitude}`,
        json: true,
      },
      (error, response, body) => {
        if (error) {
          callback("Unable to connect Weather Serverce", undefined);
          return;
        }
        if (body.error) {
          const { info: errorInfo } = body.error;
          callback(errorInfo, undefined);
          return;
        }
        if (!body.error) {
          const { weather_descriptions, temperature, precip } = body.current;
          const [weatherCondition] = weather_descriptions;

          callback(
            undefined,
            `${weatherCondition} this is currently ${temperature} degree out. There is a ${precip}%  chance of rain`
          );
        }
      }
    );
  }
};

module.exports = forecast;
