import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {Payment} from '@/types/domain';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const PaymentItem = ({
  item,
  selectedPayments,
  setSelectedPayments,
}: {
  item: Payment;
  selectedPayments: Payment[];
  setSelectedList(selectedList: (item: Payment[]) => void): void;
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
          <CategoryIcon categoryNumber={item.categoryImageNumber} size={40} />
          <View style={styles.paymentContainer}>
            <Text style={styles.titleText}>{item.merchantName}</Text>
            <Text style={styles.infoText}>
              {item.paymentName
                ? `${item.categoryName} | ${item.paymentName}`
                : item.categoryName}
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
