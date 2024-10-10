import RoundCost from '@/components/accountBook/settlement/RoundCost';
import CustomButton from '@/components/common/CustomButton';
import {accountBookNavigations, colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import useThemeStore from '@/store/useThemeStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const SettlementCostScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();
  const {paymentList, settlementPaymentList} = useSettlementCreateStore();
  const handlePressNext = () => {
    navigation.navigate(accountBookNavigations.ACCOUNT, {pageNumber: 1});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>정산 금액을 확인하세요</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {paymentList.map((item, index) => (
          <RoundCost
            key={item.paymentsId}
            paymentData={item}
            userData={settlementPaymentList[index].settlementUserList}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text="다음" onPress={handlePressNext} />
      </View>
    </SafeAreaView>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
      marginBottom: 20,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
export default SettlementCostScreen;
