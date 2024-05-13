import renderCalender from './calendar_ver2.js';
import renderDefaultCalendar from './defaultCalendar_ver2.js';

const makeDatePicker = ($container) => {
  renderDefaultCalendar($container); // 달력 기본 틀 만들기
  const getDates = renderCalender($container); /* 달력 변경되는 부분 만들기 */

  return getDates;
};

export default makeDatePicker;
