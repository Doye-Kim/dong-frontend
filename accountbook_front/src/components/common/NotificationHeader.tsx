import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BellIcon, BellIconDark} from '@/assets/icons';
import {colors} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useThemeStore from '@/store/useThemeStore';

const NotificationHeader = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onPressNotice = () => {
    console.log('onPressNotice');
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressNotice}>
        {theme === 'dark' ? (
          <BellIconDark width={30} height={30} />
        ) : (
          <BellIcon width={30} height={30} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingBottom: 5,
      height: 50,
      backgroundColor: colors[theme].WHITE,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });

export default NotificationHeader;
