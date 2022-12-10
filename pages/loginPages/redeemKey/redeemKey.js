const app = getApp()
Page({
  onShow: function(){
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },
  submit: function(e){
    console.log(e);
    var keyString=e.detail.value.keyString;
    wx.showLoading({title: '正在提交'})
    if(keyString.length!=16){
      setTimeout(() => {
        wx.hideLoading();
        wx.showModal({
          title: '授权码认证失败',
          content: '请重新输入',
          showCancel: false
        })
      }, 120);
      return;
    }
    var sessionID = app.globalData.sessionID
    wx.request({
      url: 'https://www.wzm9856.top/redeem',
      data:{
        sessionID: sessionID,
        cdkey: e.detail.value.keyString
      },
      success: function(res){
        wx.hideLoading()
        app.authentication_check(res, true, 2)
      }
    })
  }
})