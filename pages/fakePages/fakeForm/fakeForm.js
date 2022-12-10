Page({
  data: {
    src1: null,
    src3: null,
    hiddenStatus:2,
  },
  onLoad: function (e) {
    var pageins = this
    wx.downloadFile({
      url: 'https://www.wzm9856.top/getFile/genPic/'+e.path+'f1.png',
      success(res){
        pageins.setData({src1:res.tempFilePath})
      },
      fail(e){
        console.log(e)
        imageLoadingFailed(e)
      }
    })
    wx.downloadFile({
      url: 'https://www.wzm9856.top/getFile/genPic/'+e.path+'f3.png',
      success(res){
        pageins.setData({src3:res.tempFilePath})
      },
      fail(e){
        console.log(e)
        imageLoadingFailed(e)
      }
    })
    wx.setNavigationBarTitle({title: '学生临时出入校申请'})
    this.setData({src1:e.f1, src3:e.f3})
  },
  imageLoadingFailed: function(e){
    wx.hideLoading()
    wx.showModal({
      title: '图片加载失败，请您退出重试',
      content: e.errMsg
    })
    console.log(e)
  },
  tap: function(e){
    this.setData({hiddenStatus:this.data.hiddenStatus+1})
  },
  tapBanner: function(e){
    if(e.detail.x<130){
      this.setData({hiddenStatus: 3})
    }else if(e.detail.x<260){
      this.setData({hiddenStatus: 4})
    }else{this.setData({hiddenStatus: 5})}
  },
  tapCamera: function(e){
    wx.redirectTo({
      url: '/pages/fakePages/fakeRenderQR/fakeRenderQR.js',
    })
  },
})