import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {EditIcon, MeatballMenuIcon} from '@/assets/icons';
import {getDateTimeLocaleFormat} from '@/utils';
import {colors} from '@/constants';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';

type RouteParams = {
  PaymentDetail?: {paymentId: number};
};

const PaymentDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'PaymentDetail'>>();
  const paymentId = route.params?.paymentId;
  // const [paymentData, setPaymentData] = useState<Payment>();

  const handlePostPayment = async (payment: Payment) => {
    try {
      const response = await axiosInstance.post('/payments', {
        merchantName: payment.merchantName,
        categoryId: payment.categoryId,
        balance: payment.balance,
        paymentName: payment.paymentName,
        memo: payment.memo,
        paymentTime: payment.paymentTime,
        type: payment.paymentType,

        cardIssuerName: '임시-수정필요', // 이거도 비워서 낼 수 있어야함
        // 수기입력의 경우 비워서 낼 수 있어야함. 아닌경우 paymentdetail에서 받아올 수 있어야함
        asset: 'ACCOUNT', // 수정 필요
        assetId: 10, // 이거도 수정필요. 비워서 낼 수 있어야함(수기입력의 경우)
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 값 불러오는 함수. 아직 작동안함
  const fetchPaymentData = async (paymentId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/${paymentId}`);
      setPaymentData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if (paymentId !== undefined) {
    //   fetchPaymentData(paymentId);
    // }
  }, [paymentId]);

  const [paymentData, setPaymentData] = useState<Payment>({
    paymentsId: 1,
    merchantName: '올리브영',
    categoryId: 0,
    categoryName: '쇼핑',
    balance: 20000,
    paymentName: '쇼핑',
    memo: '메모',
    paymentTime: '2024-08-26T08:30:00.000Z',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  });

  const togglePaymentType = (type: 'INCOME' | 'EXPENSE') => {
    setPaymentData(prevPayment => ({
      ...prevPayment,
      paymentType: type,
    }));
  };

  const toggleIncludeExclude = () => {
    setPaymentData(prevPayment => ({
      ...prevPayment,
      paymentState:
        prevPayment.paymentState === 'INCLUDE' ? 'EXCLUDE' : 'INCLUDE',
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {paymentData !== undefined ? (
        <>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.header}>
              <TextInput
                style={styles.headerTitle}
                placeholder="상품 이름을 입력하세요"
                placeholderTextColor={colors.GRAY_500}
                onChangeText={text =>
                  setPaymentData({...paymentData, paymentName: text})
                }
                value={paymentData.merchantName}
              />
              <View style={styles.headerBelow}>
                <Text style={styles.amountText}>
                  {paymentData.balance.toLocaleString()}원
                </Text>
                <TouchableOpacity>
                  <MeatballMenuIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>분류</Text>
                <View style={styles.categoryContainer}>
                  {['INCOME', 'EXPENSE'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.categoryButton,
                        paymentData.paymentType === type &&
                          styles.selectedButton,
                      ]}
                      onPress={() =>
                        togglePaymentType(type as 'INCOME' | 'EXPENSE')
                      }>
                      <Text
                        style={[
                          styles.categoryButtonText,
                          paymentData.paymentType === type &&
                            styles.selectedButtonText,
                        ]}>
                        {type === 'INCOME' ? '수입' : '지출'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>일시</Text>
                <Text style={styles.detailValue}>
                  {getDateTimeLocaleFormat(paymentData.paymentTime)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>카테고리</Text>
                <Text style={styles.detailValue}>
                  {paymentData.categoryName}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>메모</Text>
                <TextInput
                  style={styles.memoInput}
                  placeholder="메모를 입력하세요"
                  placeholderTextColor={colors.GRAY_400}
                  onChangeText={text =>
                    setPaymentData({...paymentData, memo: text})
                  }
                  value={paymentData.memo}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.detailLabel}>지출에서 제외</Text>
                <Switch
                  value={paymentData.paymentState === 'INCLUDE' ? true : false}
                  onValueChange={toggleIncludeExclude}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handlePostPayment(paymentData)}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>데이터를 불러오는 중입니다.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    padding: 0,
  },
  moreButton: {
    padding: 8,
  },
  amountText: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    height: 40,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_600,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    marginLeft: 8,
  },
  selectedButton: {
    borderColor: colors.PRIMARY,
  },
  categoryButtonText: {
    color: colors.GRAY_600,
    fontSize: 14,
    bottom: 1,
  },
  selectedButtonText: {
    color: colors.PRIMARY,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memoInput: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    width: '80%',
    textAlign: 'right',
    padding: 0,
  },
  buttonContainer: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: colors.PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
  loadingText: {
    fontSize: 30,
    color: colors.BLACK,
  },
});

export default PaymentDetailScreen;
