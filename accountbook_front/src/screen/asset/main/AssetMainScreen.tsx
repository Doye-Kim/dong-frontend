import {
  AddRoundButton,
  ArrowDropDownButton,
  ArrowDropUpButton,
} from '@/assets/icons';
import AssetItemList from '@/components/asset/asset/AssetItemList';
import AssetListHeader from '@/components/asset/asset/AssetListHeader';
import {assetNavigations, colors, seedNavigations} from '@/constants';
import {Account, Card, Seed} from '@/types/domain';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import SeedList from '@/components/asset/seed/SeedList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import axiosInstance from '@/api/axios';
import {getSeeds} from '@/api/seed';
import Toast from 'react-native-toast-message';

type AssetData = {
  accounts: Account[];
  cards: Card[];
};

type SeedData = Seed[];

const AssetMainScreen = () => {
  const [username, setUsername] = useState('장효승');
  const [assetAmount, setAssetAmount] = useState<number>(0);
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [showHiddenAssets, setShowHiddenAssets] = useState(false);
  const [seedData, setSeedData] = useState<SeedData | null>(null);
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();

  const handleGetAssets = async () => {
    try {
      const response = await axiosInstance.get('/assets');
      const {accountList, cardList} = response.data;
      console.log('데이터', response.data);
      setAssetData({
        accounts: accountList,
        cards: cardList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getSeedData = async () => {
    try {
      const data = await getSeeds();
      console.log(data);
      setSeedData(data.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '종잣돈을 불러오는 데 문제가 발생했습니다.',
        text2: '새로고침 해주세요',
      });
    }
  };

  useEffect(() => {
    handleGetAssets();
    getSeedData();
    getUserName();
  }, []);

  const getUserName = () => {
    // set
  };
  useFocusEffect(
    useCallback(() => {
      getSeedData();
      console.log('focus');
      return () => {
        console.log('다른 화면으로 넘어갔어요.');
      };
    }, []),
  );

  // 숨긴 계좌 보이기를 했을 때, 가장 밑에 보이게끔
  const sortedAccounts = useMemo(() => {
    if (!assetData) return [];
    return [...assetData.accounts].sort((a, b) => {
      if (a.hideStatus === 'HIDE_ASSET' && b.hideStatus !== 'HIDE_ASSET')
        return 1;
      if (a.hideStatus !== 'HIDE_ASSET' && b.hideStatus === 'HIDE_ASSET')
        return -1;
      return 0;
    });
  }, [assetData]);

  const sortedCards = useMemo(() => {
    if (!assetData) return [];
    return [...assetData.cards].sort((a, b) => {
      if (a.hideStatus === 'HIDE_ASSET' && b.hideStatus !== 'HIDE_ASSET')
        return 1;
      if (a.hideStatus !== 'HIDE_ASSET' && b.hideStatus === 'HIDE_ASSET')
        return -1;
      return 0;
    });
  }, [assetData]);

  const filteredAccounts = useMemo(
    () =>
      showHiddenAssets
        ? sortedAccounts
        : sortedAccounts.filter(account => account.hideStatus !== 'HIDE_ASSET'),
    [sortedAccounts, showHiddenAssets],
  );

  const filteredCards = useMemo(
    () =>
      showHiddenAssets
        ? sortedCards
        : sortedCards.filter(card => card.hideStatus !== 'HIDE_ASSET'),
    [sortedCards, showHiddenAssets],
  );

  const filteredSeeds = useMemo(() => {
    return (
      seedData?.filter(
        seed => seed.status === 'PROCEEDING' || seed.status === 'COMPLETED',
      ) || []
    );
  }, [seedData]);

  useEffect(() => {
    const totalAmount = filteredAccounts.reduce((acc, account) => {
      return acc + (account.balance || 0);
    }, 0);

    setAssetAmount(totalAmount);
  }, [filteredAccounts]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 헤더 */}
        <AssetListHeader username={username} assetAmount={assetAmount} />

        {/* 자산 */}
        {filteredAccounts.length === 0 ? (
          <></>
        ) : (
          <Text style={styles.headerText}>계좌</Text>
        )}
        <AssetItemList accountData={filteredAccounts} />
        
        {filteredCards.length === 0 ? (
          <></>
        ) : (
          <Text style={styles.headerText}>카드</Text>
        )}
        <AssetItemList cardData={filteredCards} />


        {/* 자산 숨기기 버튼 */}
        <TouchableOpacity
          onPress={() => setShowHiddenAssets(prev => !prev)}
          style={styles.hiddenAssetsButton}>
          <Text style={styles.hiddenAssetsText}>
            {showHiddenAssets ? '자산 숨기기' : '숨긴 자산 보기'}
          </Text>
          {showHiddenAssets ? <ArrowDropUpButton /> : <ArrowDropDownButton />}
        </TouchableOpacity>

        {/* 종잣돈 */}
        <Text style={styles.headerText}>종잣돈 모으기</Text>
        <SeedList seedData={filteredSeeds} />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate(assetNavigations.SEED, {
              screen: seedNavigations.CREATE,
              params: {seedId: undefined},
            })
          }>
          <AddRoundButton />
          <Text style={styles.buttonText}>생성</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
  },
  assetSeparator: {
    backgroundColor: colors.GRAY_300,
    height: 5,
    borderRadius: 5,
  },
  hiddenAssetsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  hiddenAssetsText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: colors.GRAY_500,
  },
  hiddenAssetsIcon: {
    marginLeft: 5,
  },
  headerText: {
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
    fontSize: 18,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.ORANGE_200,
    height: 55,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.PRIMARY,
    marginLeft: 10,
  },
});

export default AssetMainScreen;
