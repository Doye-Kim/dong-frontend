import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconList from './IconList';
import {colors} from '@/constants';
import CategoryIcon from '@/components/common/CategoryIcon';
import {useState} from 'react';
import {ResponseCategory, patchCategory, postCategory} from '@/api/category';
import {Modal, Portal} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import useCategoryStore from '@/store/useCategoryStore';
import useThemeStore from '@/store/useThemeStore';

const CategoryEditModal = ({
  isVisible,
  onClose,
  data,
}: {
  isVisible: boolean;
  onClose: () => void;
  data: ResponseCategory | null;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [imageNumber, setImageNumber] = useState(data?.imageNumber || 0);
  const [categoryName, setCategoryName] = useState(data?.name || '');
  const {fetchCategories} = useCategoryStore();
  // console.log으로 상태 점검
  console.log('isVisible:', isVisible);
  console.log('data:', data);

  const handleIconPress = (iconId: number) => {
    console.log(iconId);
    setImageNumber(iconId);
  };

  const handlePressComplete = async () => {
    try {
      if (data) {
        const res = await patchCategory(data.categoryId, {
          categoryName,
          imageNumber,
        });
        console.log(res);
      } else {
        const res = await postCategory({categoryName, imageNumber});
        console.log(res);
      }

      fetchCategories();
      onClose();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '카테고리를 추가/수정하는 데 문제가 생겼어요',
        text2: '나중에 다시 시도해 주세요',
      });
    }
  };

  const handleChangeText = (text: string) => {
    setCategoryName(text);
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}>
          <View style={styles.infoContainer}>
            <CategoryIcon categoryNumber={imageNumber} size={45} />
            <View style={styles.nameContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={colors[theme].GRAY_500}
                  placeholder="카테고리명을 입력하세요"
                  style={styles.input}
                  value={categoryName}
                  onChangeText={handleChangeText}
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
              style={[styles.button, styles.cancel]}>
              <Text
                style={[styles.buttonText, {color: colors[theme].GRAY_500}]}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressComplete}
              style={[styles.button, styles.complete]}>
              <Text style={[styles.buttonText, {color: colors[theme].PRIMARY}]}>
                완료
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      backgroundColor: colors[theme].WHITE,
      margin: 20,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      shadowColor: colors[theme].BLACK,
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
      margin: 10,
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderColor: colors[theme].GRAY_500,
    },
    maxLengthHint: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 13,
      color: colors[theme].GRAY_500,
    },
    input: {
      paddingBottom: 0,
      paddingLeft: 0,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
      fontSize: 20,
    },
    iconListContainer: {
      height: 170,
      marginBottom: 20,
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
    cancel: {
      borderColor: colors[theme].GRAY_500,
    },
    complete: {
      borderColor: colors[theme].PRIMARY,
    },
    buttonText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 15,
    },
  });
export default CategoryEditModal;
