import {User} from '@/assets/icons';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {StyleSheet, Text, View} from 'react-native';

type transferState = 'FINISH' | 'YET';

const typeToText: transferState = {
  FINISH: '정산 완료',
  YET: '정산 대기',
};
interface UserStateProps {
  userId: number;
  userName: string;
  cost: number;
  transferState: string;
}
const UserStateItem = ({data}: UserStateProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <User width={35} height={35} />
        <Text
          style={[
            styles.nameAndCostText,
            data.transferState === 'YET' && {
              color: colors[theme].BLACK,
            },
          ]}>
          {data.userName}
        </Text>
      </View>
      <Text
        style={[
          styles.nameAndCostText,
          data.transferState === 'YET' && {
            color: colors[theme].BLACK,
          },
        ]}>
        {data.cost.toLocaleString()}원
      </Text>
      <Text
        style={[
          styles.stateText,
          data.transferState === 'YET' && {
            color: colors[theme].BLACK,
          },
        ]}>
        {typeToText[data.transferState]}
      </Text>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    nameAndCostText: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 16,
      color: colors[theme].GRAY_600,
      margin: 5,
    },
    stateText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 14,
      color: colors[theme].GRAY_600,
      margin: 5,
    },
  });
export default UserStateItem;
