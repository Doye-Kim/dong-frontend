import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PaymentDummyData from '@/assets/tempData/Asset/PaymentDummyData.json';
import {Account, Payment} from '@/types/domain';
import {colors} from '@/constants';
import {BackArrow} from '@/assets/icons';
import PaymentItemList from '@/components/accountBook/payment/PaymentItemList';

interface AssetDetailScreenProps {}

type PaymentData = Payment[];

const assetData = {
  accountId: '1151145',
  bankName: 'HG은행',
  accountNumber: '11111111111',
  accountName: '입출금이 자유로운 통장',
  accountNickname: '월급통장',
  hideStatus: 'none',
  depositStatus: '0',
  accountBalance: '50000',
};

const AssetDetailScreen = ({}: AssetDetailScreenProps) => {
  const [accountPaymentData, setAccountPaymentData] =
    useState<PaymentData | null>(null);
  const [asset, setAsset] = useState<Account | null>(null);
  useEffect(() => {
    setAccountPaymentData(PaymentDummyData.paymentResponse);
    setAsset(assetData);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity>
            <BackArrow />
          </TouchableOpacity>
          <Text style={styles.bankNicknameText}>{asset?.accountNickname}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.manageText}>관리</Text>
        </TouchableOpacity>
      </View>
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
          <PaymentItemList payments={accountPaymentData || []} />
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
