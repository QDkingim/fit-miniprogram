import { todayKey } from "../../utils/date";
import { getCardioLogs, saveCardioLog } from "../../utils/storage";

Page({
  data: {
    date: todayKey(),
    minutes: "35",
    speed: "5.0",
    incline: "5",
    fatigue: "3"
  },

  onShow() {
    const date = todayKey();
    const log = getCardioLogs().find((item) => item.date === date);
    this.setData({
      date,
      minutes: log?.minutes || "35",
      speed: log?.speed || "5.0",
      incline: log?.incline || "5",
      fatigue: log?.fatigue || "3"
    });
  },

  onInput(event: WechatMiniprogram.Input) {
    const field = event.currentTarget.dataset.field;
    this.setData({ [field]: event.detail.value });
  },

  save() {
    saveCardioLog({
      date: this.data.date,
      minutes: Number(this.data.minutes) || 0,
      speed: Number(this.data.speed) || 0,
      incline: Number(this.data.incline) || 0,
      fatigue: Number(this.data.fatigue) || 3,
      done: true
    });
    wx.showToast({ title: "已保存", icon: "success" });
  }
});
