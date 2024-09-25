function isBlank(value: string) {
  return value.trim() === '';
}

type UserInfomation = {
  name: string;
  phone: string;
  phoneAuthPassword: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    name: '',
    phone: '',
    phoneAuthPassword: '',
  };

  if (!/^[가-힣]+$/.test(values.name)) {
    errors.name = '이름은 띄어쓰기 없이 한글로 입력해 주세요.';
  }
  if (!/^010\d{7,8}$/.test(values.phone)) {
    errors.phone = '전화번호 형식이 올바르지 않아요.';
  }
  if (!/^\d{6}$/.test(values.phoneAuthPassword)) {
    errors.phoneAuthPassword = '인증번호 형식이 올바르지 않아요.';
  }

  return errors;
}

function validateJoin(values: UserInfomation) {
  return validateUser(values);
}

function validatePin(pin: string, pinConfirm: string) {
  const errors = {
    pin: '',
  };

  if (pin !== pinConfirm) {
    errors.pin = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}
export {validateJoin, validatePin};
