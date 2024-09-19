import React from 'react';
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {colors} from '@/constants';

interface DateBoxProps {
  date: number | null;
  selectedDate: number;
  onPressDate: (date: number) => void;
  expense?: number;
}

const deviceWidth = Dimensions.get('window').width;

const DateBox = ({date, selectedDate, onPressDate, expense}: DateBoxProps) => {
  if (date === null) {
    return <View style={styles.emptyBox}></View>;
  }

  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
            {expense && (
              <Text style={styles.expenseText}>
                {expense.toLocaleString()}원
              </Text>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7 + 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  dateText: {
    fontSize: 18,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
    borderRadius: 30,
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  expenseText: {
    fontSize: 12,
    color: colors.BLACK,
    marginTop: 4,
  },
  emptyBox: {
    width: deviceWidth / 7,
    height: deviceWidth / 7 + 20,
  },
});

export default DateBox;
