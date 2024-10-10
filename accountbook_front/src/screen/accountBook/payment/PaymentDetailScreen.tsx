import React, {useEffect, useRef, useState} from 'react';
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
  Animated,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {MeatballMenuIcon} from '@/assets/icons';
import {
  getDateLocaleFormat,
  getDateWithSeparator,
  getTimeLocalFormat,
} from '@/utils';
import {colors} from '@/constants';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import useDateStore from '@/store/useDateStore';
import PaymentOption from '@/components/accountBook/payment/PaymentOption';
import CategorySelectModal from '@/components/accountBook/common/CategorySelectModal';
import useThemeStore from '@/store/useThemeStore';

type RouteParams = {
  PaymentDetail?: {paymentId: number};
};

const PaymentDetailScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const route = useRoute<RouteProp<RouteParams, 'PaymentDetail'>>();
  const navigation = useNavigation();
  const paymentId = route.params?.paymentId;
  const [paymentData, setPaymentData] = useState<Payment>();
  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [isOptionModalVisible, setIsOptionModalVisible] =
    useState<boolean>(false);
  const date = useDateStore(state => state.date);
  const yearMonth = getDateWithSeparator(date, '-');
  const {fetchPaymentData} = usePaymentDataStore();

  // 수정사항 저장하는 함수
  const handleChangePayment = async (payment: Payment) => {
    patchPaymentType(payment);
    patchPaymentCategory(payment).then(() => fetchPaymentData(yearMonth));
    navigation.goBack();
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
    if (!isCategoryModalVisible) {
      setIsCategoryModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsCategoryModalVisible(false);
      });
    }
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

  const toggleOptionModal = () => {
    setIsOptionModalVisible(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {paymentData !== undefined ? (
        <>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{paymentData.merchantName}</Text>
              <View style={styles.headerBelow}>
                <Text style={styles.amountText}>
                  {paymentData.balance.toLocaleString()}원
                </Text>
                <TouchableOpacity>
                  <MeatballMenuIcon onPress={toggleOptionModal} />
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
                  {getDateLocaleFormat(paymentData.paymentTime)}{' '}
                  {getTimeLocalFormat(paymentData.paymentTime)}
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
                  placeholderTextColor={colors[theme].GRAY_400}
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
          <CategorySelectModal
            isVisible={isCategoryModalVisible}
            toggleModal={toggleCategoryModal}
            onCategorySelect={handleCategorySelect}
            slideAnim={slideAnim}
          />
          <Modal
            visible={isOptionModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleOptionModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.bottomModalContainer}>
                <PaymentOption
                  onClose={() => setIsOptionModalVisible(false)}
                  payment={paymentData}
                />
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

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
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
      color: colors[theme].BLACK,
      padding: 0,
    },
    moreButton: {
      padding: 8,
    },
    amountText: {
      fontSize: 32,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
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
      color: colors[theme].GRAY_600,
    },
    detailValue: {
      fontSize: 16,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
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
      borderColor: colors[theme].GRAY_300,
      marginLeft: 8,
    },
    selectedButton: {
      borderColor: colors[theme].PRIMARY,
    },
    categoryButtonText: {
      color: colors[theme].GRAY_600,
      fontSize: 14,
      bottom: 1,
    },
    selectedButtonText: {
      color: colors[theme].PRIMARY,
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
      color: colors[theme].BLACK,
      width: '80%',
      textAlign: 'right',
      padding: 0,
    },
    buttonContainer: {
      padding: 16,
    },
    saveButton: {
      backgroundColor: colors[theme].PRIMARY,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      color: colors[theme].WHITE,
      fontSize: 18,
      fontFamily: 'Pretendard-Bold',
    },
    loadingText: {
      fontSize: 30,
      color: colors[theme].BLACK,
    },
    bottomModalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomModalContent: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
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
      backgroundColor: colors[theme].PRIMARY,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    closeButtonText: {
      color: colors[theme].WHITE,
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    optionModalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionModalContent: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      maxHeight: '50%',
    },
  });

export default PaymentDetailScreen;
