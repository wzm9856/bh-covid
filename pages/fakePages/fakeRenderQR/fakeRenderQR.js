// pages/fakePages/fakeRenderQR/fakeRenderQR.js
const app = getApp()
Page({
    data: {
        name:'王子铭',
        id:'SY2017327',
        grade:'20',
        time:'2021-09-22 10:11:57',
        gatenum: 0,
        dirnum: 0,
        gate:'学院路校区-新东门',
        direction:'（进）',
        gateString: '',
        hiddenStatus: 0,
        titletapped: 0,
        qrtapped: 1,
        openCardVisible: true
    },
    setAll: function(doorid, pageins){
        // if(doorid==='2265') pageins.setData({gate: '学院路校区-新东门',direction: '进'})
        // else if(doorid==='2266') pageins.setData({gate: '学院路校区-新东门',direction: '出'})
        // else if(doorid==='2267') pageins.setData({gate: '学院路校区-南二门',direction: '进'})
        // else if(doorid==='2268') pageins.setData({gate: '学院路校区-南二门',direction: '出'})
        // else if(doorid==='2269') pageins.setData({gate: '学院路校区-北门',direction: '出'})
        // else if(doorid==='2270') pageins.setData({gate: '学院路校区-北门',direction: '进'})
        // else if(doorid==='2271') pageins.setData({gate: '沙河校区-东门',direction: '进'})
        // else if(doorid==='2272') pageins.setData({gate: '沙河校区-东门',direction: '出'})
        // else if(doorid==='2273') pageins.setData({gate: '学院路校区-大运村北门',direction: '出'})
        // else if(doorid==='2274') pageins.setData({gate: '学院路校区-大运村北门',direction: '进'})
        // else pageins.setData({gate: '学院路校区-南门',direction: '出'})
        console.log(doorid);
        this.setData({gatenum: doorid});
        this.setDirection(doorid, pageins);
        this.setDoor(doorid, pageins);
    },
    setDoor: function(doorid, pageins) {
        var doordict = {
            0:'学院路校区-南门',
            1:'学院路校区-南三门',
            2:'学院路校区-新东门',
            3:'学院路校区-南二门',
            4:'学院路校区-北门',
            5:'学院路校区-大运村北门',
            6:'沙河校区-东门',
            2265:'学院路校区-新东门',
            2266:'学院路校区-新东门',
            2267:'学院路校区-南二门',
            2268:'学院路校区-南二门',
            2269:'学院路校区-北门',
            2270:'学院路校区-北门',
            2271:'沙河校区-东门',
            2272:'沙河校区-东门',
            2273:'学院路校区-大运村北门',
            2274:'学院路校区-大运村北门'
        }
        if(doorid === 0){
            doorid = 0;
            pageins.setData({gatenum: 0});
        }
        pageins.setData({gate:doordict[doorid]});
    },
    setDirection: function (doorid, pageins) {
        // 0号门也是进门
        var indoor = [2265,2267,2270,2271,2274,0];
        if(indoor.indexOf(doorid)===-1){
            pageins.setData({direction:'（出）'})
        }else{
            pageins.setData({direction:'（进）'})
        }
    },
    onLoad(e){
        if (wx.canIUse('hideHomeButton')) {
            wx.hideHomeButton()
        }
        var pageins = this;
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth()+1)>9?(date.getMonth()+1):('0'+(date.getMonth()+1));
        var D = date.getDate()>9?date.getDate():('0'+date.getDate());
        var h = date.getHours()>9?date.getHours():('0'+date.getHours());
        var m = date.getMinutes()>9?date.getMinutes():('0'+date.getMinutes());
        var s = date.getSeconds()>9?date.getSeconds():('0'+date.getSeconds());
        var time = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
        this.setData({
            name: app.globalData.info.name,
            id: app.globalData.info.stuID,
            grade: app.globalData.info.stuID.substr(2,2),
            time: time,
        });
        wx.scanCode({
            success (res) {
                console.log(res);
                if(res.scanType === 'WX_CODE'){
                    if(res.rawData === "a2EyYno3SDBRamJBfixOV0t0TDg5Vno4cE83KWI6IVFZ"){
                        pageins.setData({gateString: "1号临时通道出（校园南路11公寓南侧）", gate: "", direction: ""});
                    }
                    else if(res.rawData === "azUydnhGRU5Sa0VzfitfKlVNTiQjVyEqQzNOdnVrY01w"){
                        pageins.setData({gateString: "1号临时通道进（校园南路11公寓南侧）", gate: "", direction: ""});
                    }
                    else if(res.rawData === "a1p5cFkxVUdLd184flVDcVE7RGlZMVMvQmRTfmk7KzpM"){
                        pageins.setData({gateString: "大运村出校", gate: "", direction: ""});
                    }
                    else if(res.rawData === "azRXa0lJYUY3ak1Bfi5aRTZuQlQvdXl4R2Z3clZGRkEj"){
                        pageins.setData({gateString: "大运村入校", gate: "", direction: ""});
                    }
                    else if(res.rawData === "a1pFSUdNSW1JWjVZfiNrb3hQOEkmLDZvN3UtKFJKVDpx"){
                        pageins.setData({gateString: "3号临时通道进（校园北路思源楼东北角）", gate: "", direction: ""});
                    }
                    else if(res.rawData === "a3JySHRySy1uM1owfjdQZEopQkFjZS9IS09Zdktab0JR"){
                        pageins.setData({gateString: "3号临时通道出（校园北路思源楼东北角）", gate: "", direction: ""});
                    }
                    else{
                        pageins.setData({gateString: "1号临时通道出（校园南路11公寓南侧）", gate: "", direction: ""});
                    }
                }
                else{
                    var doorid = res.result.match( new RegExp('door_id=(.*)'));
                    if(doorid === null) doorid = 0;
                    else doorid = parseInt(doorid[1]);
                    pageins.setAll(doorid, pageins);
                }
                pageins.setData({hiddenStatus: 1})
                wx.setNavigationBarTitle({title: '通行码'})
                setTimeout(()=>{pageins.setData({hiddenStatus: 2})},1000)
            }
        });
    },
    changeGate: function (e) {
        if(this.data.gatenum>=6){
            this.setData({gatenum: 0});
            this.setDoor(this.data.gatenum,this);
        }else{
            this.setData({gatenum: this.data.gatenum+1});
            this.setDoor(this.data.gatenum,this);
        }
    },
    changeDir: function (e) {
        if(this.data.direction==='（进）') this.setData({direction: '（出）'})
        else this.setData({direction: '（进）'})
    },
    taptitle: function (e) {
        var num = this.data.titletapped;
        if(num==2) wx.redirectTo({url: '/pages/fakePages/fakeIntro/fakeIntro',})
        else this.setData({titletapped: num+1}); 
    },
    tapqr: function (e) {
        var num = this.data.qrtapped;
        this.setData({qrtapped: num+1});
    },
    tapOpenGreenCard: function (e){
        wx.redirectTo({
          url: '/pages/fakePages/fakeCard/fakeCard',
        })
    }
})