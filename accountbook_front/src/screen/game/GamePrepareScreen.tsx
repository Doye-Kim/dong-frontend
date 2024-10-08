import {
  Category,
  ResponseGameState,
  cancelGame,
  getCategory,
  getPrepareGame,
  leaveGame,
  startGame,
} from '@/api/game';
import CustomButton from '@/components/common/CustomButton';
import UserIcon from '@/components/game/UserIcon';
import {colors, gameNavigations} from '@/constants';
import {category} from '@/utils/categories';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import getGameImage from '@/utils/getGameImage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const GamePrepareScreen = ({route, navigation}) => {
  const [gameData, setGameData] = useState<ResponseGameState>();
  const [userData, setUserData] = useState();
  const [categoryData, setCategoryData] = useState<Category[]>();
  const participantId = route?.params?.participantId;

  const getCategoryData = async () => {
    console.log('getCategoryData');
    try {
      const data = await getCategory(participantId);
      setCategoryData(data);
      console.log('category', data);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: '카테고리를 불러오는 데 문제가 생겼어요',
      });
    }
  };
  const getData = async () => {
    console.log('대기 중인 내기 getdata');
    setUserData(await getEncryptStorage('user'));

    try {
      const data = await getPrepareGame(participantId);
      console.log('Data ', data);
      setGameData(data);
    } catch (err) {
      console.log('errerrr', err);
      console.log(err.reponse.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategoryData();
    }, []),
  );
  useEffect(() => {
    getData();
  }, []);

  const handlePressStart = async () => {
    try {
      const data = await startGame({participantId});
      console.log(data);
      Toast.show({
        type: 'success',
        text1: '내기가 시작되었습니다.',
      });
      navigation.navigate(gameNavigations.MAIN);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message
          ? err.response.data.message
          : '내기를 시작하는 데 문제가 생겼어요',
      });
    }
  };
  const leave = async () => {
    try {
      const data = await leaveGame({participantId});
      console.log(data);
      Toast.show({
        type: 'info',
        text1: '내기에서 나왔습니다.',
      });
      navigation.navigate(gameNavigations.MAIN);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message
          ? err.response.data.message
          : '내기에서 나오는 데 문제가 생겼어요',
      });
    }
  };
  const handlePressLeave = () => {
    Alert.alert('Warning!', '정말 나가시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => {
          leave();
        },
      },
    ]);
  };

  const handlePressCategory = () => {
    navigation.navigate(gameNavigations.CATEGORY, {
      category: categoryData,
      participantId: participantId,
    });
  };

  const onDelete = async () => {
    try {
      const data = await cancelGame({participantId});
      console.log(data);
      Toast.show({
        type: 'success',
        text1: '삭제 성공했어요',
      });
      navigation.navigate(gameNavigations.MAIN);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: '삭제하는 과정에서 문제가 생겼어요',
      });
    }
  };
  const handlePressCancel = () => {
    Alert.alert(
      'Warning!',
      '내기 취소 시 모든 내기 관련 정보가 삭제됩니다. 정말 취소하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            onDelete();
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {gameData && (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              source={getGameImage(gameData?.category.imageNumber)}
              style={{width: 50, height: 50, marginRight: 10}}
            />
            <Text style={styles.titleText}>
              {category[gameData?.category.imageNumber]} 내기
            </Text>
          </View>
          <View style={{margin: 10}}>
            <Text style={styles.infoTitletext}>인원</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}>
              {gameData?.afterParticipant &&
                gameData?.afterParticipant.map((item, index) => (
                  <View key={item.userName + index} style={styles.user}>
                    <UserIcon name={item.userName} disabled={false} />
                  </View>
                ))}
              {gameData?.beforeParticipant &&
                gameData?.beforeParticipant
                  .sort((a, b) => {
                    const statusOrder = {
                      OWNER: 0,
                      JOINER: 0,
                      DECLINER: 1,
                      WAITING: 1,
                    };
                    return statusOrder[a.status] - statusOrder[b.status];
                  })
                  .map(item => {
                    const disabled =
                      item.status !== 'OWNER' && item.status !== 'JOINER';
                    return (
                      <View key={item.participantId} style={styles.user}>
                        <UserIcon name={item.userName} disabled={disabled} />
                      </View>
                    );
                  })}
            </ScrollView>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitletext}>기간</Text>
            <Text style={styles.infoTitletext}>
              {gameData.startDate} ~ {gameData.endDate}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitletext}>참가비</Text>
            <Text style={styles.infoTitletext}>
              {gameData.fee.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitletext}>카테고리</Text>
            <TouchableOpacity
              onPress={handlePressCategory}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {categoryData &&
                categoryData.map(item => (
                  <Text key={item.categoryId} style={styles.categoryText}>
                    {item.name}
                  </Text>
                ))}
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>
            *내기 시작 전까지는 카테고리를 수정할 수 있습니다.
          </Text>
          <View style={styles.buttonContainer}>
            {userData && JSON.parse(userData).name === gameData.ownerName ? (
              <>
                <CustomButton text="시작" onPress={handlePressStart} />
                <TouchableOpacity onPress={handlePressCancel}>
                  <Text style={styles.cancelText}>취소하기</Text>
                </TouchableOpacity>
              </>
            ) : (
              <CustomButton text="나가기" onPress={handlePressLeave} />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  infoTitletext: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: colors.BLACK,
  },
  user: {
    margin: 10,
  },
  infoText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    marginLeft: 10,
    color: colors.PRIMARY,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    marginTop: 10,
    color: colors.GRAY_600,
    textDecorationLine: 'underline',
  },
  categoryText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#402c1b',
    borderRadius: 10,
    backgroundColor: '#F9E4BC',
    marginLeft: 5,
  },
});
export default GamePrepareScreen;
