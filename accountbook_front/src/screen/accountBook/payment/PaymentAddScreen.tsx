import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {formatInTimeZone} from 'date-fns-tz';
import {EditIcon} from '@/assets/icons';
import {getDateLocaleFormat, getTimeLocalFormat} from '@/utils';
import {colors} from '@/constants';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';
import DatePickCalendar from '@/components/common/DatePickCalendar';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import CategorySelectModal from '@/components/accountBook/common/CategorySelectModal';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';

const PaymentAddScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const [balanceEditStatus, setBalanceEditStatus] = useState<boolean>(true);
  const [isOpenCalendar, setIsOpneCalendar] = useState<boolean>(false);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<Boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [paymentData, setPaymentData] = useState<Payment>({
    paymentsId: 1,
    merchantName: '',
    categoryId: 0,
    categoryName: '',
    categoryImageNumber: 0,
    balance: 0,
    paymentName: '수기 입력',
    memo: '',
    paymentTime: formatInTimeZone(
      new Date(),
      'Asia/Seoul',
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  });
  const [inputBalanceValue, setInputBalanceValue] = useState<string>('');

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
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateFields = () => {
    if (!paymentData.merchantName) {
      Toast.show({
        type: 'error',
        text1: '상품 이름을 선택해주세요.',
      });
      return false;
    }
    if (paymentData.categoryId === 0) {
      Toast.show({
        type: 'error',
        text1: '카테고리를 선택해주세요.',
      });
      return false;
    }
    if (paymentData.balance <= 0) {
      Toast.show({
        type: 'error',
        text1: '금액을 입력해주세요.',
      });
      return false;
    }
    return true;
  };

  const pressSaveButton = async (payment: Payment) => {
    if (validateFields()) {
      handlePostPayment(payment);
      navigation.goBack();
    }
  };

  const toggleBalanceEditStatus = () => {
    setBalanceEditStatus(prevStatus => !prevStatus);
  };

  useEffect(() => {
    setInputBalanceValue(paymentData.balance.toString());
  }, [paymentData.balance]);

  const handleBlur = () => {
    const newBalance = parseInt(inputBalanceValue, 10);
    if (!isNaN(newBalance)) {
      setPaymentData(prevPayment => ({
        ...prevPayment,
        balance: newBalance,
      }));
    }
    setBalanceEditStatus(false);
  };

  const togglePaymentType = (type: 'INCOME' | 'EXPENSE') => {
    setPaymentData(prevPayment => ({
      ...prevPayment,
      paymentType: type,
    }));
  };

  const toggleCalendarView = () => {
    setIsOpneCalendar(prevStatus => !prevStatus);
  };
  const toggleTimePicker = () => {
    setIsOpenTimePicker(prevStatus => !prevStatus);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const newPaymentTime = `${date}T${
      selectedTime.toTimeString().split(' ')[0]
    }`;
    setPaymentData(prevPayment => ({
      ...prevPayment,
      paymentTime: newPaymentTime,
    }));
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      const selectedDateObj = new Date(date);
      selectedDateObj.setHours(date.getHours(), date.getMinutes());
      const newPaymentTime = formatInTimeZone(
        selectedDateObj,
        'Asia/Seoul',
        "yyyy-MM-dd'T'HH:mm:ss",
      );
      setPaymentData(prevPayment => ({
        ...prevPayment,
        paymentTime: newPaymentTime,
      }));
    }
    setIsOpenTimePicker(false);
  };

  const toggleCategoryModal = () => {
    if (!isCategoryModalVisible) {
      // 모달을 열 때 애니메이션을 시작하여 위로 슬라이드합니다.
      setIsCategoryModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // 화면 아래에서 0으로 슬라이드 (위로 올라옴)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // 모달을 닫을 때 아래로 슬라이드 후 모달을 숨깁니다.
      Animated.timing(slideAnim, {
        toValue: 600, // 다시 화면 아래로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsCategoryModalVisible(false);
      });
    }
  };

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setPaymentData(prevPayment => ({
      ...prevPayment,
      categoryId,
      categoryName,
    }));
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
                placeholderTextColor={colors[theme].GRAY_500}
                onChangeText={text =>
                  setPaymentData({...paymentData, merchantName: text})
                }
                value={paymentData.merchantName}
              />
              <View style={styles.headerBelow}>
                {balanceEditStatus ? (
                  <TextInput
                    placeholder="금액을 입력하세요"
                    placeholderTextColor={colors[theme].GRAY_600}
                    style={styles.amountTextInput}
                    onChangeText={setInputBalanceValue}
                    onBlur={handleBlur}
                    keyboardType="numeric"
                    autoFocus
                  />
                ) : (
                  <View style={styles.headerBelow}>
                    <Text style={styles.amountText}>
                      {paymentData.balance.toLocaleString()}원
                    </Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={toggleBalanceEditStatus}>
                      <EditIcon />
                    </TouchableOpacity>
                  </View>
                )}
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
                <View style={styles.dateTimeContainer}>
                  <TouchableOpacity onPress={toggleCalendarView}>
                    <Text style={styles.detailValue}>
                      {getDateLocaleFormat(paymentData.paymentTime)}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: colors[theme].BLACK, fontSize: 15}}>
                    {' '}
                    |{' '}
                  </Text>
                  <TouchableOpacity onPress={toggleTimePicker}>
                    <Text style={styles.detailValue}>
                      {getTimeLocalFormat(paymentData.paymentTime)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>카테고리</Text>
                <TouchableOpacity onPress={toggleCategoryModal}>
                  {paymentData.categoryId === 0 ? (
                    <Text style={styles.detailValue}>
                      카테고리를 입력하세요
                    </Text>
                  ) : (
                    <Text style={styles.detailValue}>
                      {paymentData.categoryName}
                    </Text>
                  )}
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
              {isOpenCalendar && (
                <DatePickCalendar
                  isVisible={isOpenCalendar}
                  curDate={new Date()}
                  onClose={toggleCalendarView}
                  setSelectedDate={handleDateChange}
                />
              )}
              {isOpenTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="default"
                  timeZoneName="Asia/Seoul"
                  onChange={(event, data) => {
                    setIsOpenTimePicker(false);
                    handleTimeChange(event, data);
                  }}
                />
              )}
              <CategorySelectModal
                isVisible={isCategoryModalVisible}
                toggleModal={toggleCategoryModal}
                onCategorySelect={handleCategorySelect}
                slideAnim={slideAnim}
              />
            </View>
          </ScrollView>
          {isOpenCalendar}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => pressSaveButton(paymentData)}>
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
    headerLeft: {
      flexDirection: 'row',
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
      marginRight: 10,
    },
    amountTextInput: {
      fontSize: 24,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
      padding: 0,
    },
    editButton: {
      padding: 10,
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
    dateTimeContainer: {
      flexDirection: 'row',
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
    errorText: {
      fontSize: 14,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].RED_500,
      textAlign: 'center',
      marginTop: 10,
    },
    loadingText: {
      fontSize: 30,
      color: colors[theme].BLACK,
    },
  });

export default PaymentAddScreen;
