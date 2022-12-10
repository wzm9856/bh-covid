App({
  config: {
      host: 'https://www.wzm9856.top'
  },
  onLaunch: function() {
    console.log('App.onLaunch()');
    var sessionID =wx.getStorageSync('SESSIONID');
    if(sessionID == null){				//就没登陆过，让他去登录，直接进入index
      return;
    }
    this.globalData.sessionID = sessionID;
    wx.request({									//登陆过，通过sessionId查看账号当前状态
      url: 'https://www.wzm9856.top/getStatus',
      data: {
        sessionID: sessionID
      },
      success:function(res){
        const Appp = getApp()
        console.log(res.data);
        Appp.authentication_check(res, false)
        if(res.data.status === 'ok'){							//老用户了，存好变量后直接去状态页
          Appp.globalData.info = res.data;
          wx.redirectTo({url: '/pages/status/status'})
        }
      }
    })
  },
  authentication_check: function(res, isShowModal = true, desiredStep = 99){
    //运行到desiredStep之后就自动不显示提示框了，直接跳转，不填则默认是正常业务需要，所有步骤都弹提示框
    if(res.statusCode != 200){
      wx.showModal({
        title:"服务获取失败，请重试或联系管理员",
        content:String(res.statusCode||'')+' '+String(res.data||res.errMsg),
        showCancel:false
      })
      return
    }
    if(res.data.status === 'need_wxlogin'){
      if(isShowModal === true && desiredStep > 0){
        wx.showModal({
          title: '需要重新登录微信账号',
          content: '登录过期',
          showCancel: false,
          complete(){wx.redirectTo({url: '/pages/index/index',})}
        })
      }else{
        wx.redirectTo({url: '/pages/index/index',})
      }
    }else if(res.data.status === 'no_auth'){
      if(isShowModal === true && desiredStep > 1){
        wx.showModal({
          title: '授权码无效',
          content: '请重新输入',
          showCancel: false,
          complete(){wx.redirectTo({url: '/pages/loginPages/redeemKey/redeemKey',})}
        })
      }else{
        wx.redirectTo({url: '/pages/loginPages/redeemKey/redeemKey',})
      }
    }else if(res.data.status === 'no_sso_login'){
      if(isShowModal === true && desiredStep > 2){
        wx.showModal({
          title: '统一认证账号无效',
          content: '请重新输入',
          showCancel: false,
          complete(){wx.redirectTo({url: '/pages/loginPages/ssoLogin/ssoLogin',})}
        })
      }else{
        wx.redirectTo({url: '/pages/loginPages/ssoLogin/ssoLogin',})
      }
    }else if(res.data.status != 'ok'){
      console.log(res.data)
      wx.showModal({
        title:'发生未知错误，请联系管理员',
        content: JSON.stringify(res.data),
        showCancel: false
      })
    }
  },
  goto_green_card(e) {
    var pageins = this
    wx.requestSubscribeMessage({
      tmplIds: ["jrrc7vDbhcHZhE-ycyz9q_wnHngeAmtUgB4aJMUMNRE",'KWceQL3NSa9JF2GVuAYhTOeOC_8CLZX0qDCsHoLaWp8'],
      success (res) {
        if(res['jrrc7vDbhcHZhE-ycyz9q_wnHngeAmtUgB4aJMUMNRE']==='accept'){
          wx.showLoading({title: '正在提交',})
          wx.request({
            url: 'https://www.wzm9856.top/changeSetting',
            data:{
              sessionID: app.globalData.sessionID,
              change_type: 'add_message',
              amount: 1
            },
            complete(res){
              wx.hideLoading()
              app.authentication_check(res)
              if(res.data.status === 'ok'){
                pageins.setData({remainMessages: res.data.remainMessages})
              }
            },
          })
          wx.showLoading({title: '正在生成图片',})
          wx.request({
            url: 'https://www.wzm9856.top/getFakeUrl',
            data: {
              sessionID: app.globalData.sessionID
            },
            complete(res){
              wx.hideLoading()
              app.authentication_check(res)
              if(res.data.status != 'ok') return
              app.globalData.fakeImagePath = res.data.path
              if(e.currentTarget.dataset.id === '2'){
                wx.redirectTo({url: '/pages/fakePages/fakeApp/fakeApp?path='+res.data.path})
              }
              else{
                wx.redirectTo({url: '/pages/fakePages/fakeRenderQR/fakeRenderQR'})
              }
            },
            fail: function(res){
              console.log(res)
            }
          })
        }
      }
    })
  },
  globalData:{
    sessionID: null,
    fakeImagePath: null,
    info: null
  }
});