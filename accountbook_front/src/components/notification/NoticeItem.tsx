import {postGameInvalid} from '@/api/game';
import {ResponseAlarm, patchAlarm} from '@/api/noti';
import NotiIcon from '@/components/common/NotiIcon';
import {
  accountBookNavigations,
  assetNavigations,
  colors,
  gameNavigations,
  mainNavigations,
  seedNavigations,
} from '@/constants';
import {convertDateToString} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const notiTypeStatus = {
  GAME_REQUEST: '내기 요청',
  GAME_RESULT: '내기 결과',
  SETTLEMENT_REQUEST: '정산 요청',
  FIXED_EXPENSES: '고정 지출',
  SEED_SEND: '종잣돈 송금',
  SEED_FINISH: '종잣돈 종료',
};

const notiNumber = {
  SETTLEMENT_REQUEST: 0,
  GAME_REQUEST: 1,
  GAME_RESULT: 1,
  FIXED_EXPENSES: 2,
  SEED_SEND: 3,
  SEED_FINISH: 3,
};
const NotiItem = ({item}: {item: ResponseAlarm}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const contentTextStyle = {
    ...styles.contentText,
    color: item.status === 'READ' ? colors.GRAY_500 : colors.BLACK,
  };

  const checkRead = async () => {
    console.log('checkREad', item.id);
    console.log(item.id);
    try {
      const data = await patchAlarm(item.id);
      console.log('success', data);
    } catch (err) {
      console.log('err', err);
    }
  };
  const handlePress = async () => {
    if (item.status === 'NONREAD') {
      checkRead();
    }
    if (item.type === 'GAME_REQUEST') {
      try {
        const data = await postGameInvalid({participantId: item.typeId});
        console.log('게임요청 invalid', data);
        navigation.navigate(mainNavigations.GAME, {
          screen: gameNavigations.REQUEST,
          params: {participantId: item.typeId},
        });
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        Toast.show({
          type: 'error',
          text1: err.response.data
            ? err.response.data.message
            : '알 수 없는 오류가 발생했습니다.',
        });
      }
    } else if (item.type === 'GAME_RESULT') {
      navigation.navigate(mainNavigations.GAME, {
        screen: gameNavigations.RESULT,
        params: {participantId: item.typeId},
      });
    } else if (item.type === 'SEED_SEND' || item.type === 'SEED_FINISH') {
      console.log('SEED');
      navigation.navigate(mainNavigations.ASSET, {
        screen: assetNavigations.SEED, // SeedNavigator로 이동
        params: {
          screen: seedNavigations.DETAIL, // SeedNavigator 내의 SeedDetail 화면으로 이동
          params: {seedId: item.typeId}, // SeedDetail 화면에 전달할 파라미터
        },
      });
    } else if (item.type === 'SETTLEMENT_REQUEST') {
      console.log('정산요청!', item.typeId);
      navigation.navigate(mainNavigations.ACCOUNTBOOK, {
        screen: accountBookNavigations.SETTLEMENTREQUEST,
        params: {settlementId: item.typeId},
      });
    } else if (item.type === 'FIXED_EXPENSES') {
      navigation.navigate(mainNavigations.ACCOUNTBOOK, {
        screen: accountBookNavigations.TABBAR,
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        item.status === 'READ'
          ? {backgroundColor: colors.GRAY_200}
          : {backgroundColor: colors.WHITE},
      ]}>
      <View style={styles.icon}>
        <NotiIcon notiNumber={notiNumber[item.type]} size={40} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{notiTypeStatus[item.type]}</Text>
          <Text style={styles.headerText}>
            {convertDateToString(item.createdAt)}
          </Text>
        </View>
        <Text style={contentTextStyle} numberOfLines={1} ellipsizeMode="tail">
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 5,
    height: 70,
  },
  icon: {
    margin: 10,
  },
  contentContainer: {
    width: Dimensions.get('screen').width - 70,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: colors.GRAY_500,
  },
  contentText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    width: Dimensions.get('screen').width - 100,
  },
});

export default NotiItem;
