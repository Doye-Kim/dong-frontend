import RoundFriends from '@/components/accountBook/settlement/RoundFriends';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const data = [
  {
    settlementPaymentId: 12,
    paymentId: 157,
    balance: 15000,
    merchantName: '우버택시',
    paymentName: '프렌즈 체크카드',
    categoryName: '택시',
    imageNumber: 8,
  },
  {
    settlementPaymentId: 13,
    paymentId: 152,
    balance: 9000,
    merchantName: 'CU강서신호점',
    paymentName: '프렌즈 체크카드',
    categoryName: '편의점',
    imageNumber: 3,
  },
];
const SettlementFriendsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>정산할 친구를 선택해주세요</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <RoundFriends key={item.settlementPaymentId} data={item} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text="다음" />
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
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default SettlementFriendsScreen;
