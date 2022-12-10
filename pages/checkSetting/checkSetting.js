const app = getApp()
Page({
  data:{
    stuID: null,
    isAutoCheck: false,
    isNotif: true,
    isHome: false,
    remainMessages: 0,
    todayStatus: "",
    isPause: false,
  },
  onShow: function(){

  },
  onLoad: function (params) {
    var e = app.globalData.info
    console.log(e)
    this.setData({
      stuID: e.stuID,
      isAutoCheck: e.isAutoCheck,
      remainMessages: e.remainMessages,
      todayStatus: e.todayStatus,
      isNotif: e.isNotif,
      isHome: e.isHome,
      isPause: e.isPause,
      homePos: e.homePos
    })
  },
  checkChange: function(e){
    var pageins = this
    wx.showLoading({title: '正在修改',})
    wx.request({
      url: 'https://www.wzm9856.top/changeSetting',
      data:{
        sessionID: app.globalData.sessionID,
        change_type: 'auto',
        setting_status: e.detail.value
      },
      complete(res){
        wx.hideLoading()
        app.authentication_check(res)
        if(res.data.status === 'ok'){
          pageins.setData({isAutoCheck: res.data.setting_status})
        }else{
          pageins.setData({isAutoCheck: pageins.data.isAutoCheck})
        }
      }
    })
  },
  notifChange: function(e){
    var pageins = this
    wx.showLoading({title: '正在修改',})
    wx.request({
      url: 'https://www.wzm9856.top/changeSetting',
      data:{
        sessionID: app.globalData.sessionID,
        change_type: 'notif',
        setting_status: e.detail.value
      },
      complete(res){
        wx.hideLoading()
        app.authentication_check(res)
        if(res.data.status === 'ok'){
          pageins.setData({isNotif: res.data.setting_status})
        }else{
          pageins.setData({isNotif: pageins.data.isNotif})
        }
      }
    })
  },
  homeChange: function(e){
    var pageins = this
    wx.showLoading({title: '正在修改',})
    wx.request({
      url: 'https://www.wzm9856.top/changeSetting',
      data:{
        sessionID: app.globalData.sessionID,
        change_type: 'home',
        setting_status: e.detail.value
      },
      complete(res){
        wx.hideLoading()
        app.authentication_check(res)
        if(res.data.status === 'ok'){
          pageins.setData({isHome: res.data.setting_status})
        }else{
          pageins.setData({isHome: pageins.data.isHome})
        }
        if(pageins.data.isHome){
          wx.showModal({
            title:'祝您假期愉快！',
            content:'在自定义位置关闭时，小程序自动使用若干随机校内地址打卡；自定义位置开启后***记得点击下方定位按键***，将使用定位的位置打卡',
            showCancel:false,
            confirmText:'好的'
          })
        }
        else{
          wx.showModal({
            title:'祝您开学愉快！',
            content:'小程序将使用北航校内随机位置打卡',
            showCancel:false,
            confirmText:'好的'
          })
        }
      }
    })
  },
  auth: function(){
    var pageins = this
    wx.requestSubscribeMessage({
      tmplIds: ["jrrc7vDbhcHZhE-ycyz9q_wnHngeAmtUgB4aJMUMNRE",'KWceQL3NSa9JF2GVuAYhTOeOC_8CLZX0qDCsHoLaWp8'],
      success (res) {
        console.log(res)
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
              if(res.data.status === 'ok') pageins.setData({remainMessages: res.data.remainMessages})
            }
          })
        }
      }
    })
  },
  pause: function(){
    var pageins = this
    wx.request({
      url: 'https://www.wzm9856.top/changeSetting',
      data:{
        sessionID: app.globalData.sessionID,
        change_type: 'pause',
        setting_status: !pageins.data.isPause
      },
      complete(res){
        wx.hideLoading()
        app.authentication_check(res)
        if(res.data.status === 'ok'){
          pageins.setData({isPause: res.data.setting_status});
          if(res.data.setting_status){
            wx.requestSubscribeMessage({
              tmplIds: ["jrrc7vDbhcHZhE-ycyz9q_wnHngeAmtUgB4aJMUMNRE",'KWceQL3NSa9JF2GVuAYhTOeOC_8CLZX0qDCsHoLaWp8'],
              success (res) {
                if(res['jrrc7vDbhcHZhE-ycyz9q_wnHngeAmtUgB4aJMUMNRE']==='accept'){
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
                    }
                  })
                  wx.showModal({
                    title: '下一次打卡已暂停',
                    content: '下午五点至五点半进行本操作可能会导致未知后果，如果是想要今天手动打卡请赶快抢在程序前手动打卡',
                    showCancel: false
                  })
                }
              }
            })
          }else{
            wx.showModal({
              title: '下一次打卡已恢复',
              content: '下午五点至五点半进行本操作可能会导致未知后果，如果五点半还没打请手动打卡',
              showCancel: false
            })
          }
        }
      },
    })

  },
  findLoc: function(){
    var pageins = this
    wx.showLoading({title: '正在定位',})
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      highAccuracyExpireTime: 3000,
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(longitude+','+latitude)
        
        wx.request({
          url: 'https://www.wzm9856.top/getGeoInfo',
          data:{
            sessionID: app.globalData.sessionID,
            longitude: longitude,
            latitude: latitude
          },
          complete(res){
            wx.hideLoading()
            app.authentication_check(res)
            if(res.data.status != 'ok') return;
            pageins.setData({homePos: res.data.content});
          },
        })
      }
    })
    
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

})