import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {BackArrow, MeatballMenuIcon} from '@/assets/icons';
import {getDateTimeLocaleFormat} from '@/utils';
import {colors} from '@/constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type RouteParams = {
  PaymentDetail: {paymentId: string};
};

type Payment = {
  payments_id: string;
  merchantName: string;
  categoryName: string;
  type: 'expense' | 'income';
  balance: number;
  cardName: string;
  memo: string;
  status: string;
  createdDate: string;
};

const PaymentDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'PaymentDetail'>>();
  const navigation = useNavigation();

  const [paymentData, setPaymentData] = useState<Payment>({
    payments_id: '1',
    merchantName: '올리브영',
    categoryName: '쇼핑',
    type: 'expense',
    balance: 20000,
    cardName: '프렌즈 체크카드',
    memo: '',
    status: 'ACCEPT',
    createdDate: '2024-08-26T08:30:00.000Z',
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <BackArrow />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>{paymentData.merchantName}</Text>
            <View style={styles.headerRight}>
              <Text style={styles.amountText}>
                {paymentData.balance.toLocaleString()}원
              </Text>
              <TouchableOpacity onPress={() => {}} style={styles.moreButton}>
                <MeatballMenuIcon />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>분류</Text>
              <View style={styles.categoryContainer}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    paymentData.type === 'income' && styles.selectedButton,
                  ]}>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      paymentData.type === 'income' && styles.selectedButtonText,
                    ]}>
                    수입
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    paymentData.type === 'expense' && styles.selectedButton,
                  ]}>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      paymentData.type === 'expense' && styles.selectedButtonText,
                    ]}>
                    지출
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>일시</Text>
              <Text style={styles.detailValue}>
                {getDateTimeLocaleFormat(paymentData.createdDate)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>카테고리</Text>
              <Text style={styles.detailValue}>{paymentData.categoryName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>메모</Text>
              <TextInput
                style={styles.memoInput}
                placeholder="메모를 입력하세요"
                placeholderTextColor={colors.GRAY_400}
                onChangeText={text =>
                  setPaymentData({...paymentData, memo: text})
                }
                value={paymentData.memo}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.detailLabel}>지출에서 제외</Text>
              <Switch value={false} onValueChange={() => {}} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  moreButton: {
    padding: 8,
  },
  amountText: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    height: 40,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_600,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    marginLeft: 8,
  },
  selectedButton: {
    borderColor: colors.PRIMARY,
  },
  categoryButtonText: {
    color: colors.GRAY_600,
    fontSize: 14,
    bottom: 1
  },
  selectedButtonText: {
    color: colors.PRIMARY,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memoInput: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    width: '80%',
    textAlign: 'right',
    padding: 0,
  },
  buttonContainer: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: colors.PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold'
  },
});

export default PaymentDetailScreen;