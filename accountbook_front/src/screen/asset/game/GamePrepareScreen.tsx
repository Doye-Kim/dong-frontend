import CustomButton from '@/components/common/CustomButton';
import UserIcon from '@/components/game/UserIcon';
import {colors} from '@/constants';
import {category} from '@/utils/categories';
import getGameImage from '@/utils/getGameImage';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  participants: {userId: number; join: boolean; name: string}[];
}
const data: GameInfo = {
  categoryId: 1,
  managerId: 1111,
  fee: 30000,
  startDate: '2024.09.01',
  endDate: '2024.09.30',
  participants: [
    {userId: 1111, join: true, name: '김철수'},
    {userId: 2222, join: true, name: '신짱구'},
    {userId: 3333, join: true, name: '이훈이'},
    {userId: 4444, join: true, name: '맹구'},
  ],
};
const GamePrepareScreen = () => {
  const sortedParticipants = [...data.participants].sort((a, b) => {
    if (a.join === b.join) return 0;
    return a.join ? -1 : 1;
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={getGameImage(data.categoryId)}
          style={{width: 50, height: 50, marginRight: 10}}
        />
        <Text style={styles.titleText}>{category[data.categoryId]} 내기</Text>
      </View>
      <View style={{margin: 10}}>
        <Text style={styles.infoTitletext}>인원</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortedParticipants.map(item => (
            <View key={item.userId} style={styles.user}>
              <UserIcon name={item.name} disabled={!item.join} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitletext}>기간</Text>
        <Text style={styles.infoTitletext}>
          {data.startDate} ~ {data.endDate}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitletext}>참가비</Text>
        <Text style={styles.infoTitletext}>{data.fee.toLocaleString()}원</Text>
      </View>
      <View style={styles.buttonContainer}>
        {myInfo.userId === data.managerId ? (
          <CustomButton text="시작" />
        ) : (
          <CustomButton text="나가기" />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  infoTitletext: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: colors.BLACK,
  },
  user: {
    margin: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default GamePrepareScreen;
