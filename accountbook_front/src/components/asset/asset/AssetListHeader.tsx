import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AssetListHeaderProps {
  username: string;
  assetAmount: number;
}

const AssetListHeader = ({username, assetAmount}: AssetListHeaderProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.usernameText}>{username}님의 자산</Text>
      <Text style={styles.assetAmount}>{assetAmount.toLocaleString()}원</Text>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    headerContainer: {
      marginVertical: 10,
    },
    usernameText: {
      fontSize: 14,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
    },
    assetAmount: {
      fontSize: 30,
      fontFamily: 'Pretendard-ExtraBold',
      color: colors[theme].BLACK,
    },
  });

export default AssetListHeader;
