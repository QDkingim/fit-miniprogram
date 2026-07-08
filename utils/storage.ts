import { CardioLog, DailyLog, UserProfile, WorkoutLog } from "./types";
import { callDataService, isCloudReady } from "./cloud";

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

function getLocalList<T>(key: string): T[] {
  return wx.getStorageSync(key) || [];
}

function saveLocalByDate<T extends { date: string }>(key: string, value: T): void {
  const list = getLocalList<T>(key);
  const index = list.findIndex((item) => item.date === value.date);
  if (index >= 0) {
    list[index] = value;
  } else {
    list.push(value);
  }
  wx.setStorageSync(key, list);
}

function deleteLocalByDate<T extends { date: string }>(key: string, date: string): void {
  const list = getLocalList<T>(key).filter((item) => item.date !== date);
  wx.setStorageSync(key, list);
}

async function getCloudList<T>(action: string, localKey: string): Promise<T[]> {
  if (!isCloudReady()) {
    return getLocalList<T>(localKey);
  }

  try {
    const list = await callDataService<T[]>(action);
    wx.setStorageSync(localKey, list);
    return list;
  } catch {
    return getLocalList<T>(localKey);
  }
}

export async function getProfile(): Promise<UserProfile> {
  const localProfile = wx.getStorageSync(keys.profile) || defaultProfile;

  if (!isCloudReady()) {
    return localProfile;
  }

  try {
    const profile = await callDataService<UserProfile | null>("getProfile");
    if (profile) {
      wx.setStorageSync(keys.profile, profile);
      return profile;
    }
  } catch {
    return localProfile;
  }

  return localProfile;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  wx.setStorageSync(keys.profile, profile);

  if (isCloudReady()) {
    try {
      await callDataService("saveProfile", profile);
    } catch {
      return;
    }
  }
}

export function getDailyLogs(): Promise<DailyLog[]> {
  return getCloudList<DailyLog>("listDailyLogs", keys.dailyLogs);
}

export async function saveDailyLog(log: DailyLog): Promise<void> {
  saveLocalByDate(keys.dailyLogs, log);

  if (isCloudReady()) {
    try {
      await callDataService("saveDailyLog", log);
    } catch {
      return;
    }
  }
}

export async function deleteDailyLog(date: string): Promise<void> {
  deleteLocalByDate<DailyLog>(keys.dailyLogs, date);

  if (isCloudReady()) {
    try {
      await callDataService("deleteDailyLog", { date });
    } catch {
      return;
    }
  }
}

export function getWorkoutLogs(): Promise<WorkoutLog[]> {
  return getCloudList<WorkoutLog>("listWorkoutLogs", keys.workoutLogs);
}

export async function saveWorkoutLog(log: WorkoutLog): Promise<void> {
  saveLocalByDate(keys.workoutLogs, log);

  if (isCloudReady()) {
    try {
      await callDataService("saveWorkoutLog", log);
    } catch {
      return;
    }
  }
}

export async function deleteWorkoutLog(date: string): Promise<void> {
  deleteLocalByDate<WorkoutLog>(keys.workoutLogs, date);

  if (isCloudReady()) {
    try {
      await callDataService("deleteWorkoutLog", { date });
    } catch {
      return;
    }
  }
}

export function getCardioLogs(): Promise<CardioLog[]> {
  return getCloudList<CardioLog>("listCardioLogs", keys.cardioLogs);
}

export async function saveCardioLog(log: CardioLog): Promise<void> {
  saveLocalByDate(keys.cardioLogs, log);

  if (isCloudReady()) {
    try {
      await callDataService("saveCardioLog", log);
    } catch {
      return;
    }
  }
}

export async function deleteCardioLog(date: string): Promise<void> {
  deleteLocalByDate<CardioLog>(keys.cardioLogs, date);

  if (isCloudReady()) {
    try {
      await callDataService("deleteCardioLog", { date });
    } catch {
      return;
    }
  }
}

export async function syncLocalDataToCloud(): Promise<void> {
  if (!isCloudReady()) {
    return;
  }

  try {
    const profile = wx.getStorageSync(keys.profile);
    if (profile) {
      await callDataService("saveProfile", profile);
    }

    await Promise.all([
      ...getLocalList<DailyLog>(keys.dailyLogs).map((log) => callDataService("saveDailyLog", log)),
      ...getLocalList<WorkoutLog>(keys.workoutLogs).map((log) => callDataService("saveWorkoutLog", log)),
      ...getLocalList<CardioLog>(keys.cardioLogs).map((log) => callDataService("saveCardioLog", log))
    ]);
  } catch {
    return;
  }
}
