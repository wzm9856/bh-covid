const app = getApp()
Page({
  onShow: function(){
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },
  submit: function(e){
    var username=e.detail.value.username.toUpperCase();
    var password=e.detail.value.password;
    if(username.length<5||password.length<5){
      wx.showModal({
        title: '账号或密码错误',
        content: '请重新输入',
        showCancel: false
      })
      return;
    }
    wx.showLoading({title: '正在提交',})
    var sessionID = app.globalData.sessionID
    wx.request({
      url: 'https://www.wzm9856.top/ssologin',
      data:{
        sessionID: sessionID,
        username:username,
        password:password
      },
      success: function(res){
        wx.hideLoading()
        app.authentication_check(res, true)
        if(res.data.status === 'ok'){
          setTimeout(()=>{
            app.globalData.info = res.data
            wx.redirectTo({url: '/pages/status/status'})
          })
        }
      }
    })
  }
})