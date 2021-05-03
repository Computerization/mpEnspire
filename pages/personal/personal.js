// pages/personal/personal.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '请先登陆',
    },
  },

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
          that.setData({
            text: '您尚未登陆',
          });
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
        that.setData({
          text: '您尚未登陆',
        });
      },
    });
    const db = wx.cloud.database().collection('users');
    that.setData({
      realname: '未知',
      schoolnumber: '未知',
      emailaddress: '未知',
    });
    db.get({
      success(res) {
        that.setData({
          realname: res.data[0].realname,
          schoolnumber: res.data[0].schoolnumber,
          emailaddress: res.data[0].emailaddress,
        });
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

  b_index: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  b_CAS: function () {
    wx.reLaunch({
      url: '/pages/CAS/CAS',
    });
  },
  b_changeinfo: function () {
    wx.navigateTo({
      url: '/pages/changeinfo/changeinfo',
    });
  },
});
