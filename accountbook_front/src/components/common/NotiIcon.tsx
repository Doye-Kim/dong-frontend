import React from 'react';
import {getNotiIcon} from '@/utils';

const NotiIcon = ({notiNumber}: {notiNumber: number}) => {
  const IconComponent = getNotiIcon(notiNumber);

  if (!IconComponent) {
    return null; // 해당 아이콘이 없으면 렌더링하지 않음
  }

  return <IconComponent />;
};
export default NotiIcon;
