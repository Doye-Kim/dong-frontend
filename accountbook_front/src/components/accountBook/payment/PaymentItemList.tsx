import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/constants';
import CategoryIcon from '@/components/common/CategoryIcon';
import { formatDateToDayOfWeek } from '@/utils';

type Payment = {
  payments_id: string;
  merchantName: string;
  categoryName: string;
  categoryNumber?: string;
  balance: number;
  cardName: string;
  memo: string;
  createdDate: string;
};

type GroupedPayments = Record<string, Payment[]>;

interface PaymentItemListProps {
  payments?: Payment[];
}

type RootStackParamList = {
  PaymentDetail: { paymentId: string };
};

type PaymentDetailNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentDetail'>;

const groupPaymentsByDate = (payments: Payment[]) => {
  if (!payments || payments.length === 0) return {};
  return payments.reduce((acc, payment) => {
    const date = payment.createdDate.slice(0, 10); // Extract the date (YYYY-MM-DD)
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(payment);
    return acc;
  }, {} as Record<string, Payment[]>);
};

const PaymentItemList = ({ payments = [] }: PaymentItemListProps) => {
  const navigation = useNavigation<PaymentDetailNavigationProp>();
  const groupedPayments: GroupedPayments = groupPaymentsByDate(payments);
  // console.log(groupedPayments);
  const handlePaymentPress = (paymentId: string) => {
    navigation.navigate('PaymentDetail', { paymentId });
  };

  const renderPayment = (item: Payment) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      key={item.payments_id}
      onPress={() => handlePaymentPress(item.payments_id)}
    >
      <CategoryIcon categoryNumber={item.categoryNumber? Number(item.categoryNumber) : 0} size={40} /> 
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName}>{item.merchantName}</Text>
            <Text style={styles.details}>
              {item.categoryName} | {item.cardName}
            </Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>
              {item.balance.toLocaleString()}원
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGroup = ({ item }: { item: string }) => {
    console.log(groupedPayments[item]); // 날짜 (ex. "2024-09-06")가 올바르게 출력되는지 확인
    return (
      <View key={item} style={styles.dateGroup}>
        <Text style={styles.dateHeader}>{formatDateToDayOfWeek(item)}</Text>
        {groupedPayments[item].map(payment => renderPayment(payment))}
      </View>
    );
  };

  return (
    <FlatList
      data={Object.keys(groupedPayments)}
      renderItem={renderGroup}
      keyExtractor={(item) => item}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 10,
    marginBottom: 60,
  },
  dateGroup: {
    marginTop: 20,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.GRAY_800,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderColor: colors.GRAY_600
  },
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
});

export default PaymentItemList;