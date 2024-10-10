import {
  ResponseRequestSettlement,
  getRequestSettlement,
} from '@/api/settlement';
import BackHeader from '@/components/common/BackHeader';
import CustomButton from '@/components/common/CustomButton';
import {accountBookNavigations, colors} from '@/constants';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import useThemeStore from '@/store/useThemeStore';
import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const SettlementRequestScreen = ({route, navigation}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const settlementId = route?.params?.settlementId;
  const {setSettlementId} = useSettlementCreateStore();
  const [settlementData, setSettlementData] =
    useState<ResponseRequestSettlement>();
  const getData = async () => {
    console.log('settlementID', settlementId);
    try {
      const data = await getRequestSettlement(settlementId);
      setSettlementData(data);
      setSettlementId(settlementId);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data
          ? err.response.data.message
          : '요청 중 오류가 발생했습니다.',
      });
      navigation.navigate(accountBookNavigations.NOTICE);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePressTransfer = () => {
    navigation.navigate(accountBookNavigations.ACCOUNT, {pageNumber: 2});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader navigation={navigation} />
      {settlementData && (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {settlementData.userName} 님의 정산 요청
          </Text>
          {settlementData.settlementPaymentList.map(item => (
            <View style={styles.infoContainer}>
              <Text style={styles.merchantNameText}>{item.merchantName}</Text>
              <Text style={styles.balanceText}>
                {item.balance.toLocaleString()}원 /{' '}
                <Text style={styles.amountText}>
                  {item.amount.toLocaleString()}원
                </Text>
              </Text>
            </View>
          ))}
          <View style={styles.costContainer}>
            <Text style={styles.costText}>
              총 {settlementData.cost.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton text="송금하기" onPress={handlePressTransfer} />
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
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: colors[theme].WHITE,
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
      marginBottom: 20,
    },
    dateText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 14,
      color: colors[theme].GRAY_600,
      marginTop: 50,
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 20,
      marginVertical: 5,
    },
    merchantNameText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
      color: colors['light'].BLACK,
    },
    balanceText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 18,
      color: colors['light'].GRAY_800,
    },
    amountText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 22,
      color: colors[theme].PRIMARY,
    },
    costContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginTop: 20,
    },
    costText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
export default SettlementRequestScreen;
