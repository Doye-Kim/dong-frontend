import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@/constants';
import CategoryIcon from '@/components/common/CategoryIcon';
import {CloseButton} from '@/assets/icons';
import useThemeStore from '@/store/useThemeStore';

type CategoryBudgetCreate = {
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  budget: number;
  use?: number;
};

type BudgetCreateItemProps = {
  category: CategoryBudgetCreate;
  onUpdateCategory: (id: number, amount: number) => void;
  onDeleteCategory: (categoryId: number) => void;
  onSubmitEditing: () => void;
  inputRef: (el: TextInput | null) => void;
};

const BudgetCreateItem = ({
  category,
  onUpdateCategory,
  onDeleteCategory,
  onSubmitEditing,
  inputRef,
}: BudgetCreateItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    onUpdateCategory(category.categoryId, parseInt(numericValue) || 0);
  };

  return (
    <View style={styles.categoryItem}>
      <CategoryIcon
        categoryNumber={Number(category.categoryImageNumber)}
        size={40}
      />
      <Text style={styles.categoryName}>{category.categoryName}</Text>
      <TextInput
        ref={inputRef}
        style={styles.categoryBudget}
        value={category.budget ? formatNumber(category.budget) : ''}
        onChangeText={handleChangeText}
        onSubmitEditing={onSubmitEditing}
        keyboardType="numeric"
        placeholder="0"
      />
      <Text style={styles.wonText}>원</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteCategory(category.categoryId)}>
        <CloseButton />
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      paddingVertical: 5,
    },
    categoryName: {
      flex: 1,
      fontSize: 18,
      marginLeft: 10,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    categoryBudget: {
      width: 150,
      paddingVertical: 0,
      textAlign: 'right',
      borderBottomWidth: 1.5,
      borderBottomColor: colors[theme].GRAY_700,
      fontSize: 20,
      fontFamily: 'Pretendard-Medium',
    },
    wonText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      marginLeft: 5,
    },
    deleteButton: {
      alignItems: 'center',
      padding: 10,
    },
    deleteButtonText: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
  });

export default BudgetCreateItem;
