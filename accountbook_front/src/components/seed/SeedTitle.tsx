import {SeedStatusOptions} from '@/api/seed';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const status: Record<SeedStatusOptions, string> = {
  PROCEEDING: '진행중',
  CANCEL: '해지',
  COMPLETED: '완료',
};

const width = Dimensions.get('window').width - 20;

interface SeedTitleProps {
  title: string;
  targetAmount: number;
  entireRound: number;
  dataStatus: SeedStatusOptions;
  passedRound: number;
  totalTransferredAmount: number;
}
const SeedTitle = ({
  title,
  targetAmount,
  entireRound,
  dataStatus,
  passedRound,
  totalTransferredAmount,
}: SeedTitleProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.text_bd, {fontSize: 20}]}>{title}</Text>
      <View style={styles.moneyAndStatus}>
        <View>
          <Text style={[styles.text_bd, {fontSize: 32}]}>
            {totalTransferredAmount.toLocaleString()}원
          </Text>
          <Text
            style={[
              styles.text_md,
              {fontSize: 20, color: colors[theme].GRAY_600},
            ]}>
            목표 {targetAmount.toLocaleString()}원
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: colors[theme].PRIMARY,
            fontFamily: 'Pretendard-SemiBold',
          }}>
          {status[dataStatus]}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 5,
        }}>
        <Text
          style={[styles.text_md, {fontSize: 18, color: colors[theme].BLACK}]}>
          {passedRound}회{' '}
        </Text>
        <Text style={[styles.text_md, {color: colors[theme].GRAY_500}]}>
          / {entireRound}회
        </Text>
      </View>
      <View style={styles.percentage}>
        <View style={styles.entirePer}></View>
        <View style={styles.passPerContainer}>
          <View
            style={[
              styles.passPer,
              {width: (width / entireRound) * passedRound},
            ]}
          />
        </View>
      </View>
    </View>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    titleContainer: {},
    moneyAndStatus: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text_bd: {
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    text_md: {
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
    },
    percentage: {
      alignItems: 'center',
    },
    entirePer: {
      backgroundColor: colors[theme].GRAY_300,
      width: width,
      height: 20,
      borderRadius: 20,
    },
    passPerContainer: {
      width: width,
      height: 20,
      position: 'absolute',
    },
    passPer: {
      height: '100%',
      backgroundColor: colors[theme].PRIMARY,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
  });
export default SeedTitle;
