const app = getApp()
Page({
  data:{
    hiddenStatus:1,
    path:null,
    avatar:null,
    pic1loc:null,
    pic2loc:null
  },
  onLoad: function(e){
    wx.setNavigationBarTitle({title: '北京航空航天大学'})
    var pageins = this
    this.setData({path:e.path})
    wx.downloadFile({
      url: 'https://www.wzm9856.top/getFile/avatar/'+app.globalData.info.stuID+'.jpg',
      success(res){
        pageins.setData({avatar:res.tempFilePath})
      },
      fail(e){
        console.log(e)
      }
    })
    var pic1 = wx.getStorageSync('PIC1');
    var pic2 = wx.getStorageSync('PIC2');
    if(pic1.substring(pic1.length-3) === 'txt' || pic1 === '' || wx.getStorageSync(pic1)===''){
      this.setData({'pic1loc': "./staticImage/1.jpg"})
    }
    else{
      console.log(2);
      this.setData({'pic1loc': pic1});
    }
    if(pic1.substring(pic2.length-3) === 'txt' || pic2 === '' || wx.getStorageSync(pic2)===''){
      this.setData({'pic2loc': "./staticImage/2.jpg"})
    }
    else{
      this.setData({'pic2loc': pic2});
    }
  },
  tap1: function(e){
    this.setData({hiddenStatus:2})
  },
  tap2: function(e){
    console.log('x'+e.detail.x+'y'+e.detail.y);
    if(e.detail.y<115){wx.navigateTo({url: '/pages/fakePages/fakeCard/fakeCard?&a='+this.data.avatar})}
    else if(e.detail.y<210){wx.navigateTo({url: '/pages/fakePages/fakeForm/fakeForm?path='+this.data.path})}
    else if(e.detail.y>500){wx.redirectTo({url: '/pages/fakePages/fakeRenderQR/fakeRenderQR',})}
  }, 
})