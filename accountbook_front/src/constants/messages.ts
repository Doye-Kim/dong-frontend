const errorMessages = {
  UNEXPECT_ERROR: '알 수 없는 에러가 발생했습니다.',
} as const;

const alerts = {
  CONTACT_PERMISSION: {
    TITLE: '연락처 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 연락처 권한을 허용해주세요.',
  },
  DELETE_SEED: {
    TITLE: '정말 해지하시겠습니까?',
    DESCRIPTION: '해지하시면 포인트 및 혜택을 받을 수 없습니다.',
  },
  DELETE_GAME: {
    TITLE: '정말 나가시겠습니까?',
    DESCRIPTION: '참가비는 돌려받을 수 없습니다.',
  },
  DELETE_ACCOUNT: {
    TITLE: '정말 탈퇴하시겠습니까?',
    DESCRIPTION: '회원 정보는 삭제되며, 복구할 수 없습니다.',
  },
} as const;

export {errorMessages, alerts};
