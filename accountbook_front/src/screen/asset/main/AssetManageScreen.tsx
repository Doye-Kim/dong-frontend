import {BackArrow, ExpandRight} from '@/assets/icons';
import Toggle from '@/components/common/Toggle';
import {colors} from '@/constants';
import {Account} from '@/types/domain';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface AssetManageScreenProps {}

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

const AssetManageScreen = ({}: AssetManageScreenProps) => {
  const [asset, setAsset] = useState<Account | null>(assetData);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerContainer}>
        <BackArrow />
      </TouchableOpacity>
      <View style={styles.accountTitleContainer}>
        <Text style={styles.accountNicknameText}>{asset?.accountNickname}</Text>
        <Text style={styles.accountInfoText}>
          {asset?.bankName} {asset?.accountNumber}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.accountNicknameContainer}>
          <Text style={styles.accountNicknameTitle}>계좌별명</Text>
          <TouchableOpacity style={styles.nicknameSetupContainer}>
            <Text style={styles.accountNicknameSetup}>
              {asset?.accountNickname}
            </Text>
            <ExpandRight />
          </TouchableOpacity>
        </View>
        <View style={styles.manageContainer}>
          <View style={styles.manageTitleContainer}>
            <Text style={styles.manageTitleMain}>화면에서 금액 숨기기</Text>
            <Text style={styles.manageTitleInfo}>
              숨기면 총 자산과 가계부에서 제외돼요
            </Text>
          </View>
          <View style={styles.toggleButton}>
          <Toggle isEnabled={false} toggleSwitch={() => {}} />
          </View>
        </View>
        <View style={styles.manageContainer}>
          <View style={styles.manageTitleContainer}>
            <Text style={styles.manageTitleMain}>계좌 숨기기</Text>
            <Text style={styles.manageTitleInfo}>
              자산 목록에서 숨겨져요
            </Text>
          </View>
          <View style={styles.toggleButton}>
          <Toggle isEnabled={true} toggleSwitch={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    margin: 5,
    padding: 20,
  },
  accountTitleContainer: {
    marginHorizontal: 25,
  },
  accountNicknameText: {
    fontSize: 30,
    fontFamily: 'Pretendard-ExtraBold',
    color: colors.BLACK,
    marginBottom: 5,
  },
  accountInfoText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  contentContainer: {
    marginVertical: 25,
  },
  accountNicknameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    // alignItems: 'center',
  },
  accountNicknameTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  nicknameSetupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountNicknameSetup: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
    marginRight: 15,
    paddingBottom: 3,
  },
  manageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  manageTitleContainer: {
    marginHorizontal: 25,
    marginVertical: 20,
  },
  manageTitleMain: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  manageTitleInfo: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  toggleButton: {
    marginRight : 25,
  }
});

export default AssetManageScreen;
