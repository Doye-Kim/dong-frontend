import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AssetList from '@/components/common/AssetList';
import {colors, gameNavigations} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import {useEffect, useState} from 'react';
import {AccountInfo, getRegisterAssets} from '@/api/asset';
import Toast from 'react-native-toast-message';
import useGameCreateStore from '@/store/useGameCreateStore';
import {postGame} from '@/api/game';

const SelectAccountScreen = ({route, navigation}) => {
  const pageNumber = route?.params?.pageNumber;
  const [title, setTitle] = useState('');
  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setTitle('정산 받을');
        break;
      case 2:
        setTitle('출금할');
        break;
      case 3:
        setTitle('참가비를 낼');
        break;
    }
  }, []);

  console.log(pageNumber);
  const {setAccountNumber} = useGameCreateStore();
  const [accounts, setAccounts] = useState<AccountInfo[]>();
  const [account, setAccount] = useState<AccountInfo>();
  const [selectedList, setSelectedList] = useState<Array<AccountInfo>>([]);

  const getAssetList = async () => {
    try {
      const data = await getRegisterAssets();
      console.log(data);
      setAccounts(data.accounts);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '계좌를 불러오는 데 문제가 생겼어요 다시 시도해 주세요',
      });
    }
  };
  useEffect(() => {
    getAssetList();
  }, []);

  const {
    participantIds,
    gameCategoryId,
    customCategoryIds,
    startDate,
    endDate,
    fee,
  } = useGameCreateStore();

  const enterGame = async (accountNumber: string) => {
    try {
      const data = await postGame({
        participantIds,
        gameCategoryId,
        customCategoryIds,
        startDate,
        endDate,
        fee,
        accountNumber,
      });
      console.log(data);
      navigation.navigate(gameNavigations.MAIN);
      Toast.show({
        type: 'success',
        text1: '내기 신청에 성공했습니다.',
      });
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };
  const handleOnPress = () => {
    if (pageNumber === 3) {
      console.log('account ', account.accountNo);
      if (!account) {
        Toast.show({
          type: 'error',
          text1: '계좌를 선택해 주세요',
        });
      } else {
        setAccountNumber(account.accountNo);
        enterGame(account.accountNo);
      }
    }
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
    } else if (selectedList.length === 0) {
      setAccount();
    }
  }, [selectedList]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>계좌를 선택하세요</Text>
      <ScrollView style={styles.listContainer}>
        <AssetList
          accountData={accounts}
          title=""
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </ScrollView>
      <View>
        <CustomButton text="내기 요청하기" onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
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
