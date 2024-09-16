import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {colors} from '../../../constants';
import CustomCalendar from '../../../component/accountBook/calendar/CustomCalendar';
import {getMonthYearDetails, getNewMonthYear} from '../../../utils/date';

interface CalendarScreenProps {}

function CalendarScreen({}: CalendarScreenProps) {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomCalendar monthYear={monthYear} onChangeMonth={handleUpdateMonth}/>
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
