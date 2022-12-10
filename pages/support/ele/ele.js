// pages/support/ele/ele.js
Page({
  tapkouling(){
    wx.setClipboardData({
      data: '5.0￥gareXLL1sJA￥ https://m.tb.cn/h.f1fwOkz  每日领饿了么餐饮红包',
      success(){
        wx.showToast({
          title: '口令已复制',
        })
      }
    })
  },
  jumptoele(){
    wx.navigateToMiniProgram({
      appId: 'wxece3a9a4c82f58c9',
      path: 'taoke/pages/shopping-guide/index?scene=oR7coVu',
    })
  }
})