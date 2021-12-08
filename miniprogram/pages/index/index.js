// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        selectModelShow: false,
        products: [],
        magezine: {}
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const db = wx.cloud.database()
        db.collection('swiper')
        .get().then(res=>{
            console.log(res.data)
            this.setData({list: res.data})
        })

        db.collection('product').get().then(res=>{
            const products = res.data
            this.setData({products})
        })

        db.collection('magezine').get().then(res=>{
            const magezine = res.data[0]
            this.setData({ magezine })
        })
    },
    gotoLendersToolbox() {
        wx.navigateTo({
          url: '/pages/lenders-toolbox/index',
        })
    },
    onSwiperBookBtnClick() {
        this.setData({selectModelShow: true})
    },

    gotoVideo() {
        wx.navigateTo({
          url: '/pages/video/index',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    gotoCleanEnergy() {
        wx.navigateTo({
          url: '/pages/article/detail?id=287a53aa61af65c300edb61552f1c7ea',
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

    clickProduct(e) {
       const id = e.currentTarget.dataset.id
       wx.navigateTo({
         url: `/pages/test-drive/index?id=${id}`,
       })
       this.setData({selectModelShow: false})
    },

    clickMagazine(e) {
        const id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: `/pages/magazine/index?id=${id}`,
          })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})