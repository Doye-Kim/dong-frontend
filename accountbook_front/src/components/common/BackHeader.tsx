import {BackArrow, BackArrowDark} from '@/assets/icons';
import {accountBookNavigations, mainNavigations} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {View, TouchableOpacity} from 'react-native';

const BackHeader = ({navigation}) => {
  const {theme} = useThemeStore();
  const handleGoBackOrNavigate = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(mainNavigations.ACCOUNTBOOK, {
        screen: accountBookNavigations.TABBAR,
      });
    }
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity style={{margin: 10}} onPress={handleGoBackOrNavigate}>
        {theme === 'dark' ? (
          <BackArrowDark width={30} height={30} />
        ) : (
          <BackArrow width={30} height={30} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
