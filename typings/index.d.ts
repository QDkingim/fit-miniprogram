interface IAppOption {
  globalData: Record<string, unknown>;
}

declare function App<T>(options: T): void;
declare function Page(options: Record<string, any>): void;

declare namespace WechatMiniprogram {
  interface Wx {
    getStorageSync(key: string): any;
    setStorageSync(key: string, data: any): void;
    showToast(options: { title: string; icon?: "success" | "error" | "loading" | "none" }): void;
    switchTab(options: { url: string }): void;
    navigateTo(options: { url: string }): void;
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
