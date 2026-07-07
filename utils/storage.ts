import { CardioLog, DailyLog, UserProfile, WorkoutLog } from "./types";

const keys = {
  profile: "profile",
  dailyLogs: "dailyLogs",
  workoutLogs: "workoutLogs",
  cardioLogs: "cardioLogs"
};

export const defaultProfile: UserProfile = {
  gender: "男",
  age: 26,
  heightCm: 175,
  startWeightKg: 100,
  targetWeightKg: 70,
  waistCm: 96,
  sleepTargetHours: 7.5,
  stepTarget: 6000
};

function getList<T>(key: string): T[] {
  return wx.getStorageSync(key) || [];
}

function saveByDate<T extends { date: string }>(key: string, value: T): void {
  const list = getList<T>(key);
  const index = list.findIndex((item) => item.date === value.date);
  if (index >= 0) {
    list[index] = value;
  } else {
    list.push(value);
  }
  wx.setStorageSync(key, list);
}

export function getProfile(): UserProfile {
  return wx.getStorageSync(keys.profile) || defaultProfile;
}

export function saveProfile(profile: UserProfile): void {
  wx.setStorageSync(keys.profile, profile);
}

export function getDailyLogs(): DailyLog[] {
  return getList<DailyLog>(keys.dailyLogs);
}

export function saveDailyLog(log: DailyLog): void {
  saveByDate(keys.dailyLogs, log);
}

export function getWorkoutLogs(): WorkoutLog[] {
  return getList<WorkoutLog>(keys.workoutLogs);
}

export function saveWorkoutLog(log: WorkoutLog): void {
  saveByDate(keys.workoutLogs, log);
}

export function getCardioLogs(): CardioLog[] {
  return getList<CardioLog>(keys.cardioLogs);
}

export function saveCardioLog(log: CardioLog): void {
  saveByDate(keys.cardioLogs, log);
}
