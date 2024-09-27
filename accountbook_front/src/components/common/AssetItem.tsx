import {
  RegisterAccountInfo,
  AccountInfo,
  RegisterCardInfo,
  CardInfo,
} from '@/api/asset';
import {AccountIcon, CardIcon} from '@/assets/icons';
import {colors} from '@/constants';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AssetItem = ({
  item,
  accountOrCard,
  setSelectedList,
  selectedList,
}: {
  item: RegisterAccountInfo | AccountInfo | RegisterCardInfo | CardInfo;
  accountOrCard: boolean;
  setSelectedList(
    selectedList: (
      item:
        | RegisterAccountInfo[]
        | AccountInfo[]
        | RegisterCardInfo[]
        | CardInfo[],
    ) => void,
  ): void;
  selectedList: Array<
    RegisterAccountInfo | AccountInfo | RegisterCardInfo | CardInfo
  >;
}) => {
  const [checked, setChecked] = useState(selectedList.includes(item));

  const handlePressItem = () => {
    if (checked) {
      setSelectedList(prev => prev.filter(i => i !== item));
    } else {
      setSelectedList(prev => [...prev, item]);
    }
  };

  const title = accountOrCard
    ? `${'bank' in item ? item.bank : item.bankName} ${
        'accountNo' in item ? item.accountNo : item.accountNumber
      }`
    : `${'nickname' in item ? item.nickname : item.cardName}`;
  const info = accountOrCard
    ? `${'name' in item ? item.name : item.accountName}`
    : `${'issuer' in item ? item.issuer : item.cardIssuerName}`;

  useEffect(() => {
    setChecked(selectedList.includes(item));
  }, [selectedList]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, checked && styles.checked]}
      onPress={handlePressItem}>
      {accountOrCard ? (
        <AccountIcon width={30} height={30} />
      ) : (
        <CardIcon width={30} height={30} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checked: {
    backgroundColor: colors.ORANGE_200,
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.BLACK,
  },
  info: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: colors.GRAY_800,
  },
});
export default AssetItem;
