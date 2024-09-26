import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import CalendarScreen from '@/screen/accountBook/calendar/CalendarScreen';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import SettlementMainScreen from '@/screen/accountBook/settlement/SettlementMainScreen';
import {
  accountBookNavigations,
  accountBookTabNavigations,
  colors,
} from '@/constants';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import PaymentMainScreen from '@/screen/accountBook/payment/PaymentMainScreen';

const {width} = Dimensions.get('window');
const TAB_WIDTH = (width * 0.8) / 4;

const AccountBookTabNavigator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: accountBookTabNavigations.CALENDAR, title: '달력'},
    {key: accountBookTabNavigations.PAYMENT, title: '내역'},
    {key: accountBookTabNavigations.SETTLEMENT, title: '정산'},
    {key: accountBookTabNavigations.BUDGET, title: '예산'},
  ]);

  const route = useRoute();
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    const isDetailScreen = routeName === accountBookNavigations.PAYMENTDETAIL;
    setIsTabBarVisible(!isDetailScreen);
    setIsSwipeEnabled(!isDetailScreen);
  }, [route]);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const onIndexChange = (newIndex: number) => {
    Animated.spring(slideAnim, {
      toValue: newIndex * TAB_WIDTH,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
    setIndex(newIndex);
  };

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case accountBookTabNavigations.CALENDAR:
        return <CalendarScreen />;
      case accountBookTabNavigations.PAYMENT:
        return <PaymentMainScreen />;
      case accountBookTabNavigations.SETTLEMENT:
        return <SettlementMainScreen />;
      case accountBookTabNavigations.BUDGET:
        return <BudgetMainScreen />;
      default:
        return null;
    }
  };

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        swipeEnabled={isSwipeEnabled}
        style={styles.container}
        renderTabBar={() =>
          isTabBarVisible ? (
            <View style={styles.tabBar}>
              {routes.map((route, i) => {
                const isFocused = index === i;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => onIndexChange(i)}
                    style={[
                      styles.tabItem,
                      isFocused ? styles.tabFocused : null,
                    ]}>
                    <Text
                      style={[
                        styles.tabText,
                        {color: isFocused ? colors.WHITE : colors.BLACK},
                      ]}>
                      {route.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <Animated.View
                style={[styles.slider, {transform: [{translateX: slideAnim}]}]}
              />
            </View>
          ) : null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    left: '10%',
    right: '10%',
    elevation: 0,
    borderRadius: 30,
    height: 50,
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: colors.GRAY_200,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 5,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  tabFocused: {
    backgroundColor: colors.PRIMARY,
    zIndex: 1,
  },
  slider: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    height: 40,
    width: TAB_WIDTH - 10,
    borderRadius: 20,
    backgroundColor: colors.PRIMARY,
  },
});

export default AccountBookTabNavigator;
