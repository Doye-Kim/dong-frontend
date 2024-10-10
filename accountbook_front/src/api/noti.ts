import axiosInstance from './axios';

export type ResponseAlarm = {
  content: string;
  createdAt: string;
  id: number;
  status: 'NONREAD' | 'READ';
  title: string;
  type:
    | 'GAME_REQUEST'
    | 'GAME_RESULT'
    | 'SETTLEMENT_REQUEST'
    | 'FIXED_EXPENSES'
    | 'SEED_SEND'
    | 'SEED_FINISH';
  typeId: number;
};
const getAlarm = async (alarmId?: number) => {
  let url = '';
  // console.log(alarmId);
  if (alarmId !== undefined && alarmId !== null) {
    url = `/alarms?alarmId=${alarmId}&pageSize=20`;
  } else {
    url = `/alarms?pageSize=20`;
  }

  const {data} = await axiosInstance.get(url);
  return data;
};

const patchAlarm = async (alarmId: number) => {
  const {data} = await axiosInstance.patch(`/alarms/${alarmId}`);
  // console.log('patch', data);
  return data;
};
export {getAlarm, patchAlarm};
