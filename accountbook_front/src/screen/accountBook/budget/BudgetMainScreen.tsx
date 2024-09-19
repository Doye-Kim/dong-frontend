import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import { colors } from '@/constants';
import AccountBookHeader from '@/component/accountBook/common/AccountBookHeader';
import { getMonthYearDetails, getNewMonthYear } from '@/utils/date';
import NoBudgetContent from '@/components/accountBook/budget/NoBudgetContent';
import BudgetContent from '@/components/accountBook/budget/BudgetContent';

const BudgetMainScreen = () => {

  // 나중에 redux로 month, year 저장해야할듯. 일단은 이렇게
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  
  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  // 총 예산. 나중에 요청을 통해 값을 가져옴
  const [totalBudget, setTotalBudget] = useState(0);

  // 카테고리 목록. 임시로 일단 만들어둠.
  const categories_temp = [
    { categoryId: 1, name: '식비', budget: 200000, use: 184000 },
    { categoryId: 2, name: '카페', budget: 50000, use: 13000 },
    { categoryId: 3, name: '배달음식', budget: 50000, use: 53000 }, // 초과 예시
  ];

  return (
    <View style={styles.container}>
      <AccountBookHeader monthYear={monthYear} onChangeMonth={handleUpdateMonth}/>
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