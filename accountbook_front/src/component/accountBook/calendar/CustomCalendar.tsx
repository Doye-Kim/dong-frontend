import React from 'react';
import {StyleSheet} from 'react-native';
import AccountBookHeader from '../common/AccountBookHeader';

interface CustomCalendarProps {}

function CustomCalendar({}: CustomCalendarProps) {
  return (
    <>
      <AccountBookHeader />
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
