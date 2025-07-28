function formatCheckinDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [month, day, year].join('/');
}

function formatCheckinTime(date) {
  const dateStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return dateStr;
}

function formatCheckinDateTime(date) {
  year    = date.getFullYear();
  month   = String(date.getMonth() + 1).padStart(2, '0');
  day     = String(date.getDate()).padStart(2, '0');
  hour    = String(date.getHours()).padStart(2, '0');
  minutes = String(date.getMinutes()).padStart(2, '0');
  seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}` 
}

function formatDisplayDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day, ].join('-');
}

function formatDateWithDay(inpDate) {
  const date = inpDate.toLocaleDateString();
  const time = inpDate.toLocaleTimeString();
  const day  = inpDate.toLocaleDateString('en-us',{ weekday: 'long' });     
  return `${day} ${date} ${time}`; 

}

module.exports = {
  formatCheckinDate,
  formatCheckinTime,
  formatCheckinDateTime,
  formatDisplayDate,
  formatDateWithDay
}