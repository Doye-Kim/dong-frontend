import {accountBookNavigations, colors} from '@/constants';
import {AccountBookStackParamList} from '@/navigations/stack/accountBook/AccountBookStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {Payment} from '@/types/domain';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface PaymentOptionProps {
  onClose: () => void;
  payment: Payment;
}

type PaymentOptionNavigationProp =
  StackNavigationProp<AccountBookStackParamList>;

const PaymentOption = ({onClose, payment}: PaymentOptionProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<PaymentOptionNavigationProp>();
  const handleDividePress = () => {
    onClose(); // 모달을 닫습니다
    navigation.navigate(accountBookNavigations.PAYMENTDIVIDE, {payment});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.option} onPress={handleDividePress}>
        <Text style={styles.optionText}>내역 분리</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>1/N 정산</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].GRAY_200,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    closeButton: {
      padding: 5,
    },
    closeButtonText: {
      fontSize: 30,
      color: colors[theme].GRAY_500,
    },
    option: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    optionText: {
      fontSize: 16,
      color: colors[theme].BLACK,
      fontFamily: 'Pretendard-Medium',
    },
  });

export default PaymentOption;
