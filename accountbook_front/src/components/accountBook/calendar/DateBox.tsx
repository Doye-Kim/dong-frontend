import React from 'react';
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';

interface DateBoxProps {
  date: number | null;
  onPressDate: (date: number) => void;
  expense?: number;
  income?: number;
}

const deviceWidth = Dimensions.get('window').width;
const BOX_WIDTH = deviceWidth / 7;
const BOX_HEIGHT = BOX_WIDTH + 35;

const DateBox = ({date, onPressDate, expense, income}: DateBoxProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  if (date === null) {
    return <View style={styles.emptyBox} />;
  }

  const hasTransaction = expense !== undefined || income !== undefined;

  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date < 1 ? '' : date}</Text>
      </View>
      {hasTransaction && (
        <View style={styles.transactionContainer}>
          {expense !== undefined && (
            <Text style={styles.expenseText}>-{expense.toLocaleString()}</Text>
          )}
          {income !== undefined && (
            <Text style={styles.incomeText}>{income.toLocaleString()}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      backgroundColor: colors[theme].WHITE,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 5,
    },
    dateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 14,
      marginBottom: 4,
    },
    dateText: {
      fontSize: 14,
      color: colors[theme].BLACK,
      fontFamily: 'Pretendard-Medium',
    },
    transactionContainer: {
      alignItems: 'center',
    },
    expenseText: {
      fontSize: 10,
      color: colors[theme].GRAY_600,
      fontFamily: 'Pretendard-Regular',
    },
    incomeText: {
      fontSize: 10,
      color: colors[theme].PRIMARY,
      fontFamily: 'Pretendard-Regular',
    },
    emptyBox: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
    },
  });

export default DateBox;
