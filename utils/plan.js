"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultExercises = void 0;
exports.todayPlan = todayPlan;
exports.defaultExercises = [
    { name: "腿举或坐姿蹬腿", sets: 3, target: "10-12次", done: false },
    { name: "坐姿推胸", sets: 3, target: "10-12次", done: false },
    { name: "高位下拉", sets: 3, target: "10-12次", done: false },
    { name: "坐姿划船", sets: 2, target: "10-12次", done: false },
    { name: "哑铃肩推或器械肩推", sets: 2, target: "10-12次", done: false },
    { name: "平板支撑", sets: 2, target: "30-45秒", done: false }
];
function todayPlan(weekday) {
    if (weekday === "周一" || weekday === "周三" || weekday === "周五") {
        return {
            title: "全身力量",
            detail: "完成6个基础动作，每组保留2-3次余力。",
            action: "workout"
        };
    }
    if (weekday === "周二" || weekday === "周四") {
        return {
            title: "坡度快走",
            detail: "跑步机35-45分钟，坡度5-8%，速度4.5-5.5km/h。",
            action: "cardio"
        };
    }
    if (weekday === "周六") {
        return {
            title: "坡度快走或休息",
            detail: "状态好就走40分钟，疲劳就休息。",
            action: "cardio"
        };
    }
    return {
        title: "休息",
        detail: "保持步数和饮食，不需要硬练。",
        action: "rest"
    };
}
