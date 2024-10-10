import {assetNavigations, colors} from '@/constants';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import useThemeStore from '@/store/useThemeStore';
import {getDateLocaleFormatDiff} from '@/utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

interface SeedItemProps {
  id: number;
  title: string;
  entireRound: string;
  endDate: string;
  passedRound: string;
}

const SeedItem = ({
  id,
  title,
  entireRound,
  endDate,
  passedRound,
}: SeedItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const progressPercentage = Number(passedRound) / Number(entireRound);
  const navigation = useNavigation<NavigationProp<AssetStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(assetNavigations.SEEDDETAIL, {seedId: id})
      }>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.countContainer}>
          <Text style={styles.roundText}>{passedRound}회</Text>
          <Text style={styles.entireRoundText}> / {entireRound}회</Text>
        </View>
      </View>
      <ProgressBar
        progress={progressPercentage}
        color={colors[theme].PRIMARY}
        style={styles.progressBar}
      />
      <Text style={styles.endDateText}>
        ~{getDateLocaleFormatDiff(endDate)}
      </Text>
    </TouchableOpacity>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      // marginHorizontal: 10,
      backgroundColor: colors[theme].GRAY_200,
      paddingHorizontal: 10,
      borderRadius: 20,
      margin: 5,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    itemTitle: {
      fontSize: 18,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
    },
    countContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressBar: {
      margin: 10,
      height: 20,
      borderRadius: 20,
      backgroundColor: colors[theme].GRAY_400,
    },
    roundText: {
      fontSize: 18,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
    },
    entireRoundText: {
      fontSize: 14,
      fontFamily: 'Pretendard-Medium',
      marginRight: 5,
      color: colors[theme].BLACK,
    },
    endDateText: {
      fontSize: 14,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].GRAY_500,
      textAlign: 'right',
    },
  });

export default SeedItem;
