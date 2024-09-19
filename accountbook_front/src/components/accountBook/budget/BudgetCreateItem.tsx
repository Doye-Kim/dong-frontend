import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants';

type BudgetCategory = {
  id: string;
  name: string;
  icon: string;
  budget?: number;
};

type BudgetCreateItemProps = {
  category: BudgetCategory;
  onUpdateCategory: (id: string, amount: number) => void;
};

const BudgetCreateItem = ({ category, onUpdateCategory }: BudgetCreateItemProps) => {

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    onUpdateCategory(category.id, parseInt(numericValue) || 0);
  };

  return (
    <View style={styles.categoryItem}>
      <Image source={require("@/assets/accountIcon.png")} style={styles.categoryIcon}/>
      <Text style={styles.categoryName}>{category.name}</Text>
      <TextInput
        style={styles.categoryBudget}
        value={category.budget ? formatNumber(category.budget) : ''}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        placeholder="0"
      />
      <Text style={styles.wonText}>원</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  categoryIcon: {
    width: 30,
    marginRight: 10,
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  categoryBudget: {
    width: 200,
    paddingVertical: 0,
    textAlign: 'right',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.GRAY_700,
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
  wonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginLeft: 5,
  },
});

export default BudgetCreateItem;