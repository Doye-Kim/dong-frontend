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
      <SectionList
        sections={[{title, data}]}
        keyExtractor={(item, index) =>
          accountOrCard ? item.accountNumber + index : item.cardNo + index
        }
        renderItem={({item}) => (
          <AssetItem
            title={
              accountOrCard
                ? `${item.bank} ${item.accountNumber}`
                : `${item.cardName}`
            }
            info={accountOrCard ? item.accountName : item.cardIssuerName}
            assetOrCard={accountOrCard}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.assetTitle}> {section.title}</Text>
        )}
      />
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
