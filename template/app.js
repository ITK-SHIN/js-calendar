import DatePicker from './components/datePicker.js';
import renderCalender from './components/calendar_ver2.js';

const $containers = [...document.querySelectorAll('.date')];

$containers.forEach(($container) => {
  let datePicker = DatePicker();
  $container.appendChild(datePicker); /* 달력 윗부분까지 만들기 */

  renderCalender($container); /* 달력 변경되는 부분 만들기 */

  /*============= 버튼 클릭시 전달, 다음달로 이동 기능 ===============*/
  const prevBtn = $container.querySelector('.go-prev');
  const nextBtn = $container.querySelector('.go-next');

  const date = new Date();
  const prevMonth = () => {
    date.setMonth(date.getMonth() - 1); // 전 달로 지정하고, renderCalender 호출
    renderCalender($container, date);
  };

  const nextMonth = () => {
    date.setMonth(date.getMonth() + 1); // 다음 달로 지정하고, renderCalender 호출
    renderCalender($container, date);
  };

  prevBtn.addEventListener('click', prevMonth);
  nextBtn.addEventListener('click', nextMonth);
  /* ================================================== */

  /*================== 달력 숨기기 기능 ==============================*/
  const $body = document.querySelector('body');
  const $datePicker = $container.querySelector('.date-picker');
  const $inputElement = $container.querySelector('.date-picker-input');
  const $calendar = $container.querySelector('.calendar');

  $calendar.classList.add('hidden');
  $body.addEventListener('click', (e) => {
    if (e.target === $inputElement) $calendar.classList.toggle('hidden');
    // 달력이 이미 숨겨져 있지 않고, 클릭된 요소가 달력이나 입력 필드가 아니며, 클릭된 요소가 달력 내부에 있지 않을 때
    if (
      !$calendar.classList.contains('hidden') &&
      e.target !== $inputElement &&
      !$calendar.contains(e.target)
    ) {
      $calendar.classList.add('hidden'); // 달력을 숨김
    }
  });

  /* 달력 클릭시 해당 날짜를 input요소에 표시하기 */
  const allDays = $container.querySelector('.all-days');
  console.log(allDays);

  const getDatePickerValue = function () {
    //console.log(123);
  };

  allDays.addEventListener('click', getDatePickerValue);
});
