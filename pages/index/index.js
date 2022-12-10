const app = getApp()
Page({
	data: {},
	auth: function(){
		wx.showLoading({
			title: '正在加载',
		})
		wx.login({
			success: function(res){
				if(res.code){
					wx.request({
				  		url: 'https://www.wzm9856.top/wxlogin',
				  		data: {
							code: res.code
						},
						success: function(res){
							app.authentication_check(res, true)
							console.log(res.data)
							if(res.data.sessionID){
								app.globalData.sessionID = res.data.sessionID
								app.globalData.info = res.data
							}
							if(res.data.status==='ok'){
								wx.setStorageSync('SESSIONID', res.data.sessionID)
								wx.redirectTo({url: '/pages/status/status'})
							}
						},
						fail: function(res){
							wx.showModal({
								title:"服务器错误",
								content:res.errMsg,
								confirmText:"好吧",
								showCancel:false
							})
						},
						complete: function(){
							wx.hideLoading();
						}
					})
				}
			}
		})
	}
})
