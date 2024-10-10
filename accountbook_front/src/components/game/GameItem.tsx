import {ResponseGame} from '@/api/game';
import {colors, gameNavigations} from '@/constants';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CategoryIcon from '../common/CategoryIcon';
import {GameStackParamList} from '@/navigations/stack/GameStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useThemeStore from '@/store/useThemeStore';

const GameItem = ({item}: {item: ResponseGame}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<StackNavigationProp<GameStackParamList>>();
  const handleOnPress = () => {
    console.log('press');
    console.log(gameNavigations.PREPARE);
    if (item.gameStatus === 'BEFORE_START')
      navigation.navigate(gameNavigations.PREPARE, {
        participantId: item.participantId,
      });
    else if (item.gameStatus === 'END')
      navigation.navigate(gameNavigations.RESULT, {
        participantId: item.participantId,
      });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <CategoryIcon
        categoryNumber={Number(item.gameCategory.imageNumber)}
        size={40}
      />
      <Text style={styles.titleText}>
        {item.ownerName} 외 {item.participantCount - 1}명
      </Text>
    </TouchableOpacity>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors[theme].GRAY_200,
      borderRadius: 20,
      marginVertical: 10,
      padding: 10,
      alignItems: 'center',
    },
    titleText: {
      marginLeft: 10,
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
      color: colors[theme].BLACK,
    },
  });
export default GameItem;
