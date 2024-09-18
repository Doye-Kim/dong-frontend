import React from 'react';
import {getCategoryIcon} from '@/utils';

const CategoryIcon = ({
  categoryNumber,
  size,
}: {
  categoryNumber: number;
  size: number;
}) => {
  const IconComponent = getCategoryIcon(categoryNumber);

  if (!IconComponent) {
    return null; // 해당 아이콘이 없으면 렌더링하지 않음
  }

  return <IconComponent width={size} height={size} />;
};
export default CategoryIcon;
