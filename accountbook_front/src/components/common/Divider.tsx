import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {Dimensions, StyleSheet, View} from 'react-native';

const Divider = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return <View style={styles.line} />;
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    line: {
      width: Dimensions.get('screen').width,
      height: 8,
      marginVertical: 10,
      backgroundColor: colors[theme].GRAY_200,
    },
  });

export default Divider;
