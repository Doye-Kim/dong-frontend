import React from 'react';
import {View, SectionList, Text, StyleSheet} from 'react-native';
import AssetItem from './AssetItem';
import {colors} from '@/constants';

interface AssetListProps {
  title: string;
  accountData?:
    | {
        bank: string;
        accountNumber: string;
        accountName: string;
      }[]
    | null;
  cardData?:
    | {
        cardNo: string;
        cardName: string;
        cardIssuerName: string;
      }[]
    | null;
  setSelectedList(selectedList: string[]): void;
  selectedList: string[];
}
const AssetList = ({
  title,
  accountData,
  cardData,
  setSelectedList,
  selectedList,
}: AssetListProps) => {
  const data = accountData || cardData;
  const accountOrCard = !!accountData;
  return (
    <View style={styles.assetContainer}>
      <Text style={styles.assetTitle}>{title}</Text>
      {data?.map(item => (
        <AssetItem
          key={'accountNumber' in item ? item.accountNumber : item.cardNo} // 타입 가드 사용
          title={
            'accountNumber' in item
              ? `${item.bank} ${item.accountNumber}`
              : `${item.cardName}`
          }
          info={
            'accountNumber' in item ? item.accountName : item.cardIssuerName
          }
          assetOrCard={accountOrCard}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  assetTitle: {
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  assetContainer: {
    flex: 1,
  },
});

export default AssetList;
