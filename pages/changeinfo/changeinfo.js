// pages/changeinfo/changeinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    wx.getStorage({
      key: 'openid',
      success:res=>{
        this.data.openid=res.data;
        const db = wx.cloud.database().collection("users").doc(this.data.openid);
        db.get({
          success(res){
            console.log(res);
            that.setData({
              realname:res.data.realname,
              newname:res.data.realname,
              schoolnumber:res.data.schoolnumber,
              newnumber:res.data.schoolnumber,
              emailaddress:res.data.emailaddress,
              newemail:res.data.emailaddress,
              isnotempty:res.data.isnotempty
            });
            console.log(realname);
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  nameinput:function(e){
    this.data.newname=e.detail.value;
    console.log(this.data.newname)
  },
  numberinput:function(e){
    this.data.newnumber=e.detail.value;
  },
  emailinput:function(e){
    this.data.newemail=e.detail.value;
  },
  b_finished:function(){
    if(this.data.isnotempty==true){
      wx.cloud.database().collection("users").doc(this.data.openid).update({
        data: {
          isnotempty:true,
          realname:this.data.newname,
          schoolnumber:this.data.newnumber,
          emailaddress:this.data.newemail,
        },
      })
    }else {
      wx.cloud.database().collection("users").add({
        data: {
          _id:this.data.openid,
          isnotempty:true,
          realname:this.data.newname,
          schoolnumber:this.data.newnumber,
          emailaddress:this.data.newemail,
          club:[]
        },
      })
    }
    wx.reLaunch({
      url: '/pages/personal/personal',
    });
  }
})