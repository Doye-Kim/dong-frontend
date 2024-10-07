import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PaymentDummyData from '@/assets/tempData/Asset/PaymentDummyData.json';
import {Account, Payment} from '@/types/domain';
import {assetDetailNavigations, colors} from '@/constants';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AssetDetailStackParamList} from '@/navigations/stack/asset/AssetDetailStackNavigator';
import axiosInstance from '@/api/axios';

type AssetDetailScreenNavigationProp =
  NavigationProp<AssetDetailStackParamList>;
type AssetDetailScreenRouteProp = RouteProp<
  AssetDetailStackParamList,
  typeof assetDetailNavigations.PAYMENTDETAIL
>;

type PaymentData = Payment[];

const assetData = {
  accountId: '1151145',
  bankName: 'HG은행',
  accountNumber: '11111111111',
  accountName: '입출금이 자유로운 통장',
  accountNickname: '월급통장',
  hideStatus: 'none',
  depositStatus: '0',
  accountBalance: '124500000',
};
type AccountDetailRouteProp = RouteProp<
  AssetDetailStackParamList,
  typeof assetDetailNavigations.ACCOUNTDETAIL
>;

const AssetDetailScreen = () => {
  const route = useRoute<AccountDetailRouteProp>();
  const assetId = route.params?.accountId;
  const [accountPaymentData, setAccountPaymentData] =
    useState<PaymentData | null>(null);
  const [asset, setAsset] = useState<Account | null>(null);
  const navigation = useNavigation<AssetDetailScreenNavigationProp>();

  const fetchAssetPaymenData = async (assetId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/accounts/${assetId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (assetId !== undefined) {
      fetchAssetPaymenData(assetId);
    }
  }, [assetId]);

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerTitle: asset.accountNickname
          ? asset.accountNickname
          : asset.accountName,
      });
    }
  }, [asset, navigation]);

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(assetDetailNavigations.PAYMENTDETAIL, {paymentId});
  };

  return (
    <View style={styles.container}>
      {asset ? (
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bankText}>
              {asset.bankName} {asset.accountNumber}
            </Text>
            <Text style={styles.bankBalanceText}>
              {Number(asset.accountBalance).toLocaleString()}원
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

export default AssetDetailScreen;
