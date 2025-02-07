import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PinPad from '@/components/auth/PinPad';
import {
  accountBookNavigations,
  authNavigations,
  colors,
  gameNavigations,
  mainNavigations,
} from '@/constants';
import {useEffect, useState} from 'react';
import {getEncryptStorage} from '@/utils/encryptedStorage';
import {getAccessToken, patchPassword, postLogin} from '@/api/auth';
import {validatePin} from '@/utils/validate';
import Toast from 'react-native-toast-message';
import useUserStore from '@/store/useUserStore';
import {removeEncryptStorage} from '@/utils/encryptedStorage';
import {postTransferSettlement} from '@/api/settlement';
import useSettlementCreateStore from '@/store/useSettlementCreate';
import useGameCreateStore from '@/store/useGameCreateStore';
import {acceptGame} from '@/api/game';
import useThemeStore from '@/store/useThemeStore';

const clearAllData = async () => {
  console.log('clear');
  // Clear Zustand Store
  useUserStore.getState().reset();

  // Clear Encrypted Storage
  await removeEncryptStorage('user'); // This should clear all stored keys
};

const PinCodeScreen = ({route, navigation}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  // pageNumber === 1: 회원 가입, 등록할 비밀번호 입력
  // pageNumber === 2: 회원 가입, 비밀번호 2차 확인
  // pageNumber === 3: 로그인/송금
  const pageNumber = route?.params?.pageNumber ?? 1;
  const participantId = route?.params?.participantId;
  const settlementId = route?.params?.settlementId;
  const account = route?.params?.account;

  console.log('pin', participantId, settlementId, account);
  const [pin, setPin] = useState<number[]>([]);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(pageNumber);
  const {isLogin, setIsLogin} = useUserStore();

  useEffect(() => {
    if (pin.length === 6) {
      switch (page) {
        case 1:
          handleMoveConfirm();
          break;
        case 2:
          handleSubmit();
          break;
        case 3:
          handleLogin();
          break;
      }
    }
  }, [pin]);

  const MAX_LOGIN_ATTEMPTS = 5;
  const [loginAttempts, setLoginAttempts] = useState(0); // Track failed attempts
  const {resetSettlement} = useSettlementCreateStore();
  const {resetGame, customCategoryIds} = useGameCreateStore();

  const transfer = async () => {
    try {
      const data = await postTransferSettlement({
        settlementId,
        accountId: account.id,
        accountNumber: account.accountNumber,
      });
      console.log(data);
      Toast.show({
        type: 'success',
        text1: '송금 완료!',
      });
      resetSettlement();
      navigation.navigate(mainNavigations.ACCOUNTBOOK, {
        screen: accountBookNavigations.TABBAR,
      });
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  };

  const acceptGameRequest = async () => {
    try {
      const data = await acceptGame({
        participantId,
        customCategoryIds,
        accountNumber: account.accountNumber,
      });
      console.log(data);
      navigation.navigate(gameNavigations.MAIN);
      Toast.show({
        type: 'success',
        text1: '내기 참여에 성공했습니다.',
      });
      resetGame();
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: 'error',
        text1: err.response.data
          ? err.response.data.message
          : '알 수 없는 오류가 발생했습니다.',
      });
    }
  };

  const handleLogin = async (retry = false) => {
    const storedData = await getEncryptStorage('user');
    const password = pin.join('');
    const phone = JSON.parse(storedData).phone;

    try {
      // 로그인 시도
      await postLogin({phone, password});

      // 로그인 성공 처리
      setIsLogin(true);
      setLoginAttempts(0); // 로그인 성공 시 시도 횟수 초기화
      if (settlementId) {
        transfer();
      } else if (participantId) {
        acceptGameRequest();
      }
    } catch (err) {
      const errorStatus = err.response?.status;
      const errorMessage = err.response?.data?.message;

      console.log('Login error:', errorStatus, errorMessage);

      // 비밀번호가 틀렸을 때
      if (errorStatus === 401 && errorMessage !== 'token expired') {
        setLoginAttempts(prevAttempts => {
          const newAttempts = prevAttempts + 1;

          // 횟수가 갱신된 이후에 에러 메시지를 업데이트
          setError(`비밀번호가 틀렸습니다. (${newAttempts}/5)`);
          setPin([]);
          if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
            console.log('최대 로그인 시도 횟수를 초과했습니다.');
            Toast.show({
              type: 'error',
              text1: '최대 로그인 시도 횟수 초과',
              text2: '본인 인증부터 다시 하세요',
            });
            clearAllData();
            return;
          }

          console.log(
            `잘못된 비밀번호. 남은 시도 횟수: ${
              MAX_LOGIN_ATTEMPTS - newAttempts
            }`,
          );

          return newAttempts; // 업데이트된 횟수 반환
        });
      } else if (errorMessage === 'token expired' && !retry) {
        // 토큰이 만료된 경우
        console.log('토큰 만료, 재발급합니다.');

        try {
          await getAccessToken();
          console.log('토큰 재발급 완료. 다시 로그인 시도 중...');
          await handleLogin(true);
        } catch (tokenError) {
          console.log('토큰 재발급 실패:', tokenError);
        }
      } else {
        console.log('다른 에러가 발생했습니다.', err);
      }
    }
  };

  const handleMoveConfirm = () => {
    const password = pin.join('');
    setPw(password);
    setPin([]);
    setPage(2);
  };
  const handleSubmit = async () => {
    const storedData = await getEncryptStorage('user');
    console.log(storedData);
    const userId = JSON.parse(storedData).id;
    const password = pin.join('');
    const validationError = validatePin(pw, password).pin;

    setError(validationError);

    if (!validationError) {
      try {
        const data = await patchPassword({userId, password});
        Toast.show({
          type: 'success',
          text1: 'SUCCESS',
          text2: '비밀번호 설정에 성공했어요',
        });
        navigation.navigate(authNavigations.SELECT_ASSETS);
      } catch (err) {
        console.log(err.response?.data.message);
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: '비밀번호를 저장하는 과정에 문제가 발생했습니다.',
        });
        setPin([]);
      }
    } else {
      setPin([]);
    }
  };

  const renderCircles = () => {
    const totalCircles = 6;
    const filledCircles = pin.length;

    return (
      <View style={styles.circleContainer}>
        {Array.from({length: totalCircles}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              index < filledCircles ? styles.filledCircle : styles.emptyCircle,
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        {page === 1 ? (
          <>
            <Text style={styles.titleText}>간편 비밀번호를</Text>
            <Text style={styles.titleText}>설정해 주세요</Text>
            <Text style={styles.text}>로그인, 송금에 사용됩니다.</Text>
          </>
        ) : page === 2 ? (
          <>
            <Text style={styles.titleText}>비밀번호를 한 번 더</Text>
            <Text style={styles.titleText}>입력해 주세요</Text>
            {Boolean(error) && (
              <Text style={[styles.text, styles.error]}>{error}</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.titleText}>간편 비밀번호를</Text>
            <Text style={styles.titleText}>입력해 주세요</Text>
            {Boolean(error) && (
              <Text style={[styles.text, styles.error]}>{error}</Text>
            )}
          </>
        )}
      </View>
      <View style={styles.inputContainer}>{renderCircles()}</View>
      <View style={styles.padContainer}>
        <PinPad pin={pin} setPin={setPin} />
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    titleText: {
      color: colors[theme].BLACK,
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
    },
    text: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 12,
      color: colors[theme].BLACK,
      marginTop: 10,
    },
    inputContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleContainer: {
      flexDirection: 'row',
    },
    circle: {
      width: 25,
      height: 25,
      borderRadius: 15,
      marginHorizontal: 10,
    },
    emptyCircle: {
      backgroundColor: colors[theme].GRAY_400,
    },
    filledCircle: {
      backgroundColor: colors[theme].PRIMARY,
    },
    padContainer: {
      flex: 2.5,
    },
    error: {
      color: colors[theme].RED_500,
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 15,
      marginTop: 10,
    },
  });
export default PinCodeScreen;
