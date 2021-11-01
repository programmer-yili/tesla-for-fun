// pages/test-drive/index.js


import {getCurrentLocation, getProvincesAndCitiesTree} from '../../utils/location.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      currentProduct: null,
      provincesAndCitiesTree: [],
      cities: [],
      city: '',
      province: '',
      currentProvinceIndex: 0,
      currentCityIndex: 0
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

          const { city, province}  = getCurrentLocation()

          const provincesAndCitiesTree = getProvincesAndCitiesTree()

          const currentProvinceAndCities = provincesAndCitiesTree.filter(item=>{
              return item.fullname === province
          })

          let currentProvinceIndex = 0;
          provincesAndCitiesTree.forEach((item,index) => {
            if(item.fullname === province) {
              currentProvinceIndex = index;
            }
          })

          const cities = currentProvinceAndCities[0].children
          let currentCityIndex = 0;
          cities.forEach((item,index) => {
            if(item.fullname === city) {
              currentCityIndex = index;
            }
          })



          this.setData({
            city,
            province,
            currentProvinceIndex,
            cities,
            currentCityIndex,
            provincesAndCitiesTree
          })

    },

    bindProvinceChange: function(e) {
      const index = e.detail.value
      const currentProvinceAndCities =  this.data.provincesAndCitiesTree[index]
      this.setData({
        province: currentProvinceAndCities.fullname,
        city: currentProvinceAndCities.children[0].fullname,
        cities: currentProvinceAndCities.children,
        currentProvinceIndex: index,
        currentCityIndex: 0
      })
    },

    bindCityChange: function(e) {
      const index = e.detail.value

      this.setData({
        city: this.data.cities[index].fullname,
        currentCityIndex: index,
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