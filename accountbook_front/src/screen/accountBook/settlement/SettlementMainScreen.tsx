import {ResponseSettlements, getSettlements} from '@/api/settlement';
import {AddSquareSettlement} from '@/assets/icons';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import SettlementList from '@/components/accountBook/settlement/SettlementList';

import {accountBookNavigations, colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import {
  getDateWithSeparator,
  getMonthYearDetails,
  getNewMonthYear,
} from '@/utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useState} from 'react';

import useDateStore from '@/store/useDateStore';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import useSettlementCreateStore from '@/store/useSettlementCreate';

const SettlementMainScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {resetSettlement} = useSettlementCreateStore();
  const [settlementData, setSettlementData] = useState<ResponseSettlements[]>();
  const [ongoingData, setOnGoingData] = useState<ResponseSettlements[]>();
  const [completeData, setCompleteData] = useState<ResponseSettlements[]>();
  const date = useDateStore(state => state.date);
  const yearMonth = getDateWithSeparator(date, '-').slice(0, 7);
  const getData = async () => {
    console.log('getdata');
    try {
      const data = await getSettlements(yearMonth);
      console.log(data);
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.settlementDate).getTime() -
          new Date(a.settlementDate).getTime(),
      );

      setSettlementData(sortedData);
      const ongoing = sortedData.filter(
        settlement => settlement.settlementState === 'YET',
      );
      const complete = sortedData.filter(
        settlement => settlement.settlementState === 'FINISH',
      );
      setOnGoingData(ongoing);
      setCompleteData(complete);
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: '정산 데이터를 불러오는 데 문제가 생겼어요',
      });
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const handleOnPressAdd = () => {
    resetSettlement();
    navigation.navigate(accountBookNavigations.SETTLEMENTPAYMENTS);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <AccountBookHeader
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
      />
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.labelText}>진행 중인 정산</Text>
            <TouchableOpacity onPress={handleOnPressAdd}>
              <AddSquareSettlement width={40} height={40} />
            </TouchableOpacity>
          </View>
          {ongoingData && ongoingData.length > 0 ? (
            <View>
              <SettlementList
                data={ongoingData}
                isFinished={false}
                refresh={() => getData()}
              />
            </View>
          ) : (
            <Text style={styles.infoText}>진행 중인 정산이 없습니다.</Text>
          )}
          {completeData && completeData.length > 0 && (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.labelText}>완료된 정산</Text>
              </View>
              <View style={{marginBottom: 80}}>
                <SettlementList data={completeData} isFinished={true} />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      backgroundColor: colors[theme].WHITE,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: 5,
      borderBottomWidth: 0.8,
      borderColor: colors[theme].GRAY_600,
    },
    listContainer: {
      marginHorizontal: 10,
      marginBottom: 70,
    },
    labelText: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
      fontSize: 14,
    },
    infoText: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
      textAlign: 'center',
      margin: 20,
      fontSize: 16,
    },
  });
export default SettlementMainScreen;
