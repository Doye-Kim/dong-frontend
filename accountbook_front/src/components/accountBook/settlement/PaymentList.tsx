import {StyleSheet, Text, View} from 'react-native';
import PaymentItem from './PaymentItem';
import {getDatePaymentFormat} from '@/utils';
import {colors} from '@/constants';

const data = [
  {
    paymentsId: 1,
    merchantName: '스타벅스',
    categoryId: 4,
    categoryName: '식사',
    balance: 5600,
    paymentName: '신한카드',
    memo: '아메리카노',
    paymentTime: '2024-09-15T08:30:22',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 2,
    merchantName: '롯데마트',
    categoryId: 1,
    categoryName: '쇼핑',
    balance: 89000,
    paymentName: '현대카드',
    memo: '주간식료품',
    paymentTime: '2024-09-14T15:45:11',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 3,
    merchantName: '급여',
    categoryId: 23,
    categoryName: '월급',
    balance: 2500000,
    paymentName: '국민은행',
    memo: '9월 급여',
    paymentTime: '2024-09-25T09:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 4,
    merchantName: '쿠팡',
    categoryId: 16,
    categoryName: '쇼핑',
    balance: 45600,
    paymentName: '카카오뱅크체크카드',
    memo: '생활용품',
    paymentTime: '2024-09-12T10:15:30',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 5,
    merchantName: '버스',
    categoryId: 5,
    categoryName: '교통',
    balance: 1250,
    paymentName: '티머니',
    memo: '',
    paymentTime: '2024-09-11T07:55:18',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 6,
    merchantName: '이자수익',
    categoryId: 24,
    categoryName: '투자',
    balance: 50000,
    paymentName: '신한은행',
    memo: '적금 이자',
    paymentTime: '2024-09-20T00:00:01',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 7,
    merchantName: '맥도날드',
    categoryId: 19,
    categoryName: '식사',
    balance: 8900,
    paymentName: 'KB국민카드',
    memo: '저녁식사',
    paymentTime: '2024-09-09T18:30:45',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 8,
    merchantName: 'GS25',
    categoryId: 15,
    categoryName: '편의점',
    balance: 3500,
    paymentName: '농협카드',
    memo: '',
    paymentTime: '2024-09-08T22:10:33',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 9,
    merchantName: '아마존',
    categoryId: 9,
    categoryName: '쇼핑',
    balance: 52000,
    paymentName: '신한카드',
    memo: '책구매',
    paymentTime: '2024-09-07T14:25:17',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 10,
    merchantName: '부업수익',
    categoryId: 25,
    categoryName: '기타수입',
    balance: 300000,
    paymentName: '토스',
    memo: '온라인강의수익',
    paymentTime: '2024-09-18T09:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 11,
    merchantName: 'CGV',
    categoryId: 10,
    categoryName: '엔터테인먼트',
    balance: 28000,
    paymentName: '삼성카드',
    memo: '영화 관람',
    paymentTime: '2024-09-16T19:20:00',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 12,
    merchantName: '교보문고',
    categoryId: 9,
    categoryName: '쇼핑',
    balance: 32000,
    paymentName: '현대카드',
    memo: '전공서적',
    paymentTime: '2024-09-17T14:30:15',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 13,
    merchantName: '주식배당금',
    categoryId: 24,
    categoryName: '투자',
    balance: 75000,
    paymentName: '미래에셋증권',
    memo: '분기별 배당',
    paymentTime: '2024-09-21T10:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 14,
    merchantName: '지하철',
    categoryId: 5,
    categoryName: '교통',
    balance: 1350,
    paymentName: '티머니',
    memo: '',
    paymentTime: '2024-09-19T08:45:30',
    paymentState: 'EXCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 15,
    merchantName: '넷플릭스',
    categoryId: 22,
    categoryName: '구독',
    balance: 17000,
    paymentName: '신한카드',
    memo: '월 구독료',
    paymentTime: '2024-09-01T00:00:01',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 16,
    merchantName: '중고나라',
    categoryId: 25,
    categoryName: '기타수입',
    balance: 150000,
    paymentName: '토스',
    memo: '중고폰 판매',
    paymentTime: '2024-09-22T15:30:00',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 17,
    merchantName: '올리브영',
    categoryId: 16,
    categoryName: '쇼핑',
    balance: 45000,
    paymentName: 'KB국민카드',
    memo: '화장품',
    paymentTime: '2024-09-23T16:20:45',
    paymentState: 'EXCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 18,
    merchantName: '요기요',
    categoryId: 19,
    categoryName: '식사',
    balance: 28000,
    paymentName: '카카오뱅크체크카드',
    memo: '치킨 주문',
    paymentTime: '2024-09-24T19:00:10',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 19,
    merchantName: 'KT',
    categoryId: 22,
    categoryName: '구독',
    balance: 55000,
    paymentName: '자동이체',
    memo: '휴대폰 요금',
    paymentTime: '2024-09-25T00:00:01',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 20,
    merchantName: '부모님용돈',
    categoryId: 26,
    categoryName: '이체',
    balance: 200000,
    paymentName: 'KB국민은행',
    memo: '월 용돈',
    paymentTime: '2024-09-26T10:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 21,
    merchantName: '국민연금공단',
    categoryId: 27,
    categoryName: '연금',
    balance: 450000,
    paymentName: '국민은행',
    memo: '9월 연금',
    paymentTime: '2024-09-27T09:00:00',
    paymentState: 'EXCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 22,
    merchantName: '다이소',
    categoryId: 16,
    categoryName: '쇼핑',
    balance: 15000,
    paymentName: '현대카드',
    memo: '주방용품',
    paymentTime: '2024-09-28T14:30:20',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 23,
    merchantName: '유튜브 수익',
    categoryId: 25,
    categoryName: '기타수입',
    balance: 230000,
    paymentName: 'KB국민은행',
    memo: '8월 광고 수익',
    paymentTime: '2024-09-10T12:00:00',
    paymentState: 'EXCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 24,
    merchantName: '스포티파이',
    categoryId: 22,
    categoryName: '구독',
    balance: 10900,
    paymentName: '신한카드',
    memo: '음악 스트리밍',
    paymentTime: '2024-09-05T00:00:01',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 25,
    merchantName: '에버랜드',
    categoryId: 10,
    categoryName: '엔터테인먼트',
    balance: 56000,
    paymentName: '삼성카드',
    memo: '입장권',
    paymentTime: '2024-09-29T10:15:30',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 26,
    merchantName: '마켓컬리',
    categoryId: 1,
    categoryName: '쇼핑',
    balance: 68000,
    paymentName: '현대카드',
    memo: '식료품',
    paymentTime: '2024-09-30T20:00:15',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 27,
    merchantName: '애플',
    categoryId: 16,
    categoryName: '쇼핑',
    balance: 1200000,
    paymentName: 'KB국민카드',
    memo: '아이폰 구매',
    paymentTime: '2024-09-02T15:30:00',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 28,
    merchantName: '임대소득',
    categoryId: 28,
    categoryName: '부동산',
    balance: 800000,
    paymentName: '우리은행',
    memo: '9월 월세',
    paymentTime: '2024-09-05T09:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'INCOME',
  },
  {
    paymentsId: 29,
    merchantName: '헬스장',
    categoryId: 29,
    categoryName: '운동',
    balance: 80000,
    paymentName: '신한카드',
    memo: '3개월 회원권',
    paymentTime: '2024-09-03T18:00:00',
    paymentState: 'INCLUDE',
    paymentType: 'EXPENSE',
  },
  {
    paymentsId: 30,
    merchantName: '배당금',
    categoryId: 24,
    categoryName: '투자',
    balance: 120000,
    paymentName: 'NH투자증권',
    memo: '삼성전자 배당',
    paymentTime: '2024-09-04T10:00:00',
    paymentState: 'EXCLUDE',
    paymentType: 'INCOME',
  },
];
type ResponsePayment = {
  paymentsId: number;
  merchantName: string;
  categoryId: number;
  categoryName: string;
  balance: number;
  paymentName: string;
  memo: string;
  paymentTime: string;
  paymentState: 'INCLUDE' | 'EXCLUDE';
  paymentType: 'INCOME' | 'EXPENSE';
};
const PaymentList = ({
  selectedPayments,
  setSelectedPayments,
}: {
  selectedPayments: ResponsePayment;
  setSelectedPayments: void;
}) => {
  return (
    <View>
      {data.map((item, index) => {
        const prevItem = index > 0 ? data[index - 1] : null; // 이전 아이템 가져오기
        const showDate =
          index === 0 ||
          getDatePaymentFormat(item.paymentTime) !==
            getDatePaymentFormat(prevItem?.paymentTime); // 첫 번째 아이템이거나 이전 날짜와 다를 때

        return (
          <>
            {showDate && (
              <Text style={styles.dateText}>
                {getDatePaymentFormat(item.paymentTime)}
              </Text>
            )}
            <PaymentItem
              key={item.paymentsId}
              item={item}
              selectedPayments={selectedPayments}
              setSelectedPayments={setSelectedPayments}
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
export default PaymentList;