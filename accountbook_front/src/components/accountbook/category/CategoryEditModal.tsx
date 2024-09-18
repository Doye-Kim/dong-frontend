import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconList from './IconList';
import {colors} from '@/constants';
import CategoryIcon from '@/components/common/CategoryIcon';
import {useRef, useState} from 'react';
const width = Dimensions.get('window').width;

interface CategoryData {
  category_id: number;
  category_name: string;
  image_number: number;
  default: boolean;
}

const CategoryEditModal = ({
  isVisible,
  onClose,
  data,
}: {
  isVisible: boolean;
  onClose: () => void;
  data: CategoryData | null;
}) => {
  const [iconNumber, setIconNumber] = useState(data?.image_number || 0);

  const handleIconPress = (iconId: number) => {
    setIconNumber(iconId);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.centeredView}>
          <View style={styles.infoContainer}>
            <CategoryIcon categoryNumber={iconNumber} size={35} />
            <View style={styles.nameContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={colors.GRAY_600}
                  placeholder="카테고리명을 입력하세요"
                  style={styles.input}
                  value={data?.category_name}
                />
              </View>
              <Text style={styles.maxLengthHint}>최대 12자 입력</Text>
            </View>
          </View>
          <View style={styles.iconListContainer}>
            <IconList onPress={handleIconPress} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancle]}>
              <Text style={[styles.buttonText, {color: colors.GRAY_400}]}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.complete]}>
              <Text style={[styles.buttonText, {color: colors.PRIMARY}]}>
                완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    backgroundColor: colors.WHITE,
    margin: 20,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  nameContainer: {
    margin: 5,
  },
  inputContainer: {},
  maxLengthHint: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: colors.GRAY_600,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY_600,
    paddingBottom: 0,
    paddingLeft: 0,
    fontFamily: 'Pretendard=SemiBold',
    color: colors.BLACK,
    fontSize: 14,
  },
  iconListContainer: {
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  cancle: {
    borderColor: colors.GRAY_400,
  },
  complete: {
    borderColor: colors.PRIMARY,
  },
  buttonText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
  },
});
export default CategoryEditModal;
