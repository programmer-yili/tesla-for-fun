// pages/map/index.js

import {getCurrentLocation, qqmapsdk } from '../../utils/location.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: 0,
        longitude: 0,
        markers: [],
        allMarkers: [],
        markerClassifications: [],
        isSearching: false,
        locationResult: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { location } = getCurrentLocation()

        this.db = wx.cloud.database()
        
        this.db.collection('marker_classification').get().then(res=>{
            const markerClassifications = res.data
            this._buildMarkerClassifications(markerClassifications)
        })



        this.setData({
            latitude: location.lat,
            longitude: location.lng
        })
    },

    onClear() {
        this.setData({
            isSearching: false,
            locationResult: []
        })
        this._clearSearchMarker()
    },

    gotoLocation(e) {
        const { latitude, longitude } = e.currentTarget.dataset.location
        let markers = this.data.markers
        markers.push(                {
            id: 99999,
            width: 32,
            height: 32,
            iconPath: '../../images/Pin.png',
            latitude, 
            longitude
        })
        this.setData({markers})
        // 中心区域跳转到某个经纬度位置
        this.mapCtx.moveToLocation({
            latitude, longitude
        })

        this.setData({
            isSearching: false
        })

    },

    onSearch(e) {
        qqmapsdk.getSuggestion({
            keyword: e.detail,
            success: (res) => {
                this._buildLocationResult(res.data)
            }
        })
        this.setData({
            isSearching: true
        })
    },

    _clearSearchMarker() {
        // 清除当前marker节点
        
        let markers = this.data.markers.filter(item=>{
            return item.id !== 99999
        })

        this.setData({
            markers
        })


        // 跳回到当前用户所在地
        this.mapCtx.moveToLocation()
    },

    _buildLocationResult(originResult) {
        let locationResult = []
        originResult.forEach( item => {
            console.log(item)
            locationResult.push({
                name: item.title,
                address: item.address,
                latitude: item.location.lat,
                longitude: item.location.lng
            })
        })
        this.setData({locationResult})
    },

    _buildMarkerClassifications(originMarkerClassifications) {
        let markerClassifications = []
        originMarkerClassifications.forEach((item, index)=>{
            let markerClassification = {
                id: item._id,
                icon: item.icon,
                title: item.title,
                isActive: index === 0 ? true : false
            }
        
            markerClassifications.push(markerClassification)
        })
        this.setData({markerClassifications})
        this.db.collection('marker').get().then(res=>{
            const markers = res.data
            this._buildMarkers(markers)
        })
    },

    _buildMarkers(originMarkers) {
        let markers = []
        originMarkers.forEach((item, index)=>{
            let marker = {
                id: index,
                _id: item._id,
                latitude: item.latitude,
                longitude: item.longitude,
                width: 50,
                height: 50,
                iconPath: this._getMarkerIconPath(item.classificationId),
                title: item.name,
                classificationId: item.classificationId
            }
        
            markers.push(marker)
        })

        this.setData({ allMarkers: markers })
        this._filterMakers()
    },

    onMarkerTap(e) {
        const {markerId} = e.detail
        wx.navigateTo({
          url: `/pages/map/location?id=${this.data.allMarkers[markerId]['_id']}`,
        })
    },

    _filterMakers() {
        this._findCurrentActiveClassificationIds()

        const markers = this.data.allMarkers.filter(item=>{
            return this._findCurrentActiveClassificationIds().includes(item.classificationId)
        })
        this.setData({markers})
    },

    _findCurrentActiveClassificationIds() {
        let ids = []
        this.data.markerClassifications.forEach(item=>{
           item.isActive === false || ids.push(item.id)
        })
        return ids;
    },

    _getMarkerIconPath(classificationId) {
       
        const result = this.data.markerClassifications.filter(item=>{
            return item.id === classificationId
        })
        return result[0]['icon']
    },

    onMarkerClassificationTap(e) {
        const {id} = e.currentTarget.dataset
        let markerClassifications = this.data.markerClassifications
        this.data.markerClassifications.forEach((item, index)=>{
            
            if(item.id === id) {
                markerClassifications[index].isActive = !markerClassifications[index].isActive
            }
        })

        this.setData({
            markerClassifications
        })

        this._filterMakers()


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
        this.mapCtx.moveToLocation()
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

    },
    onCurrentLocationClick() {
        this.mapCtx.moveToLocation()
        this._clearSearchMarker()
    }
})