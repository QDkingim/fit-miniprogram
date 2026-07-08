# AGENT.md

## 项目是什么

这是一个微信原生小程序 MVP，项目名为「秤了么」，用于记录新手减脂增肌过程中的每日打卡、力量训练、坡度快走和 14 天趋势复盘。

当前版本不接云开发，所有用户数据通过微信小程序本地存储 `wx.setStorageSync` / `wx.getStorageSync` 保存。

## 技术栈

- 微信原生小程序
- TypeScript
- WXML / WXSS
- 本地存储

## 主要页面

- `pages/index/index`：今天页，展示日期、当日训练安排和近 14 天概览。
- `pages/checkin/checkin`：每日打卡，记录体重、腰围、步数、睡眠、饮水和饮食完成度。
- `pages/workout/workout`：力量训练，记录动作、组数、重量、次数和完成状态。
- `pages/cardio/cardio`：坡度快走，记录时间、速度、坡度、疲劳程度和备注。
- `pages/review/review`：复盘页，展示近 14 天统计和调整建议。
- `pages/profile/profile`：我的页，维护性别、年龄、身高、起始体重、目标体重、腰围、睡眠目标和步数目标。

## 核心目录和文件

- `app.json`：小程序页面注册、窗口样式和 tabBar 配置。
- `app.wxss`：全局样式。
- `pages/**`：每个页面的 `.ts`、`.js`、`.wxml`、`.wxss`、`.json`。
- `utils/types.ts`：核心数据类型。
- `utils/storage.ts`：本地存储读写入口。
- `utils/plan.ts`：每周训练计划和默认力量训练动作。
- `utils/stats.ts`：近 14 天复盘统计和建议逻辑。
- `utils/date.ts`：日期工具。
- `project.config.json`：微信开发者工具项目配置。
- `project.private.config.json`：本机私有配置，通常不要改。

## 常用操作

### 安装依赖

```bash
npm install
```

### 编译 TypeScript

```bash
npm run build
```

该命令会运行 `tsc`，根据 `.ts` 文件生成或更新对应 `.js` 文件。

### 本地运行

1. 打开微信开发者工具。
2. 导入当前 `fit-miniprogram` 目录。
3. 使用测试号、游客模式或正式 AppID。
4. 点击编译运行。

## 修改原则

- 优先改 `.ts` 源文件，再运行 `npm run build` 生成 `.js`。
- 不要手写改动编译产物 `.js`，除非项目明确不再使用 TypeScript 编译。
- 页面新增或删除后，同步更新 `app.json`。
- 存储字段变更时，同时检查 `utils/types.ts`、`utils/storage.ts` 和相关页面读写逻辑。
- `project.private.config.json` 是本地私有配置，除非用户明确要求，否则不要修改。
- 当前数据只存在本机微信小程序缓存里，不要假设有后端、数据库或账号同步。

## 验证标准

完成代码修改后，至少执行：

```bash
npm run build
```

涉及页面交互或样式时，还需要在微信开发者工具中编译预览，重点检查：

- tabBar 页面能正常切换。
- 表单输入能保存并在重新进入页面后回显。
- 今日页和复盘页能读取最新记录并正确刷新。
- 新增页面已在 `app.json` 注册。

## 当前产品边界

- 面向个人使用的减脂增肌记录工具，不是社交或教练管理系统。
- 第一版追求核心记录闭环，不做复杂账号体系、云同步或数据分析平台。
- 训练计划逻辑目前是固定规则：周一/三/五力量，周二/四坡度快走，周六可选有氧，周日休息。
