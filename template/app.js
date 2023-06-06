const date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonthNum = date.getMonth();

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

  const viewMonth = monthArr[date.getMonth()];

  document.querySelector('.month').textContent = `${viewMonth}`;
  document.querySelector('.year').textContent = `${viewYear}`;

  const prevLast = new Date(viewYear, viewMonthNum, 0); //Wed May 31 2023 00:00:00 GMT+0900 (한국 표준시) -전 달 마지막날
  const thisLast = new Date(viewYear, viewMonthNum + 1, 0); //Fri Jun 30 2023 00:00:00 GMT+0900 (한국 표준시) -이번 달 마지막날

  const PLDate = prevLast.getDate(); // 31
  const PLDay = prevLast.getDay(); //3(수요일)

  const TLDate = thisLast.getDate(); //30
  const TLDay = thisLast.getDay(); // 5(금요일)

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  prevDates.forEach((date, i) => {
    prevDates[i] = `<div class='previous-day other'>${date}</div>`;
  });

  thisDates.forEach((date, i) => {
    thisDates[i] = `<div class='all-day this'>${date}</div>`;
  });

  nextDates.forEach((date, i) => {
    nextDates[i] = `<div class='next-day other'>${date}</div>`;
  });

  const dates = prevDates.concat(thisDates, nextDates);

  document.querySelector('.all-days').innerHTML = dates.join(' ');

  const today = new Date();
  if (
    viewMonthNum === today.getMonth() &&
    viewYear === today.getUTCFullYear()
  ) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalender();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalender();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

document.querySelector('.go-prev').addEventListener('click', prevMonth);
document.querySelector('.go-next').addEventListener('click', nextMonth);
