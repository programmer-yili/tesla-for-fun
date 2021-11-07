// pages/map/index.js

import {getCurrentLocation } from '../../utils/location.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: 0,
        longitude: 0,
        markers: [
            {latitude:30.134421, longitude: 120.267726, iconPath: '../../images/map/超充.png', width: 50, height: 50 }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { location } = getCurrentLocation()
        this.setData({
            latitude: location.lat,
            longitude: location.lng
        })
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
    }
})