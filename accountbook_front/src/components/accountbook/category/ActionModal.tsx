import {colors} from '@/constants';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CloseButton} from '@/assets/icons';
import {Modal, Portal} from 'react-native-paper';
import {deleteCategory} from '@/api/category';
import Toast from 'react-native-toast-message';
import useCategoryStore from '@/store/useCategoryStore';
import useThemeStore from '@/store/useThemeStore';

const ActionModal = ({
  isVisible,
  categoryId,
  onClose,
  onEdit,
}: {
  isVisible: boolean;
  categoryId: number;
  onClose: () => void;
  onEdit: () => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const handleEdit = () => {
    onClose();
    onEdit();
  };
  const {fetchCategories} = useCategoryStore();
  const handlePressDelete = async () => {
    try {
      const res = await deleteCategory(categoryId);
      console.log(res);
      Toast.show({
        type: 'success',
        text1: '삭제 완료!',
      });
      fetchCategories();
      onClose();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '삭제하는 과정에 문제가 생겼어요',
        text2: '나중에 다시 시도해 주세요',
      });
    }
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.contentsView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>더보기</Text>
            <TouchableOpacity onPress={onClose}>
              <CloseButton />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleEdit()}>
            <Text style={styles.text}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressDelete}>
            <Text style={styles.text}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
    },
    headerText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 22,
      color: colors[theme].BLACK,
      marginBottom: 15,
    },
    text: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 20,
      color: colors[theme].GRAY_800,
      margin: 5,
    },
    contentsView: {
      width: '100%',
      backgroundColor: colors[theme].WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      elevation: 8,
    },
  });

export default ActionModal;
