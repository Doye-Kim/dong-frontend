import ProceedGameList from '@/components/game/ProceedGameList';
import GameList from '@/components/game/GameList';
import {colors, gameNavigations} from '@/constants';
import {useCallback, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NotificationHeader from '@/components/common/NotificationHeader';
import {AddSquareSettlement} from '@/assets/icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GameStackParamList} from '@/navigations/stack/GameStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {ResponseGame, getGames} from '@/api/game';
import Toast from 'react-native-toast-message';

const GameMainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<GameStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const [onGoingGame, setOnGoingGame] = useState<ResponseGame[]>();
  const [prepareGame, setPrepareGame] = useState<ResponseGame[]>();
  const [finishGame, setFinishGame] = useState<ResponseGame[]>();

  const getGameData = async () => {
    try {
      const data = await getGames();
      console.log(data);
      // setGameData(data);
      setOnGoingGame(data.filter(game => game.gameStatus === 'ING'));
      setFinishGame(data.filter(game => game.gameStatus === 'END'));
      setPrepareGame(data.filter(game => game.gameStatus === 'BEFORE_START'));
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: '내기 목록을 불러오는 데 문제가 생겼어요',
      });
    }
  };
  useFocusEffect(
    useCallback(() => {
      getGameData();
    }, []),
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handlePressAdd = () => {
    navigation.navigate(gameNavigations.CREATE);
  };
  return (
    <SafeAreaView style={styles.container}>
      <NotificationHeader />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.headerText}>진행 중인 내기</Text>
          <TouchableOpacity onPress={handlePressAdd}>
            <AddSquareSettlement width={40} height={40} />
          </TouchableOpacity>
        </View>
        {onGoingGame && onGoingGame.length > 0 ? (
          <ProceedGameList data={onGoingGame} />
        ) : (
          <Text style={styles.noneText}>진행 중인 내기가 없습니다.</Text>
        )}
        {prepareGame && prepareGame.length > 0 && (
          <>
            <Text style={styles.headerText}>대기 중인 내기</Text>
            <GameList data={prepareGame} />
          </>
        )}
        {finishGame && finishGame.length > 0 && (
          <>
            <Text style={styles.headerText}>완료된 내기</Text>
            <GameList data={finishGame} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
    fontSize: 18,
    paddingVertical: 10,
  },
  noneText: {
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_600,
    fontSize: 16,
    paddingVertical: 10,
  },
});
export default GameMainScreen;
