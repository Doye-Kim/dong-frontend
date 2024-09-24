import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AssetList from '@/components/common/AssetList';
import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import {useEffect, useState} from 'react';
const data = [
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
];
const SelectAccountScreen = () => {
  const [selectedList, setSelectedList] = useState([]);
  const [account, setAccount] = useState();
  useEffect(() => {
    if (selectedList.length > 1) {
      setSelectedList(prev => {
        const newList = [...prev];
        newList.shift();
        setAccount(newList[0]);
        return newList;
      });
    } else if (selectedList.length === 1) {
      setAccount(selectedList[0]);
    }
  }, [selectedList]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>계좌를 선택하세요</Text>
      <ScrollView style={styles.listContainer}>
        <AssetList
          accountData={data}
          title=""
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </ScrollView>
      <View>
        <CustomButton text="확인" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  listContainer: {
    height: Dimensions.get('window').height - 170,
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
});
export default SelectAccountScreen;
