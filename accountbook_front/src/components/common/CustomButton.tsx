import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '@/constants/colors';

const CustomButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY,
    width: Dimensions.get('window').width - 40,
    height: 60,
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
