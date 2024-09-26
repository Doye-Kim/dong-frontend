import {colors} from '@/constants';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

interface BuyConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const BuyConfirmModal = ({
  visible = false,
  onCancel,
  onConfirm,
}: BuyConfirmModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitleText}>구매하시겠습니까?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, // 모달이 화면 전체를 차지하게 합니다.
    justifyContent: 'center', // 화면 중앙에 표시되도록 설정합니다.
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    width: 300, // 모달의 너비를 지정합니다.
  },
  modalTitleText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: colors.GRAY_200,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 35,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 35,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  confirmButtonText: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: 'Pretendard-Medium',
  },
});

export default BuyConfirmModal;
