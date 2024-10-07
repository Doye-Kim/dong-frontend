import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '@/constants';
import {AccountIcon, CardIcon} from '@/assets/icons';

interface AssetItemProps {
  id: number;
  title: string;
  cardName?: string;
  balance?: number;
  isAccount: boolean;
  hide: boolean;
  handleNavigate?: () => void;
}

const AssetItem = ({
  id,
  title,
  cardName,
  balance,
  isAccount,
  hide,
  handleNavigate,
}: AssetItemProps): React.ReactElement => {
  const truncatedTitle = title.length > 10 ? `${title.slice(0, 10)}...` : title;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate ? handleNavigate : () => {}}>
      <View style={styles.titleContainer}>
        {isAccount ? (
          <AccountIcon width={30} height={30} />
        ) : (
          <CardIcon width={30} height={30} />
        )}
        <Text style={[styles.title, hide ? styles.hidedTitle : null]}>
          {truncatedTitle}
        </Text>
        {!isAccount && cardName && (
          <Text style={[styles.cardName, hide ? styles.hidedCardName : null]}>
            {' | '}
            {cardName}
          </Text>
        )}
      </View>
      {isAccount && balance !== undefined && (
        <Text style={styles.balance}>{balance.toLocaleString()}원</Text>
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
    color: colors.GRAY_600,
  },
  cardName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.BLACK,
  },
  hidedCardName: {
    color: colors.GRAY_600,
  },
  balance: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 18,
    color: colors.BLACK,
  },
});

export default AssetItem;
