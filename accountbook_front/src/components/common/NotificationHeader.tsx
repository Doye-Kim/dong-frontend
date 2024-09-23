import { BellIcon } from '@/assets/icons';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface NotificationHeaderProps {

}

const NotificationHeader = ({}: NotificationHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <BellIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  }
});

export default NotificationHeader;