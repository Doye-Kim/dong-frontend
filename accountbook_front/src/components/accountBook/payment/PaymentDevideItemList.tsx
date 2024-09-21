import { colors } from '@/constants';
import { Payment } from '@/types/domain';
import { getDateTimeLocaleFormat } from '@/utils';
import React from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

interface PaymentDevideItemListProps {
  devideList? : Payment[];
}

const renderItem = ({ item }: { item: Payment }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemHeader}>{item.merchantName}</Text>
      <TextInput style={styles.itemDetail}>{item.balance.toLocaleString()}원</TextInput>
    </View>
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemHeader}>분류</Text>
      <Text style={styles.itemDetail}>{item.type === 'expense' ? '지출' : '수입'}</Text>
    </View>
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemHeader}>일시</Text>
      <Text style={styles.itemDetail}>{getDateTimeLocaleFormat(item.createdDate)}</Text>
    </View>
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemHeader}>카테고리</Text>
      <Text style={styles.itemDetail}>{item.categoryName}</Text>
    </View>
    <View style={styles.itemDetailContainer}>
      <Text style={styles.itemHeader}>메모</Text>
      <TextInput style={styles.itemDetail}>{item.memo}</TextInput>
    </View>
  </View>
);

const PaymentDevideItemList = ({devideList}: PaymentDevideItemListProps) => {
  return (
    <FlatList
      data={devideList}
      renderItem={renderItem}
      keyExtractor={(item) => item.payments_id}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
  },
  itemContainer: {
    backgroundColor: colors.GRAY_200,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10
  },
  itemDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    alignItems: 'center',
    height: 20,
  },
  itemHeader: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  itemDetail: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    padding: 0,
  }
});

export default PaymentDevideItemList;