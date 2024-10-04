import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
type ResponsePayment = {
  paymentsId: number;
  merchantName: string;
  categoryId: number;
  categoryName: string;
  balance: number;
  paymentName: string;
  memo: string;
  paymentTime: string;
  paymentState: 'INCLUDE' | 'EXCLUDE';
  paymentType: 'INCOME' | 'EXPENSE';
};
const PaymentItem = ({
  item,
  selectedPayments,
  setSelectedPayments,
}: {
  item: ResponsePayment;
  selectedPayments: ResponsePayment[];
  setSelectedList(selectedList: (item: ResponsePayment[]) => void): void;
}) => {
  const [checked, setChecked] = useState(false);
  const handleOnPress = () => {
    setChecked(prev => !prev);
    const isSelected = selectedPayments.some(
      payment => payment.paymentsId === item.paymentsId,
    );
    if (isSelected) {
      setSelectedPayments(prev =>
        prev.filter(payment => payment.paymentsId !== item.paymentsId),
      );
    } else {
      setSelectedPayments(prev => [...prev, item]);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[
        styles.container,
        checked && {backgroundColor: colors.ORANGE_200},
      ]}>
      <View style={styles.leftContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CategoryIcon categoryNumber={item.categoryId} size={40} />
          <View style={styles.paymentContainer}>
            <Text style={styles.titleText}>{item.merchantName}</Text>
            <Text style={styles.infoText}>
              {item.categoryName} | {item.paymentName}
            </Text>
          </View>
        </View>
        <Text style={styles.balanceText}>
          {item.paymentType === 'EXPENSE' ? '-' : '+'}
          {item.balance.toLocaleString()}원
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentContainer: {
    marginHorizontal: 10,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
  infoText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.GRAY_600,
  },
  balanceText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 22,
    color: colors.BLACK,
  },
});
export default PaymentItem;
