import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AssetList from '../common/AssetList';
import {colors} from '@/constants';
import CustomButton from '../common/CustomButton';
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
const SelectAccountModal = ({
  isVisible,
  onClose,
  setAccount,
}: {
  isVisible: boolean;
  onClose: () => void;
  setAccount(account: string): void;
}) => {
  const [selectedList, setSelectedList] = useState([]);

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>계좌를 선택해 주세요</Text>
            <ScrollView style={styles.listContainer}>
              <AssetList
                accountData={data}
                title=""
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </ScrollView>
            <View>
              <CustomButton text="확인" onClose={onClose} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    paddingTop: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
    width: '100%',
    height: 500,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 8,
  },
  listContainer: {height: 370, marginBottom: 10},
  text: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
});
export default SelectAccountModal;
