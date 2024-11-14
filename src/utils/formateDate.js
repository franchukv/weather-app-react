const formateTime = (timezone) => {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formateDate = (timezone) => {
  return new Date()
    .toLocaleDateString('en-GB', {
      timezone: timezone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/(\w+),? (\d+) (\w+) (\d+)/, '$1, $2 $3, $4');
};

export { formateDate, formateTime };
