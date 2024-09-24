import {AddSquareSettlement} from '@/assets/icons';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import SettlementList from '@/components/accountBook/settlement/SettlementList';
import {colors} from '@/constants';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

const data = [
  {
    settlementId: 2,
    settlementState: 'YET',
    representiveMerchandise: '우버택시',
    settlementPaymentCnt: 2,
    settlementPaymentList: [
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
    ],
    settlementUserCnt: 4,
    settlementUserList: [
      {
        userId: 15,
        userName: '공원영',
        cost: 32000,
        transferState: 'FINISH',
      },
      {
        userId: 30,
        userName: '장효승',
        cost: 40000,
        transferState: 'FINISH',
      },
      {
        userId: 42,
        userName: '송도언',
        cost: 24000,
        transferState: 'YET',
      },
      {
        userId: 51,
        userName: '이현규',
        cost: 32000,
        transferState: 'FINISH',
      },
    ],
  },
  {
    settlementId: 4,
    settlementState: 'FINISH',
    settlementPaymentCnt: 4,
    representiveMerchandise: '미진축산',
    settlementPaymentList: [
      {
        settlementPaymentId: 12,
        paymentId: 157,
        balance: 15000,
        merchantName: '우버택시',
        paymentName: '프렌즈 체크카드',
        categoryName: '택시',
        imageNumber: 3,
      },
      {
        settlementPaymentId: 13,
        paymentId: 152,
        balance: 9000,
        merchantName: 'CU강서신호점',
        paymentName: '프렌즈 체크카드',
        categoryName: '편의점',
        imageNumber: 5,
      },
    ],
    settlementUserCnt: 4,
    settlementUserList: [
      {
        userId: 15,
        userName: '공원영',
        cost: 32000,
        transferState: 'FINISH',
      },
      {
        userId: 30,
        userName: '장효승',
        cost: 40000,
        transferState: 'FINISH',
      },
      {
        userId: 42,
        userName: '송도언',
        cost: 24000,
        transferState: 'YET',
      },
      {
        userId: 51,
        userName: '이현규',
        cost: 32000,
        transferState: 'FINISH',
      },
    ],
  },
  {
    settlementId: 5,
    settlementState: 'FINISH',
    settlementPaymentCnt: 2,
    representiveMerchandise: '락휴노래연습장',
    settlementPaymentList: [
      {
        settlementPaymentId: 12,
        paymentId: 157,
        balance: 15000,
        merchantName: '우버택시',
        paymentName: '프렌즈 체크카드',
        categoryName: '택시',
        imageNumber: 3,
      },
      {
        settlementPaymentId: 13,
        paymentId: 152,
        balance: 9000,
        merchantName: 'CU강서신호점',
        paymentName: '프렌즈 체크카드',
        categoryName: '편의점',
        imageNumber: 5,
      },
    ],
    settlementUserCnt: 4,
    settlementUserList: [
      {
        userId: 15,
        userName: '공원영',
        cost: 32000,
        transferState: 'FINISH',
      },
      {
        userId: 30,
        userName: '장효승',
        cost: 40000,
        transferState: 'FINISH',
      },
      {
        userId: 42,
        userName: '송도언',
        cost: 24000,
        transferState: 'YET',
      },
      {
        userId: 51,
        userName: '이현규',
        cost: 32000,
        transferState: 'FINISH',
      },
    ],
  },
  {
    settlementId: 7,
    settlementState: 'FINISH',
    settlementPaymentCnt: 6,
    representiveMerchandise: '내린천휴게소',
    settlementPaymentList: [
      {
        settlementPaymentId: 12,
        paymentId: 157,
        balance: 15000,
        merchantName: '우버택시',
        paymentName: '프렌즈 체크카드',
        categoryName: '택시',
        imageNumber: 3,
      },
      {
        settlementPaymentId: 13,
        paymentId: 152,
        balance: 9000,
        merchantName: 'CU강서신호점',
        paymentName: '프렌즈 체크카드',
        categoryName: '편의점',
        imageNumber: 5,
      },
    ],
    settlementUserCnt: 4,
    settlementUserList: [
      {
        userId: 15,
        userName: '공원영',
        cost: 32000,
        transferState: 'FINISH',
      },
      {
        userId: 30,
        userName: '장효승',
        cost: 40000,
        transferState: 'FINISH',
      },
      {
        userId: 42,
        userName: '송도언',
        cost: 24000,
        transferState: 'YET',
      },
      {
        userId: 51,
        userName: '이현규',
        cost: 32000,
        transferState: 'FINISH',
      },
    ],
  },
];
const SettlementMainScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const ongoingData = data.filter(
    settlement => settlement.settlementState === 'YET',
  );

  const completeData = data.filter(
    settlement => settlement.settlementState === 'FINISH',
  );
  return (
    <SafeAreaView style={styles.container}>
      <AccountBookHeader
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
      />
      <ScrollView style={styles.listContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.labelText}>진행 중인 정산</Text>
          <AddSquareSettlement width={40} height={40} />
        </View>
        <View>
          <SettlementList data={ongoingData} isFinished={false} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.labelText}>완료된 정산</Text>
        </View>
        <View>
          <SettlementList data={completeData} isFinished={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 150,
    backgroundColor: colors.WHITE,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 5,
    borderBottomWidth: 0.8,
    borderColor: colors.GRAY_600,
  },
  listContainer: {
    marginHorizontal: 10,
  },
  labelText: {
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_800,
    fontSize: 14,
  },
});
export default SettlementMainScreen;
