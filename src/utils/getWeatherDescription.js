const getWeatherDescription = (code, isShortVersion = false) => {
  const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Little drizzle',
    53: 'Moderate drizzle',
    55: 'Dense intensity drizzle',
    56: 'Light freezing drizzle ',
    57: 'Dense intensity freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy intensity rain',
    66: 'Light freezing rain',
    67: 'Heavy intensity freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy intensity snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  const shortWeatherDescriptions = {
    0: 'Clear',
    1: 'Few clouds',
    2: 'Few clouds',
    3: 'Cloudy',
    45: 'Cloudy',
    48: 'Cloudy',
    51: 'Rain',
    53: 'Rain',
    55: 'Rain',
    56: 'Rain',
    57: 'Rain',
    61: 'Rain',
    63: 'Rain',
    65: 'Rain',
    66: 'Rain',
    67: 'Rain',
    80: 'Rain',
    81: 'Rain',
    82: 'Rain',
    71: 'Snow',
    73: 'Snow',
    75: 'Snow',
    77: 'Snow',
    85: 'Snow',
    86: 'Snow',
    95: 'Thurderstorm',
    96: 'Thurderstorm',
    99: 'Thurderstorm',
  };

  return (
    (isShortVersion
      ? shortWeatherDescriptions[code]
      : weatherDescriptions[code]) || 'Unknown weather contidions'
  );
};

export default getWeatherDescription;
