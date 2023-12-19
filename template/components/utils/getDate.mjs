/* 특정 달의 마지막 일을 반환하는 함수*/
const getLastDayOfMonth = (year, month) => {
  let date = new Date(year, month, 0);
  return date.getDate();
};

//console.log(getLastDayOfMonth('2023', '12'));

/* 특정 달의 마지막 요일을 반환하는 함수 */
const getLastDayOfDay = (year, month) => {
  let date = new Date(year, month, 0);
  return date.getDay();
};

export { getLastDayOfMonth, getLastDayOfDay };
