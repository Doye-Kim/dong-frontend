import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '@/constants';
import CustomCalendar from '@/components/accountBook/calendar/CustomCalendar';
import {getMonthYearDetails} from '@/utils/date';
import useDateStore from '@/store/useDateStore';
import {Payment} from '@/types/domain';

interface CalendarScreenProps {
  paymentList: Payment[];
}

function CalendarScreen({paymentList}: CalendarScreenProps) {
  const date = useDateStore(state => state.date);
  const [selectedDate, setSelectedDate] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomCalendar
        monthYear={getMonthYearDetails(date)}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        expenses={expenses}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarScreen;
