// pages/activity/detail.js
import { formatDate } from '../../utils/time.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    activityCurrentUserApplication: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    const {id} = options
    this._loadData(id)
    this.db.collection('activity_apply_list').where({
      activity_id: id
    }).get().then(res=>{
      if(res.data[0]) {
        this.setData({
          activityCurrentUserApplication: res.data[0]
        })
      }
    })
  },
  onShow() {
  },


  _loadData(id) {
    this.db.collection('activity').where({_id: id}).get().then(res=>{
      let activity = res.data[0]
      // activity.status = this._getActivityStatus(activity)
      console.log('status', activity)
      activity.description = activity.description ? activity.description.replace(/<img/g, '<img style="max-width: 100%;"') : activity.description
      activity['formated_start_time'] = formatDate(activity['start_time'])
      activity['formated_end_time'] = formatDate(activity['end_time'])

      this.setData({
        activity
      })
      this._setActivityStatus(activity)
    })


  },

  _setActivityStatus(item) {
    const now = new Date()

    let status = (item['end_time'] >= now  && item['start_time'] <= now)? 'signing-up' : 'signing-end'

    this.db.collection('activity_apply_list').where({
        activity_id: item._id 
    }).get().then(res=>{

        if(res.data.length !== 0) {
            status = 'signed'
        }

        const currentKey = `activity.status`
        this.setData({
            [currentKey]: status
        })
    })


},

  // Todo: 修复报名状态方法
  _getActivityStatus(activity) {
    if(this.data.activityCurrentUserApplication) {

      return 'signed'
    }
    const now = new Date()
    return (activity['end_time'] <= now  && activity['start_time'] >= now)? 'signing-up' : 'signing-end'
},
  apply(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/activity/apply?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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