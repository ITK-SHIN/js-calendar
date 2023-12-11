import DatePicker from './components/datePicker.js';
import renderCalender from './components/calendar_ver2.js';

const $containers = [...document.querySelectorAll('.date')];

$containers.forEach(($container) => {
  let datePicker = DatePicker();
  $container.appendChild(datePicker); /* 달력 윗부분까지 만들기 */

  renderCalender($container); /* 달력 변경되는 부분 만들기 */

  /*============= 버튼 클릭시 전달, 다음달로 이동 ===============*/
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

  const inputElement = $container.querySelector('.date-picker-input');
  const calendar = $container.querySelector('.calendar');
  //calendar.classList.add('hidden');
  /* <input class='date-picker-input'>클릭시 calendar에 hidden클래스 제거/생성 */
  inputElement.addEventListener('click', () => {
    const calendar = $container.querySelector('.calendar');
    if (calendar.classList.contains('hidden')) {
      calendar.classList.remove('hidden');
    } else {
      calendar.classList.add('hidden');
    }
  });

  const otherDays = $container.querySelectorAll('.other');
  const thisDays = $container.querySelectorAll('.this');

  otherDays.forEach((otherDay) =>
    otherDay.addEventListener('click', (e) => {
      inputElement.value = e.target.value;
    }),
  );
});
