import {StyleSheet, Text, FlatList} from 'react-native';
import PaymentItem from './PaymentItem';
import {getDateLocaleFormat} from '@/utils';
import {colors} from '@/constants';
import {useEffect, useState} from 'react';
import {Payment} from '@/types/domain';
import axiosInstance from '@/api/axios';
import useThemeStore from '@/store/useThemeStore';

const PaymentList = ({
  selectedPayments,
  setSelectedPayments,
}: {
  selectedPayments: Payment[];
  setSelectedPayments: (payments: Payment[]) => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜

  // 현재 날짜를 'yyyy-MM-01' 형식으로 변환
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-01`;
  };

  const getData = async (date: string) => {
    try {
      const {data} = await axiosInstance.get(`/payments?date=${date}`);
      const filteredData = data.filter(
        (payment: Payment) => payment.paymentState === 'INCLUDE',
      );
      setPaymentList(prev => [...prev, ...filteredData]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // 화면이 처음 로드될 때 현재 달 데이터를 가져옴
    getData(formatDate(currentDate));
  }, [currentDate]);

  // 무한 스크롤 로직: 마지막에 도달하면 이전 달 데이터를 불러옴
  const handleLoadMore = () => {
    // 이전 달로 업데이트
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1); // 이전 달로 설정
    setCurrentDate(prevMonth); // 상태 업데이트
    getData(formatDate(prevMonth)); // 이전 달 데이터 조회
  };

  const renderItem = ({item, index}: {item: Payment; index: number}) => {
    const prevItem = index > 0 ? paymentList[index - 1] : null; // 이전 아이템 가져오기
    const showDate =
      index === 0 ||
      getDateLocaleFormat(item.paymentTime) !==
        getDateLocaleFormat(prevItem?.paymentTime); // 첫 번째 아이템이거나 이전 날짜와 다를 때

    return (
      <>
        {showDate && (
          <Text style={styles.dateText}>
            {getDateLocaleFormat(item.paymentTime)}
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
  };

  return (
    <FlatList
      data={paymentList}
      renderItem={renderItem}
      keyExtractor={item => item.paymentsId.toString()}
      onEndReached={handleLoadMore} // 스크롤이 끝에 도달할 때 실행
      onEndReachedThreshold={0.5} // 화면의 50%에 도달할 때 실행
    />
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

export default PaymentList;
