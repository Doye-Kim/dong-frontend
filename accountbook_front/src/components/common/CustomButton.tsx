import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '@/constants/colors';

const CustomButton = ({
  text,
  onClose,
}: {
  text: string;
  onClose?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClose}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY,
    minWidth: 320,
    minHeight: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
});
export default CustomButton;
