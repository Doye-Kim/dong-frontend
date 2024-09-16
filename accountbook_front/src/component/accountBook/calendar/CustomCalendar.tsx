import React from 'react';
import {StyleSheet} from 'react-native';
import AccountBookHeader from '../common/AccountBookHeader';
import { MonthYear } from '../../../utils/date';

interface CustomCalendarProps {
  monthYear: MonthYear
  onChangeMonth : (increment: number) => void;
}

const CustomCalendar = ({monthYear, onChangeMonth}: CustomCalendarProps) => {
  const {month, year} = monthYear;

  return (
    <>
      <AccountBookHeader monthYear={monthYear} onChangeMonth={onChangeMonth}/>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
});

export default CustomCalendar;
