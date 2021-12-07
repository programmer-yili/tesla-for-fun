// pages/article/detail.js
import { formatDate } from '../../utils/time.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this._loadData(options.id)
  },

  _loadData(id) {
    this.db.collection('article').where({_id: id}).get().then(res=>{
      let article = res.data[0]
      article.content = article.content ? article.content.replace(/<img/g, '<img style="max-width: 100%;"') : article.content
      article.create_time = formatDate(new Date(article.create_time))

      article.hit_num = (article.hit_num === null) ? 0 : ++article.hit_num 

      this._updateHitNum(article._id, article.hit_num)
      this.setData({
        article
      })
    })
  },

  _updateHitNum(id, hitNum) {
    this.db.collection('article').doc(id).update({
      data: {
        'hit_num': hitNum
      }
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