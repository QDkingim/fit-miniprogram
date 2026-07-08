"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../../utils/storage");
const stats_1 = require("../../utils/stats");
Page({
    data: {
        stats: (0, stats_1.buildReviewStats)([], [], []),
        weightDeltaText: "--"
    },
    async onShow() {
        const [dailyLogs, workoutLogs, cardioLogs] = await Promise.all([(0, storage_1.getDailyLogs)(), (0, storage_1.getWorkoutLogs)(), (0, storage_1.getCardioLogs)()]);
        const stats = (0, stats_1.buildReviewStats)(dailyLogs, workoutLogs, cardioLogs);
        const weightDeltaText = typeof stats.weightDelta === "number" ? `${stats.weightDelta > 0 ? "+" : ""}${stats.weightDelta}kg` : "--";
        this.setData({
            stats,
            weightDeltaText
        }, () => {
            this.drawTrendChart();
        });
    },
    drawTrendChart() {
        const trend = this.data.stats.trend;
        const weights = trend.map((item) => item.weightKg).filter((value) => typeof value === "number");
        const waists = trend.map((item) => item.waistCm).filter((value) => typeof value === "number");
        const ctx = wx.createCanvasContext("trendChart", this);
        const width = 331;
        const height = 190;
        const pad = 28;
        ctx.setFillStyle("#ffffff");
        ctx.fillRect(0, 0, width, height);
        ctx.setStrokeStyle("#e4e8dc");
        ctx.setLineWidth(1);
        [0, 1, 2].forEach((line) => {
            const y = pad + line * ((height - pad * 2) / 2);
            ctx.beginPath();
            ctx.moveTo(pad, y);
            ctx.lineTo(width - pad, y);
            ctx.stroke();
        });
        const drawLine = (values, color, min, max) => {
            let started = false;
            values.forEach((value, index) => {
                if (typeof value !== "number")
                    return;
                const x = pad + index * ((width - pad * 2) / (trend.length - 1));
                const range = max - min || 1;
                const y = height - pad - ((value - min) / range) * (height - pad * 2);
                if (!started) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    started = true;
                }
                else {
                    ctx.lineTo(x, y);
                }
            });
            if (started) {
                ctx.setStrokeStyle(color);
                ctx.setLineWidth(3);
                ctx.stroke();
            }
            values.forEach((value, index) => {
                if (typeof value !== "number")
                    return;
                const x = pad + index * ((width - pad * 2) / (trend.length - 1));
                const range = max - min || 1;
                const y = height - pad - ((value - min) / range) * (height - pad * 2);
                ctx.beginPath();
                ctx.setFillStyle(color);
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        };
        if (weights.length) {
            drawLine(trend.map((item) => item.weightKg), "#16a34a", Math.min(...weights), Math.max(...weights));
        }
        if (waists.length) {
            drawLine(trend.map((item) => item.waistCm), "#2563eb", Math.min(...waists), Math.max(...waists));
        }
        ctx.setFillStyle("#697282");
        ctx.setFontSize(11);
        ctx.fillText(trend[0]?.label || "", pad, height - 6);
        ctx.fillText(trend[trend.length - 1]?.label || "", width - pad - 28, height - 6);
        ctx.draw();
    }
});
