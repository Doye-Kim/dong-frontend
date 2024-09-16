const hexToRgba = (hex: string, opacity: number = 1): string => {
  // HEX 코드가 '#'로 시작하지 않으면 추가
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  // HEX 코드의 길이에 따라 RGB 값을 계산
  let r: number, g: number, b: number;
  if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    throw new Error('Invalid HEX color format');
  }

  // RGBA 문자열 반환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default hexToRgba;
