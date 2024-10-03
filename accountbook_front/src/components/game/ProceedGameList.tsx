import {ResponseGame} from '@/api/game';
import GameItem from './ProceedGameItem';
import {ScrollView} from 'react-native-gesture-handler';

const GameList = ({data}: {data: ResponseGame[]}) => {
  return (
    <ScrollView
      nestedScrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}>
      {data && data.map(item => <GameItem key={item.gameId} item={item} />)}
    </ScrollView>
  );
};

export default GameList;
