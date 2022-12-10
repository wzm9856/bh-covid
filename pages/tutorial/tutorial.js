// pages/tutorial/tutorial.js
Page({
  data: {
    time: 200,
    deltatime:-1
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
  onLoad: function (options) {
    this.blink();
  },
})