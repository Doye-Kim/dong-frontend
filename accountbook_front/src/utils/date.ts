function getDateDetails(dateString: Date | string) {
  /** 주어진 문자열 혹은 Date로 부터 년 월 일을 반환하는 함수 */
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  /** 주어진 날짜를 separator로 분할하여 문자열로 반환 */
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getDateLocaleFormat(dateString: Date | string) {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
}

const getDateTimeLocaleFormat = (dateString: Date | string)  => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

function getDateLocaleFormatDiff(dateString: Date | string) {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}.${month}.${day}`;
}

function getMonthYearDetails(initialDate: Date) {
  /** Date를 입력받아 상세정보를 리턴하는 함수 */
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`); // 해당 월의 첫 날짜를 나타냄
  const firstDOW = startDate.getDay(); // 해당 월의 첫 날이 무슨 요일인지 나타냄
  const lastDateString = String(
    // 해당 월의 마지막 날짜를 리턴
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  );
  const lastDate = Number(lastDateString);

  return {month, year, startDate, firstDOW, lastDate};
}

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

function getNewMonthYear(prevData: MonthYear, increment: number) {
  /** month를 이동시키기 위한 함수 */
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  /** 현재 날짜와 입력받은 날짜가 같은지 여부를 검사 */
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;

  return currentDate === inputDate;
}

const formatDateToDayOfWeek = (dateString: string) => {
  /** 날짜를 ~일 ~요일로 변경하는 함수 */
  const date = new Date(dateString);
  const day = date.getDate(); // 날짜의 일 (1~31)
  const weekDay = date.toLocaleDateString('ko-KR', { weekday: 'long' }); // 요일을 한글로 출력

  return `${day}일 ${weekDay}`;
};

export {
  getDateWithSeparator,
  getDateLocaleFormat,
  getDateTimeLocaleFormat,
  getMonthYearDetails,
  getNewMonthYear,
  isSameAsCurrentDate,
  formatDateToDayOfWeek,
  getDateLocaleFormatDiff,
};
export type {MonthYear};
