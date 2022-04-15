export default {
  pages: ["pages/index/index"],
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
    }
  }
};
