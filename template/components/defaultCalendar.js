const rendarDefaultCalendar = () => {
  const element = document.createElement('div');
  element.className = 'date-picker';

  element.insertAdjacentHTML(
    'beforeend',
    `<h1 class="date-picker-title">Date Picker</h1>`,
  );

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.className = 'date-picker-input';
  inputElement.placeholder = 'Select date';
  inputElement.readOnly = true;

  element.appendChild(inputElement);

  const rendarDefaultCalendar = document.createElement('div');
  rendarDefaultCalendar.className = 'calendar';

  rendarDefaultCalendar.insertAdjacentHTML(
    'beforeend',
    ` <div class="calendar-nav">
      <button class="calendar-nav-btn go-prev">
       <i class="fa-solid fa-caret-left"></i>
        </button>
        <div class="calendar-nav-month-year">
                <div class="month">June</div>
                <div class="year">2023</div>
        </div>
        <button class="calendar-nav-btn go-next">
                <i class="fa-solid fa-caret-right"></i>
        </button>
</div>

<div class="calendar-grid">
        <div class="days">
                <div class="day-of-the-week">SUN</div>
                <div class="day-of-the-week">MON</div>
                <div class="day-of-the-week">TUE</div>
                <div class="day-of-the-week">WED</div>
                <div class="day-of-the-week">THU</div>
                <div class="day-of-the-week">FRI</div>
                <div class="day-of-the-week">SAT</div>
        </div>
        <div class="all-days"></div>
      </div>
</div>`,
  );

  element.appendChild(rendarDefaultCalendar);

  return element;
};

export default rendarDefaultCalendar;
