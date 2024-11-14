const getLocations = async (query) => {
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search`;
  const params = `?name=${query}`;

  try {
    const response = await fetch(`${endpoint}${params}`);

    if (!response.ok) {
      console.error(response.statusText);
      return null;
    }

    let json = await response.json();
    return json.results || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getLocations;
