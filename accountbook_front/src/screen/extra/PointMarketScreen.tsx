import {colors} from '@/constants';
import {Gift} from '@/types/domain';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosInstance from '@/api/axios';
import BuyConfirmModal from '@/components/extra/BuyConfirmModal';
import BarcodeModal from '@/components/extra/BarcodeModal';
import useThemeStore from '@/store/useThemeStore';

type GiftData = Gift[];

const PointMarketScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [point, setPoint] = useState(0);
  const [giftList, setGiftList] = useState<GiftData | null>(null);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [barcodeNumber, setBarcodeNumber] = useState('');

  useEffect(() => {
    handleGift();
  }, []);

  const fetchPoint = async () => {
    try {
      const response = await axiosInstance.get('/users/point');
      setPoint(response.data);
    } catch (error) {
      console.error('포인트불러오기 에러 : ', error);
    }
  };

  useEffect(() => {
    fetchPoint;
  }, [point]);

  // 기프티콘 목록 가져오기
  const handleGift = async (
    page = 0,
    size = 20,
    sort = [],
    name = '',
    priceGoe = 0,
    priceLoe = 1000000,
  ) => {
    try {
      const response = await axiosInstance.get('/gifticons', {
        params: {
          page,
          size,
          sort,
          name,
          priceGoe,
          priceLoe,
        },
      });
      setGiftList(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  // 기프티콘 구매 요청 후 바코드 표시
  const handleBuyGifticon = async (id: number) => {
    try {
      const response = await axiosInstance.post(`/gifticons/${id}`);
      const {barcode} = response.data; // 응답에서 바코드 번호를 받아옴
      setBarcodeNumber(barcode);
      setModalVisible(false); // 구매 확인 모달 닫기
      setBarcodeModalVisible(true); // 바코드 모달 열기
    } catch (error) {
      console.error(error);
    }
  };

  // 구매 확인 모달 열기
  const openModal = (giftId: number) => {
    setSelectedGiftId(giftId); // 선택된 기프티콘 ID 저장
    setModalVisible(true); // 구매 확인 모달 열기
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointSectionContainer}>
        <Text style={styles.pointTitleText}>내 포인트</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>{point.toLocaleString()} p</Text>
        </View>
      </View>
      <ScrollView style={styles.giftListContainer}>
        {giftList?.map(gift => {
          const isDisabled = point < gift.price; // 포인트가 부족한지 확인

          return (
            <View style={styles.giftContainer} key={gift.id}>
              <View style={styles.giftTitleContainer}>
                <Text style={styles.giftTitle}>{gift.name}</Text>
                <Text style={styles.giftPrice}>
                  {gift.price.toLocaleString()} p
                </Text>
              </View>
              <View style={styles.buyContainer}>
                <Text>남은 수량 : {gift.stock}개</Text>
                <TouchableOpacity
                  style={[
                    styles.buttonContainer,
                    isDisabled && styles.disabledButtonContainer, // 포인트 부족 시 비활성화 스타일 적용
                  ]}
                  onPress={() => !isDisabled && openModal(gift.id)} // 비활성화 상태에서는 클릭 불가능하게
                  disabled={isDisabled} // 버튼 비활성화
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isDisabled && styles.disabledButtonText, // 비활성화 상태일 때 텍스트 스타일 변경
                    ]}>
                    {isDisabled ? '포인트 부족' : '구매'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/* 구매 확인 모달 */}
      <BuyConfirmModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          if (selectedGiftId !== null) {
            handleBuyGifticon(selectedGiftId); // 구매 요청
          }
        }}
      />
      {/* 바코드 모달 */}
      <BarcodeModal
        visible={barcodeModalVisible}
        barcodeNumber={barcodeNumber}
        onDismiss={() => setBarcodeModalVisible(false)} // 바코드 모달 닫기
      />
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    pointSectionContainer: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    pointTitleText: {
      fontSize: 15,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
    },
    pointContainer: {
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      marginBottom: 50,
    },
    pointText: {
      fontSize: 40,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].PRIMARY,
    },
    giftListContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    giftContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      paddingBottom: 10,
      borderBottomWidth: 1.5,
      borderColor: colors[theme].GRAY_400,
    },
    giftTitleContainer: {
      flex: 1,
    },
    giftTitle: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      marginBottom: 15,
    },
    giftPrice: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    buyContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    buttonContainer: {
      backgroundColor: colors[theme].PRIMARY,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].WHITE,
    },
    disabledButtonContainer: {
      backgroundColor: colors[theme].GRAY_600,
    },
    disabledButtonText: {
      color: colors[theme].GRAY_200,
    },
  });

export default PointMarketScreen;
