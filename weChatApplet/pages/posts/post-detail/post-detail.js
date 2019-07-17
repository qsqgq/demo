var postsData = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    var postsCollected=wx.getStorageSync('postsCollected')
    if (postsCollected){
      var postCollected=postsCollected[postId]
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('postsCollected', postsCollected)
    }
  },
  onColletionTap:function(){
    var postsCollected = wx.getStorageSync('postsCollected');
    var collected = postsCollected[this.data.currentPostId];
    collected = !collected;
    postsCollected[this.data.currentPostId] = collected;
    wx.setStorageSync('postsCollected', postsCollected);
    this.setData({
      collected
    });
    wx.showToast({
      title: collected?'收藏成功':'取消成功',
      duration:1000,
      icon:'success'
    })
    // var that = this;
    // var postsCollected = wx.getStorageSync('postsCollected');
    // var collected = postsCollected[this.data.currentPostId];
    // wx.showModal({
    //   content: collected?'是否取消收藏':'是否收藏',
    //   success:function(res){
    //     if(res.confirm){
    //       collected = !collected;
    //       postsCollected[that.data.currentPostId] = collected;
    //       wx.setStorageSync('postsCollected', postsCollected);
    //       that.setData({
    //         collected
    //       });
    //     }
    //     }
    // })
  },
  onShareTap:function(){
    console.log(1);
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈', '分享到QQ','分享到微博'],
      itemColor:'#4b556c',
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})