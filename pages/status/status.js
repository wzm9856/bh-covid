// pages/status/status.js
const app = getApp()
Page({
  data:{
    time: 200,
    deltatime:-1,
    hideCheck: true,
    hideSimu: true,
    hideSupport: true
  },
  blink: function(e){
    var pageins = this;
    if(pageins.data.time!=200&&pageins.data.time!=255){
      pageins.setData({time: pageins.data.time+pageins.data.deltatime});
    }
    else{
      pageins.setData({deltatime: -pageins.data.deltatime});
      pageins.setData({time: pageins.data.time+pageins.data.deltatime});
    };
    setTimeout(pageins.blink, 5);
  },
  onShow: function(){
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    this.blink();
  },
  onLoad: function (params) {
    var e = app.globalData.info
    var p = e.permission;
    if(p===0){
      wx.showLoading({
        title: '正在加载',
      })
    }
    if(p>=4){
      p -= 4;
      this.setData({hideSupport: false})
    }
    if(p>=2){
      p -= 2;
      this.setData({hideSimu: false})
    }
    if(p>=1){
      p -= 1;
      this.setData({hideCheck: false})
    }
    var ver = wx.getStorageSync('VERSION');
    var picver = wx.getStorageSync('PICVER');
    wx.request({
      url: 'https://www.wzm9856.top/announce',
      success(res){
        if(res.data.picVer != picver){
          wx.downloadFile({
            url: 'https://www.wzm9856.top/getFile/1.jpg',
            success: function (res) {
              if(res.statusCode === 200){
                const fs = wx.getFileSystemManager();
                fs.saveFile({
                  tempFilePath: res.tempFilePath,
                  success: function (params) {
                    console.log("app图片1缓存完成");
                    wx.setStorageSync('PIC1', params.savedFilePath);
                  }
                })
              }
            }
          })
          wx.downloadFile({
            url: 'https://www.wzm9856.top/getFile/2.jpg',
            success: function (res) {
              if(res.statusCode === 200){
                const fs = wx.getFileSystemManager();
                fs.saveFile({
                  tempFilePath: res.tempFilePath,
                  success: function (params) {
                    console.log("app图片2缓存完成");
                    wx.setStorageSync('PIC2', params.savedFilePath);
                  }
                })
              }
            }
          })
          wx.setStorageSync('PICVER', res.data.picVer);
        }
        if(res.data.version != ver){
          var ct = '开始使用';
          if(res.data.act === 'tutorial'){ ct = '去看看'};
          wx.showModal({
            title: res.data.title,
            content: res.data.info,
            showCancel: false,
            confirmText: ct,
            success(){
              wx.setStorageSync('VERSION', res.data.version);
              if(res.data.act === 'tutorial') wx.navigateTo({url: '/pages/tutorial/tutorial',});
            }
          })
        }
      }
    })
  },
  proceed(e) { 
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
          var dir = 0;
          wx.scanCode({
            success (res) {
                console.log(res);
                if(res.scanType === 'WX_CODE'){
                    if(res.rawData === "a1p5cFkxVUdLd184flVDcVE7RGlZMVMvQmRTfmk7KzpM"){//大运村出校
                        dir=0;
                    }
                    else if(res.rawData === "azRXa0lJYUY3ak1Bfi5aRTZuQlQvdXl4R2Z3clZGRkEj"){//大运村入校
                        dir=1;
                    }
                }
                // pageins.setData({hiddenStatus: 1})
                // wx.setNavigationBarTitle({title: '通行码'})
                // setTimeout(()=>{pageins.setData({hiddenStatus: 2})},1000)
                wx.redirectTo({url: '/pages/fakePages/fakeCard/fakeCard?dir='+String(dir)})
            }
          });
        }
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
})