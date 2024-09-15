import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import { colors } from '../../../constants';
import CustomCalendar from '../../../component/accountBook/calendar/CustomCalendar';


interface CalendarScreenProps {}

function CalendarScreen({}: CalendarScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <CustomCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  }
});

export default CalendarScreen;
