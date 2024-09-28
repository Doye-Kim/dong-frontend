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
import {AccountInfo, getAssets} from '@/api/asset';
import Toast from 'react-native-toast-message';

const SelectAccountModal = ({
  isVisible,
  onClose,
  setAccount,
}: {
  isVisible: boolean;
  onClose: () => void;
  setAccount(account: string): void;
}) => {
  const [accountList, setAccountList] = useState<AccountInfo[]>([]);
  const [selectedList, setSelectedList] = useState([]);

  const getAccountList = async () => {
    try {
      const data = await getAssets();
      console.log(data.accountList);
      if (data.accountList.length > 1) {
        setAccountList(data.accountList);
      } else {
        Toast.show({
          type: 'info',
          text1: '종잣돈을 생성하려면 계좌가 두 개 이상 있어야 해요',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '계좌를 불러오는 데 문제가 발생했습니다.',
      });
    }
  };
  useEffect(() => {
    getAccountList();
  }, []);

  const handlePressComplete = () => {
    onClose();
  };
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
                accountData={accountList}
                title=""
                selectedList={selectedList}
                setSelectedList={setSelectedList}
              />
            </ScrollView>
            <View>
              <CustomButton text="확인" onPress={handlePressComplete} />
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
