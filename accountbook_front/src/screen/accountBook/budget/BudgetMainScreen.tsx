import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import { colors } from '@/constants';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import NoBudgetContent from '@/components/accountBook/budget/NoBudgetContent';
import BudgetContent from '@/components/accountBook/budget/BudgetContent';
import useDateStore from '@/store/useDateStore';

const BudgetMainScreen = () => {

  const date = useDateStore(state => state.date);
  // 총 예산. 나중에 요청을 통해 값을 가져옴
  const [totalBudget, setTotalBudget] = useState(300000);

  // 카테고리 목록. 임시로 일단 만들어둠.
  const categories_temp = [
    { categoryId: 1, name: '식비', budget: 200000, use: 184000 },
    { categoryId: 2, name: '카페', budget: 50000, use: 13000 },
    { categoryId: 3, name: '배달음식', budget: 50000, use: 53000 }, // 초과 예시
  ];

  return (
    <View style={styles.container}>
      <AccountBookHeader />
      {totalBudget === 0 ? <NoBudgetContent /> : <BudgetContent categories={categories_temp} totalBudget={totalBudget}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default BudgetMainScreen;