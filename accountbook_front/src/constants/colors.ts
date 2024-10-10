const common = {
  PRIMARY: '#FFA000',
  ORANGE_200: '#FFF0C8',
  ORANGE_300: '#FFDC96',
  ORANGE_400: '#FFC864',
  ORANGE_500: '#FFB432',
  ORANGE_600: '#FFA000',
  RED_300: '#ffb4b4',
  RED_400: '#DD8080',
  RED_500: '#ff5f5f',
  BLUE_400: '#9DC1E3',

  CATEGORY_0: '#FFC998', // 식비
  CATEGORY_1: '#AF8968', // 카페
  CATEGORY_2: '#9DC1E3', // 배달음식
  CATEGORY_3: '#D1A3FF', // 편의점
  CATEGORY_4: '#8687B2', // 술/유흥
  CATEGORY_5: '#FFC998', // 생활
  CATEGORY_6: '#DD8080', // 패션/미용
  CATEGORY_7: '#B4CABD', // 대중교통
  CATEGORY_8: '#FFE483', // 택시
  CATEGORY_9: '#95C8E3', // 자동차
  CATEGORY_10: '#FFD0E1', // 주거/통신
  CATEGORY_11: '#CCDD80', // 의료/건강
  CATEGORY_12: '#FFB432', // 금융
  CATEGORY_13: '#BBE1E6', // 문화/여가
  CATEGORY_14: '#D9D9D9', // 여행/숙박
  CATEGORY_15: '#AF8968', // 교육/학습
  CATEGORY_16: '#DBA4B3', // 경조/선물
  CATEGORY_17: '#C1DDE1', // 동물
  CATEGORY_18: '#FFE483', // 아기
  CATEGORY_19: '#ADB7CA', // 전자기기
  CATEGORY_20: '#D9D9D9', // 담배
  CATEGORY_21: '#FFC9C9', // 데이트
  CATEGORY_22: '#B3E39D', // 꽃
  CATEGORY_23: '#9DC1E3', // 운동
  CATEGORY_24: '#A4A4A4', // 기타
  CATEGORY_25: '#D9D9D9', // 송금
};

const colors = {
  light: {
    WHITE: '#fafafa',
    GRAY_200: '#F5F5F5',
    GRAY_300: '#EEEEEE',
    GRAY_400: '#E0E0E0',
    GRAY_500: '#BDBDBD',
    GRAY_600: '#9E9E9E',
    GRAY_700: '#757575',
    GRAY_800: '#616161',
    BLACK: '#424242',
    ...common,
  },
  dark: {
    WHITE: '#424242',
    GRAY_200: '#616161',
    GRAY_300: '#757575',
    GRAY_400: '#9E9E9E',
    GRAY_500: '#BDBDBD',
    GRAY_600: '#E0E0E0',
    GRAY_700: '#EEEEEE',
    GRAY_800: '#F5F5F5',
    BLACK: '#fafafa',
    ...common,
  },
} as const;

export {colors};
