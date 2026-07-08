interface IAppOption {
  onLaunch?: () => void;
  globalData: Record<string, unknown>;
}

declare function App<T>(options: T): void;
declare function Page(options: Record<string, any>): void;

declare namespace WechatMiniprogram {
  interface Wx {
    cloud?: Cloud;
    getStorageSync(key: string): any;
    setStorageSync(key: string, data: any): void;
    createCanvasContext(canvasId: string, component?: any): CanvasContext;
    showToast(options: { title: string; icon?: "success" | "error" | "loading" | "none" }): void;
    switchTab(options: { url: string }): void;
    navigateTo(options: { url: string }): void;
  }

  interface Cloud {
    init(options: { env: string; traceUser?: boolean }): void;
    callFunction<T = any>(options: { name: string; data?: any }): Promise<{ result: T }>;
  }

  interface CanvasContext {
    beginPath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
    fill(): void;
    stroke(): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    setFillStyle(color: string): void;
    setFontSize(size: number): void;
    setLineWidth(width: number): void;
    setStrokeStyle(color: string): void;
    fillText(text: string, x: number, y: number): void;
    draw(): void;
  }

  interface BaseEvent {
    currentTarget: {
      dataset: Record<string, any>;
    };
  }

  interface Input extends BaseEvent {
    detail: {
      value: string;
    };
  }

  interface TouchEvent extends BaseEvent {}
}

declare const wx: WechatMiniprogram.Wx;
