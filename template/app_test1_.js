import makeDatePicker from './components/datePicker.js';
import renderCalender from './components/calendar_ver2.js';

const $containers = [...document.querySelectorAll('.date')];

$containers.forEach(($container) => {
  makeDatePicker($container); /* 오늘 일자 기준으로 초기 달력  만들기 */

  /*================== 달력 숨기기 기능 ==============================*/
  const $datePicker = document.querySelector('.date-picker');
  const $datePickerInput = $container.querySelector('.date-picker-input');
  const $calendar = $container.querySelector('.calendar');

  //$calendar.classList.add('hidden');
  /*
  closest() 메서드는 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지, 
  자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회합니다.
  */
  // 캘린더 외부 클릭시 달력 제거하기

  const disappearCalendar = (e) => {
    if (!e.target.closest('.calendar') && e.target !== $datePickerInput) {
      $calendar.classList.add('hidden');
      return;
    }
  };

  const clickCalendarDate = (e) => {
    // 달력의 일들을 누를 경우만 실행
    if (e.target.matches('.calendar > div > .all-days > div')) {
      $calendar.classList.add('hidden');
      e.target.classList.add('selected');
      /*    console.log(e.target);
      console.log(123); */
    }

    if (e.target === $datePickerInput) {
      if ($datePickerInput.value !== '') {
        renderCalender($container, undefined, $datePickerInput.value);
        $calendar.classList.toggle('hidden');
      } else {
        $calendar.classList.toggle('hidden');
      }
    }
  };

  window.addEventListener('click', disappearCalendar);
  $datePicker.addEventListener('click', clickCalendarDate);
});
