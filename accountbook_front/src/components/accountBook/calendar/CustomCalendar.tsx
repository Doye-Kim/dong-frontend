import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import {MonthYear} from '@/utils/date';
import DateBox from './DateBox';
import {colors} from '@/constants';

interface CustomCalendarProps {
  monthYear: MonthYear;
  onPressDate: (date: number) => void;
  expenses: {[key: number]: number}; // 날짜별 사용 금액 정보
  incomes: {[key: number]: number}; // 날짜별 수익 금액 정보
}

const CustomCalendar = ({
  monthYear,
  onPressDate,
  expenses,
  incomes,
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
      <AccountBookHeader />

      {/* 날짜 표시될 부분 */}
      <View style={styles.container}>
        <FlatList
          data={calendarData}
          renderItem={({item}) => (
            <View style={[styles.rowSeparator]}>
              <DateBox
                date={item.date}
                onPressDate={onPressDate}
                expense={item.date ? expenses[item.date] : undefined}
                income={item.date ? incomes[item.date] : undefined}
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
    marginBottom: 60,
  },
  rowSeparator: {
    borderTopWidth: 6,
    borderTopColor: colors.GRAY_200,
  },
});

export default CustomCalendar;
