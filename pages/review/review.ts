import { getCardioLogs, getDailyLogs, getWorkoutLogs } from "../../utils/storage";
import { buildReviewStats } from "../../utils/stats";

Page({
  data: {
    stats: buildReviewStats([], [], []),
    weightDeltaText: "--"
  },

  onShow() {
    const stats = buildReviewStats(getDailyLogs(), getWorkoutLogs(), getCardioLogs());
    const weightDeltaText =
      typeof stats.weightDelta === "number" ? `${stats.weightDelta > 0 ? "+" : ""}${stats.weightDelta}kg` : "--";

    this.setData({
      stats,
      weightDeltaText
    });
  }
});
