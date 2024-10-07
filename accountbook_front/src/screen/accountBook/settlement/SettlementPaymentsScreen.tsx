import PaymentList from '@/components/accountBook/settlement/PaymentList';
import CustomButton from '@/components/common/CustomButton';
import {accountBookNavigations, colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
export type ResponsePayment = {
  paymentsId: number;
  merchantName: string;
  categoryId: number;
  categoryName: string;
  balance: number;
  paymentName: string;
  memo: string;
  paymentTime: string;
  paymentState: 'INCLUDE' | 'EXCLUDE';
  paymentType: 'INCOME' | 'EXPENSE';
};
const SettlementPaymentsScreen = () => {
  const [selectedPayments, setSelectedPayments] = useState<ResponsePayment[]>(
    [],
  );
  const {setPaymentList, setSettlementPayment} = useSettlementCreateStore();
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  const handleOnPress = () => {
    if (selectedPayments.length === 0) {
      Toast.show({
        type: 'error',
        text1: '정산 내역을 선택해 주세요',
      });
    } else {
      const sortedPayments = [...selectedPayments].sort(
        (a: ResponsePayment, b: ResponsePayment) => {
          return (
            new Date(b.paymentTime).getTime() -
            new Date(a.paymentTime).getTime()
          );
        },
      );

      // 정렬된 paymentList를 전역 상태에 저장
      setPaymentList(sortedPayments);

      const newSettlementPayments = sortedPayments.map(payment => ({
        paymentId: payment.paymentsId,
        settlementUserList: [], // 아직 유저 리스트는 정해지지 않았으므로 빈 배열로 설정
      }));
      setSettlementPayment(newSettlementPayments);
      navigation.navigate(accountBookNavigations.SETTLEMENTFRIENDS);
    }
  };

  useEffect(() => {
    console.log(selectedPayments);
  }, [selectedPayments]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>정산할 내역을 선택하세요</Text>
      <PaymentList
        selectedPayments={selectedPayments}
        setSelectedPayments={setSelectedPayments}
      />
      <View style={styles.buttonContainer}>
        <CustomButton text="정산하기" onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
export default SettlementPaymentsScreen;
