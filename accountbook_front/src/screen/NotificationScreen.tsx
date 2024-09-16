import NotiItem from '@/components/notification/NoticeItem';
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';

const data = [
  {
    read: false,
    category: '정산 요청',
    name: '김도예',
    icon: 0,
    dateTime: '22시간 전',
  },
  {
    read: false,
    category: '내기 신청',
    name: '송도언',
    icon: 1,
    dateTime: '1일 전',
  },
  {
    read: true,
    category: '고정 지출 알림',
    name: '넷플릭스',
    icon: 2,
    dateTime: '1일 전',
  },
  {
    read: false,
    category: '고정 지출 알림',
    name: '월세',
    icon: 2,
    dateTime: '1일 전',
  },
  {
    read: false,
    category: '고정 지출 등록',
    name: '티빙',
    icon: 2,
    dateTime: '3일 전',
  },
  {read: true, category: '포인트 적립', point: 3, icon: 3, dateTime: '3일 전'},
  {read: true, category: '포인트 적립', point: 3, icon: 3, dateTime: '3일 전'},
  {read: true, category: '포인트 적립', point: 3, icon: 3, dateTime: '7일 전'},
  {
    read: true,
    category: '포인트 적립',
    point: 3,
    icon: 3,
    dateTime: '8월 15일',
  },
];
const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <SectionList
          sections={[{title: '알림', data: data}]}
          //   keyExtractor={(item, index) => item.icon + index}
          renderItem={({item}) => (
            <NotiItem
              read={item.read}
              category={item.category}
              name={item.name}
              icon={item.icon}
              point={item.point}
              dateTime={item.dateTime}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
  scrollContainer: {},
});
export default NotificationScreen;
