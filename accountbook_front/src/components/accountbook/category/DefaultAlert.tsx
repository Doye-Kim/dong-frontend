import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';

const DefaultAlert = ({isVisible}: {isVisible: boolean}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
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
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    textContainer: {
      backgroundColor: colors[theme].RED_500,
      justifyContent: 'center',
      margin: 20,
      padding: 10,
      borderRadius: 20,
    },
    text: {
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].WHITE,
    },
  });
export default DefaultAlert;
