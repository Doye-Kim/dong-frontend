import {FC} from 'react';
import {Noti0Icon, Noti1Icon, Noti2Icon, Noti3Icon} from './icons';
import {SvgProps} from 'react-native-svg';

export const notiIconMap: {[key: number]: FC<SvgProps>} = {
  0: Noti0Icon,
  1: Noti1Icon,
  2: Noti2Icon,
  3: Noti3Icon,
};
