import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Calendar} from 'react-native-calendars';
import {colors} from '@/constants';
import {useRef, useState} from 'react';
import CalendarModal from '@/components/common/CalendarModal';
import CustomButton from '@/components/common/CustomButton';
import {DropdownButton} from '@/assets/icons';
import DropdownMenu from './DropdownMenu';
import {getDateLocaleFormatDiff} from '@/utils';
import SelectAccountModal from '@/components/seed/SelectAccountModal';

type PeriodOptions = 'Daily' | 'Weekly' | 'Monthly';

const period: Record<PeriodOptions, string> = {
  Daily: '매일',
  Weekly: '매주',
  Monthly: '매달',
};

const SeedCreateScreen = () => {
  const [isOpenCalendar, setIsOpneCalendar] = useState(false);
  const [isOpenPeriodDropdown, setIsOpenPeriodDropdown] = useState(false);
  const [isOpenSendAccountDropdown, setIsOpenSendAccountDropdown] =
    useState(false);
  const [isOpenSaveAccountDropdown, setIsOpenSaveAccountDropdown] =
    useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [sendAccount, setSendAccount] = useState('');
  const [saveAccount, setSaveAccount] = useState('');

  const handlePeriodDropdown = () => {
    setIsOpenPeriodDropdown(prev => !prev);
  };

  const handlePeriodSelect = (period: PeriodOptions) => {
    setSelectedPeriod(period);
  };

  const onPressDate = () => {
    setIsOpneCalendar(prev => !prev);
  };
  const curDate = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [amount, setAmount] = useState('');
  const textInputRef = useRef<TextInput | null>(null);
  const handleAmountChange = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setAmount(filteredText);
  };

  const getFormattedAmount = () => {
    return amount ? `${amount}만원` : '';
  };

  return (
    <SafeAreaView style={styles.container}>
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
        />
      )}
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('@/assets/lottie/seed.json')}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
      <View style={styles.seedFormContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.formText} />
          </View>
          <Text style={styles.formText}>을/를 위해</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.formText}>총</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formText}
              placeholder="0원"
              value={getFormattedAmount()}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              onFocus={() => {
                const cursorPosition = amount.length; // 숫자 길이
                setTimeout(() => {
                  if (textInputRef.current) {
                    textInputRef.current.setNativeProps({
                      selection: {start: cursorPosition, end: cursorPosition},
                    });
                  }
                }, 0);
              }}
              ref={textInputRef}
            />
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
            <Text style={styles.formText}>{sendAccount}</Text>
          </TouchableOpacity>
          <Text style={styles.formText}>계좌에서</Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setIsOpenSaveAccountDropdown(true)}>
            <Text style={styles.formText}>{saveAccount}</Text>
          </TouchableOpacity>
          <Text style={styles.formText}>계좌로 모을 거예요</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="시작" />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
    alignItems: 'center',
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
    backgroundColor: colors.ORANGE_200,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.PRIMARY,
  },
  seedFormContainer: {
    marginTop: 20,
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
    backgroundColor: colors.GRAY_500,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    margin: 5,
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.BLACK,
    paddingVertical: 0,
  },
  dropdownContainer: {
    flexDirection: 'row',
    width: 150,
    height: 55,
    backgroundColor: colors.GRAY_500,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default SeedCreateScreen;
