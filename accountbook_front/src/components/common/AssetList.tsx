import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AssetItem from './AssetItem';
import {colors} from '@/constants';
import {
  AccountInfo,
  CardInfo,
  RegisterAccountInfo,
  RegisterCardInfo,
} from '@/api/asset';
import useThemeStore from '@/store/useThemeStore';

interface AssetListProps {
  title: string;
  accountData?: RegisterAccountInfo[] | AccountInfo[] | null;
  cardData?: RegisterCardInfo[] | CardInfo[] | null;
  setSelectedList(
    selectedList: (
      items:
        | RegisterAccountInfo[]
        | AccountInfo[]
        | RegisterCardInfo[]
        | CardInfo[],
    ) => void,
  ): void;
  selectedList: Array<
    RegisterAccountInfo | AccountInfo | RegisterCardInfo | CardInfo
  >;
}

const AssetList = ({
  title,
  accountData,
  cardData,
  setSelectedList,
  selectedList,
}: AssetListProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const data = accountData || cardData;
  const accountOrCard = !!accountData; // true면 계좌, false면 카드
  return (
    <View style={styles.assetContainer}>
      <Text style={styles.assetTitle}>{title}</Text>
      {data?.map(item => {
        const key = accountOrCard
          ? 'accountNo' in item
            ? item.accountNo
            : item.id
          : 'cardNo' in item
          ? item.cardNo
          : item.id;
        return (
          <AssetItem
            key={key} // 계좌번호나 카드번호를 키로 사용
            item={item}
            accountOrCard={accountOrCard}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        );
      })}
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    assetTitle: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
    },
    assetContainer: {
      flex: 1,
    },
  });

export default AssetList;
