// pages/video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryAreaWidth: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const query = wx.createSelectorQuery()
        query.selectAll('.category').boundingClientRect()
        query.selectViewport().scrollOffset()
        let count = 0
        query.exec((res) => {
            let width = 0
            res[0].forEach(item=>{
                width+=item.width
            })
            count = res[0].length
            width = width + (count - 1) * 33
            this.setData({categoryAreaWidth: `${width}px` })
        })
        
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