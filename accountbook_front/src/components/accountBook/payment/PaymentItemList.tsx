import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {accountBookNavigations, colors} from '@/constants';
import PaymentItem from './PaymentItem'; // 새로 만든 PaymentItem 컴포넌트
import {formatDateToDayOfWeek} from '@/utils';
import {Payment} from '@/types/domain';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';

type GroupedPayments = Record<string, Payment[]>;

interface PaymentItemListProps {
  payments?: Payment[];
}

const groupPaymentsByDate = (payments: Payment[]) => {
  if (!payments || payments.length === 0) return {};
  return payments.reduce((acc, payment) => {
    const date = payment.createdDate.slice(0, 10); // Extract the date (YYYY-MM-DD)
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(payment);
    return acc;
  }, {} as GroupedPayments);
};

const PaymentItemList = ({payments = []}: PaymentItemListProps) => {
  const navigation =
    useNavigation<StackNavigationProp<AccountBookStackParamList>>();
  const groupedPayments: GroupedPayments = groupPaymentsByDate(payments);

  const handlePaymentPress = (paymentId: string) => {
    navigation.navigate(accountBookNavigations.PAYMENTDETAIL, {paymentId});
  };

  const renderGroup = ({item}: {item: string}) => {
    return (
      <View key={item} style={styles.dateGroup}>
        <Text style={styles.dateHeader}>{formatDateToDayOfWeek(item)}</Text>
        {groupedPayments[item].map(payment => (
          <PaymentItem
            key={payment.payments_id}
            payment={payment}
            onPress={handlePaymentPress}
          />
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={Object.keys(groupedPayments)}
      renderItem={renderGroup}
      keyExtractor={item => item}
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
    borderColor: colors.GRAY_600,
  },
});

export default PaymentItemList;
