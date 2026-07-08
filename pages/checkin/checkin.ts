import { todayKey } from "../../utils/date";
import { getDailyLogs, saveDailyLog } from "../../utils/storage";
import { DietFlag } from "../../utils/types";

const flags: DietFlag[] = ["protein", "carb", "vegetable", "sugarFree"];

Page({
  data: {
    today: todayKey(),
    date: todayKey(),
    weightKg: "",
    waistCm: "",
    steps: "",
    sleepHours: "",
    waterLiters: "",
    dietMap: {
      protein: false,
      carb: false,
      vegetable: false,
      sugarFree: false
    }
  },

  async onShow() {
    const editDate = wx.getStorageSync("pendingEditDate") || todayKey();
    wx.setStorageSync("pendingEditDate", "");
    await this.loadDate(editDate);
  },

  async loadDate(date: string) {
    const logs = await getDailyLogs();
    const log = logs.find((item) => item.date === date);
    const dietMap = {
      protein: !!log?.dietFlags.includes("protein"),
      carb: !!log?.dietFlags.includes("carb"),
      vegetable: !!log?.dietFlags.includes("vegetable"),
      sugarFree: !!log?.dietFlags.includes("sugarFree")
    };
    this.setData({
      date,
      weightKg: log?.weightKg || "",
      waistCm: log?.waistCm || "",
      steps: log?.steps || "",
      sleepHours: log?.sleepHours || "",
      waterLiters: log?.waterLiters || "",
      dietMap
    });
  },

  onDateChange(event: WechatMiniprogram.PickerChange) {
    this.loadDate(event.detail.value);
  },

  onInput(event: WechatMiniprogram.Input) {
    const field = event.currentTarget.dataset.field;
    this.setData({ [field]: event.detail.value });
  },

  toggleDiet(event: WechatMiniprogram.TouchEvent) {
    const flag = event.currentTarget.dataset.flag as DietFlag;
    this.setData({ [`dietMap.${flag}`]: !this.data.dietMap[flag] });
  },

  async save() {
    const dietFlags = flags.filter((flag) => this.data.dietMap[flag]);
    await saveDailyLog({
      date: this.data.date,
      weightKg: Number(this.data.weightKg) || undefined,
      waistCm: Number(this.data.waistCm) || undefined,
      steps: Number(this.data.steps) || undefined,
      sleepHours: Number(this.data.sleepHours) || undefined,
      waterLiters: Number(this.data.waterLiters) || undefined,
      dietFlags
    });
    wx.showToast({ title: "已保存", icon: "success" });
  }
});
