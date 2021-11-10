import { qqmapsdk } from '../../utils/location.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        address: '',
        classification: '',
        timeInfo: '',
        chargingInfo: '',
        phoneInfo: [],
        distance: '',
        latitude: 0,
        longitude: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()
        
        this.db.collection('marker').where({_id: options.id}).get().then(res=>{
            const { latitude, longitude } = res.data[0]
            this.setData(
                {latitude, longitude}
            )
            this._buildLocationModal(res.data[0])
        })
    },

    makePhoneCall(e) {
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phoneNumber,
        })
    },


    onNavigationTap() {
        wx.openLocation({
          latitude: parseFloat(this.data.latitude),
          longitude: parseFloat(this.data.longitude),
          name: this.data.name,
          address: this.data.address,
          fail: (error) => {
              console.log(error)
          }
        })
    },

    _buildLocationModal(originData){
        this.setData({
            name: originData.name,
            timeInfo: originData.time_info,
            chargingInfo: originData.charging_info,
            phoneInfo: originData.phone_info,
        })

        this._buildLocationAddress(originData.latitude, originData.longitude)
        this._buildLocationDistance(originData.latitude, originData.longitude)
        this._buildClassification(originData.classificationId)
    },

    _buildLocationAddress(latitude, longitude) {
        qqmapsdk.reverseGeocoder({
            location: {latitude, longitude},
            success: (res) => {
               this.setData({
                   address: res.result.formatted_addresses.recommend
               })
            }
          })
    },

    _buildClassification(classificationId) {
        this.db.collection('marker_classification').where({_id: classificationId}).get().then(res=>{
            this.setData({
                classification: res.data[0].title
            })
        })
    },
    _buildLocationDistance(latitude, longitude) {
        qqmapsdk.calculateDistance({
            from: '',
            to: [{latitude, longitude}], //终点坐标
            success: (res) => {//成功后的回调
              this.setData({
                  distance: `${this._toDecimal(res.result.elements[0].distance/1000)} KM`
              })
            }
        });
},

       _toDecimal(x) {   
            var f = parseFloat(x);   
               if (isNaN(f)) {   
                return;   
               }   
            f = Math.round(x*100)/100;   
            return f;   
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