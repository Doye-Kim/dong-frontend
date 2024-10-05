import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import CalendarScreen from '@/screen/accountBook/calendar/CalendarScreen';
import BudgetMainScreen from '@/screen/accountBook/budget/BudgetMainScreen';
import SettlementMainScreen from '@/screen/accountBook/settlement/SettlementMainScreen';
import {
  accountBookTabNavigations,
  colors,
} from '@/constants';
import PaymentMainScreen from '@/screen/accountBook/payment/PaymentMainScreen';
import useDateStore from '@/store/useDateStore';
import {getDateWithSeparator} from '@/utils';
import PaymentDummyData from '@/assets/tempData/Asset/PaymentDummyData.json';
import useUserStore from '@/store/useUserStore';
import usePaymentDataStore from '@/store/usePaymentDataStore';
import useCategoryStore from '@/store/useCategoryStore';
import useHideStatusStore from '@/store/useHideStatusStore';

const {width} = Dimensions.get('window');
const TAB_WIDTH = (width * 0.8) / 4;

export type AccountBookTabParamList = {
  [accountBookTabNavigations.CALENDAR]: undefined;
  [accountBookTabNavigations.PAYMENT]: undefined;
  [accountBookTabNavigations.SETTLEMENT]: undefined;
  [accountBookTabNavigations.BUDGET]: undefined;
};

const AccountBookTabNavigator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: accountBookTabNavigations.CALENDAR, title: '달력'},
    {key: accountBookTabNavigations.PAYMENT, title: '내역'},
    {key: accountBookTabNavigations.SETTLEMENT, title: '정산'},
    {key: accountBookTabNavigations.BUDGET, title: '예산'},
  ]);

  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);

  const isLogin = useUserStore(state => state.isLogin);
  const date = useDateStore(state => state.date);
  const {paymentData, fetchPaymentData} = usePaymentDataStore();
  const {
    selectedCategories,
    fetchCategories,
  } = useCategoryStore();
  const {isHideVisible} = useHideStatusStore();

  // 카테고리 초기 설정
  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        fetchCategories();
      }, 50);
    }
  }, []);

  // 내역 데이터 불러오기
  useEffect(() => {
    if (isLogin) {
      const dateString = getDateWithSeparator(date, '-').slice(0, 10);
      if (!paymentData[dateString]) {
        setTimeout(() => {
          fetchPaymentData(dateString);
        }, 50);
      }
    }
  }, [date, isLogin]);

  // 카테고리, 숨김보임 여부에 따른 필터링 함수
  const filteredPaymentList = useMemo(() => {
    const yearMonth = getDateWithSeparator(date, '-').slice(0, 7);
    const paymentList =
      paymentData[yearMonth] || PaymentDummyData.paymentResponse;
    return paymentList.filter(payment => {
      const isCategorySelected = selectedCategories.includes(
        payment.categoryId,
      );
      const isVisiblePayment =
        isHideVisible || payment.paymentState !== 'EXCLUDE';
      return isCategorySelected && isVisiblePayment;
    });
  }, [paymentData, date, selectedCategories, isHideVisible]);

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
        return <CalendarScreen paymentList={filteredPaymentList} />;
      case accountBookTabNavigations.PAYMENT:
        return <PaymentMainScreen paymentList={filteredPaymentList} />;
      case accountBookTabNavigations.SETTLEMENT:
        return <SettlementMainScreen />;
      case accountBookTabNavigations.BUDGET:
        return <BudgetMainScreen />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  //   const isDetailScreen = routeName === accountBookNavigations.PAYMENTDETAIL;
  //   setIsTabBarVisible(!isDetailScreen);
  //   setIsSwipeEnabled(!isDetailScreen);
  // }, [route]);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsTabBarVisible(false);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsTabBarVisible(true);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [isTabBarVisible]);

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
    // paddingBottom: 75,
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
