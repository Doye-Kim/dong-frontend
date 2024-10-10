import {DropdownButtonPrimary} from '@/assets/icons';
import CalendarModal from '@/components/common/CalendarModal';
import CustomButton from '@/components/common/CustomButton';
import DropdownCategory from '@/components/game/DropdownCategory';
import ImageIcon from '@/components/game/ImageIcon';
import {colors, gameNavigations} from '@/constants';
import {GameStackParamList} from '@/navigations/stack/GameStackNavigator';
import useGameCreateStore from '@/store/useGameCreateStore';
import useThemeStore from '@/store/useThemeStore';
import {getDateLocaleFormatDiff} from '@/utils';
import {category, categoryId} from '@/utils/categories';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const GameCreateScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [isOpenCalendar, setIsOpneCalendar] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isOpenCategoryDropdown, setIsOpenCategotyDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [amount, setAmount] = useState('0');
  const curDate = new Date();
  const navigtaion = useNavigation<StackNavigationProp<GameStackParamList>>();

  const {setStartDate, setEndDate, setGameCategoryId, setFee} =
    useGameCreateStore();
  const onPressDate = () => {
    setIsOpneCalendar(prev => !prev);
  };

  const onPressCategory = () => {
    setIsOpenCategotyDropdown(prev => !prev);
  };

  const handleSelectedCategory = (imageNumber: number) => {
    setSelectedCategory(imageNumber);
    setIsOpenCategotyDropdown(false);
  };

  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setAmount(filteredText ? `${Number(filteredText).toLocaleString()}` : '0');
  };

  const onPressNext = () => {
    if (!start || !end) {
      Toast.show({
        type: 'error',
        text1: '날짜를 선택해 주세요',
      });
    } else if (selectedCategory === 0) {
      Toast.show({
        type: 'error',
        text1: '카테고리를 선택해 주세요',
      });
    } else if (amount === '0') {
      Alert.alert('헉!', '참가비가 0원입니다. 그대로 진행하시겠습니까?', [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '진행',
          onPress: () => {
            navigtaion.navigate(gameNavigations.FRIENDS);
          },
        },
      ]);
    } else {
      setStartDate(start);
      setEndDate(end);
      setGameCategoryId(categoryId[selectedCategory]);
      setFee(Number(amount.replace(/[^0-9]/g, '')));
      navigtaion.navigate(gameNavigations.FRIENDS);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.titleText}>내기 정보를 입력해주세요</Text>
          <View style={styles.textIconContainer}>
            <ImageIcon imageNumber={selectedCategory} />
          </View>
          <View>
            <Text style={[styles.infoTitleText, {margin: 10}]}>기간</Text>
            <TouchableOpacity style={styles.dateInfo} onPress={onPressDate}>
              <View style={styles.startendDate}>
                <Text style={styles.dateText}>
                  {start
                    ? getDateLocaleFormatDiff(start)
                    : getDateLocaleFormatDiff(curDate)}{' '}
                  ~{' '}
                  {end
                    ? getDateLocaleFormatDiff(end)
                    : getDateLocaleFormatDiff(curDate)}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.contentsContainer}>
              <View>
                <Text style={styles.infoTitleText}>카테고리</Text>
              </View>
              <TouchableOpacity
                style={styles.infoContainer}
                onPress={onPressCategory}>
                <Text style={styles.infoText}>
                  {category[selectedCategory]}
                </Text>
                <DropdownButtonPrimary width={30} height={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentsContainer}>
              <View>
                <Text style={styles.infoTitleText}>참가비</Text>
                <Text style={styles.infoDescText}>
                  내기가 종료되면 모두 1등에게 지급됩니다
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <TextInput
                  style={[styles.infoText, {margin: 0}]}
                  value={amount}
                  onChangeText={handleChangeText}
                  keyboardType="numeric"
                />
                <Text style={[styles.infoText, {margin: 0}]}>원</Text>
              </View>
            </View>
            {isOpenCalendar && (
              <CalendarModal
                isVisible={isOpenCalendar}
                curDate={curDate}
                startDate={start}
                setStartDate={setStart}
                endDate={end}
                setEndDate={setEnd}
                onClose={() => setIsOpneCalendar(false)}
                marginTop={360}
                seedOrGame={false}
              />
            )}
          </View>
        </ScrollView>
        {isOpenCategoryDropdown && (
          <DropdownCategory
            isVisible={isOpenCategoryDropdown}
            onSelect={handleSelectedCategory}
            onClose={() => setIsOpenCategotyDropdown(false)}
          />
        )}
        <View style={styles.buttonContainer}>
          <CustomButton text="다음" onPress={onPressNext} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    titleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 28,
      color: colors[theme].BLACK,
    },
    textIconContainer: {
      margin: 30,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textIcon: {
      fontSize: 100,
      color: colors[theme].BLACK,
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
      marginBottom: 20,
    },
    dateText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 20,
      color: colors[theme].PRIMARY,
    },
    contentsContainer: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 20,
    },
    infoTitleText: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      color: colors[theme].BLACK,
    },
    infoDescText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 14,
      color: colors[theme].GRAY_600,
    },
    infoContainer: {
      width: '100%',
      height: 50,
      marginTop: 10,
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoText: {
      margin: 5,
      fontFamily: 'Pretendard-Bold',
      fontSize: 22,
      color: colors[theme].PRIMARY,
      paddingVertical: 0,
    },
    buttonContainer: {
      justifyContent: 'flex-end',
    },
  });
export default GameCreateScreen;
