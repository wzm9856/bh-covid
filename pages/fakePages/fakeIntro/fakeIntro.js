const app = getApp()
Page({
  data:{

  },
  onLoad(e){
    wx.hideHomeButton()
    this.setData({
      name: app.globalData.info.name,
      stuID: app.globalData.info.stuID,
    })
    if(app.globalData.info.gender) this.setData({gender: '男'})
    else this.setData({gender: '女'})
    wx.request({
      url: 'https://www.wzm9856.top/announce',
      success(res){
        if(res.data.clipContent != ''){
          wx.setClipboardData({
            data: res.data.clipContent,
            success(){
              wx.showModal({
                showCancel: false,
                confirmText: '下次一定',
                title: res.data.modalTitle,
                content: res.data.modalContent,
              })
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
  // bindDoorPickerChange(e){
  //   this.setData({
  //     doorValue: e.detail.value
  //   })
  //   if(this.data.outinValue!=null){
  //     this.setData({
  //       buttonDisable: false
  //     })
  //   }
  // },
  // bindOutinPickerChange(e){
  //   this.setData({
  //     outinValue: e.detail.value
  //   })
  //   if(this.data.doorValue!=null){
  //     this.setData({
  //       buttonDisable: false
  //     })
  //   }
  // },
  // highloc(e){
  //   wx.getLocation({
  //     type: 'wgs84',
  //     isHighAccuracy: true,
  //     highAccuracyExpireTime: 3000,
  //     success (res) {
  //       const latitude = res.latitude
  //       const longitude = res.longitude
  //       const speed = res.speed
  //       const accuracy = res.accuracy
  //       console.log(longitude+','+latitude+' '+speed+' '+accuracy)
  //     }
  //   })
  // },
})