// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    wx.cloud.init({
      env:"enspire-env-7gn7r6ekad6dfbe4",
      traceUser: true
    });
    wx.cloud.init({
      env:"enspire-env-7gn7r6ekad6dfbe4"
    });
    // 登录
    wx.login({
      success: (res) => {
        wx.cloud.callFunction({
          name: "getopenid",
          success: (res)=>{
            console.log(res.result.openid)
            wx.setStorage({
              key: 'openid',
              data: res.result.openid
            })
          }
        })
      },
    });
  },
  globalData: {
    userInfo: null,
  },
});
