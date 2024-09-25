import {categoryIconMap} from '@/assets/categoryIcons';
import {notiIconMap} from '@/assets/notiIcons';

export const getCategoryIcon = (categoryNumber: number) => {
  return categoryIconMap[categoryNumber] || null;
};

export const getNotiIcon = (notiNumber: number) => {
  return notiIconMap[notiNumber] || null;
};
