import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '@/constants';
import AssetItem from './AssetItem';
import {Account, Card} from '@/types/domain';

interface AssetItemListProps {
  accountData?: Account[];
  cardData?: Card[];
}

const AssetItemList = ({accountData, cardData}: AssetItemListProps) => {
  if (accountData) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionHeader}>계좌</Text>
        {accountData.map(account => (
          <AssetItem
            key={account.accountId}
            title={account.accountNickname}
            balance={account.accountBalance}
            isAccount={true}
            hide={account.hideStatus === 'hide_asset' ? true : false}
          />
        ))}
      </View>
    );
  }

  if (cardData) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionHeader}>카드</Text>
        {cardData.map(card => (
          <AssetItem
            key={card.cardNo}
            title={`${card.cardIssuerName}`}
            cardName={card.cardName}
            isAccount={false}
            hide={card.hideStatus === 'hide_asset' ? true : false}
          />
        ))}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default AssetItemList;
