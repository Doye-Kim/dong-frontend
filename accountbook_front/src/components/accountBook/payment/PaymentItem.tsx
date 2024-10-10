import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {Payment} from '@/types/domain';
import useThemeStore from '@/store/useThemeStore';

interface PaymentItemProps {
  payment: Payment;
  onPress?: (paymentId: number) => void;
  isAssetData?: boolean;
}

const PaymentItem = ({payment, onPress, isAssetData}: PaymentItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {
    paymentsId,
    paymentName,
    merchantName,
    categoryName,
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
                paymentState === 'EXCLUDE' && !isAssetData && styles.excludeItem,
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
                paymentState === 'EXCLUDE' && !isAssetData && styles.excludeItem,
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

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
    },
    balanceContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    balance: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    details: {
      fontSize: 13,
      color: colors[theme].GRAY_500,
      marginTop: 2,
    },
    excludeItem: {
      color: colors[theme].GRAY_500,
    },
  });

export default PaymentItem;
