import {DropdownButton, DropdownButtonWhite} from '@/assets/icons';
import {colors} from '@/constants';
import {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CategoryIcon from '@/components/common/CategoryIcon';
import UserStateItem from './UserStateItem';
import {postFinishSettlement} from '@/api/settlement';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
interface PaymentItemProps {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
}
interface PaymentUserProps {
  userId: number;
  userName: string;
  cost: number;
  transferState: string;
}

interface SettlementProps {
  settlementId: number;
  settlementState: string;
  representativeMerchandise: string;
  settlementPaymentCnt: number;
  settlementPaymentList: PaymentItemProps[];
  settlementUserCnt: number;
  settlementUserList: PaymentUserProps[];
}
const SettlementItem = ({
  data,
  isFinished,
  refresh,
}: {
  data: SettlementProps;
  isFinished: boolean;
  refresh: () => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handlePressTitle = () => {
    setIsOpenDetail(prev => !prev);
  };
  const finishSettlement = async () => {
    try {
      const res = await postFinishSettlement(data.settlementId);
      refresh();
    } catch (err) {
      console.log(err.reponse.data);
      Toast.show({
        type: 'error',
        text1: '정산을 완료하는 데에 문제가 생겼습니다.',
      });
    }
  };
  const onPressComplete = () => {
    Alert.alert('아직 대기 중인 정산이 있습니다.', '정말 완료하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          finishSettlement();
        },
      },
    ]);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handlePressTitle}
        style={[
          styles.itemTitleContainer,
          isFinished && {backgroundColor: colors[theme].GRAY_600},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={[
              styles.titleText,
              isFinished && {color: colors['light'].BLACK},
            ]}>
            {data.representativeMerchandise}
            {data.settlementPaymentCnt > 1
              ? ` 외 ${data.settlementPaymentCnt - 1}건`
              : ''}
          </Text>
          {isFinished ? <DropdownButton /> : <DropdownButtonWhite />}
        </View>
        {!isFinished && (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressComplete}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {isOpenDetail && (
        <View style={{padding: 5}}>
          <View style={styles.paymentListContainer}>
            {data.settlementPaymentList.map(item => (
              <TouchableOpacity
                style={styles.itemContainer}
                key={item.paymentId}>
                <CategoryIcon categoryNumber={item.imageNumber} size={40} />
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <View style={styles.merchantInfo}>
                      <Text style={styles.merchantName}>
                        {item.merchantName}
                      </Text>
                      <Text style={styles.details}>{item.categoryName}</Text>
                    </View>
                    <View style={styles.balanceContainer}>
                      <Text style={styles.balance}>
                        {item.balance.toLocaleString()}원
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginVertical: 10}}>
            {data.settlementUserList.map(item => (
              <UserStateItem key={item.userId} data={item} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    itemTitleContainer: {
      flexDirection: 'row',
      padding: 10,
      borderRadius: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: colors[theme].PRIMARY,
    },
    titleText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 18,
      color: colors['light'].WHITE,
      marginRight: 10,
    },
    buttonContainer: {
      backgroundColor: colors[theme].ORANGE_200,
      height: 30,
      width: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 14,
      color: colors[theme].PRIMARY,
    },
    paymentListContainer: {
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors[theme].GRAY_500,
    },
    itemContainer: {
      // paddingVertical: 12,
      // paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContent: {
      marginLeft: 16,
      flex: 1,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    merchantInfo: {
      flex: 1,
    },
    merchantName: {
      fontSize: 16,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
    },
    balanceContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    balance: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    details: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 13,
      color: colors[theme].GRAY_500,
      marginTop: 2,
    },
  });

export default SettlementItem;
