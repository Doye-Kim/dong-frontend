import {DisabledUser, User} from '@/assets/icons';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {Text, View} from 'react-native';

const UserIcon = ({name, disabled}: {name: string; disabled?: boolean}) => {
  const {theme} = useThemeStore();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 70,
      }}>
      {disabled ? (
        <DisabledUser width={50} height={50} />
      ) : (
        <User width={50} height={50} />
      )}
      <Text
        style={{
          fontFamily: 'Pretendard-SemiBold',
          fontSize: 14,
          color: colors[theme].BLACK,
          marginTop: 3,
        }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {name}
      </Text>
    </View>
  );
};
export default UserIcon;
