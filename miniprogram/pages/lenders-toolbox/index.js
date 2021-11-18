// pages/lenders-toolbox/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: 'Model3',
        products: ['Model3', 'Model Y', 'Model S'],
        productLine: '高性能版',
        productLines: ['高性能版', '标准续航版'],
        price: 0,
        priceList: [],
        financePlan: '合作贷款机构',
        financePlans: ['合作贷款机构', '官方租聘机构'],
        financeProduct: '标准贷款',
        financeProducts: ['标准贷款'],
        periodsOptions: ['12期', '24期'],
        periods: '12期',
        rate: 15,
        annualizedRate: '4.00',
        isCollapse: false,
        originProductData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()
        this._loadProducts()
    },
    _loadProducts() {
        this.db.collection('product')
        .get().then(res=>{
            let products = []
            const index = 0

            res.data.forEach(item=>{
                products.push(item.name)
            })

            this.setData({
                originProductData: res.data,
                products,
                product: products[index]
            })

            this.changeProduct(index)

        })
    },
    onProductSelected(e) {
        this.changeProduct(e.detail.index)
    },
    onProductLineSelected(e) {
        this.changeProductLine(e.detail.index)
    },
    changeProductLine(index) {
        this.setData({
            productLine: this.data.productLines[index],
            price: this.data.priceList[index]
        })
    },
    changeProduct(index) {
        let currentProduct = this.data.originProductData[index]
        let productLines = []
        let priceList = []
        currentProduct.productLine.forEach(item=>{
            productLines.push(item.title)
            priceList.push(item.price)
        })
        this.setData({
            productLines,
            productLine: productLines[0],
            priceList,
            price: priceList[0],
            currentProductImage: currentProduct.carPic
        })
    },

    toggleCollapse() {
        this.setData({isCollapse: !this.data.isCollapse})
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

    onChange(e) {
        let form = this.data.form
        form.productType = e.detail.value
        this.setData({form})
    },

    onSelectionChange(e) {
        console.log(e.detail)
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