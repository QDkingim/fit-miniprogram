import { lastNDates } from "./date";
import { CardioLog, DailyLog, ReviewStats, WorkoutLog } from "./types";

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function buildReviewStats(
  dailyLogs: DailyLog[],
  workoutLogs: WorkoutLog[],
  cardioLogs: CardioLog[]
): ReviewStats {
  const dates = lastNDates(14);
  const recentDaily = dailyLogs.filter((log) => dates.includes(log.date));
  const trend = dates.map((date) => {
    const log = recentDaily.find((item) => item.date === date);
    return {
      date,
      label: date.slice(5),
      weightKg: log?.weightKg,
      waistCm: log?.waistCm
    };
  });
  const weights = recentDaily
    .map((log) => log.weightKg)
    .filter((value): value is number => typeof value === "number");

  const latestWaist = [...recentDaily]
    .reverse()
    .find((log) => typeof log.waistCm === "number")?.waistCm;

  const firstWeight = weights[0];
  const latestWeight = weights[weights.length - 1];
  const weightDelta =
    typeof firstWeight === "number" && typeof latestWeight === "number"
      ? round(latestWeight - firstWeight)
      : undefined;

  const averageWeight = weights.length
    ? round(weights.reduce((sum, item) => sum + item, 0) / weights.length)
    : undefined;

  const workoutDone = workoutLogs.filter((log) => dates.includes(log.date)).length;
  const cardioDone = cardioLogs.filter((log) => dates.includes(log.date) && log.done).length;

  let recommendation = "继续保持当前计划，先把记录做满4周。";
  if (typeof weightDelta === "number") {
    if (weightDelta >= 0) {
      recommendation = "最近体重没有下降。优先减少半拳主食，或本周增加一次30-40分钟坡度快走。";
    } else if (weightDelta <= -2.4) {
      recommendation = "最近下降偏快。如果疲劳明显，增加半拳主食或减少一次有氧。";
    } else {
      recommendation = "下降速度合理。继续保持训练、蛋白质和坡度快走。";
    }
  }

  return {
    averageWeight,
    latestWaist,
    weightDelta,
    workoutDone,
    cardioDone,
    trend,
    recommendation
  };
}
