import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import {colors} from '../../constants/colors';
import AssetItem from '@/components/common/AssetItem';

const SelectAssetsScreen = () => {
  const data = {
    account_size: 4,
    card_size: 3,
    accounts: [
      {
        bank: 'HG은행',
        accountNumber: '11111111111',
        accountName: '입출금이 자유로운 통장',
        accountTypeCode: '1',
        accountBalance: '254500',
      },
      {
        bank: 'HK은행',
        accountNumber: '22222222222',
        accountName: '또르르 지유예금',
        accountTypeCode: '1',
        accountBalance: '100',
      },
      {
        bank: 'DY은행',
        accountNumber: '333333333333',
        accountName: '프짱 자립예탁금 통장',
        accountTypeCode: '1',
        accountBalance: '27800',
      },
      {
        bank: 'WY은행',
        accountNumber: '444444444444',
        accountName: '만기에 두배로 럭키비키 적금통장',
        accountTypeCode: '3',
        accountBalance: '1500000',
      },
    ],
    cards: [
      {
        cardNo: '1111111111111111',
        cardIssuerName: 'DE카드',
        cardName: '포뇨캘시퍼카드',
        cvc: '124',
      },
      {
        cardNo: '2222222222222222',
        cardIssuerName: 'HS카드',
        cardName: '사천오천카드',
        cvc: '077',
      },
      {
        cardNo: '3333333333333333',
        cardIssuerName: '싸피카드',
        cardName: '알뜰맥시신용카드',
        cvc: '335',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>목록에 나타낼</Text>
        <Text style={styles.title}>자산을 선택해 주세요</Text>
      </View>
      <ScrollView style={styles.assetContainer}>
        <View style={styles.accountContainer}>
          <SectionList
            sections={[{title: '계좌', data: data.accounts}]}
            keyExtractor={(item, index) => item.accountNumber + index}
            renderItem={({item}) => (
              <AssetItem
                title={`${item.bank} ${item.accountNumber}`}
                info={item.accountName}
                assetOrCard={true}
              />
            )}
            renderSectionHeader={({section}) => (
              <Text style={styles.assetTitle}> {section.title}</Text>
            )}
          />
        </View>
        <View style={styles.cardContainer}>
          <SectionList
            sections={[{title: '카드', data: data.cards}]}
            keyExtractor={(item, index) => item.cardNo + index}
            renderItem={({item}) => (
              <AssetItem
                title={`${item.cardName}`}
                info={item.cardIssuerName}
                assetOrCard={false}
              />
            )}
            renderSectionHeader={({section}) => (
              <Text style={styles.assetTitle}>{section.title}</Text>
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text="완료" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
  },
  titleContainer: {},
  title: {
    fontSize: 28,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
  },
  assetContainer: {
    marginVertical: 10,
    height: Dimensions.get('screen').height - 320,
  },
  assetTitle: {
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  accountContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
export default SelectAssetsScreen;
