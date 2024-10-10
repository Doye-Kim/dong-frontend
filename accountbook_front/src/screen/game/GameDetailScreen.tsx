import {ResponseGameState, getProgressGame} from '@/api/game';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {category} from '@/utils/categories';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import getGameImage from '@/utils/getGameImage';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const GameDetailScreen = ({route, navigation}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [gameData, setGameData] = useState<ResponseGameState>();
  const [userData, setUserData] = useState();
  const participantId = route?.params?.participantId;
  const getDetail = async () => {
    try {
      const data = await getProgressGame(participantId);
      setGameData(data);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: err.response.data.message
          ? err.response.data.message
          : '문제가 발생했습니다.',
      });
    }
  };

  const getMyInfo = async () => {
    setUserData(JSON.parse(await getEncryptStorage('user')));
  };
  useEffect(() => {
    getDetail();
    getMyInfo();
    console.log(participantId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {gameData && (
        <>
          <Text style={styles.titleText}>
            {category[gameData?.category.imageNumber]} 내기
          </Text>
          <Text style={styles.periodText}>
            {gameData.startDate} ~ {gameData.endDate}
          </Text>
          <Image
            source={getGameImage(gameData?.category.imageNumber)}
            style={{width: 100, height: 100, margin: 20}}
          />
          <Text style={styles.prizeMoneyText}>
            상금:
            {(gameData.fee * gameData.afterParticipant.length).toLocaleString()}
            원
          </Text>
          <View style={styles.userListContainer}>
            {gameData.afterParticipant
              .sort((a, b) => a.gameCount - b.gameCount)
              .map(item => (
                <View
                  style={[
                    styles.userInfoContainer,
                    item.userName === userData.name &&
                      styles.highlightContainer,
                  ]}>
                  <Text
                    style={[
                      styles.userInfoText,
                      item.userName === userData.name && styles.highlightText,
                    ]}>
                    {item.userName}
                  </Text>
                  <Text
                    style={[
                      styles.userInfoText,
                      item.userName === userData.name && styles.highlightText,
                    ]}>
                    {item.gameCount}회
                  </Text>
                </View>
              ))}
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width - 60,
              alignItems: 'flex-end',
              marginTop: 5,
            }}>
            <Text style={styles.infoText}>어제까지 집계된 횟수예요!</Text>
          </View>
        </>
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
    infoText: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 14,
      color: colors[theme].GRAY_600,
      marginBottom: 5,
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
    },
    highlightContainer: {
      backgroundColor: colors['light'].PRIMARY,
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
export default GameDetailScreen;
