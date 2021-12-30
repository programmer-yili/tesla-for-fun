// pages/article/channel.js
import { formatDate } from '../../utils/time.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel: null,
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this.db.collection('channel').doc(options.id).get().then(res=>{
      let channel = res.data
      this.db.collection('article').where({
        channel: channel._id
      }).get().then(res2=>{
        let articleList = res2.data

        articleList.forEach((item,index) => {
          articleList[index].create_time = formatDate(new Date(item.create_time))
        })

        this.setData({
          channel, articleList
        })
      })
    })
  },

  navigatePage(e) {
    const { targetId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/article/detail?id=${targetId}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})