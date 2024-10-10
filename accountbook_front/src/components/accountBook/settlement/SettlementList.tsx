import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SettlementItem from './SettlementItem';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';

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
  refresh: () => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View>
      {data.map((item, index) => {
        const prevItem = index > 0 ? data[index - 1] : null; // 이전 아이템 가져오기
        const showDate =
          index === 0 || item.settlementDate !== prevItem?.settlementDate; // 첫 번째 아이템이거나 이전 날짜와 다를 때

        // 고유한 key 생성 (settlementId가 고유하다고 가정)
        const fragmentKey = `settlement-${item.settlementId}`;

        return (
          <React.Fragment key={fragmentKey}>
            {showDate && (
              <Text style={styles.dateText}>{item.settlementDate}</Text>
            )}
            <SettlementItem
              data={item}
              isFinished={isFinished}
              refresh={refresh}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    dateText: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].GRAY_600,
      marginTop: 5,
    },
  });

export default SettlementList;
