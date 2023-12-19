import { getLastDayOfMonth, getLastDayOfDay } from './utils/getDate.mjs';

const renderCalender = ($container, date = new Date(), reDate) => {
  console.log(
    'rendering Calender rendering Calender rendering Calenderrendering Calenderrendering Calender',
  );
  let getYear;
  let getMonth;
  let getDate;
  let newDate = date;

  if (reDate) {
    console.log('input값 있을때');
    newDate = new Date(reDate);
    console.log(`date : ${reDate}`);
    console.log(`newDate : ${newDate}`);
    getYear = newDate.getFullYear(); //2023 (오늘 년도)
    getMonth = newDate.getMonth() + 1; // 12 (오늘 월)
    getDate = newDate.getDate(); // 11 (오늘 일)
  } else {
    console.log(`input값 빈 문자열일 떄`);
    getYear = date.getFullYear(); //2023 (오늘 년도)
    getMonth = date.getMonth() + 1; // 12 (오늘 월)
    getDate = date.getDate(); // 11 (오늘 일)
  }

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

  console.log(`getMonth: ${getMonth}`);
  const viewMonth = monthArr[getMonth - 1] ?? monthArr[date.getMonth()]; // null 병합 연산자로 변수 기본값 설정
  console.log(`viewMonth : ${viewMonth}`);
  $container.querySelector('.month').textContent = `${viewMonth}`; // textContent와 유사한 innerText 프로퍼티가 있지만, 어떠한 이유로 textContent 쓰는것이 좋다.
  $container.querySelector('.year').textContent = `${getYear}`;

  const lastDateOfThisMonth = getLastDayOfMonth(getYear, getMonth); //이번 달 마지막 일(12월기준, 12월 마지막은 31일)
  const lastDayOfThisMonth = getLastDayOfDay(getYear, getMonth); // 이번 달 마지막일의 요일 ( 12월31일(일요일) -> 0 )
  const lastDateOfPrevMonth = getLastDayOfMonth(getYear, getMonth - 1); // 이전 달의 마지막 일 (12월기준, 11월은 30일이 마지막)
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

  prevDates.forEach((date, i) => {
    prevDates[i] = `<div class='previous-day otherMonth'>${date}</div>`;
  });

  thisDates.forEach((date, i) => {
    thisDates[i] = `<div class='all-day thisMonth'>${date}</div>`;
  });

  nextDates.forEach((date, i) => {
    nextDates[i] = `<div class='next-day otherMonth'>${date}</div>`;
  });

  const everyDates = [...prevDates, ...thisDates, ...nextDates]; // 달력에 표시될 모든 날짜 (이전,다음달 포함)

  const $containerAllDay = $container.querySelector('.all-days');
  $containerAllDay.innerHTML = everyDates.join(' ');

  const calendarGrid = $container.querySelector('.calendar-grid');
  calendarGrid.appendChild($containerAllDay);
  /* 여기까지가 기본 달력 만들기 끝 */

  /* 오늘 날짜 표시하기 */
  const today = new Date();
  //console.log(today);
  if (today.getMonth() + 1 === getMonth && today.getFullYear() === getYear) {
    const Today = [...$container.querySelectorAll('.thisMonth')].find(
      (_, i) => Number(i + 1) === today.getDate(),
    );
    Today.classList.add('today');
  }

  /* 달력 클릭시 해당 날짜를 input요소에 표시하기 */
  const $calendarGrid = $container.querySelector('.calendar-grid');
  const $inputElement = $container.querySelector('.date-picker-input');

  // input.value 의 기본값은 빈 문자열
  //1. e.target이 thisMonth 또는 previous-day, next-day 일 경우,
  //calendar에서 현재 달력의 년, 월, 일을 뽑아내서 input.value에 할당한다.
  const getDatePickerValue = (e) => {
    if (!e.target.matches('.calendar > .calendar-grid > .all-days > div'))
      return;

    //getMonth 데이터 가공하기
    const manufactureMonth = getMonth > 9 ? getMonth : '0' + getMonth; // Month가 9보다 작은경우, 0을 붙여준다.
    const manufactureDate =
      e.target.innerText > 9 ? e.target.innerText : '0' + e.target.innerText; // date가 9보다 작은 경우, 0을 붙여준다.

    /* 이번달 일 눌렀을 경우 */
    if (
      e.target.matches('.calendar > .calendar-grid > .all-days > .thisMonth')
    ) {
      $inputElement.value = `${getYear}-${manufactureMonth}-${manufactureDate}`;
    }

    /* 다음달 일 눌렀을 경우 */
    if (
      e.target.matches('.calendar > .calendar-grid > .all-days > .next-day') &&
      getMonth === 12
    ) {
      $inputElement.value = `${getYear + 1}-${
        manufactureMonth + 1 > 12
          ? '0' + ((manufactureMonth + 1) % 12)
          : manufactureMonth + 1
      }-${manufactureDate}`;
    } else if (
      e.target.matches('.calendar > .calendar-grid > .all-days > .next-day')
    ) {
      $inputElement.value = `${getYear}-${
        Number(manufactureMonth) + 1 <= 9
          ? '0' + (Number(manufactureMonth) + 1)
          : Number(manufactureMonth) + 1
      }-${manufactureDate}`;
    }

    /* 이전달 일 눌렀을 경우 */
    if (
      e.target.matches(
        '.calendar > .calendar-grid > .all-days > .previous-day',
      ) &&
      getMonth === 1
    ) {
      $inputElement.value = `${getYear - 1}-12-${manufactureDate}`;
    } else if (
      e.target.matches(
        '.calendar > .calendar-grid > .all-days >  .previous-day',
      )
    ) {
      $inputElement.value = `${getYear}-${
        Number(manufactureMonth) - 1 <= 9
          ? '0' + (Number(manufactureMonth) - 1)
          : Number(manufactureMonth) - 1
      }-${manufactureDate}`;
    }
  };

  $calendarGrid.addEventListener('click', getDatePickerValue);

  /* inutElement.value에 있는 날에 selected 클래스 주기 */

  /*============= 버튼 클릭시 전달, 다음달로 이동 기능 ===============*/
  const $prevBtn = $container.querySelector('.go-prev');
  const $nextBtn = $container.querySelector('.go-next');
  const setDate = new Date(`${getYear}-${getMonth}-${getDate}`);

  const prevMonth = () => {
    setDate.setMonth(getMonth - 2);
    renderCalender($container, setDate);
    $prevBtn.removeEventListener('click', prevMonth);
    $nextBtn.removeEventListener('click', nextMonth);
  };

  const nextMonth = () => {
    //1. 현재 달력의 월을 가져 온다.
    //2. 가져온 월에서 +1을해서 setMonth를 호출한다
    //3. renderCalender로 리 랜더링한다.
    setDate.setMonth(getMonth); // 다음 달로 지정하고, renderCalender 호출
    renderCalender($container, setDate);
    //console.log('nextMonthClick');
    $prevBtn.removeEventListener('click', prevMonth);
    $nextBtn.removeEventListener('click', nextMonth);
  };

  $prevBtn.addEventListener('click', prevMonth);
  $nextBtn.addEventListener('click', nextMonth);
  /* ================================================== */

  return $calendarGrid;
};

export default renderCalender;
