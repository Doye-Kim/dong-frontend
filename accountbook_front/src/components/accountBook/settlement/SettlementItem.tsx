import {DropdownButton, DropdownButtonWhite} from '@/assets/icons';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PaymentItemList from '../payment/PaymentItemList';
import CategoryIcon from '@/components/common/CategoryIcon';
import UserStateItem from './UserStateItem';
interface PaymentItemProps {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
}
interface PaymentUserProps {
  userId: number;
  userName: string;
  cost: number;
  transferState: string;
}

type Payment = {
  payments_id: string;
  merchantName: string;
  categoryName: string;
  balance: number;
  cardName: string;
  memo: string;
  createdDate: string;
  imageNumber: number;
};
interface SettlementProps {
  settlementId: number;
  settlementState: string;
  representiveMerchandise: string;
  settlementPaymentCnt: number;
  settlementPaymentList: PaymentItemProps[];
  settlementUserCnt: number;
  settlementUserList: PaymentUserProps[];
}
const SettlementItem = ({
  data,
  isFinished,
}: {
  data: SettlementProps;
  isFinished: boolean;
}) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handlePressTitle = () => {
    setIsOpenDetail(prev => !prev);
  };

  const transformPaymentList = (paymentList: PaymentItemProps[]): Payment[] => {
    return paymentList.map(payment => ({
      payments_id: payment.paymentId.toString(),
      merchantName: payment.merchantName,
      categoryName: payment.categoryName,
      balance: payment.balance,
      cardName: payment.paymentName,
      imageNumber: payment.imageNumber,
      memo: '', // memo와 createdDate는 데이터를 추가하거나 기본값을 지정
      createdDate: '',
    }));
  };
  const transformedPayments = transformPaymentList(data.settlementPaymentList);
  return (
    <View>
      <TouchableOpacity
        onPress={handlePressTitle}
        style={[
          styles.itemTitleContainer,
          isFinished && {backgroundColor: colors.GRAY_600},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.titleText, isFinished && {color: colors.BLACK}]}>
            {data.representiveMerchandise}
            {data.settlementPaymentCnt > 1
              ? ` 외 ${data.settlementPaymentCnt - 1}건`
              : ''}
          </Text>
          {isFinished ? <DropdownButton /> : <DropdownButtonWhite />}
        </View>
        {!isFinished && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {isOpenDetail && (
        <>
          <View style={styles.paymentListContainer}>
            {transformedPayments.map(item => (
              <TouchableOpacity
                style={styles.itemContainer}
                key={item.payments_id}>
                <CategoryIcon categoryNumber={item.imageNumber} size={40} />
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <View style={styles.merchantInfo}>
                      <Text style={styles.merchantName}>
                        {item.merchantName}
                      </Text>
                      <Text style={styles.details}>
                        {item.categoryName} | {item.cardName}
                      </Text>
                    </View>
                    <View style={styles.balanceContainer}>
                      <Text style={styles.balance}>
                        {item.balance.toLocaleString()}원
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginVertical: 10}}>
            {data.settlementUserList.map(item => (
              <UserStateItem data={item} />
            ))}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  itemTitleContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.PRIMARY,
  },
  titleText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.WHITE,
    marginRight: 10,
  },
  buttonContainer: {
    backgroundColor: colors.ORANGE_200,
    height: 30,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: colors.PRIMARY,
  },
  paymentListContainer: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.GRAY_500,
  },
  itemContainer: {
    // paddingVertical: 12,
    // paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    marginLeft: 16,
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  details: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: colors.GRAY_500,
    marginTop: 2,
  },
});

export default SettlementItem;
