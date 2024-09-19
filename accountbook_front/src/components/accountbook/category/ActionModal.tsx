import {colors} from '@/constants';
import {
  Modal,
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CloseButton} from '@/assets/icons';

const ActionModal = ({
  isVisible,
  onClose,
  onEdit,
}: {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
}) => {
  const handleEdit = () => {
    onClose();
    onEdit();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
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
          <TouchableOpacity>
            <Text style={styles.text}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    color: colors.BLACK,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: colors.GRAY_800,
    margin: 5,
  },
  contentsView: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 8,
  },
});

export default ActionModal;
