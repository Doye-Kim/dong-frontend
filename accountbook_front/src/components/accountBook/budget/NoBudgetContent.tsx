import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {accountBookNavigations, colors} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import useThemeStore from '@/store/useThemeStore';

type NoBudgetScreenNavigationProp =
  StackNavigationProp<AccountBookStackParamList>;

interface NoBudgetContentProps {
  isPastMonth: boolean;
}

function NoBudgetContent({isPastMonth}: NoBudgetContentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<NoBudgetScreenNavigationProp>();
  const [budget, setBudget] = useState<number>(0);

  const handleBudgetChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setBudget(Number(numericValue));
  };

  const handleBudgetSubmit = () => {
    navigation.navigate(accountBookNavigations.BUDGETCREATE, {
      totalBudget: budget,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <Image
            style={styles.piggyBank}
            source={require('@/assets/logo.png')}
          />
          {isPastMonth ? (
            <>
              <Text style={styles.message}>예산이 설정되지 않은 달이에요!</Text>
              <Text style={styles.subMessage}>
                이미 지난 달의 예산은 설정할 수 없어요...
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.message}>아직 예산을 설정하지 않았네요!</Text>
              <Text style={styles.subMessage}>
                예산을 정해두면 계획적인 소비에 도움이 됩니다
              </Text>
              <View style={styles.budgetInputContainer}>
                <Text style={styles.budgetLabel}>한 달 예산</Text>
                <TextInput
                  style={styles.budgetInput}
                  onChangeText={handleBudgetChange}
                  keyboardType="numeric"
                  placeholder="금액을 입력하"
                  placeholderTextColor={colors[theme].GRAY_600}
                  onSubmitEditing={handleBudgetSubmit}
                  value={budget.toLocaleString()}
                />
                <Text style={styles.wonText}>원</Text>
              </View>
              {budget > 0 && (
                <View style={styles.submitButton}>
                  <CustomButton
                    text={'상세 설정으로 이동'}
                    onPress={handleBudgetSubmit}
                  />
                </View>
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20, // Add some bottom padding
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
      color: colors[theme].BLACK,
      fontFamily: 'Pretendard-Bold',
    },
    subMessage: {
      fontSize: 14,
      color: colors[theme].BLACK,
      marginBottom: 20,
      fontFamily: 'Pretendard-Medium',
    },
    budgetInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].GRAY_400,
      paddingBottom: 5,
      width: '80%',
    },
    budgetLabel: {
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
      marginRight: 10,
      color: colors[theme].BLACK,
    },
    budgetInput: {
      flex: 1,
      fontSize: 16,
      textAlign: 'right',
      color: colors[theme].BLACK,
    },
    wonText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
      marginLeft: 5,
    },
    submitButton: {
      marginTop: 50,
    },
  });

export default NoBudgetContent;
