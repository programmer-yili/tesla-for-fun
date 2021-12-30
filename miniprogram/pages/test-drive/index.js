// pages/test-drive/index.js


import {getCurrentLocation, getProvincesAndCitiesTree} from '../../utils/location.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      currentProductId: null,
      provincesAndCitiesTree: [],
      cities: [],
      currentProvinceIndex: 0,
      currentCityIndex: 0
    },

    getPhoneNumber(e) {
      const cloudId = e.detail.cloudID
      wx.cloud.callFunction({
        name: 'get-phone-number',
        data: {
          weRunData: wx.cloud.CloudID(cloudId), // 这个 CloudID 值到云函数端会被替换
        }
      }).then(res=>{
        this.setData({
          phone: res.result
        })
      })
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
            provincesAndCitiesTree,
            currentProductId: options.id
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
    onSubmit() {
      if(this._isFormReady()) {
        this._handleSubmit();
      }
    },
    _handleSubmit() {
      wx.showLoading({
        title: '正在提交',
      })
      const db = wx.cloud.database()
      const data =  {
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phone: this.data.phone,
        province: this.data.province,
        city: this.data.city,
        status: 'TO_DO',
        product: this.data.currentProductId
      }
      db.collection('test_drive').add({
        data
      }).then(res=>{
        wx.hideLoading();
        this._showSuccess()
      })
    },

    _showSuccess() {
      wx.showModal({
        title: '预约成功',
        content: '感谢您提交Tesla试驾请求。我们的工作人员会及时跟您电话联系',
        showCancel: false,
        success () {
          wx.navigateBack({
            delta: 0,
          })
        }
      })
    },
    _isFormReady() {
      const children = this.selectAllComponents('.tesla-input')
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