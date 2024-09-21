import {BackArrow, PaymentDetailAdd} from '@/assets/icons';
import PaymentDevideItemList from '@/components/accountBook/payment/PaymentDevideItemList';
import {colors} from '@/constants';
import {Payment} from '@/types/domain';
import {getDateTimeLocaleFormat} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PaymentDevideScreenProps {}

const PaymentDevideScreen = ({}: PaymentDevideScreenProps) => {
  const [paymentData, setPaymentData] = useState<Payment>({
    payments_id: '1',
    merchantName: '올리브영',
    categoryName: '쇼핑',
    type: 'expense',
    balance: 20000,
    cardName: '프렌즈 체크카드',
    memo: '벅',
    status: 'ACCEPT',
    createdDate: '2024-08-26T08:30:00.000Z',
  });

  const [paymentDevideList, setPaymentDevideList] = useState<Payment[]>([]);
  const addPaymentDevide = () => {
    const newPaymentDivide = {
      ...paymentData,
      payments_id: Date.now().toString(),
    };

    setPaymentDevideList(prevList => [...prevList, newPaymentDivide]);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <BackArrow />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{paymentData.merchantName}</Text>
          <Text style={styles.detailValue}>{paymentData.balance}원</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>분류</Text>
          <Text style={styles.detailValue}>
            {paymentData.type === 'expense' ? '지출' : '수입'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>일시</Text>
          <Text style={styles.detailValue}>
            {getDateTimeLocaleFormat(paymentData.createdDate)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>카테고리</Text>
          <Text style={styles.detailValue}>{paymentData.categoryName}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>메모</Text>
          <Text style={styles.detailValue}>{paymentData.memo}</Text>
        </View>
      </View>
      <View style={styles.borderLineContainer}>
        <View style={styles.borderLine}></View>
      </View>
      <View style={styles.separateContainer}>
        <View style={styles.separateHeaderContainer}>
          <Text style={styles.separateHeaderText}>분리 내역</Text>
          <TouchableOpacity onPress={addPaymentDevide}>
            <PaymentDetailAdd />
          </TouchableOpacity>
        </View>
        <PaymentDevideItemList devideList={paymentDevideList} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    width: 60,
  },
  detailsContainer: {
    paddingHorizontal: 30,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    height: 45,
  },
  detailLabel: {
    fontSize: 18,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK,
  },
  detailValue: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  borderLineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  borderLine: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.GRAY_600,
  },
  separateContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  separateHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  separateHeaderText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Light',
    color: colors.BLACK,
  },
});

export default PaymentDevideScreen;
