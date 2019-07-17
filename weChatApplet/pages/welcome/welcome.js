Page({
  onTap:function(){
    // wx.navigateTo({
    //   url: '../posts/posts',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    wx.switchTab({
      url: '../posts/posts'
    })
  }
})