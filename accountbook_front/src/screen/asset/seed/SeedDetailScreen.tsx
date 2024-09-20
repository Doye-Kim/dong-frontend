import CustomButton from '@/components/common/CustomButton';
import SeedInfo from '@/components/seed/SeedInfo';
import SeedTitle from '@/components/seed/SeedTitle';
import {colors} from '@/constants';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type statusOptions = 'PROCEEDING' | 'CANCELED' | 'COMPLETED';

const status: Record<statusOptions, string> = {
  PROCEEDING: '진행중',
  CANCELED: '해지',
  COMPLETED: '완료',
};

const data = {
  id: 11,
  depositAccount: '한국은행',
  withdrawAccount: '카카오뱅크',
  title: '이현규 이별 PARTY',
  period: 'MONTHLY',
  targetAmount: 500,
  entireRound: 13,
  endDate: '2025-09-30',
  status: 'PROCEEDING', // PROCEEDING, CANCELED, COMPLETED
  passedRound: 10,
  dueDate: '2024-09-25', // 다음 출금 예정일
  totalTransferredAmount: 266, // 현재까지 송금한 금액
  rounds: [
    {
      id: 51,
      status: 'FAIL',
      transferDate: '2024-09-25',
    },
    {
      id: 52,
      status: 'SUCCESS',
      transferDate: '2024-10-25',
    },
    {
      id: 53,
      status: 'SUCCESS',
      transferDate: '2024-11-25',
    },
    {
      id: 54,
      status: 'SUCCESS',
      transferDate: '2024-12-25',
    },
    {
      id: 55,
      status: 'FAIL',
      transferDate: '2025-01-25',
    },
    {
      id: 56,
      status: 'FAIL',
      transferDate: '2025-02-25',
    },
    {
      id: 57,
      status: 'SUCCESS',
      transferDate: '2025-03-25',
    },
    {
      id: 58,
      status: 'SUCCESS',
      transferDate: '2025-04-25',
    },
    {
      id: 59,
      status: 'SUCCESS',
      transferDate: '2025-05-25',
    },
    {
      id: 60,
      status: 'SUCCESS',
      transferDate: '2025-06-25',
    },
    {
      id: 61,
      status: 'NONE',
      transferDate: '2025-07-25',
    },
    {
      id: 62,
      status: 'NONE',
      transferDate: '2025-08-25',
    },
    {
      id: 63,
      status: 'NONE',
      transferDate: '2025-09-25',
    },
  ],
};

const width = Dimensions.get('window').width - 20;

const SeedDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SeedTitle
        title={data.title}
        targetAmount={data.targetAmount}
        entireRound={data.entireRound}
        dataStatus={data.status}
        passedRound={data.passedRound}
        totalTransferredAmount={data.totalTransferredAmount}
      />
      <SeedInfo
        depositAccount={data.depositAccount}
        withdrawAccount={data.withdrawAccount}
        endDate={data.endDate}
        dueDate={data.dueDate}
        perPaymentDeposit={Math.round(data.targetAmount / data.entireRound)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>해지하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 70,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.ORANGE_500,
    height: 50,
    width: 200,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.WHITE,
  },
});
export default SeedDetailScreen;
