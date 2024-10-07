import {ResponseAlarm, getAlarm} from '@/api/noti';
import NotiItem from '@/components/notification/NoticeItem';
import {colors} from '@/constants';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

const PAGE_SIZE = 10;

const NotificationScreen = () => {
  const [alarmData, setAlarmData] = useState<ResponseAlarm[]>([]);
  const [endAlarmId, setEndAlarmId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback(async (alarmId?: number) => {
    console.log('Fetching data...');
    try {
      setLoading(true);
      const data = await getAlarm(alarmId);
      console.log('Fetched Alarm Data:', data);

      if (Array.isArray(data.data)) {
        setAlarmData(prev => [...prev, ...data.data]);
        if (data.data.length < PAGE_SIZE) {
          setHasMore(false);
        } else {
          setEndAlarmId(data.data[data.data.length - 1].id);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching alarms:', err);
      if (err.response && err.response.data) {
        console.error('Error details:', err.response.data);
      } else {
        console.error('Error message:', err.message || 'Unknown error');
      }
      Alert.alert(
        '알림을 불러오는 중 오류가 발생했습니다.',
        err.message || '알 수 없는 오류',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setHasMore(true);
      setAlarmData([]);
      setEndAlarmId(null);
      getData();
    }, [getData]),
  );

  const onEndReached = () => {
    if (!loading && hasMore && endAlarmId !== null) {
      getData(endAlarmId);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setAlarmData([]);
    setEndAlarmId(null);
    getData();
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{margin: 16}} />;
  };

  const renderEmpty = () => {
    if (loading) return null;
    return <Text style={styles.emptyText}>알림이 없습니다.</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        data={alarmData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <NotiItem item={item} />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 8,
  },
  emptyText: {
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: 20,
    color: colors.BLACK,
  },
});

export default NotificationScreen;
