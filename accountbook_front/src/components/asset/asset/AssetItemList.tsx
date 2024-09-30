import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {assetDetailNavigations, assetNavigations, colors} from '@/constants';
import AssetItem from './AssetItem';
import {Account, Card} from '@/types/domain';
import {useNavigation} from '@react-navigation/native';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {StackNavigationProp} from '@react-navigation/stack';

interface AssetItemListProps {
  accountData?: Account[];
  cardData?: Card[];
}

const AssetItemList = ({accountData, cardData}: AssetItemListProps) => {
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();

  if (accountData) {
    return (
      <View style={styles.container}>
        {accountData.map(account => (
          <AssetItem
            id={account.accountId}
            key={account.accountId}
            title={account.nickname}
            balance={account.accountBalance}
            isAccount={true}
            hide={account.hideStatus === 'HIDE_ASSET' ? true : false}
            handleNavigate={() =>
              navigation.navigate(assetNavigations.DETAIL, {
                screen: assetDetailNavigations.ACCOUNTDETAIL,
                params: {accountId: Number(account.accountId)},
              })
            }
          />
        ))}
      </View>
    );
  }

  if (cardData) {
    return (
      <View style={styles.container}>
        {cardData.map(card => (
          <AssetItem
            id={card.id}
            key={card.cardNo}
            title={`${card.cardIssuerName}`}
            cardName={card.cardName}
            isAccount={false}
            hide={card.hideStatus === 'hide_asset' ? true : false}
            handleNavigate={() =>
              navigation.navigate(assetNavigations.DETAIL, {
                screen: assetDetailNavigations.CARDDETAIL,
                params: {cardId: Number(card.id)},
              })
            }
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
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
    fontSize: 18,
    paddingVertical: 10,
  },
  noAssetText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AssetItemList;
