// pages/support/tb/tb.js
const app = getApp()
Page({
  data:{
    ans:"",
    focus:false,
    finalPrice: 0,
    rate: 0,
    kouling:"",
    disabled: false
  },
  input(e) {
    if(e.detail.cursor<5) return;
    var pageins = this;
    wx.showLoading({title: '正在生成',});
    console.log(e.detail.value);
    this.setData({disabled:true});
    wx.request({
      url: 'https://www.wzm9856.top/support/',
      data:{
        sessionID: app.globalData.sessionID,
        supportType: 'tb',
        content: e.detail.value,
        auth: 'support_fromMyApptoServer'
      },
      complete(res){
        wx.hideLoading();
        app.authentication_check(res);
        console.log(res.data);
        if(res.data.ans === 'noItem'){
          wx.showModal({
            title:"当前商品无佣金",
            content:"直接购买就可以了，麻烦了！！",
            showCancel:false
          })
          wx.setClipboardData({
            data:''
          })
        }else if(res.data.coupon === 0){
          pageins.setData({
            ans:res.data.ans,
            focus:true,
            rate:res.data.rate,
            kouling:res.data.ans
          });
          wx.setClipboardData({
            data: res.data.ans,
            success(){
              wx.showToast({
                title: '新口令已复制',
                duration: 5000
              })
            }
          })
        }else{
          pageins.setData({
            ans:res.data.ans,
            focus:true,
            coupon:res.data.coupon,
            finalPrice:res.data.final_price,
            rate:res.data.rate,
            kouling:res.data.ans
          });
          wx.setClipboardData({
            data: res.data.ans,
            success(){
              wx.showToast({
                title: '口令已复制',
              })
            }
          })
        }
      }
    })
  },
  tapkouling(){
    wx.setClipboardData({
      data: this.data.kouling,
      success(){
        wx.showToast({
          title: '口令已复制',
        })
      }
    })
  },
})