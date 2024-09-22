import {Alert, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {colors} from '@/constants';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

interface calendarModalProps {
  isVisible: boolean;
  curDate: Date;
  onClose: () => void;
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  marginTop: number;
  seedOrGame: boolean; // seed면 true, game이면 false
}
const CalendarModal = ({
  isVisible,
  curDate,
  onClose,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  marginTop,
  seedOrGame,
}: calendarModalProps) => {
  const handleDayPress = day => {
    const today = new Date().toISOString().split('T')[0];
    if (seedOrGame && day.dateString < today) {
      Alert.alert('현재 날짜 이전은 선택할 수 없습니다.');
      return;
    }
    if (!startDate) {
      setStartDate(day.dateString);
    } else if (startDate && !endDate && day.dateString < startDate) {
      setStartDate(day.dateString);
    } else if (startDate && !endDate && day.dateString >= startDate) {
      setEndDate(day.dateString);
    } else if (startDate && endDate) {
      setStartDate(day.dateString);
      setEndDate(null);
    }
  };

  const getPastDates = () => {
    const today = new Date().toISOString().split('T')[0]; // 현재 날짜
    const dates = {};
    const pastDate = new Date();
    pastDate.setDate(1);

    while (pastDate.toISOString().split('T')[0] < today) {
      const dateStr = pastDate.toISOString().split('T')[0];
      dates[dateStr] = {textColor: colors.GRAY_400};
      pastDate.setDate(pastDate.getDate() + 1); // 다음 날짜로 이동
    }

    return dates;
  };

  const getWeekendDates = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Set to the start of the week
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 16);
    endDate.setDate(0);

    const dates = {};
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const day = d.getDay();
      if (day === 0) {
        // Sunday
        dates[dateStr] = {textColor: colors.RED_400};
      } else if (day === 6) {
        // Saturday
        dates[dateStr] = {textColor: colors.BLUE_400};
      }
    }
    return dates;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose} // 뒤로가기 버튼으로 모달 닫기
    >
      <View style={styles.container}>
        {/* 모달 외부 클릭 시 닫기 */}
        <TouchableOpacity
          style={[styles.overlay, {paddingTop: marginTop}]}
          onPress={onClose}
          activeOpacity={1}>
          <View style={styles.calendarContainer}>
            <CalendarList
              current={curDate}
              monthFormat={'yyyy년 M월'}
              pastScrollRange={0}
              futureScrollRange={16}
              scrollEnabled={true}
              showScrollIndicator={false}
              horizontal={true}
              pagingEnabled={true}
              calendarWidth={350}
              onDayPress={handleDayPress}
              calendarStyle={{
                backgroundColor: '#FFFFFF',
              }}
              theme={{
                textDayFontSize: 14,
                textDayFontFamily: 'Pretendard-Medium',
                textMonthFontSize: 20,
                textMonthFontFamily: 'Pretendard-SemiBold',
                dayTextColor: colors.BLACK,
                monthTextColor: colors.BLACK,
                todayTextColor: colors.PRIMARY,
              }}
              markingType={'period'}
              markedDates={{
                ...getWeekendDates(),
                ...(seedOrGame ? getPastDates() : {}),
                [startDate || '']: {
                  selected: true,
                  startingDay: true,
                  color: colors.ORANGE_500,
                  textColor: 'white',
                },
                [endDate || '']: {
                  selected: true,
                  endingDay: true,
                  color: colors.ORANGE_500,
                  textColor: 'white',
                },
                ...(startDate && endDate
                  ? getDatesInRange(startDate, endDate).reduce((acc, date) => {
                      acc[date] = {
                        color: colors.ORANGE_500,
                        textColor: colors.WHITE,
                      };
                      return acc;
                    }, {} as Record<string, any>)
                  : {}),
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const getDatesInRange = (start: string, end: string) => {
  const dates = [];
  let currentDate = new Date(start);
  const endDate = new Date(end);
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  calendarContainer: {
    width: 350,
    height: 330,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // 모달 배경색
  },
});

export default CalendarModal;
