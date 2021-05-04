// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.hideHomeButton();
    wx.getStorage({
      key: 'hasUserInfo',
      success: (res) => {
        if (res.data == false) {
          that.askInfo();
        } else {
          wx.getStorage({
            key: 'UserInfo',
            success: (res) => {
              that.setData({
                userInfo: res.data,
              });
            },
          });
        }
      },
      fail: (res) => {
        that.askInfo();
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  b_CAS: function () {
    wx.reLaunch({
      url: '/pages/CAS/CAS',
    });
  },
  b_personal: function () {
    wx.reLaunch({
      url: '/pages/personal/personal',
    });
  },
  askInfo: function () {
    const that = this;
    wx.showModal({
      title: '温馨提示',
      content: '为了使您正常使用该小程序，我们请求获得您的部分个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: (res) => {
              console.log(res);
              that.setData({
                userInfo: res.userInfo,
              });
              wx.setStorage({
                data: true,
                key: 'hasUserInfo',
              });
              wx.setStorage({
                data: res.userInfo,
                key: 'UserInfo',
              });
            },
          });
        }
      },
      fail(res) {
        wx.setStorage({
          data: false,
          key: 'hasUserInfo',
        });
      },
    });
  },
});
