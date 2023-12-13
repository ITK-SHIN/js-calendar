import { getLastDayOfMonth, getLastDayOfDay } from './getDateModule.js';

const renderCalender = ($container, date = new Date()) => {
  const getYear = date.getFullYear(); //2023 (오늘 년도)
  const getMonth = date.getMonth() + 1; // 12 (오늘 월)
  const getDate = date.getDate(); // 11 (오늘 일)

  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const viewMonth = monthArr[date.getMonth()]; // 11

  $container.querySelector('.month').textContent = `${viewMonth}`; // textContent와 유사한 innerText 프로퍼티가 있지만, 어떠한 이유로 textContent 쓰는것이 좋다.
  $container.querySelector('.year').textContent = `${getYear}`;

  const lastDateOfThisMonth = getLastDayOfMonth(getYear, getMonth); //이번 달 마지막 일자(12월기준, 12월 마지막은 31일)
  const lastDayOfThisMonth = getLastDayOfDay(getYear, getMonth); // 이번 달 마지막일의 요일 ( 12월31일(일요일) -> 0 )

  const lastDateOfPrevMonth = getLastDayOfMonth(getYear, getMonth - 1); // 이전 달의 마지막 일자 (12월기준, 11월은 30일이 마지막)
  const lastDayOfPrevMonth = getLastDayOfDay(getYear, getMonth - 1); // 이전 달 마지막일의 요일 ( 12월31일(일요일) -> 0 )

  const prevDates = [];
  const thisDates = [...new Array(lastDateOfThisMonth + 1).keys()].slice(1); //이번달 1일부터 말일까지
  const nextDates = [];

  if (lastDayOfPrevMonth !== 6) {
    //이전 달의 마지막 요일이 토요일이 아니면
    for (let i = 0; i < lastDayOfPrevMonth + 1; i++) {
      prevDates.unshift(lastDateOfPrevMonth - i); // [26,27,28,29,30]
    }
  }

  for (let i = 1; i < 7 - lastDayOfThisMonth; i++) {
    nextDates.push(i); // [1,2,3,4,5,6]
  }

  /*   //달력 6줄로 고정하기
  console.log(nextDates);
  const checkEveryDates = [...prevDates, ...thisDates, ...nextDates];
  console.log(checkEveryDates);

  while (checkEveryDates.length !== 42) {
    nextDates.push(nextDates[nextDates.length - 1]);
  }

  console.log(nextDates); */

  prevDates.forEach((date, i) => {
    prevDates[i] = `<div class='previous-day other'>${date}</div>`;
  });

  thisDates.forEach((date, i) => {
    thisDates[i] = `<div class='all-day this'>${date}</div>`;
  });

  nextDates.forEach((date, i) => {
    nextDates[i] = `<div class='next-day other'>${date}</div>`;
  });

  const everyDates = [...prevDates, ...thisDates, ...nextDates]; // 달력에 표시될 모든 날짜 (이전,다음달 포함)

  const $containerAllDay = $container.querySelector('.all-days');
  $containerAllDay.innerHTML = everyDates.join(' ');

  const calendarGrid = $container.querySelector('.calendar-grid');
  calendarGrid.appendChild($containerAllDay);
  /* 여기까지가 기본 달력 만들기 끝 */

  /* 오늘 날짜 표시하기 */
  const today = new Date();
  if (today.getMonth() + 1 === getMonth && today.getFullYear() === getYear) {
    const Today = [...$container.querySelectorAll('.this')].find(
      (_, i) => Number(i + 1) === getDate,
    );
    Today.classList.add('today');
  }

  return calendarGrid;
};

export default renderCalender;
