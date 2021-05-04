// pages/CAS/CAS.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton();
    const that=this;
    wx.getStorage({
      key: 'openid',
      success:res=>{
        that.data.openid=res.data;
        const db = wx.cloud.database().collection("users").doc(this.data.openid);
        db.get({
          success(res){
            that.setData({
              clubs:res.data.club,
            });
            for(var i=0;i<that.data.clubs.length;i++){
              const tmpi=i;
              wx.cloud.database().collection("clubs").doc(that.data.clubs[i].number).get({
                success(res){
                  that.data.clubs[tmpi].name=res.data.name;
                  that.setData({
                    clubs:that.data.clubs
                  })
                }
              })
            }
          }
        })
      }
    })
    this.setData({
      opacity1:"opacity:0;z-index:-1"
    })
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
  b_personal: function () {
    wx.reLaunch({
      url: '/pages/personal/personal',
    });
  },
  b_add1:function(){
    this.setData({
      opacity1:"opacity:1;z-index:1"
    })
  },
  b_del1:function(){
    this.setData({
      opacity1:"opacity:0;z-index:-1"
    })
  },
  addinput:function(e){
    this.data.addin=e.detail.value;
  },
  b_addin:function(){
    let addin=this.data.addin;
    const db1 = wx.cloud.database().collection("clubs").doc(addin);
    const db2 = wx.cloud.database().collection("users").doc(this.data.openid);
    const that=this;
    db1.get({
      success(res){
        let flag=true;
        console.log(res);
        for(var i=0;i<that.data.clubs.length;i++){
          if(that.data.clubs[i].number==res.data._id)
          {
            wx.showModal({
              title: '温馨提示',
              content: '您已经在这个社团里啦！',
            })
            flag=false;
            break;
          }
        }
        if(flag){
          let tmpclub=[];
          console.log(that.data.clubs);
          for(var i=0;i<that.data.clubs.length;i++){
            tmpclub.push({
              number: that.data.clubs[i].number
            });
          }
          tmpclub.push({
            number: res.data._id
          });
          db2.update({
            data: {
              club:tmpclub
            },
          });
          wx.reLaunch({
            url: '/pages/CAS/CAS',
          });
        }
        that.setData({
          opacity1:"opacity:0;z-index:-1"
        });
      },
      fail(){
        wx.showModal({
          title: '温馨提示',
          content: '该社团还不在系统中哦！请联系开发者添加。',
        })
      }
    })
  }
});
