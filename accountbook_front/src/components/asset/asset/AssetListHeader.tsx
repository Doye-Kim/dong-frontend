import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AssetListHeaderProps {
  username: string;
  assetAmount: string;
}

const AssetListHeader = ({username, assetAmount}: AssetListHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.usernameText}>{username}님의 자산</Text>
      <Text style={styles.assetAmount}>
        {Number(assetAmount).toLocaleString()}원
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 10,
  },
  usernameText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  assetAmount: {
    fontSize: 30,
    fontFamily: 'Pretendard-ExtraBold',
    color: colors.BLACK,
  },
});

export default AssetListHeader;
