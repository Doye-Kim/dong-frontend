import {ResponseGameState, getProgressGame} from '@/api/game';
import {colors} from '@/constants';
import {category} from '@/utils/categories';
import getGameImage from '@/utils/getGameImage';
import {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const GameDetailScreen = ({route, navigation}) => {
  const [gameData, setGameData] = useState<ResponseGameState>();
  const participantId = route?.params?.participantId;
  const getDetail = async () => {
    try {
      const data = await getProgressGame({participantId});
      console.log(data);
      setGameData(data);
    } catch (err) {
      console.log(err.reponse.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        {category[data?.category.categoryId]} 내기
      </Text>
      <Text style={styles.periodText}>
        {gameData.startDate} ~ {gameData.endDate}
      </Text>
      <Image
        source={getGameImage(gameData?.category.categoryId)}
        style={{width: 100, height: 100, margin: 20}}
      />
      <Text style={styles.prizeMoneyText}>
        상금:{' '}
        {(gameData.fee * gameData.afterParticipant.length).toLocaleString()}원
      </Text>
      <View style={styles.userListContainer}>
        {gameData.afterParticipant
          .sort((a, b) => a.gameCount - b.gameCount)
          .map(item => (
            <View
              style={[
                styles.userInfoContainer,
                item.userName === myInfo.name && styles.highlightContainer,
              ]}>
              <Text
                style={[
                  styles.userInfoText,
                  item.userName === myInfo.name && styles.highlightText,
                ]}>
                {item.userName}
              </Text>
              <Text
                style={[
                  styles.userInfoText,
                  item.userName === myInfo.name && styles.highlightText,
                ]}>
                {item.gameCount}회
              </Text>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 70,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
    margin: 5,
  },
  periodText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_500,
    margin: 5,
  },
  prizeMoneyText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
  userListContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.ORANGE_200,
    borderRadius: 30,
    marginTop: 30,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
  },
  highlightContainer: {
    backgroundColor: colors.PRIMARY,
  },
  highlightText: {
    color: colors.WHITE,
  },
  userInfoText: {
    fontFamily: 'Pretemdard-Bold',
    fontSize: 18,
    color: colors.BLACK,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default GameDetailScreen;
