import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {assetDetailNavigations, colors} from '@/constants';
import {Card, Payment} from '@/types/domain';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PaymentDummyData from '@/assets/tempData/Asset/PaymentDummyData.json';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AssetDetailStackParamList} from '@/navigations/stack/asset/AssetDetailStackNavigator';
import axiosInstance from '@/api/axios';
import useThemeStore from '@/store/useThemeStore';

type CardDetailScreenNavigationProp = NavigationProp<AssetDetailStackParamList>;
type CardDetailScreenRouteProp = RouteProp<
  AssetDetailStackParamList,
  typeof assetDetailNavigations.CARDDETAIL
>;

type PaymentData = Payment[];

const CardDetailScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const route = useRoute<CardDetailScreenRouteProp>();
  const cardId = route.params.cardId;
  const [card, setCard] = useState<Card | null>(null);
  const [accountPaymentData, setAccountPaymentData] =
    useState<PaymentData | null>(null);
  
  const [totalUse, setTotalUse] = useState<number>(0);
  const navigation = useNavigation<CardDetailScreenNavigationProp>();

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(assetDetailNavigations.PAYMENTDETAIL, {paymentId});
  };

  const fetchPaymentDate = async (cardId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/cards/${cardId}`);
      setCard(response.data.myCardResponse);
      setAccountPaymentData(response.data.paymentResponseList);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cardId !== undefined) {
      fetchPaymentDate(cardId);
    }
  }, [cardId]);

  useEffect(() => {
    if (card) {
      navigation.setOptions({
        headerTitle: card.nickname ? card.nickname : card.name,
      });
    }
  }, [card, navigation]);

  useMemo(() => {
    if (accountPaymentData && accountPaymentData.length > 0) {
      const totalBalance = accountPaymentData.reduce((acc, payment) => acc + payment.balance, 0);
      setTotalUse(totalBalance);
    }
  }, [accountPaymentData]);

  return (
    <View style={styles.container}>
      {card ? (
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bankText}>
              {card.name} {card.cardNumber}
            </Text>
            <Text style={styles.bankBalanceText}>
              {totalUse.toLocaleString()}원
            </Text>
          </View>
          <PaymentItemList
            payments={accountPaymentData || []}
            onPaymentPress={handlePaymentPress}
            isAssetData={true}
          />
        </View>
      ) : (
        <Text>데이터 로드 중입니다.</Text>
      )}
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginVertical: 20,
    },
    contentContainer: {},
    headerLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bankNicknameText: {
      fontSize: 22,
      fontFamily: 'Pretendard-Black',
      color: colors[theme].BLACK,
      marginLeft: 15,
    },
    manageText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    titleContainer: {
      marginHorizontal: 20,
      marginVertical: 25,
    },
    bankText: {
      fontSize: 14,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
      marginLeft: 2,
    },
    bankBalanceText: {
      fontSize: 40,
      fontFamily: 'Pretendard-ExtraBold',
      color: colors[theme].BLACK,
    },
  });

export default CardDetailScreen;
