// pages/activity/index.js
const citySelector = requirePlugin('citySelector');
import {getCurrentLocation } from '../../utils/location.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            '../../images/tesla.jpeg',
            '../../images/tesla.jpeg',
            '../../images/tesla.jpeg'
        ],
        current: 0,
        currentCity: '',
        activities: [],
        recommendActivities: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { city }  = getCurrentLocation()
        this.setData({
            currentCity: city
        })

        this.db = wx.cloud.database()
    },

    _loadCurrentCityLatestActivities() {
        this.db.collection('activity').orderBy('created_time', 'desc').where({city: this.data.currentCity}).get().then(res=>{
            let activities = []
            res.data.forEach((item)=>{
                console.log(item)
                item.status = this._getActivityStatus(item)
                item['start_time'] = this.formatDate(item['start_time'])
                item['end_time'] = this.formatDate(item['end_time'])
            
                activities.push(item)
            })

            this.setData({
                activities
            })
        })
    },

    _getActivityStatus(activity) {
        const now = new Date()
        return (activity['end_time'] <= now  && activity['start_time'] >= now)? 'signing-up' : 'signing-end'
    },

    formatDate(date) {
        console.log(date)
        console.log(date.getMonth())
        return `${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
   },
    _loadCurrentCityRecommendActivities() {
        this.db.collection('activity').orderBy('created_time', 'desc').where({city: this.data.currentCity, recommend: true}).get().then(res=>{
            console.log(res)
            this.setData({
                recommendActivities: res.data
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
        const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
        if(selectedCity) {
            this.setData({
                currentCity: selectedCity.fullname
            })
        }

        this._loadCurrentCityLatestActivities()
        this._loadCurrentCityRecommendActivities()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    onSwiperChange(e) {
        const {current} = e.detail
        this.setData({current})
    },

    onTapSwitchLocation() {
        const key = 'XGBBZ-HYV6W-MJ3RA-OHQCA-FGNYS-2WFW4'; // 使用在腾讯位置服务申请的key
        const referer = '程序猿依力'; // 调用插件的app的名称
        wx.navigateTo({
        url: `plugin://citySelector/index?key=${key}&referer=${referer}`,
        })
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