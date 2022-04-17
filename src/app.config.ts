export default {
  pages: ["pages/home/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  plugins: {
    WechatSI: {
      version: "0.3.5",
      provider: "wx069ba97219f66d99"
    },
    soePlugin: {
      version: "1.2.15",
      provider: "wxe5a00a1780c8eb95"
    },
  }
};
