import {colors} from '@/constants';
import {category} from '@/utils/categories';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
const myInfo = {
  userId: 1111,
  number: '01011112222',
  name: '김철수',
};
interface GameInfo {
  categoryId: number;
  managerId: number;
  fee: number;
  startDate: string;
  endDate: string;
  participants: {userId: number; join: boolean; count: number; name: string}[];
}
const data: GameInfo = {
  categoryId: 1,
  managerId: 1111,
  fee: 30000,
  startDate: '2024.09.01',
  endDate: '2024.09.30',
  participants: [
    {userId: 1111, join: true, name: '김철수', count: 5},
    {userId: 2222, join: false, name: '신짱구', count: 2},
    {userId: 3333, join: true, name: '이훈이', count: 0},
    {userId: 4444, join: false, name: '맹구', count: 10},
  ],
};
const GameResultScreen = () => {
  const sortedParticipants = [...data.participants].sort(
    (a, b) => a.count - b.count,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{category[data.categoryId]} 내기</Text>
      <Text style={styles.periodText}>
        {data.startDate} ~ {data.endDate}
      </Text>
      {sortedParticipants[0].userId === myInfo.userId ? (
        <Image
          source={require('@/assets/icons/congratulation.png')}
          style={{width: 100, height: 100, margin: 20}}
        />
      ) : (
        <Image
          source={require('@/assets/icons/sad.png')}
          style={{width: 100, height: 100, margin: 20}}
        />
      )}
      <Text style={styles.prizeMoneyText}>
        우승자는 {sortedParticipants[0].name} 님입니다!
      </Text>
      <View style={styles.userListContainer}>
        {sortedParticipants.map(item => (
          <View
            style={[
              styles.userInfoContainer,
              item.userId === sortedParticipants[0].userId &&
                styles.highlightContainer,
            ]}>
            <Text
              style={[
                styles.userInfoText,
                item.userId === sortedParticipants[0].userId &&
                  styles.highlightText,
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.userInfoText,
                item.userId === data.participants[0].userId &&
                  styles.highlightText,
              ]}>
              {item.count}회
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 70,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
    margin: 5,
  },
  periodText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_500,
    margin: 5,
  },
  prizeMoneyText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
  userListContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.ORANGE_200,
    borderRadius: 30,
    marginTop: 30,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
  },
  highlightContainer: {
    backgroundColor: colors.PRIMARY,
  },
  highlightText: {
    color: colors.WHITE,
  },
  userInfoText: {
    fontFamily: 'Pretemdard-Bold',
    fontSize: 18,
    color: colors.BLACK,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default GameResultScreen;
