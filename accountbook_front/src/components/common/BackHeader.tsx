import {BackArrow} from '@/assets/icons';
import {View, TouchableOpacity} from 'react-native';

const BackHeader = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        style={{margin: 10}}
        onPress={() => navigation.goBack()}>
        <BackArrow width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
