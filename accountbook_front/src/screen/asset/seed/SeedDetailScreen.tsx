import {ResponseSeed, deleteSeed, getSeed} from '@/api/seed';
import SeedInfo from '@/components/seed/SeedInfo';
import SeedTitle from '@/components/seed/SeedTitle';
import {assetNavigations, colors} from '@/constants';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

const SeedDetailScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();
  const {seedId} = route.params;
  const [seed, setSeed] = useState<ResponseSeed>();

  const getSeedData = async () => {
    try {
      const data = await getSeed(seedId);
      console.log(data);
      setSeed(data);
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: '종잣돈을 불러오는 데 문제가 생겼어요',
      });
    }
  };
  useEffect(() => {
    getSeedData();
  }, []);

  const deleteSeedFunc = async () => {
    try {
      await deleteSeed(seedId);
      navigation.navigate(assetNavigations.MAIN);
      console.log(seedId);
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: '해지하는 데 문제가 생겼어요',
      });
    }
  };
  const onPressDelete = () => {
    Alert.alert('Confirm', '정말 해지하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteSeedFunc();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {seed && (
        <>
          <SeedTitle
            title={seed.title}
            targetAmount={seed.targetAmount}
            entireRound={seed.entireRound}
            dataStatus={seed.status}
            passedRound={seed.passedRound}
            totalTransferredAmount={seed.totalTransferredAmount}
          />
          <SeedInfo
            depositAccount={seed.depositAccount}
            withdrawAccount={seed.withdrawalAccount}
            endDate={seed.endDate}
            dueDate={seed.dueDate}
            perPaymentDeposit={Math.round(seed.targetAmount / seed.entireRound)}
          />
        </>
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressDelete}>
        <Text style={styles.buttonText}>해지하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: colors.ORANGE_500,
    height: 50,
    width: 200,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.WHITE,
  },
});
export default SeedDetailScreen;
