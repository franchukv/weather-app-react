const getWeatherMediaName = (code, moment) => {
  const weatherTypes = {
    0: 'clear',
    1: 'few-clouds',
    2: 'few-clouds',
    3: 'cloudy',
    45: 'cloudy',
    48: 'cloudy',
    51: 'rain',
    53: 'rain',
    55: 'rain',
    56: 'rain',
    57: 'rain',
    61: 'rain',
    63: 'rain',
    65: 'rain',
    66: 'rain',
    67: 'rain',
    80: 'rain',
    81: 'rain',
    82: 'rain',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    85: 'snow',
    86: 'snow',
    95: 'storm',
    96: 'storm',
    99: 'storm',
  };

  const weatherType = weatherTypes[code] || null;
  const timeOfDay = moment === 0 ? 'night' : 'day';

  return weatherType !== null
    ? `weather=${weatherType}&moment=${timeOfDay}`
    : null;
};

export default getWeatherMediaName;
