import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Payment} from '@/types/domain';
import PaymentDivideItem from './PaymentDivideItem';

interface PaymentDivideItemListProps {
  divideList?: Payment[];
  onDelete: (paymentsId: number) => void;
  onUpdate: (updatedPayment: Payment) => void;
}

const PaymentDivideItemList = ({
  divideList = [],
  onDelete,
  onUpdate,
}: PaymentDivideItemListProps) => {
  return (
    <ScrollView style={styles.list}>
      {divideList.map((item, index) => (
        <PaymentDivideItem
          key={`list1-${item.paymentsId}-${index}`}
          item={item}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
  },
});

export default PaymentDivideItemList;
