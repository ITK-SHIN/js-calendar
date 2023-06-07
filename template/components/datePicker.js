import renderCalender from './calendar.js';
import rendarDefaultCalendar from './defaultCalendar.js';

const DatePicker = ($container) => {
  let rendarDefaultCalendarElement = rendarDefaultCalendar($container);

  /*   const calendarElement = renderCalender(new Date());
  rendarDefaultCalendarElement.appendChild(calendarElement);

  inputElement.addEventListener('click', () => {
    const calendarElement = element.querySelector('.calendar');

    if (calendarElement.classList.contains('hidden')) {
      calendarElement.classList.remove('hidden');
    } else {
      calendarElement.classList.add('hidden');
    }
  }); */

  return rendarDefaultCalendarElement;
};

export default DatePicker;
