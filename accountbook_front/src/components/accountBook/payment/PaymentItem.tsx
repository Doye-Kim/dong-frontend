import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {Payment} from '@/types/domain';

interface PaymentItemProps {
  payment: Payment;
  onPress?: (paymentId: number) => void;
}

const PaymentItem = ({payment, onPress}: PaymentItemProps) => {
  const {
    paymentsId,
    paymentName,
    merchantName,
    categoryName,
    categoryId,
    categoryImageNumber,
    balance,
    paymentState,
  } = payment;

  const handlePress = (payments_id: number) => {
    if (onPress) {
      onPress(payments_id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(paymentsId)}>
      <CategoryIcon
        categoryNumber={categoryImageNumber ? categoryImageNumber : 0}
        size={40}
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.merchantInfo}>
            <Text
              style={[
                styles.merchantName,
                paymentState === 'EXCLUDE' && styles.excludeItem,
              ]}>
              {merchantName}
            </Text>
            {paymentName ? (
              <Text style={styles.details}>
                {categoryName} | {paymentName}
              </Text>
            ) : (
              <Text style={styles.details}>{categoryName}</Text>
            )}
          </View>
          <View style={styles.balanceContainer}>
            <Text
              style={[
                styles.balance,
                paymentState === 'EXCLUDE' && styles.excludeItem,
              ]}>
              {payment.paymentType === 'INCOME' ? '+ ' : '- '}
              {balance.toLocaleString()}원
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    marginLeft: 16,
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  details: {
    fontSize: 13,
    color: colors.GRAY_500,
    marginTop: 2,
  },
  excludeItem: {
    color: colors.GRAY_500,
  },
});

export default PaymentItem;
