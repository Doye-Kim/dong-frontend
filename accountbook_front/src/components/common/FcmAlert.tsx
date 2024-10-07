import {
  accountBookNavigations,
  assetNavigations,
  colors,
  gameNavigations,
  seedNavigations,
} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const FcmAlert = ({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) => {
  const [lottieSource, setLottieSource] = useState<any>(null);
  const [navigateName, setNavigateName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (title.includes('종잣돈')) {
      setLottieSource(require('@/assets/lottie/falling-money.json'));
      setNavigateName(assetNavigations.NOTICE);
    } else if (title.includes('정산')) {
      setLottieSource(require('@/assets/lottie/settlement.json'));
      setNavigateName(accountBookNavigations.NOTICE);
    } else if (title.includes('내기')) {
      setLottieSource(require('@/assets/lottie/game.json'));
      setNavigateName(gameNavigations.NOTICE);
    } else if (title.includes('고정')) {
      setLottieSource(require('@/assets/lottie/card.json'));
      setNavigateName(accountBookNavigations.NOTICE);
    }
  }, [title]);

  if (!lottieSource) {
    return null;
  }

  const handlePressOk = () => {
    navigation.navigate(navigateName);
    onClose();
  };
  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <LottieView
          style={{
            width: 200,
            height: 200,
          }}
          source={lottieSource}
          autoPlay
          loop={true}
          speed={0.7}
        />
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.bodyText}>{body} 확인해보세요!</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.buttonContainer} onPress={onClose}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePressOk}>
            <Text style={[styles.buttonText, {color: colors.PRIMARY}]}>
              보러 가기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    width: 300,
    height: 400,
    padding: 20,
    borderRadius: 30,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 8,
  },
  animationContainer: {
    width: 200,
    height: 200,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.BLACK,
  },
  bodyText: {
    marginTop: 15,
    fontFamily: 'Pretendard-Medium',
    fontSize: 18,
    color: colors.GRAY_700,
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_600,
  },
});

export default FcmAlert;
