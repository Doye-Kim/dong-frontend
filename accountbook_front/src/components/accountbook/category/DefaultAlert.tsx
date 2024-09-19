import {colors} from '@/constants';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';

const DefaultAlert = ({isVisible}: {isVisible: boolean}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            기본 카테고리는 수정 및 삭제가 되지 않습니다.
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: colors.RED_500,
    justifyContent: 'center',
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    color: colors.WHITE,
  },
});
export default DefaultAlert;
