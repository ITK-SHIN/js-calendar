import makeDatePicker from './components/datePicker.js';
import renderCalender from './components/calendar_ver2.js';

const $containers = [...document.querySelectorAll('.date')];

$containers.forEach(($container) => {
  /* 오늘 일자 기준으로 초기 달력  만들기 */
  const getCalendarDates = makeDatePicker($container);
  const $datePicker = $container.querySelector('.date-picker');
  const $datePickerInput = $container.querySelector('.date-picker-input');
  const $calendar = $container.querySelector('.calendar');

  /*================== 달력 숨기기 기능 ==============================*/
  $calendar.classList.add('hidden');

  const disappearCalendar = (e) => {
    if (!e.target.closest('.calendar') && e.target !== $datePickerInput) {
      $calendar.classList.add('hidden');
      return;
    }
  };

  let nextYear = getCalendarDates.getYear;
  let nextMon = getCalendarDates.getMonth;
  let nextDate = getCalendarDates.getDate > 27 ? 1 : getCalendarDates.getDate;

  const clickCalendarDate = (e) => {
    // e.stopPropagation();
    if (e.target.matches('.calendar > div > .all-days > div')) {
      $calendar.classList.add('hidden');
      e.target.classList.add('selected');
    }

    if (e.target === $datePickerInput) {
      if (
        $datePickerInput.value !== '' &&
        $datePickerInput.classList.contains('hidden')
      ) {
        const getReCalendarDates = renderCalender(
          $container,
          $datePickerInput.value,
        );
        nextYear = getReCalendarDates.getYear;
        nextMon = getReCalendarDates.getMonth;
        nextDate = getReCalendarDates.getDate;
        console.log(
          `inputClick -> nextYear : ${nextYear} nextMon : ${nextMon} nextDate : ${nextDate}`,
        );
        $calendar.classList.toggle('hidden');
      } else {
        $calendar.classList.toggle('hidden');
      }
    }
  };

  /*============= 버튼 클릭시 전달, 다음달로 이동 기능 ===============*/
  const $prevBtn = $container.querySelector('.go-prev');
  const $nextBtn = $container.querySelector('.go-next');

  const prevMonth = () => {
    const setDate = new Date(`${nextYear}-${nextMon}-${nextDate}`);
    console.log('prev');
    setDate.setMonth(nextMon - 2);
    const getReCalendarDates = renderCalender($container, setDate);
    nextYear = getReCalendarDates.getYear;
    nextMon = getReCalendarDates.getMonth;
    nextDate = getReCalendarDates.getDate;
    console.log(
      `prevClick -> nextYear : ${nextYear} nextMon : ${nextMon} nextDate : ${nextDate}`,
    );
  };

  const nextMonth = () => {
    const setDate = new Date(`${nextYear}-${nextMon}-${nextDate}`);
    console.log('next');
    setDate.setMonth(nextMon); // 다음 달로 지정하고, renderCalender 호출
    const getReCalendarDates = renderCalender($container, setDate);
    nextYear = getReCalendarDates.getYear;
    nextMon = getReCalendarDates.getMonth;
    nextDate = getReCalendarDates.getDate;
    console.log(
      `nextClick -> nextYear : ${nextYear} nextMon : ${nextMon} nextDate : ${nextDate}`,
    );
  };

  $prevBtn.addEventListener('click', prevMonth);
  $nextBtn.addEventListener('click', nextMonth);

  /* ================================================== */

  $datePicker.addEventListener('click', clickCalendarDate);
  window.addEventListener('click', disappearCalendar);
});
