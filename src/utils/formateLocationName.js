const formateLocationName = (location) => {
  const { name, admin1, country } = location;

  return [name, admin1, country !== name ? country : '']
    .filter(Boolean)
    .join(', ');
};

export default formateLocationName;
