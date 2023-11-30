function formatDate(timestamp) {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offset * -1);
  return date;
}

export default formatDate;
