// pages/test-drive/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      currentProduct: null,
      provinces: ['浙江', '陕西', '江苏', '新疆', '江西', '广东', '安徽'],
      cities: ['杭州', '西安', '南京', '乌鲁木齐', '南昌', '广州', '合肥'],
      city: 0,
      province: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '预约试乘试驾'
          })
          wx.setBackgroundColor({
            backgroundColor: '#f7f7f7',
          })
          const db = wx.cloud.database()
          db.collection('product').where({ '_id': options.id})
          .get().then(res=>{
              const data = res.data
              this.setData({currentProduct: data[0]})
          })
    },

    bindProvinceChange: function(e) {

      this.setData({
        province: e.detail.value
      })
    },

    bindCityChange: function(e) {

      this.setData({
        city: e.detail.value
      })
    },

    onInput(e) {
      if(e.detail.value === '') {
        console.log('error', '必填字段')
      }
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