import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@/constants';
import AccountBookHeader from '@/components/accountBook/common/AccountBookHeader';
import NoBudgetContent from '@/components/accountBook/budget/NoBudgetContent';
import BudgetContent from '@/components/accountBook/budget/BudgetContent';
import useDateStore from '@/store/useDateStore';
import axiosInstance from '@/api/axios';
import {getDateWithSeparator} from '@/utils';
import {useFocusEffect} from '@react-navigation/native';
import useThemeStore from '@/store/useThemeStore';

type CategoryBudget = {
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  budget: number;
  use: number;
};

const BudgetMainScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const date = useDateStore(state => state.date);
  const [fetchedYearMonth, setFetchedYearMonth] = useState<string>('');
  const [budgetId, setBudgetId] = useState<number>();
  const [totalBudget, setTotalBudget] = useState(0);
  const [categories, setCategories] = useState<CategoryBudget[]>([]);

  // 지난 달의 예산은 설정할 수 없게끔, 지난 달인지 검사
  const isPastMonth = useMemo(() => {
    const currentDate = new Date();
    return (
      date.getFullYear() < currentDate.getFullYear() ||
      (date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() < currentDate.getMonth())
    );
  }, [date]);

  const fetchBudget = async (date: string) => {
    try {
      const response = await axiosInstance.get('/budgets', {
        params: {
          date,
        },
      });
      setTotalBudget(response.data.total);
      setCategories(response.data.categories);
      setBudgetId(response.data.budgetId);
    } catch (error) {
      console.log('예산 불러오기 에러 : ', (error as any).response?.data);
      setBudgetId(undefined);
    }
  };

  useEffect(() => {
    const yearMonth = getDateWithSeparator(date, '-').slice(0, 7);
    fetchBudget(yearMonth);
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      const yearMonth = getDateWithSeparator(date, '-').slice(0, 7);

      // 이미 해당 yearMonth에 대해 데이터를 가져왔다면 요청하지 않음
      if (yearMonth !== fetchedYearMonth) {
        console.log(yearMonth);
        fetchBudget(yearMonth);
        setFetchedYearMonth(yearMonth);
      }
    }, [date]),
  );

  return (
    <View style={styles.container}>
      <AccountBookHeader />
      {budgetId !== undefined ? (
        <BudgetContent
          categories={categories}
          totalBudget={totalBudget}
          budgetId={budgetId}
          isPastMonth={isPastMonth}
        />
      ) : (
        <NoBudgetContent isPastMonth={isPastMonth} />
      )}
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default BudgetMainScreen;
