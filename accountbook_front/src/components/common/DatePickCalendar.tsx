import React from 'react';
import {colors} from '@/constants';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import useThemeStore from '@/store/useThemeStore';

const DatePickCalendar = ({
  isVisible,
  curDate,
  onClose,
  setSelectedDate,
}: {
  isVisible: boolean;
  curDate: Date;
  onClose: () => void;
  setSelectedDate: (date: string) => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <CalendarList
            current={curDate.toISOString().split('T')[0]}
            monthFormat={'yyyy년 M월'}
            pastScrollRange={12}
            futureScrollRange={12}
            scrollEnabled={true}
            showScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={350}
            style={{width: 350}}
            onDayPress={handleDayPress}
            theme={{
              textDayFontSize: 14,
              textDayFontFamily: 'Pretendard-Medium',
              textMonthFontSize: 20,
              textMonthFontFamily: 'Pretendard-SemiBold',
              dayTextColor: colors[theme].BLACK,
              monthTextColor: colors[theme].BLACK,
              todayTextColor: colors[theme].PRIMARY,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
    modalBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modalContainer: {
      width: 350,
      height: 400,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].WHITE,
      padding: 10,
    },
  });

export default DatePickCalendar;
