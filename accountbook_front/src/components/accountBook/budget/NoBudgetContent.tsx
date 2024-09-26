import React, { useState } from 'react';
import {StyleSheet, View, Image, Text, TextInput} from 'react-native';
import { accountBookNavigations, colors } from '@/constants'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountBookStackParamList } from '@/navigations/stack/accountBook/AccountBookStackNavigator';

type NoBudgetScreenNavigationProp = StackNavigationProp<AccountBookStackParamList>;

interface NoBudgetContentProps {}

function NoBudgetContent({}: NoBudgetContentProps) {
  const navigation = useNavigation<NoBudgetScreenNavigationProp>();
  const [budget, setBudget] = useState('');

  const handleBudgetChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setBudget(numericValue);
  };

  const handleBudgetSubmit = () => {
    navigation.navigate(accountBookNavigations.BUDGETCREATE);
  };

  return (
      <View style={styles.content}>
        <Image
          style={styles.piggyBank}
          source={require('@/assets/logo.png')}></Image>
        <Text style={styles.message}>아직 예산을 설정하지 않았네요!</Text>
        <Text style={styles.subMessage}>
          예산을 정해두면 계획적인 소비에 도움이 됩니다
        </Text>
        <View style={styles.budgetInputContainer}>
          <Text style={styles.budgetLabel}>한 달 예산</Text>
          <TextInput
            style={styles.budgetInput}
            value={budget}
            onChangeText={handleBudgetChange}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.GRAY_200}
            onSubmitEditing={handleBudgetSubmit}
          />
          <Text style={styles.wonText}>원</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  content: {
    flex: 1,
    top: '20%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  piggyBank: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold'
  },
  subMessage: {
    fontSize: 14,
    color: colors.BLACK,
    marginBottom: 20,
    fontFamily: 'Pretendard-Medium'
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
    paddingBottom: 5,
    width: '80%',
  },
  budgetLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: colors.BLACK,
  },
  wonText: {
    fontSize: 16,
    marginLeft: 5,
  },

});

export default NoBudgetContent;
