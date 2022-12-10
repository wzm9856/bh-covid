const app = getApp()
Page({
  data:{
    Y : 0,
    M : 0,
    D : 0,
    h : 0,
    m : 0,
    s : 0,
    name : "王子铭",
    ID: "SY2017327",
    avatar: null,
    whatXiaoMa: "出",
    loadingVisibility: "hidden",
  },
  onLoad: function(e){
    wx.setNavigationBarTitle({title: '网上办事大厅-校园通行卡'})
    if(e.a)this.setData({avatar:e.a})
    else {
      wx.downloadFile({
        url: 'https://www.wzm9856.top/getFile/avatar/'+app.globalData.info.stuID+'.jpg',
        success(res){
          pageins.setData({avatar:res.tempFilePath})
        },
        fail(e){
          console.log(e)
        }
      })
    }
    var pageins = this
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth()+1
    var D = date.getDate()
    var h = date.getHours()>9?date.getHours():('0'+date.getHours())
    var m = date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes())
    var s = date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds())
    pageins.setData({
      Y:Y,M:M,D:D,h:h,m:m,s:s,
      name:app.globalData.info.name,
      ID:app.globalData.info.stuID,
    })
    if(app.globalData.info.gender) this.setData({gender: '男'})
    else this.setData({gender: '女'})
    setInterval(function(){
      var date = new Date()
      var Y = date.getFullYear()
      var M = date.getMonth()+1
      var D = date.getDate()
      var h = date.getHours()>9?date.getHours():('0'+date.getHours())
      var m = date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes())
      var s = date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds())
      pageins.setData({Y:Y,M:M,D:D,h:h,m:m,s:s})
    },1000)
  },
  onTapLeft: function(e){
    if(this.data.whatXiaoMa == "出"){
      return;
    }
    this.setData({whatXiaoMa:"出", loadingVisibility:"visible"})
    var pageins = this;
    setTimeout(() => {
      pageins.setData({loadingVisibility:"hidden"})
    }, 500);
  },
  onTapRight: function(e){
    if(this.data.whatXiaoMa == "入"){
      return;
    }
    this.setData({whatXiaoMa:"入", loadingVisibility:"visible"})
    var pageins = this;
    setTimeout(() => {
      pageins.setData({loadingVisibility:"hidden"})
    }, 500);
  }

})