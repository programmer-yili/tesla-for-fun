// pages/activity/index.js
const citySelector = requirePlugin('citySelector');
import {getCurrentLocation } from '../../utils/location.js'

import {formatDate} from '../../utils/time.js'
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
        recommendActivities: [],
        loading: false,
        count: 0,
        limit: 5,
        total: 0,
        noMore: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()

        const { city }  = getCurrentLocation()
        this.setData({
            currentCity: city
        })

    },

    _loadCurrentCityLatestActivities() {
        if (this.data.count !== 0 && this.data.count === this.data.total) {
            this.setData({
                noMore: true
            })
            return;
        }
        this.setData({
            loading: true
        })
        this.db.collection('activity').orderBy('created_time', 'desc')
        .skip(this.data.count)
        .limit(this.data.limit).where({city: this.data.currentCity}).get().then(res=>{
            let activities = this.data.activities
            res.data.forEach((item)=>{
                // item.status = this._getActivityStatus(item)
                item['formated_start_time'] = formatDate(item['start_time'])
                item['formated_end_time'] = formatDate(item['end_time'])
                activities.push(item)
            })
            const count = activities.length
            this.setData({
                activities, loading: false, count
            })
            this._updateActivityStatus()
        })
    },

    _updateActivityStatus() {
        this.data.activities.forEach((item, index)=>{
            this._setActivityStatus(item, index)
        })
    },

    _setActivityStatus(item, index) {
        const now = new Date()
        console.log(now)
        console.log(item['end_time'])


        let status = (item['end_time'] >= now  && item['start_time'] <= now)? 'signing-up' : 'signing-end'

        this.db.collection('activity_apply_list').where({
            activity_id: item._id 
        }).get().then(res=>{

            if(res.data.length !== 0) {
                status = 'signed'
            }

            const currentKey = `activities[${index}].status`
            this.setData({
                [currentKey]: status
            })
        })


    },


    _loadCurrentCityRecommendActivities() {
        this.db.collection('activity').orderBy('created_time', 'desc').where({city: this.data.currentCity, recommend: true}).get().then(res=>{
            this.setData({
                recommendActivities: res.data
            })
        })
    },

    goToDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
          url: `/pages/activity/detail?id=${id}`,
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

        this._loadCurrentCityActivitiesCount()
        this._loadCurrentCityLatestActivities()
        this._loadCurrentCityRecommendActivities()
    },

    _loadCurrentCityActivitiesCount() {
        this.db.collection('activity').where({city: this.data.currentCity}).count().then(res=>{
            this.setData({
                total: res.total
            })
        })
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
        this._loadCurrentCityLatestActivities()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})