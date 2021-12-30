// pages/activity/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    remark: '',
    error: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this._loadActivity(options.id)
  },

  onShow() {
    // this.db.collection('activity_apply_list').where({
    //   activity_id: this.data.activity._id
    // }).get().then(res=>{
    //   console.log(res)
    // })
  },

  _loadActivity(activityId) {
    this.db.collection('activity').where({_id: activityId}).get().then(res=>{
      this.setData({
        activity: res.data[0]
      })
    })
  },

apply() {
  if(this._isFormReady()) {
    wx.showLoading({
      title: '正在提交',
    })
    console.log(this.data.activity)
    const data =  {
      first_name: this.data.firstName,
      last_name: this.data.lastName,
      email: this.data.email,
      mobile: this.data.mobile,
      activity_id: this.data.activity._id,
      remark: this.data.remark
    }
    this.db.collection('activity_apply_list').add({
      data
    }).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '报名提交成功！',
      })
      wx.navigateBack({
        delta: 1,
      })
    })
  }
},

_isFormReady() {
  const children = this.selectAllComponents('.tesla-field')
  let count = 0;
  children.forEach( item => {
    if(item.isReady()){
      count++;
    }
  })

  return count === children.length;
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