import React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryList from '../category/CategoryList';
import {colors} from '@/constants';

interface CategorySelectModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  slideAnim: Animated.Value;
  onCategorySelect: (categoryId: number, categoryName: string) => void;
}

const CategorySelectModal = ({
  isVisible,
  toggleModal,
  slideAnim,
  onCategorySelect,
}: CategorySelectModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleModal}>
      <View style={styles.bottomModalContainer}>
        <Animated.View
          style={[
            styles.bottomModalContent,
            {transform: [{translateY: slideAnim}]}, // 슬라이드 애니메이션 적용
          ]}>
          <Text style={styles.modalTitle}>카테고리 선택</Text>
          <CategoryList
            onCategorySelect={onCategorySelect}
            renderAddButton={false}
          />
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomModalContent: {
    width: '100%',
    backgroundColor: colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    maxHeight: '50%', // 모달의 최대 높이 제한 (화면의 50%)
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});

export default CategorySelectModal;
