import axiosInstance from '@/api/axios';
import {BackArrow, PaymentDetailAdd} from '@/assets/icons';
import CategoryList from '@/components/accountBook/category/CategoryList';
import PaymentDevideItemList from '@/components/accountBook/payment/PaymentDevideItemList';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import {Payment} from '@/types/domain';
import {getDateLocaleFormat, getDateTimeLocaleFormat, getDateWithSeparator} from '@/utils';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';

type PaymentDivideScreenRouteProp = RouteProp<
  AccountBookStackParamList,
  'PaymentDivide'
>;

const PaymentDivideScreen = () => {
  const route = useRoute<PaymentDivideScreenRouteProp>();
  const [paymentData, setPaymentData] = useState(route.params.payment);
  const [paymentDivideList, setPaymentDivideList] = useState<Payment[]>([]);
  const reloadPaymentList = usePaymentDataStore(state => state.fetchPaymentData);
  const navigation = useNavigation();

  const addPaymentDevide = () => {
    const newPaymentDivide: Payment = {
      ...paymentData,
      paymentsId: Date.now(),
    };
    setPaymentDivideList(prevList => [...prevList, newPaymentDivide]);
  };

  const deletePaymentDivide = (paymentsId: number) => {
    setPaymentDivideList(prevList =>
      prevList.filter(item => item.paymentsId !== paymentsId),
    );
  };

  const updatePaymentDivide = (updatedPayment: Payment) => {
    setPaymentDivideList(prevList =>
      prevList.map(item =>
        item.paymentsId === updatedPayment.paymentsId ? updatedPayment : item,
      ),
    );
  };

  const transformPaymentList = (paymentList: Payment[]): any[] => {
    return paymentList.map(payment => ({
      merchantName: payment.merchantName,
      categoryId: payment.categoryId,
      balance: payment.balance,
      paymentName: payment.paymentName,
      memo: payment.memo,
      paymentTime: payment.paymentTime,
      cardIssuerName: payment.cardIssuerName || null,
      type: payment.paymentType,
      asset: payment.asset || null,
      assetId: payment.assetId || null,
    }));
  };

  const requestPaymentDivide = async (paymentList: Payment[] = []) => {
    // 유효성 검사: balance가 0 이하인 항목이 있는지 확인
    const invalidPayments = paymentList.filter(payment => payment.balance <= 0);

    if (invalidPayments.length > 0) {
      Toast.show({
        type: 'error',
        text1: '금액은 0보다 커야합니다',
      });
      return;
    }
    const transformedPaymentList = transformPaymentList(paymentList);
    try {
      const response = await axiosInstance.put(
        `/payments/${paymentData.paymentsId}`,
        transformedPaymentList,
      );
      
      reloadPaymentList(getDateWithSeparator(paymentData.paymentTime, "-"));
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailValue}>{paymentData.merchantName}</Text>
              <Text style={styles.detailValue}>{paymentData.balance}원</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>분류</Text>
              <Text style={styles.detailValue}>
                {paymentData.paymentType === 'EXPENSE' ? '지출' : '수입'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>일시</Text>
              <Text style={styles.detailValue}>
                {getDateTimeLocaleFormat(paymentData.paymentTime)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>카테고리</Text>
              <Text style={styles.detailValue}>{paymentData.categoryName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>메모</Text>
              <Text style={styles.detailValue}>{paymentData.memo}</Text>
            </View>
          </View>
          <View style={styles.borderLineContainer}>
            <View style={styles.borderLine}></View>
          </View>
          <View style={styles.separateContainer}>
            <View style={styles.separateHeaderContainer}>
              <Text style={styles.separateHeaderText}>분리 내역</Text>
              <TouchableOpacity onPress={addPaymentDevide}>
                <PaymentDetailAdd />
              </TouchableOpacity>
            </View>
            <PaymentDevideItemList
              divideList={paymentDivideList}
              onDelete={deletePaymentDivide}
              onUpdate={updatePaymentDivide}
            />
          </View>
        </ScrollView>
        <View style={styles.confirmButtonContainer}>
          <CustomButton
            text={'완료'}
            onPress={() => requestPaymentDivide(paymentDivideList)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: 25,
  },
  detailsContainer: {
    paddingHorizontal: 30,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    height: 45,
  },
  detailLabel: {
    fontSize: 18,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK,
  },
  detailValue: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  borderLineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  borderLine: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.GRAY_600,
  },
  separateContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  separateHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  separateHeaderText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK,
  },
  confirmButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PaymentDivideScreen;
