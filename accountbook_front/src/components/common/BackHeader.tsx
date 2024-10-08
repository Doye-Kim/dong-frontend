import {BackArrow} from '@/assets/icons';
import {accountBookNavigations, mainNavigations} from '@/constants';
import {View, TouchableOpacity} from 'react-native';

const BackHeader = ({navigation}) => {
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
        <BackArrow width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
