import {assetNavigations, colors, seedNavigations} from '@/constants';
import {AssetStackParamList} from '@/navigations/stack/asset/AssetStackNavigatior';
import {SeedStackParamList} from '@/navigations/stack/asset/SeedStackNavigator';
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
        color={colors.PRIMARY}
        style={styles.progressBar}
      />
      <Text style={styles.endDateText}>
        ~{getDateLocaleFormatDiff(endDate)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // marginHorizontal: 10,
    backgroundColor: colors.GRAY_200,
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
    color: colors.BLACK,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    margin: 10,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.GRAY_400,
  },
  roundText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },
  entireRoundText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    marginRight: 5,
    color: colors.BLACK,
  },
  endDateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.GRAY_500,
    textAlign: 'right',
  },
});

export default SeedItem;
