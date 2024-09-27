import {DropdownButtonPrimary} from '@/assets/icons';
import CalendarModal from '@/components/common/CalendarModal';
import CustomButton from '@/components/common/CustomButton';
import DropdownCategory from '@/components/game/DropdownCategory';
import ImageIcon from '@/components/game/ImageIcon';
import {colors, gameNavigations} from '@/constants';
import { GameStackParamList } from '@/navigations/stack/asset/GameStackNavigation';
import {getDateLocaleFormatDiff} from '@/utils';
import {category} from '@/utils/categories';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GameCreateScreen = () => {
  const [isOpenCalendar, setIsOpneCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpenCategoryDropdown, setIsOpenCategotyDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [amount, setAmount] = useState('0원');
  const curDate = new Date();
  const navigtaion = useNavigation<StackNavigationProp<GameStackParamList>>();

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

  const getFormattedEntryFee = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setAmount(filteredText ? `${Number(filteredText).toLocaleString()}원` : '');
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
                  {startDate
                    ? getDateLocaleFormatDiff(startDate)
                    : getDateLocaleFormatDiff(curDate)}{' '}
                  ~{' '}
                  {endDate
                    ? getDateLocaleFormatDiff(endDate)
                    : getDateLocaleFormatDiff(curDate)}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.contentsContainer}>
              <View>
                <Text style={styles.infoTitleText}>카테고리</Text>
                <Text style={styles.infoDescText}>
                  생성 후 내기에 포함할 커스텀 카테고리도 추가할 수 있어요!
                </Text>
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
                  style={styles.infoText}
                  value={amount}
                  onChangeText={getFormattedEntryFee}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {isOpenCalendar && (
              <CalendarModal
                isVisible={isOpenCalendar}
                curDate={curDate}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
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
          <CustomButton text="다음" onPress={() => navigtaion.navigate(gameNavigations.FRIENDS)}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
  },
  titleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
    color: colors.BLACK,
  },
  textIconContainer: {
    margin: 30,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    fontSize: 100,
    color: colors.BLACK,
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
    marginBottom: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.PRIMARY,
  },
  contentsContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  infoTitleText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
  infoDescText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: colors.GRAY_600,
  },
  infoContainer: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: colors.ORANGE_200,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    margin: 5,
    fontFamily: 'Pretendard-Bold',
    fontSize: 22,
    color: colors.PRIMARY,
    paddingVertical: 0,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
export default GameCreateScreen;
