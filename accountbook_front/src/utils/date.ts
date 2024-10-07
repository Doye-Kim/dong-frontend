const getDateDetails = (dateString: Date | string) => {
  /** 주어진 문자열 혹은 Date로 부터 년 월 일을 반환하는 함수 */
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.toLocaleString('ko-KR', {weekday: 'long'}); // 요일
  return {year, month, day, dayOfWeek};
}

const getDateWithSeparator = (
  dateString: Date | string,
  separator: string = '',
) => {
  /** 주어진 날짜를 separator로 분할하여 문자열로 반환 */
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function convertDateToString(dateString: string) {
  const dateTime = new Date(dateString);
  const now = new Date();

  // 한국 시간을 위한 UTC+9 보정
  const kstOffset = 9 * 60; // 9시간을 분으로 변환
  const localOffset = now.getTimezoneOffset(); // 현재 로컬 타임존 오프셋(분)

  // diff는 밀리초 차이
  const diff =
    now.getTime() + (kstOffset - localOffset) * 60 * 1000 - dateTime.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years === 0 && months === 0 && days === 0 && hours === 0) {
    return `${minutes}분 전`;
  } else if (years === 0 && months === 0 && days === 0) {
    return `${hours}시간 전`;
  } else if (years === 0 && months === 0) {
    return `${days}일 전`;
  } else {
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

function getDateLocaleFormat(dateString: Date | string) {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
}

function getDatePaymentFormat(dateString: Date | string) {
  const {day, dayOfWeek} = getDateDetails(dateString);

  return `${day}일 ${dayOfWeek}`;
}

const getYearMonthLocalFormat = (dateString: Date | string) => {
  const {year, month, day} = getDateDetails(dateString);
  return `${year}년 ${month}월`
}

const getDateTimeLocaleFormat = (dateString: Date | string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

const getDateLocaleFormatDiff = (dateString: Date | string) => {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(
    2,
    '0',
  )}`;
}

function getTimeLocalFormat(dateString: Date | string): string {
  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

const getMonthYearDetails = (initialDate: Date) => {
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

const getNewMonthYear = (prevData: MonthYear, increment: number) => {
  /** month를 이동시키기 위한 함수 */
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
}

const isSameAsCurrentDate = (year: number, month: number, date: number) => {
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
  const weekDay = date.toLocaleDateString('ko-KR', {weekday: 'long'}); // 요일을 한글로 출력

  return `${day}일 ${weekDay}`;
};

const getYearMonth = (dateString: Date | string) => {
  return getDateWithSeparator(dateString, "-").slice(0, 7);
}

export {
  convertDateToString,
  getDateWithSeparator,
  getDateLocaleFormat,
  getYearMonthLocalFormat,
  getDateTimeLocaleFormat,
  getTimeLocalFormat,
  getMonthYearDetails,
  getNewMonthYear,
  isSameAsCurrentDate,
  formatDateToDayOfWeek,
  getDateLocaleFormatDiff,
  getYearMonth,
  getDatePaymentFormat,
};
export type {MonthYear};
