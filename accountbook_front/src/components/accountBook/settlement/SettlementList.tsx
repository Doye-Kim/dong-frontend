import {StyleSheet, Text, View} from 'react-native';
import SettlementItem from './SettlementItem';
import {colors} from '@/constants';

interface paymentListProps {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
}
interface settlementProps {
  settlementId: number;
  settlementState: string;
  settlementDate: string;
  representiveMerchandise: string;
  settlementPaymentCnt: number;
  settlementPaymentList: paymentListProps[];
}
const SettlementList = ({
  data,
  isFinished,
  refresh,
}: {
  data: settlementProps[];
  isFinished: boolean;
  refresh?: () => void;
}) => {
  return (
    <View>
      {data.map((item, index) => {
        const prevItem = index > 0 ? data[index - 1] : null; // 이전 아이템 가져오기
        const showDate =
          index === 0 || item.settlementDate !== prevItem?.settlementDate; // 첫 번째 아이템이거나 이전 날짜와 다를 때
        return (
          <>
            {showDate && (
              <Text style={styles.dateText}>{item.settlementDate}</Text>
            )}
            <SettlementItem
              key={item.settlementId + item.settlementPaymentCnt}
              data={item}
              isFinished={isFinished}
              refresh={refresh}
            />
          </>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  dateText: {
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_600,
    marginTop: 5,
  },
});
export default SettlementList;
