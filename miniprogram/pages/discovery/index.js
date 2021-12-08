// pages/discovery/index.js
import { formatDate } from '../../utils/time.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    swiperList: [],
    recommendPageShow: false,
    pageIndex: 0,
    pages: ['推荐', '支持'],
    articleList: [],
    recommendArticleList: []
  },

  navigatePage(e) {
    const { targetId, type } = e.currentTarget.dataset
    type === 'article' ? wx.navigateTo({
      url: `/pages/article/detail?id=${targetId}`,
    }) : wx.navigateTo({
      url: `/pages/article/channel?id=${targetId}`,
    })
  },
  onPageChange(e) {
    this.setData({
      pageIndex: e.detail.index
    })
    this._loadData()
  },

  onSwiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this._loadData()
  },

  _loadData() {
    this.data.pageIndex === 0 ? this._loadArticlePageData() : this._loadChannelPageData()
  },

  _loadArticlePageData() {
    this.setData({
      channelList: []
    })
    this.db.collection('article').orderBy('create_time', 'desc').get().then(res=>{
      let articleList = res.data

      articleList.forEach((item,index) => {
        articleList[index].create_time = formatDate(new Date(item.create_time))
      })
      this.setData({
        articleList
      })
    })
    this.db.collection('article').orderBy('create_time', 'desc').where({recommend: true}).get().then(res=>{
      this.setData({
        swiperList: res.data
      })
    })
  },

  _loadChannelPageData() {
    this.setData({
      articleList: []
    })
    this.db.collection('channel').orderBy('created_time', 'desc').get().then(res=>{
      this.setData({
        channelList: res.data
      })
    })
    this.db.collection('channel').orderBy('created_time', 'desc').where({recommend: true}).get().then(res=>{
      this.setData({
        swiperList: res.data
      })
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