import Calendar from './calendar.js';

const DatePicker = () => {
  let element = document.createElement('div');
  element.className = 'date-picker';

  element.insertAdjacentHTML(
    'beforeend',
    `<h1 class="date-picker-title">Date Picker</h1>`,
  );

  let inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = 'date-picker-input';
  inputElement.placeholder = 'select date';
  inputElement.readOnly = true;

  element.appendChild(inputElement);

  const calendarElement = Calendar(new Date());
  element.appendChild(calendarElement);

  inputElement.addEventListener('click', function () {
    const calendarElement = element.querySelector('.calendar');

    if (calendarElement.classList.contains('hidden')) {
      calendarElement.classList.remove('hidden');
    } else {
      calendarElement.classList.add('hidden');
    }
  });

  return element;
};

export default DatePicker;
