import React from 'react';
import {getNotiIcon} from '@/utils';

const NotiIcon = ({notiNumber, size}: {notiNumber: number; size: number}) => {
  const IconComponent = getNotiIcon(notiNumber);

  if (!IconComponent) {
    return null; // 해당 아이콘이 없으면 렌더링하지 않음
  }

  return <IconComponent width={size} height={size} />;
};
export default NotiIcon;
