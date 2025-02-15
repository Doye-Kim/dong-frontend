import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {colors} from '@/constants';
import {Payment} from '@/types/domain';
import {getDateLocaleFormat, getTimeLocalFormat} from '@/utils';
import Toast from 'react-native-toast-message';
import CategorySelectModal from '../common/CategorySelectModal';
import useThemeStore from '@/store/useThemeStore';

interface PaymentDivideItemProps {
  item: Payment;
  onDelete: (paymentsId: number) => void;
  onUpdate: (updatedPayment: Payment) => void;
}

const PaymentDivideItem = ({
  item,
  onDelete,
  onUpdate,
}: PaymentDivideItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [balanceEditStatus, setBalanceEditStatus] = useState<boolean>(false);
  const [memoEditStatus, setMemoEditStatus] = useState<boolean>(false);
  const [inputBalanceValue, setInputBalanceValue] = useState<string>(
    item.balance.toString(),
  );
  const [inputMemoValue, setInputMemoValue] = useState<string>(item.memo);

  const balanceInputRef = useRef<TextInput>(null); // Balance Input의 Ref

  // 카테고리 선택 시 onUpdate 호출
  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    onUpdate({
      ...item,
      categoryId,
      categoryName,
    });
    toggleCategoryModal();
  };

  // 카테고리 모달 토글
  const toggleCategoryModal = () => {
    if (!isCategoryModalVisible) {
      setIsCategoryModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsCategoryModalVisible(false);
      });
    }
  };

  const toggleBalanceEditStatus = () => {
    setBalanceEditStatus(prev => !prev);
  };

  const toggleMemoEditStatus = () => {
    setMemoEditStatus(prev => !prev);
  };

  const handleBlurBalance = () => {
    const newBalance = parseFloat(inputBalanceValue.replace(/[^0-9]/g, ''));
    if (!isNaN(newBalance) && newBalance > 0) {
      onUpdate({
        ...item,
        balance: newBalance,
      });
      setBalanceEditStatus(false);
    } else {
      Toast.show({
        type: 'error',
        text1: '금액은 0보다 커야합니다',
      });
      balanceInputRef.current?.focus();
    }
  };

  const handleBlurMemo = () => {
    onUpdate({
      ...item,
      memo: inputMemoValue,
    });
    setMemoEditStatus(false);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemDeleteContainer}
        onPress={() => onDelete(item.paymentsId)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>

      {/* 금액 표시 및 수정 */}
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemHeader}>{item.merchantName}</Text>
        {balanceEditStatus ? (
          <TextInput
            ref={balanceInputRef} // TextInput에 Ref 설정
            style={[styles.itemDetail, styles.editDetail, {width: 150}]}
            placeholder="금액"
            placeholderTextColor={colors[theme].GRAY_600}
            value={inputBalanceValue}
            onChangeText={setInputBalanceValue}
            onBlur={handleBlurBalance}
            keyboardType="numeric"
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={toggleBalanceEditStatus}>
            <Text style={[styles.itemDetail, styles.itemCanInput]}>
              {item.balance.toLocaleString()}원
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 분류 표시 */}
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemHeader}>분류</Text>
        <Text style={styles.itemDetail}>
          {item.paymentType === 'EXPENSE' ? '지출' : '수입'}
        </Text>
      </View>

      {/* 일시 표시 */}
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemHeader}>일시</Text>
        <Text style={styles.itemDetail}>
          {getDateLocaleFormat(item.paymentTime)}{' '}
          {getTimeLocalFormat(item.paymentTime)}
        </Text>
      </View>

      {/* 카테고리 선택 */}
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemHeader}>카테고리</Text>
        <TouchableOpacity onPress={toggleCategoryModal}>
          <Text style={[styles.itemDetail, styles.itemCanInput]}>
            {item.categoryName || '카테고리 선택'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 메모 입력 및 수정 */}
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemHeader}>메모</Text>
        {memoEditStatus ? (
          <TextInput
            style={[styles.itemDetail, styles.editDetail]}
            placeholder="메모"
            placeholderTextColor={colors[theme].GRAY_600}
            value={inputMemoValue}
            onChangeText={setInputMemoValue}
            onBlur={handleBlurMemo}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={toggleMemoEditStatus}>
            <Text style={[styles.itemDetail, styles.itemCanInput]}>
              {item.memo || '메모를 입력하세요'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 카테고리 선택 모달 */}
      <CategorySelectModal
        isVisible={isCategoryModalVisible}
        toggleModal={toggleCategoryModal}
        onCategorySelect={handleCategorySelect}
        slideAnim={slideAnim}
      />
    </View>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    itemContainer: {
      backgroundColor: colors[theme].GRAY_200,
      width: '100%',
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginBottom: 10,
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
      color: colors[theme].BLACK,
    },
    itemDetail: {
      fontSize: 15,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      padding: 0,
    },
    itemDeleteContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginVertical: 7,
      alignItems: 'center',
    },
    deleteButton: {
      color: colors[theme].WHITE,
      fontSize: 15,
      fontFamily: 'Pretendard-Bold',
      textAlign: 'center',
      paddingVertical: 3,
      paddingHorizontal: 9,
      borderRadius: 10,
      backgroundColor: colors[theme].RED_500,
    },
    bottomModalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomModalContent: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      maxHeight: '50%',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Pretendard-Bold',
      marginBottom: 20,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: colors[theme].PRIMARY,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    closeButtonText: {
      color: colors[theme].WHITE,
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
    },
    editDetail: {
      borderBottomWidth: 1,
      borderColor: colors[theme].BLACK,
      width: 250,
      textAlign: 'right',
    },
    itemCanInput: {
      borderBottomWidth: 1,
    },
  });

export default PaymentDivideItem;
