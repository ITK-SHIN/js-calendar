import DatePicker from './components/DatePicker.js';
import renderCalender from './components/calendar.js';

const $containers = [...document.querySelectorAll('.date')];

$containers.forEach(($container) => {
  let datePicker = DatePicker();
  $container.appendChild(datePicker);

  renderCalender($container);

  const inputElement = $container.querySelector('.date-picker-input');
  const calendar = $container.querySelector('.calendar');
  calendar.classList.add('hidden');
  /* <input class='date-picker-input'>클릭시 calendar에 hidden클래스 제거/생성 */
  inputElement.addEventListener('click', () => {
    const calendar = $container.querySelector('.calendar');
    if (calendar.classList.contains('hidden')) {
      calendar.classList.remove('hidden');
    } else {
      calendar.classList.add('hidden');
    }
  });

  console.log($container);

  const otherDays = $container.querySelectorAll('.other');
  const thisDays = $container.querySelectorAll('.this');

  otherDays.forEach((otherDay) =>
    otherDay.addEventListener('click', (e) => {
      console.log(e.currentTarget);
      inputElement.value = e.target.value;
    }),
  );

  thisDays.forEach((thisDay) => {
    thisDay.addEventListener('click', (e) => {
      console.log(e.currentTarget);
    });
  });
});

window.addEventListener('click', (e) => {
  console.log(e.target);
});
