import {ResponseGameState, getPrepareGame, declineGame} from '@/api/game';
import {BackArrow} from '@/assets/icons';
import UserIcon from '@/components/game/UserIcon';
import {colors, gameNavigations} from '@/constants';
import useGameCreateStore from '@/store/useGameCreateStore';
import {category} from '@/utils/categories';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import getGameImage from '@/utils/getGameImage';
import {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const GameRequestScreen = ({route, navigation}) => {
  const [gameData, setGameData] = useState<ResponseGameState>();
  const [userData, setUserData] = useState();
  const {setParticipantId} = useGameCreateStore();
  const participantId = route?.params.participantId;
  console.log('p!', participantId);

  const handlePressDecline = async () => {
    console.log('partt', participantId);
    try {
      const data = await declineGame({participantId});
      console.log(data);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  };
  const handlePressAccept = async () => {
    console.log('accept');
    setParticipantId(participantId);
    navigation.navigate(gameNavigations.CATEGORY);
  };
  const getData = async () => {
    console.log('getdata');
    setUserData(await getEncryptStorage('user'));

    try {
      const data = await getPrepareGame(participantId);
      console.log('Data ', data);
      setGameData(data);
    } catch (err) {
      console.log('errerrr', err);
      console.log('dat', err.reponse.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{margin: 10}}
          onPress={() => navigation.goBack()}>
          <BackArrow width={30} height={30} />
        </TouchableOpacity>
        {gameData && (
          <Text style={styles.headerText}>
            {gameData.ownerName}님이 신청한 내기
          </Text>
        )}
      </View>
      <View style={styles.container}>
        {gameData && (
          <>
            <Text style={styles.titleText}>
              {category[gameData?.category.imageNumber]} 내기
            </Text>
            <Text style={styles.dateText}>
              {gameData.startDate} ~ {gameData.endDate}
            </Text>
            <View style={{height: 100, width: 300}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 10}}>
                {gameData?.beforeParticipant
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
                      <View key={item.participantId} style={{margin: 10}}>
                        <UserIcon name={item.userName} disabled={disabled} />
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            <Image
              source={getGameImage(gameData?.category.imageNumber)}
              style={{width: 150, height: 150}}
            />
            <Text style={styles.feeText}>
              참가비: {gameData.fee.toLocaleString()}원
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={handlePressDecline}
                style={[
                  styles.buttonContainer,
                  {borderColor: colors.PRIMARY, borderWidth: 2},
                ]}>
                <Text style={[styles.buttonText, {color: colors.PRIMARY}]}>
                  거절
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressAccept}
                style={[
                  styles.buttonContainer,
                  {backgroundColor: colors.PRIMARY},
                ]}>
                <Text style={[styles.buttonText, {color: colors.WHITE}]}>
                  수락
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
    marginBottom: 5,
  },
  dateText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_500,
  },
  peopleText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 10,
  },
  feeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.BLACK,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 60,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
});
export default GameRequestScreen;
