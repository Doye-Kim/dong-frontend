import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Account, Payment} from '@/types/domain';
import {assetDetailNavigations, colors} from '@/constants';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AssetDetailStackParamList} from '@/navigations/stack/asset/AssetDetailStackNavigator';
import axiosInstance from '@/api/axios';
import useThemeStore from '@/store/useThemeStore';

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
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const route = useRoute<AccountDetailRouteProp>();
  const assetId = route.params?.accountId;
  const [accountPaymentData, setAccountPaymentData] =
    useState<PaymentData | null>(null);
  const [asset, setAsset] = useState<Account | null>(null);
  const navigation = useNavigation<AssetDetailScreenNavigationProp>();
  
  const fetchAssetPaymenData = async (assetId: number) => {
    try {
      const response = await axiosInstance.get(`/payments/accounts/${assetId}`);
      setAsset(response.data.myAccountResponse);
      setAccountPaymentData(response.data.paymentResponseList);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (assetId !== undefined) {
        fetchAssetPaymenData(assetId);
      }
    }, [assetId])
  );

  useEffect(() => {
    if (assetId !== undefined) {
      fetchAssetPaymenData(assetId);
    }
  }, [assetId]);

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerTitle: asset.nickname
          ? asset.nickname
          : asset.name,
      });
    }
  }, [asset, navigation]);

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerTitle: asset.nickname ? asset.nickname : asset.name,
        headerRight: () => (
          <TouchableOpacity
            onPress={handleManagePress}
            style={styles.manageButton}>
            <Text style={styles.manageText}>관리</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [asset, navigation]);

  const handlePaymentPress = (paymentId: number) => {
    navigation.navigate(assetDetailNavigations.PAYMENTDETAIL, {paymentId});
  };

  const handleManagePress = () => {
    if (asset) {
      navigation.navigate(assetDetailNavigations.ACCOUNTMANAGE, { account: asset });
    }
  };

  return (
    <View style={styles.container}>
      {asset ? (
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bankText}>
              {asset.bank} {asset.accountNumber}
            </Text>
            <Text style={styles.bankBalanceText}>
              {Number(asset.balance).toLocaleString()}원
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
    contentContainer: {
      marginBottom: 100,
    },
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
    manageButton: {
      marginRight: 15,
    },
    manageText: {
      fontSize: 15,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
    },
  });

export default AssetDetailScreen;
