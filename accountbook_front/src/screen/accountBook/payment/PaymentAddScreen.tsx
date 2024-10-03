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
import {format} from 'date-fns-tz';
import {EditIcon} from '@/assets/icons';
import {getDateLocaleFormat, getTimeLocalFormat} from '@/utils';
import {colors} from '@/constants';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';
import DatePickCalendar from '@/components/common/DatePickCalendar';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CategoryList from '@/components/accountBook/category/CategoryList';
import { useNavigation } from '@react-navigation/native';

const PaymentAddScreen = () => {
  const navigation = useNavigation();
  const [balanceEditStatus, setBalanceEditStatus] = useState<boolean>(true);
  const [isOpenCalendar, setIsOpneCalendar] = useState<boolean>(false);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<Boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState<Payment>({
    paymentsId: 1,
    merchantName: '',
    categoryId: 0,
    categoryName: '',
    categoryImageNumber: 0,
    balance: 0,
    paymentName: '수기 입력',
    memo: '',
    paymentTime: new Date().toISOString(),
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  });
  const [inputBalanceValue, setInputBalanceValue] = useState<string>('');

  const handlePostPayment = async (payment: Payment) => {
    console.log(payment.paymentTime);
    try {
      const response = await axiosInstance.post('/payments', {
        merchantName: payment.merchantName,
        categoryId: payment.categoryId,
        balance: payment.balance,
        paymentName: payment.paymentName,
        memo: payment.memo,
        paymentTime: payment.paymentTime,
        type: payment.paymentType,

        cardIssuerName: '카드', // 이거도 비워서 낼 수 있어야함
        // 수기입력의 경우 비워서 낼 수 있어야함. 아닌경우 paymentdetail에서 받아올 수 있어야함
        asset: 'ACCOUNT', // 수정 필요
        assetId: 1, // 이거도 수정필요. 비워서 낼 수 있어야함(수기입력의 경우)
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pressSaveButton = async (payment: Payment) => {
    handlePostPayment(payment);
    navigation.goBack();
  }

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
      setSelectedTime(date);
      if (selectedDate) {
        const selectedDateObj = new Date(selectedDate);
        selectedDateObj.setHours(date.getHours(), date.getMinutes());
        const newPaymentTime = format(selectedDateObj, "yyyy-MM-dd'T'HH:mm:ss", { timeZone: 'Asia/Seoul' });
  
        setPaymentData(prevPayment => ({
          ...prevPayment,
          paymentTime: newPaymentTime,
        }));
      }
    }
    setIsOpenTimePicker(false);
  };

  const toggleCategoryModal = () => {
    setIsCategoryModalVisible(prev => !prev);
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
                placeholderTextColor={colors.GRAY_500}
                onChangeText={text =>
                  setPaymentData({...paymentData, merchantName: text})
                }
                value={paymentData.merchantName}
              />
              <View style={styles.headerBelow}>
                {balanceEditStatus ? (
                  <TextInput
                    placeholder="금액을 입력하세요"
                    placeholderTextColor={colors.GRAY_600}
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
                  <Text style={{color: colors.BLACK, fontSize: 15}}> | </Text>
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
                    <Text style={styles.detailValue}>카테고리를 입력하세요</Text>
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
                  placeholderTextColor={colors.GRAY_400}
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
                  timeZoneName='Asia/Seoul'
                  onChange={(event, data) => {
                    setIsOpenTimePicker(false);
                    handleTimeChange(event, data);
                  }}
                />
              )}
              <Modal
                visible={isCategoryModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleCategoryModal}>
                <View style={styles.bottomModalContainer}>
                  <View style={styles.bottomModalContent}>
                    <Text style={styles.modalTitle}>카테고리 선택</Text>
                    <CategoryList onCategorySelect={handleCategorySelect} renderAddButton={false} />
                    <TouchableOpacity
                      onPress={toggleCategoryModal}
                      style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
    marginRight: 10,
  },
  amountTextInput: {
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
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
    color: colors.GRAY_600,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
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
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // 화면 하단에 모달이 위치하도록 설정
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    maxHeight: '50%', // 모달의 최대 높이 제한 (화면의 50%)
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
  loadingText: {
    fontSize: 30,
    color: colors.BLACK,
  },
});

export default PaymentAddScreen;
