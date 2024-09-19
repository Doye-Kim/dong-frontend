import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import {MonthYear} from '@/utils/date';
import DateBox from './DateBox';
import {colors} from '@/constants';

interface CustomCalendarProps {
  monthYear: MonthYear;
  selectedDate: number;
  onChangeMonth: (increment: number) => void;
  onPressDate: (date: number) => void;
  expenses: {[key: number]: number}; // 날짜별 금액 정보
}

const CustomCalendar = ({
  monthYear,
  selectedDate,
  onChangeMonth,
  onPressDate,
  expenses,
}: CustomCalendarProps) => {
  const {month, year, lastDate, firstDOW} = monthYear;
  const totalDays = lastDate + firstDOW;
  const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

  const calendarData = [
    ...Array.from({length: totalDays}, (_, i) => ({
      id: i,
      date: i - firstDOW + 1,
    })),
    ...Array.from({length: remainingDays}, (_, i) => ({
      id: totalDays + i,
      date: null, // 빈 칸에 해당하는 데이터
    })),
  ];

  return (
    <>
      <AccountBookHeader monthYear={monthYear} onChangeMonth={onChangeMonth} />

      {/* 날짜 표시될 부분 */}
      <View style={styles.container}>
        <FlatList
          data={calendarData}
          renderItem={({item}) => (
            <View style={[styles.rowSeparator]}>
              <DateBox
                date={item.date}
                selectedDate={selectedDate}
                onPressDate={onPressDate}
                expense={item.date ? expenses[item.date] : undefined}
              />
            </View>
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  container: {
    marginTop: 30,
  },
  rowSeparator: {
    borderTopWidth: 10,
    borderTopColor: colors.GRAY_200,
  },
});

export default CustomCalendar;
