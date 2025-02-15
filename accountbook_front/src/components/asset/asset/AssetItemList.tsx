import React from 'react';
import {View, StyleSheet} from 'react-native';
import {assetDetailNavigations, assetNavigations, colors} from '@/constants';
import AssetItem from './AssetItem';
import {Account, Card} from '@/types/domain';
import {useNavigation} from '@react-navigation/native';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {StackNavigationProp} from '@react-navigation/stack';
import useThemeStore from '@/store/useThemeStore';

interface AssetItemListProps {
  accountData?: Account[];
  cardData?: Card[];
}

const AssetItemList = ({accountData, cardData}: AssetItemListProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();

  if (accountData) {
    return (
      <View style={styles.container}>
        {accountData.map(account => (
          <AssetItem
            id={account.id}
            key={account.id}
            title={account.nickname}
            balance={account.balance}
            isAccount={true}
            hideState={account.hideState}
            hide={
              account.hideState === 'HIDE_ASSET' ||
              account.hideState === 'HIDE_ALL'
                ? true
                : false
            }
            handleNavigate={() =>
              navigation.navigate(assetNavigations.DETAIL, {
                screen: assetDetailNavigations.ACCOUNTDETAIL,
                params: {accountId: account.id},
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
            key={card.cardNumber}
            title={card.nickname}
            cardName={card.name}
            isAccount={false}
            hide={
              card.hideStatus === 'HIDE_ALL' || card.hideStatus === 'HIDE_ASSET'
                ? true
                : false
            }
            handleNavigate={() =>
              navigation.navigate(assetNavigations.DETAIL, {
                screen: assetDetailNavigations.CARDDETAIL,
                params: {cardId: card.id},
              })
            }
          />
        ))}
      </View>
    );
  }
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom: 20,
    },
    sectionHeader: {
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
      fontSize: 18,
      paddingVertical: 10,
    },
    noAssetText: {
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      textAlign: 'center',
      marginTop: 10,
    },
  });

export default AssetItemList;
