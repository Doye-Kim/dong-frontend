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
  Modal,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {EditIcon, MeatballMenuIcon} from '@/assets/icons';
import {getDateTimeLocaleFormat, getDateWithSeparator} from '@/utils';
import {colors} from '@/constants';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';
import CategoryList from '@/components/accountBook/category/CategoryList';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import useDateStore from '@/store/useDateStore';

type RouteParams = {
  PaymentDetail?: {paymentId: number};
};

const PaymentDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'PaymentDetail'>>();
  const navigation = useNavigation();
  const paymentId = route.params?.paymentId;
  const [paymentData, setPaymentData] = useState<Payment>();
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const date = useDateStore(state => state.date);
  const yearMonth = getDateWithSeparator(date, "-");
  const {fetchPaymentData} = usePaymentDataStore();

  // 수정사항 저장하는 함수
  const handleChangePayment = async (payment: Payment) => {
    patchPaymentType(payment);
    patchPaymentCategory(payment).then(() => fetchPaymentData(yearMonth));
    navigation.goBack();
  };

  // 전체 수정
  const putPayment = async (payment: Payment) => {
    try {
      const paymentRequest = [
        {
          merchantName: payment.merchantName,
          categoryId: payment.categoryId,
          balance: payment.balance,
          paymentName: payment.paymentName,
          memo: payment.memo,
          paymentTime: new Date(payment.paymentTime).toISOString(),
          type: payment.paymentType,

          cardIssuerName: '신한카드',
          asset: 'ACCOUNT',
          assetId: 1,

          // cardIssuerName: payment.cardIssuerName,
          // asset: payment.asset,
          // assetId: payment.assetId,
        },
      ];
      const response = await axiosInstance.put(
        `/payments/${paymentId}`,
        paymentRequest,
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 카테고리, 지출포함여부 수정
  const patchPaymentType = async (payment: Payment) => {
    try {
      const response = await axiosInstance.patch(
        `/payments/${paymentId}/type`,
        {
          categoryId: payment.categoryId,
          paymentState: payment.paymentState,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const patchPaymentCategory = async (payment: Payment) => {
    try {
      const response = await axiosInstance.patch(
        `/payments/${paymentId}/categories`,
        {
          categoryId: payment.categoryId,
          paymentState: payment.paymentState,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 값 불러오는 함수
  const fetchPayment = async (paymentId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/${paymentId}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (paymentId !== undefined) {
      fetchPayment(paymentId);
    }
  }, [paymentId]);

  const togglePaymentType = (type: 'INCOME' | 'EXPENSE') => {
    setPaymentData(prevPayment => {
      if (!prevPayment) return prevPayment;
      return {
        ...prevPayment,
        paymentType: type,
      };
    });
  };

  const toggleIncludeExclude = () => {
    setPaymentData(prevPayment => {
      if (!prevPayment) return prevPayment;
      return {
        ...prevPayment,
        paymentState:
          prevPayment.paymentState === 'INCLUDE' ? 'EXCLUDE' : 'INCLUDE',
      };
    });
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalVisible(prev => !prev);
  };

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setPaymentData(prevPayment => {
      if (!prevPayment) return prevPayment;
      return {
        ...prevPayment,
        categoryId,
        categoryName,
      };
    });
    toggleCategoryModal();
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
                <TouchableOpacity onPress={toggleCategoryModal}>
                  <Text style={styles.detailValue}>
                    {paymentData.categoryName}
                  </Text>
                </TouchableOpacity>
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
                  value={paymentData.paymentState === 'INCLUDE' ? false : true}
                  onValueChange={toggleIncludeExclude}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleChangePayment(paymentData)}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isCategoryModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleCategoryModal}>
            <View style={styles.bottomModalContainer}>
              <View style={styles.bottomModalContent}>
                <Text style={styles.modalTitle}>카테고리 선택</Text>
                <CategoryList
                  onCategorySelect={handleCategorySelect}
                  renderAddButton={false}
                />
                <TouchableOpacity
                  onPress={toggleCategoryModal}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});

export default PaymentDetailScreen;
