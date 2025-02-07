import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AssetList from '@/components/common/AssetList';
import CustomButton from '@/components/common/CustomButton';
import {useEffect, useState} from 'react';
import {AccountInfo, getAssets} from '@/api/asset';
import Toast from 'react-native-toast-message';
import {postSettlement} from '@/api/settlement';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import {colors, gameNavigations, accountBookNavigations} from '@/constants';
import useGameCreateStore from '@/store/useGameCreateStore';
import {postGame} from '@/api/game';
import useThemeStore from '@/store/useThemeStore';

const SelectAccountScreen = ({route, navigation}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const pageNumber = route?.params?.pageNumber;
  const [title, setTitle] = useState('');
  const [nextText, setNextText] = useState('');
  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setTitle('정산 받을');
        setNextText('정산 요청하기');
        break;
      case 2:
        setTitle('출금할');
        setNextText('송금하기');
        break;
      case 3:
        setTitle('참가비를 낼');
        if (gameCategoryId) setNextText('내기 신청하기');
        else setNextText('내기 참여하기');
        break;
    }
  }, [pageNumber]);

  const {setAccountNumber} = useGameCreateStore();
  const [accounts, setAccounts] = useState<AccountInfo[]>();
  const [account, setAccount] = useState<AccountInfo>();
  const [selectedList, setSelectedList] = useState<Array<AccountInfo>>([]);

  const getAssetList = async () => {
    try {
      const data = await getAssets();
      setAccounts(data.accountList);
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

  const {resetSettlement} = useSettlementCreateStore();
  const {resetGame} = useGameCreateStore();
  const enterSettlement = async (accountId: number) => {
    const state = useSettlementCreateStore.getState();

    // 서버로 보낼 SettlementUser 배열에서 nickname 필드를 제외
    const newPaymentList = state.settlementPaymentList.map(payment => ({
      ...payment,
      settlementUserList: payment.settlementUserList
        .filter(({userId}) => userId >= 0) // userId가 0보다 작은 값 제외
        .map(({userId, amount}) => ({
          userId,
          amount,
        })),
    }));
    try {
      const data = await postSettlement({
        accountId: accountId,
        settlementPaymentList: newPaymentList,
      });
      resetSettlement();
      navigation.navigate(accountBookNavigations.TABBAR, {
        screen: accountBookNavigations.SETTLEMENTMAIN,
      });
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };

  const {
    participantIds,
    gameCategoryId,
    customCategoryIds,
    startDate,
    endDate,
    fee,
    participantId,
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
      navigation.navigate(gameNavigations.MAIN);
      Toast.show({
        type: 'success',
        text1: '내기 신청에 성공했습니다.',
      });
      resetGame();
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });
    }
  };

  const {settlementId} = useSettlementCreateStore();

  const handleOnPress = () => {
    if (!account) {
      Toast.show({
        type: 'error',
        text1: '계좌를 선택해 주세요',
      });
    } else if (pageNumber === 1) {
      enterSettlement(account.id);
    } else if (pageNumber === 3) {
      setAccountNumber(account.accountNumber);
      if (gameCategoryId) enterGame(account.accountNumber);
      else
        navigation.navigate(gameNavigations.PIN, {
          pageNumber: 3,
          participantId,
          account,
        });
    } else if (pageNumber === 2) {
      navigation.navigate(accountBookNavigations.PIN, {
        pageNumber: 3,
        settlementId,
        account,
      });
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
      setAccount(undefined);
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
        <CustomButton text={nextText} onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
    },
  });

export default SelectAccountScreen;
