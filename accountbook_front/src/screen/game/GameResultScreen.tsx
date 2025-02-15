import {ResponseGameState, getProgressGame} from '@/api/game';
import BackHeader from '@/components/common/BackHeader';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {category} from '@/utils/categories';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const GameResultScreen = ({route, navigation}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [myInfo, setMyInfo] = useState();
  const [gameData, setGameData] = useState<ResponseGameState>();
  const participantId = route?.params?.participantId;

  const getMyInfo = async () => {
    setMyInfo(JSON.parse(await getEncryptStorage('user')));
  };

  const getData = async () => {
    try {
      const data = await getProgressGame(participantId);
      setGameData(data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response.data
          ? err.response.data.message
          : '데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.',
      });
    }
  };

  useEffect(() => {
    getMyInfo();
    getData();
  }, []);

  const sortedParticipants =
    gameData?.afterParticipant &&
    [...gameData.afterParticipant].sort((a, b) => a.gameCount - b.gameCount);

  const winnerGameCount = sortedParticipants?.[0]?.gameCount;

  const winners = sortedParticipants?.filter(
    participant => participant.gameCount === winnerGameCount,
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader navigation={navigation} />
      {gameData && myInfo && sortedParticipants && winners && (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {category[gameData.category.imageNumber]} 내기
          </Text>
          <Text style={styles.periodText}>
            {gameData.startDate} ~ {gameData.endDate}
          </Text>
          {winners.some(winner => winner.userName === myInfo.name) ? (
            <Image
              source={require('@/assets/icons/congratulation.png')}
              style={{width: 100, height: 100, margin: 20}}
            />
          ) : (
            <Image
              source={require('@/assets/icons/sad.png')}
              style={{width: 100, height: 100, margin: 20}}
            />
          )}
          <Text style={styles.prizeMoneyText}>
            우승자는 {winners.map(winner => winner.userName).join(', ')}{' '}
            님입니다!
          </Text>
          <View style={styles.userListContainer}>
            {sortedParticipants.map((item, index) => (
              <View
                key={item.userName + index}
                style={[
                  styles.userInfoContainer,
                  winners.some(winner => winner.userName === item.userName) &&
                    styles.highlightContainer,
                ]}>
                <Text
                  style={[
                    styles.userInfoText,
                    winners.some(winner => winner.userName === item.userName) &&
                      styles.highlightText,
                  ]}>
                  {item.userName}
                </Text>
                <Text
                  style={[
                    styles.userInfoText,
                    winners.some(winner => winner.userName === item.userName) &&
                      styles.highlightText,
                  ]}>
                  {item.gameCount}회
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 70,
      alignItems: 'center',
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
      margin: 5,
    },
    periodText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 16,
      color: colors[theme].GRAY_500,
      margin: 5,
    },
    prizeMoneyText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      color: colors[theme].BLACK,
    },
    userListContainer: {
      width: '100%',
      padding: 15,
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 30,
      marginTop: 30,
    },
    userInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 14,
      borderRadius: 20,
      margin: 5,
    },
    highlightContainer: {
      backgroundColor: colors[theme].PRIMARY,
    },
    highlightText: {
      color: colors['light'].WHITE,
    },
    userInfoText: {
      fontFamily: 'Pretemdard-Bold',
      fontSize: 18,
      color: colors['light'].BLACK,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });
export default GameResultScreen;
