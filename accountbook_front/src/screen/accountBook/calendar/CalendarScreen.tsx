import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {accountBookNavigations, colors} from '@/constants';
import CustomCalendar from '@/components/accountBook/calendar/CustomCalendar';
import {getMonthYearDetails} from '@/utils/date';
import useDateStore from '@/store/useDateStore';
import {Payment} from '@/types/domain';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountBookStackParamList } from '@/navigations/stack/accountBook/AccountBookStackNavigator';

interface CalendarScreenProps {
  paymentList: Payment[];
}

interface DailyTotal {
  [date: number]: number;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

function CalendarScreen({paymentList}: CalendarScreenProps) {
  const date = useDateStore(state => state.date);
  const paymentMonthData = paymentList;
  const [expenses, setExpenses] = useState<DailyTotal>({});
  const [incomes, setIncomes] = useState<DailyTotal>({});
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDatePayments, setSelectedDatePayments] = useState<Payment[]>(
    [],
  );

  const navigation = useNavigation<StackNavigationProp<AccountBookStackParamList>>();

  const toggleDetailModalVisible = () => {
    setIsDetailModalVisible(prev => !prev);
  };

  useEffect(() => {
    const dailyExpenses: DailyTotal = {};
    const dailyIncomes: DailyTotal = {};

    paymentList.forEach(payment => {
      const paymentDate = new Date(payment.paymentTime);
      const day = paymentDate.getDate();
      const amount = payment.balance;

      if (payment.paymentType === 'EXPENSE') {
        dailyExpenses[day] = (dailyExpenses[day] || 0) + amount;
      } else if (payment.paymentType === 'INCOME') {
        dailyIncomes[day] = (dailyIncomes[day] || 0) + amount;
      }
    });

    setExpenses(dailyExpenses);
    setIncomes(dailyIncomes);
  }, [paymentList]);

  const handlePressDate = (selectedDate: number) => {
    const filteredPayments = paymentMonthData.filter(payment => {
      const paymentDate = new Date(payment.paymentTime);
      return paymentDate.getDate() === selectedDate;
    });
    setSelectedDatePayments(filteredPayments);
    toggleDetailModalVisible();
  };

  const handlePaymentPress = (paymentId: number) => {
    setIsDetailModalVisible(false); // 모달을 닫습니다.
    navigation.navigate(accountBookNavigations.PAYMENTDETAIL, {paymentId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomCalendar
        monthYear={getMonthYearDetails(date)}
        onPressDate={handlePressDate}
        expenses={expenses}
        incomes={incomes}
      />
      <Modal
        visible={isDetailModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDetailModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDetailModalVisible(false)}>
          <View style={styles.bottomModalContent}>
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              <Text style={styles.modalTitle}>상세 내역</Text>
              <PaymentItemList payments={selectedDatePayments} onPaymentPress={handlePaymentPress}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 20,
  },
});

export default CalendarScreen;
