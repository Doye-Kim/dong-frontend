import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {assetDetailNavigations, colors} from '@/constants';
import {Card, Payment} from '@/types/domain';
import React, {useEffect, useState} from 'react';
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

type CardDetailScreenNavigationProp = NavigationProp<AssetDetailStackParamList>;
type CardDetailScreenRouteProp = RouteProp<
  AssetDetailStackParamList,
  typeof assetDetailNavigations.CARDDETAIL
>;

type PaymentData = Payment[];

const CardDetailScreen = () => {
  const route = useRoute<CardDetailScreenRouteProp>();
  const cardId = route.params.cardId;
  const [accountPaymentData, setAccountPaymentData] =
    useState<PaymentData | null>(null);
  const navigation = useNavigation<CardDetailScreenNavigationProp>();

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(assetDetailNavigations.PAYMENTDETAIL, {paymentId});
  };

  const fetchPaymentDate = async (cardId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/cards/${cardId}`)
    } catch(error) {
      console.error(error);
    }
  }

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

  return (
    <View style={styles.container}>
      {card ? (
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bankText}>
              {card.name} {card.cardNumber}
            </Text>
            <Text style={styles.bankBalanceText}>
              {Number(card.totalUse).toLocaleString()}원
            </Text>
          </View>
          <PaymentItemList
            payments={accountPaymentData || []}
            onPaymentPress={handlePaymentPress}
          />
        </View>
      ) : (
        <Text>데이터 로드 중입니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
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
    color: colors.BLACK,
    marginLeft: 15,
  },
  manageText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  bankText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    marginLeft: 2,
  },
  bankBalanceText: {
    fontSize: 40,
    fontFamily: 'Pretendard-ExtraBold',
    color: colors.BLACK,
  },
});

export default CardDetailScreen;
