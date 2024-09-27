import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants/colors';
import AssetList from '@/components/common/AssetList';
import {useEffect, useState} from 'react';
import {
  AccountInfo,
  CardInfo,
  RegisterAccountInfo,
  RegisterAsset,
  RegisterCardInfo,
  getRegisterAssets,
  postRegisterAssets,
} from '@/api/asset';
import Toast from 'react-native-toast-message';
import useUserStore from '@/store/useUserStore';

const SelectAssetsScreen = () => {
  const [assetList, setAssetList] = useState<RegisterAsset>();
  const [selectedList, setSelectedList] = useState<
    Array<RegisterAccountInfo | AccountInfo | RegisterCardInfo | CardInfo>
  >([]);
  const {isLogin, setIsLogin} = useUserStore();

  const getAssetList = async () => {
    try {
      const data = await getRegisterAssets();
      // console.log('zkem', data);
      setAssetList(data);
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

  const handlePressComplete = async () => {
    console.log(selectedList);
    const cards: RegisterCardInfo[] = [];
    const accounts: RegisterAccountInfo[] = [];
    selectedList.forEach(item => {
      if ('cardNo' in item) {
        const {state, ...cardInfo} = item;
        cards.push(cardInfo);
      } else if ('bankCode' in item) {
        accounts.push(item);
      }
    });

    console.log('card', cards);
    console.log('account', accounts);
    try {
      await postRegisterAssets({cards, accounts});
      Toast.show({
        type: 'success',
        text1: '자산 저장 성공!',
      });
      setIsLogin(true);
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: '저장하는 데 오류가 발생했습니다. 다시 시도해 주세요',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>목록에 나타낼</Text>
        <Text style={styles.title}>자산을 선택해 주세요</Text>
      </View>
      <ScrollView style={styles.assetListContainer}>
        {assetList && assetList.accounts && assetList.accounts.length > 0 && (
          <AssetList
            title="계좌"
            accountData={assetList.accounts}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        )}
        {assetList && assetList.cards && assetList.cards.length > 0 && (
          <AssetList
            title="카드"
            cardData={assetList.cards}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton text="완료" onPress={handlePressComplete} />
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
  titleContainer: {},
  title: {
    fontSize: 28,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
  },
  assetListContainer: {
    marginVertical: 10,
    height: Dimensions.get('screen').height - 320,
  },
  assetTitle: {
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  assetContainer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
export default SelectAssetsScreen;
