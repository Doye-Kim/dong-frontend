import {View} from 'react-native';
import SettlementItem from './SettlementItem';

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
  representiveMerchandise: string;
  settlementPaymentCnt: number;
  settlementPaymentList: paymentListProps[];
}
const SettlementList = ({
  data,
  isFinished,
}: {
  data: settlementProps[];
  isFinished: boolean;
}) => {
  return (
    <View>
      {data.map(item => (
        <SettlementItem
          key={item.settlementId}
          data={item}
          isFinished={isFinished}
        />
      ))}
    </View>
  );
};

export default SettlementList;
