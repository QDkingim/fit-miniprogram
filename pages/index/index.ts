import { todayKey, weekdayText } from "../../utils/date";
import { todayPlan } from "../../utils/plan";
import { getCardioLogs, getDailyLogs, getWorkoutLogs } from "../../utils/storage";
import { buildReviewStats } from "../../utils/stats";

Page({
  data: {
    dateText: todayKey(),
    weekday: weekdayText(),
    plan: todayPlan(weekdayText()),
    stats: buildReviewStats([], [], [])
  },

  onShow() {
    const weekday = weekdayText();
    this.setData({
      dateText: todayKey(),
      weekday,
      plan: todayPlan(weekday),
      stats: buildReviewStats(getDailyLogs(), getWorkoutLogs(), getCardioLogs())
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
