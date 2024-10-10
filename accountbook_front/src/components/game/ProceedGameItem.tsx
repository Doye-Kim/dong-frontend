import {ResponseGame} from '@/api/game';
import {colors, gameNavigations} from '@/constants';
import {GameStackParamList} from '@/navigations/stack/GameStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {category} from '@/utils/categories';
import getGameImage from '@/utils/getGameImage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GameItem = ({item}: {item: ResponseGame}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<GameStackParamList>>();
  const handleOnPress = () => {
    navigation.navigate(gameNavigations.DETAIL, {
      participantId: item.participantId,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Image
        source={getGameImage(item.gameCategory.imageNumber)}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text style={styles.titleText}>
        {category[item.gameCategory.imageNumber]}
      </Text>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>현재까지 총 {item.gameCount}회</Text>
      </View>
    </TouchableOpacity>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      width: 240,
      height: 280,
      backgroundColor: colors[theme].GRAY_200,
      borderRadius: 30,
      margin: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      color: colors[theme].BLACK,
      marginBottom: 15,
    },
    countContainer: {
      backgroundColor: colors[theme].ORANGE_200,
      padding: 15,
      borderRadius: 30,
    },
    countText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 18,
      color: colors[theme].PRIMARY,
    },
  });
export default GameItem;
