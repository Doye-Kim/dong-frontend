import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';

const CustomButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress?: () => void;
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    button: {
      backgroundColor: colors[theme].PRIMARY,
      width: Dimensions.get('window').width - 40,
      height: 60,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: colors['light'].WHITE,
      fontSize: 20,
      fontFamily: 'Pretendard-Bold',
    },
  });
export default CustomButton;
