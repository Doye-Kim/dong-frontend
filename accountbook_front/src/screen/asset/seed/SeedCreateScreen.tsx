import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {assetNavigations, colors} from '@/constants';
import {useState} from 'react';
import CalendarModal from '@/components/common/CalendarModal';
import CustomButton from '@/components/common/CustomButton';
import {DropdownButton} from '@/assets/icons';
import DropdownMenu from './DropdownMenu';
import {getDateLocaleFormatDiff} from '@/utils';
import SelectAccountModal from '@/components/seed/SelectAccountModal';
import {PeriodOptions, postSeed} from '@/api/seed';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {StackNavigationProp} from '@react-navigation/stack';
import BackHeader from '@/components/common/BackHeader';
import useThemeStore from '@/store/useThemeStore';

const period: Record<PeriodOptions, string> = {
  DAILY: '매일',
  WEEKLY: '매주',
  MONTHLY: '매달',
};

const SeedCreateScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AssetStackParamList>>();
  const [isOpenCalendar, setIsOpneCalendar] = useState(false);
  const [isOpenPeriodDropdown, setIsOpenPeriodDropdown] = useState(false);
  const [isOpenSendAccountDropdown, setIsOpenSendAccountDropdown] =
    useState(false);
  const [isOpenSaveAccountDropdown, setIsOpenSaveAccountDropdown] =
    useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOptions>('DAILY');
  const [sendAccount, setSendAccount] = useState('');
  const [saveAccount, setSaveAccount] = useState('');
  const [unit, setUnit] = useState('원');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const curDate = new Date();

  const handlePeriodDropdown = () => {
    setIsOpenPeriodDropdown(prev => !prev);
  };

  const handlePeriodSelect = (period: PeriodOptions) => {
    setSelectedPeriod(period);
  };

  const onPressDate = () => {
    setIsOpneCalendar(prev => !prev);
  };

  const handleOnChangeTitle = (text: string) => {
    setTitle(text);
  };

  const getFormattedAmount = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setAmount(filteredText ? `${filteredText}` : '');
    if (filteredText) setUnit('만원');
    else setUnit('원');
  };

  const onPressStart = async () => {
    if (startDate === endDate || !startDate || !endDate) {
      Toast.show({
        type: 'error',
        text1: '날짜를 똑바로 입력해 주세요',
      });
    } else if (!title) {
      Toast.show({
        type: 'error',
        text1: '무엇을 위해 모을 건지 입력해 주세요',
      });
    } else if (!amount) {
      Toast.show({
        type: 'error',
        text1: '얼마를 모을 건지 입력해 주세요',
      });
    } else if (!sendAccount || !saveAccount) {
      Toast.show({
        type: 'error',
        text1: '계좌를 선택해 주세요',
      });
    } else if (sendAccount.id === saveAccount.id) {
      Toast.show({
        type: 'error',
        text1: '송금 계좌와 입금 계좌가 같습니다',
      });
    } else {
      const RequestBody = {
        depositAccountId: saveAccount.id,
        withdrawalAccountId: sendAccount.id,
        title: title,
        periodStatus: selectedPeriod,
        targetAmount: Number(amount) * 10000,
        startDate: startDate,
        endDate: endDate,
      };
      console.log(RequestBody);
      try {
        const data = await postSeed(RequestBody);
        console.log(data);
        Toast.show({
          type: 'success',
          text1: '종잣돈 생성 완료',
        });
        navigation.navigate(assetNavigations.MAIN);
      } catch (err) {
        console.log(err.response.data);
        Toast.show({
          type: 'error',
          text1: '종잣돈을 저장하는 과정에 문제가 생겼습니다',
          text2: '다시 시도해 주세요',
        });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader navigation={navigation} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.dateInfo} onPress={onPressDate}>
          <View style={styles.startendDate}>
            <Text style={styles.dateText}>
              {startDate
                ? getDateLocaleFormatDiff(startDate)
                : getDateLocaleFormatDiff(curDate)}
              ~
              {endDate
                ? getDateLocaleFormatDiff(endDate)
                : getDateLocaleFormatDiff(curDate)}
            </Text>
          </View>
        </TouchableOpacity>
        {isOpenCalendar && (
          <CalendarModal
            isVisible={isOpenCalendar}
            curDate={curDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onClose={() => setIsOpneCalendar(false)}
            marginTop={130}
            seedOrGame={true}
          />
        )}
        <View style={styles.animationContainer}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('@/assets/lottie/seed-animation.json')}
            autoPlay
            loop={true}
            speed={0.7}
          />
        </View>
        <View style={styles.seedFormContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formText}
                value={title}
                onChangeText={handleOnChangeTitle}
              />
            </View>
            <Text style={styles.formText}>을/를 위해</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.formText}>총</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.moneyText}
                placeholder="0"
                value={amount}
                onChangeText={getFormattedAmount}
                keyboardType="numeric"
              />
              <Text style={styles.moneyText}>{unit}</Text>
            </View>
            <Text style={styles.formText}>을</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={handlePeriodDropdown}>
              <Text style={styles.formText}>{period[selectedPeriod]}</Text>
              <DropdownButton width={30} height={30} />
            </TouchableOpacity>
            {isOpenPeriodDropdown && (
              <DropdownMenu
                isVisible={isOpenPeriodDropdown}
                onSelect={handlePeriodSelect}
                onClose={() => setIsOpenPeriodDropdown(false)}
              />
            )}
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setIsOpenSendAccountDropdown(true)}>
              <Text style={styles.formText}>{sendAccount.bank}</Text>
            </TouchableOpacity>
            <Text style={styles.formText}>계좌에서</Text>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setIsOpenSaveAccountDropdown(true)}>
              <Text style={styles.formText}>{saveAccount.bank}</Text>
            </TouchableOpacity>
            <Text style={styles.formText}>계좌로 모을 거예요</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton text="시작" onPress={onPressStart} />
        </View>
        {isOpenSaveAccountDropdown && (
          <SelectAccountModal
            isVisible={isOpenSaveAccountDropdown}
            onClose={() => setIsOpenSaveAccountDropdown(false)}
            setAccount={setSaveAccount}
          />
        )}
        {isOpenSendAccountDropdown && (
          <SelectAccountModal
            isVisible={isOpenSendAccountDropdown}
            onClose={() => setIsOpenSendAccountDropdown(false)}
            setAccount={setSendAccount}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    animationContainer: {
      width: 200,
      height: 200,
      marginTop: 30,
    },
    dateInfo: {
      width: '100%',
      alignItems: 'center',
    },
    startendDate: {
      backgroundColor: colors[theme].ORANGE_200,
      width: '100%',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    dateText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      color: colors[theme].PRIMARY,
    },
    seedFormContainer: {
      marginVertical: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    },
    inputContainer: {
      width: 150,
      height: 55,
      backgroundColor:
        theme === 'dark' ? colors[theme].GRAY_300 : colors[theme].GRAY_500,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    moneyText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 24,
      color: colors[theme].BLACK,
      paddingVertical: 0,
    },
    formText: {
      margin: 5,
      fontFamily: 'Pretendard-Bold',
      fontSize: 24,
      color: colors[theme].BLACK,
      paddingVertical: 0,
    },
    dropdownContainer: {
      flexDirection: 'row',
      width: 150,
      height: 55,
      backgroundColor:
        theme === 'dark' ? colors[theme].GRAY_300 : colors[theme].GRAY_500,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
    },
  });
export default SeedCreateScreen;
