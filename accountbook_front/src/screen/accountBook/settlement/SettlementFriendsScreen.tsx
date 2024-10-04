import RoundFriends from '@/components/accountBook/settlement/RoundFriends';
import CustomButton from '@/components/common/CustomButton';
import {accountBookNavigations, colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const SettlementFriendsScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();
  const {paymentList, settlementPaymentList} = useSettlementCreateStore();

  const handlePressNext = () => {
    let flag = true;
    settlementPaymentList.map(item => {
      if (item.settlementUserList.length === 1) {
        flag = false;
      }
    });
    if (flag) {
      navigation.navigate(accountBookNavigations.SETTLEMENTCOST);
    } else {
      Toast.show({
        type: 'error',
        text1: '친구를 최소 한 명 이상 선택해 주세요',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>정산할 친구를 선택해주세요</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {paymentList &&
          paymentList.map(item => (
            <RoundFriends key={item.paymentsId} data={item} />
          ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text="다음" onPress={handlePressNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
    marginBottom: 20,
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
  },
});
export default SettlementFriendsScreen;
