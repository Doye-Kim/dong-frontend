import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '@/constants';
import {AccountIcon, CardIcon} from '@/assets/icons';

interface AssetItemProps {
  title: string;
  cardName?: string;
  balance?: string;
  isAccount: boolean;
  hide: boolean;
}

const AssetItem = ({
  title,
  cardName,
  balance,
  isAccount,
  hide,
}: AssetItemProps): React.ReactElement => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.titleContainer}>
        {isAccount ? (
          <AccountIcon width={30} height={30} />
        ) : (
          <CardIcon width={30} height={30} />
        )}
        <Text style={[styles.title, hide ? styles.hidedTitle : null]}>{title}</Text>
        {!isAccount && cardName && (
          <Text style={[styles.cardName, hide ? styles.hidedCardName : null]}> | {cardName}</Text>
        )}
      </View>
      {isAccount && balance && (
        <Text style={styles.balance}>{Number(balance).toLocaleString()}원</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    marginLeft: 10,
    color: colors.BLACK,
  },
  hidedTitle: {
    color: colors.GRAY_600
  },
  cardName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.BLACK,
  },
  hidedCardName: {
    color: colors.GRAY_600
  },
  balance: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 18,
    color: colors.BLACK,
  },
});

export default AssetItem;
