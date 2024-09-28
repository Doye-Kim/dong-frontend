import {
  AddRoundButton,
  ArrowDropDownButton,
  ArrowDropUpButton,
} from '@/assets/icons';
import AssetItemList from '@/components/asset/asset/AssetItemList';
import AssetListHeader from '@/components/asset/asset/AssetListHeader';
import NotificationHeader from '@/components/common/NotificationHeader';
import {
  assetNavigations,
  colors,
  gameNavigations,
  seedNavigations,
} from '@/constants';
import {Account, Card, Game, Seed} from '@/types/domain';
import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GameList from '@/components/asset/asset/GameList';
import AssetAccountData from '@/assets/tempData/Asset/AssetAccountData.json';
import GameListData from '@/assets/tempData/Asset/GameListData.json';
import SeedsDataList from '@/assets/tempData/Asset/SeedsDataList.json';
import SeedList from '@/components/asset/asset/SeedList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {getSeeds} from '@/api/seed';
import Toast from 'react-native-toast-message';

type AssetData = {
  accounts: Account[];
  cards: Card[];
};

type GameData = {
  games: Game[];
};

type SeedData = Seed[];

const AssetMainScreen = () => {
  const [username, setUsername] = useState('장효승');
  const [assetAmount, setAssetAmount] = useState('20000000');
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [showHiddenAssets, setShowHiddenAssets] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [seedData, setSeedData] = useState<SeedData | null>(null);
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();

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
    setAssetData(AssetAccountData);
    setGameData(GameListData);
    // setSeedData(SeedsDataList.data);
    getSeedData();
  }, []);

  // 숨긴 계좌 보이기를 했을 때, 가장 밑에 보이게끔
  const sortedAccounts = useMemo(() => {
    if (!assetData) return [];
    return [...assetData.accounts].sort((a, b) => {
      if (a.hideStatus === 'hide_asset' && b.hideStatus !== 'hide_asset')
        return 1;
      if (a.hideStatus !== 'hide_asset' && b.hideStatus === 'hide_asset')
        return -1;
      return 0;
    });
  }, [assetData]);

  const sortedCards = useMemo(() => {
    if (!assetData) return [];
    return [...assetData.cards].sort((a, b) => {
      if (a.hideStatus === 'hide_asset' && b.hideStatus !== 'hide_asset')
        return 1;
      if (a.hideStatus !== 'hide_asset' && b.hideStatus === 'hide_asset')
        return -1;
      return 0;
    });
  }, [assetData]);

  const filteredAccounts = useMemo(
    () =>
      showHiddenAssets
        ? sortedAccounts
        : sortedAccounts.filter(account => account.hideStatus !== 'hide_asset'),
    [sortedAccounts, showHiddenAssets],
  );

  const filteredCards = useMemo(
    () =>
      showHiddenAssets
        ? sortedCards
        : sortedCards.filter(card => card.hideStatus !== 'hide_asset'),
    [sortedCards, showHiddenAssets],
  );

  const filteredGames = useMemo(() => {
    return gameData?.games.filter(game => game.status === 'ongoing') || [];
  }, [gameData]);

  const filteredSeeds = useMemo(() => {
    return (
      seedData?.filter(
        seed => seed.status === 'PROCEEDING' || seed.status === 'COMPLETED',
      ) || []
    );
  }, [seedData]);

  return (
    <SafeAreaView style={styles.container}>
      <NotificationHeader />
      <ScrollView>
        {/* 헤더 */}
        <AssetListHeader username={username} assetAmount={assetAmount} />

        {/* 자산 */}
        <Text style={styles.headerText}>계좌</Text>
        <AssetItemList accountData={filteredAccounts} />
        <Text style={styles.headerText}>카드</Text>
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

        {/* 내기 */}

        <Text style={styles.headerText}>진행중인 내기</Text>
        <GameList gameData={filteredGames} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(assetNavigations.GAME, {
              screen: gameNavigations.CREATE,
              params: {gameId: undefined},
            })
          }>
          <View style={styles.buttonContainer}>
            <AddRoundButton />
            <Text style={styles.buttonText}>생성</Text>
          </View>
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
