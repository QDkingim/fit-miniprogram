import { todayKey, weekdayText } from "../../utils/date";
import { todayPlan } from "../../utils/plan";
import { getCardioLogs, getDailyLogs, getWorkoutLogs } from "../../utils/storage";
import { buildReviewStats } from "../../utils/stats";
import { CardioLog, DailyLog, WorkoutLog } from "../../utils/types";

function buildTodayStatus(dailyLogs: DailyLog[], workoutLogs: WorkoutLog[], cardioLogs: CardioLog[], action: string) {
  const date = todayKey();
  const dailyDone = dailyLogs.some((log) => log.date === date);
  const workoutDone = workoutLogs.some((log) => log.date === date && log.exercises.some((item) => item.done));
  const cardioDone = cardioLogs.some((log) => log.date === date && log.done);
  const required = [
    { key: "daily", label: "基础打卡", done: dailyDone },
    { key: "workout", label: "力量训练", done: action !== "workout" || workoutDone },
    { key: "cardio", label: "坡度快走", done: action !== "cardio" || cardioDone }
  ];
  const pending = required.filter((item) => !item.done);

  return {
    dailyDone,
    workoutDone,
    cardioDone,
    workoutClosed: action !== "workout" || workoutDone,
    cardioClosed: action !== "cardio" || cardioDone,
    workoutLabel: action === "workout" ? "力量训练" : "今日无需力量",
    cardioLabel: action === "cardio" ? "坡度快走" : "今日无需有氧",
    pending,
    pendingText: pending.length ? `还差 ${pending.map((item) => item.label).join("、")}` : "今日闭环已完成",
    completedCount: required.length - pending.length,
    totalCount: required.length
  };
}

Page({
  data: {
    dateText: todayKey(),
    weekday: weekdayText(),
    plan: todayPlan(weekdayText()),
    stats: buildReviewStats([], [], []),
    todayStatus: buildTodayStatus([], [], [], todayPlan(weekdayText()).action)
  },

  async onShow() {
    const weekday = weekdayText();
    const plan = todayPlan(weekday);
    const [dailyLogs, workoutLogs, cardioLogs] = await Promise.all([getDailyLogs(), getWorkoutLogs(), getCardioLogs()]);
    this.setData({
      dateText: todayKey(),
      weekday,
      plan,
      stats: buildReviewStats(dailyLogs, workoutLogs, cardioLogs),
      todayStatus: buildTodayStatus(dailyLogs, workoutLogs, cardioLogs, plan.action)
    });
  },

  goCheckin() {
    wx.switchTab({ url: "/pages/checkin/checkin" });
  },

  goWorkout() {
    wx.switchTab({ url: "/pages/workout/workout" });
  },

  goCardio() {
    wx.navigateTo({ url: "/pages/cardio/cardio" });
  }
});
