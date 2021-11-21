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
        financePlans: [],
        financeProduct: '标准贷款',
        financeProducts: ['标准贷款'],
        periodsOptions: ['12期', '24期'],
        periods: '12期',
        rate: 15,
        annualizedRateList: [],
        annualizedRate: '4.00',
        isCollapse: false,
        originProductData: [],
        downPayment: 0,
        loan: 0
    },

    onRateInput(e) {
        this.setData({
            rate: e.detail.value
        })
        this._compute()
    },

    _compute() {
        let downPayment = this.data.price * (this.data.rate / 100)
        let loan = this.data.price - downPayment
        let mountlyPayment = (Number.parseFloat(loan) * (1+this.data.annualizedRate/100) ) / Number.parseFloat(this.data.periods)
        
        mountlyPayment = Number.parseInt(mountlyPayment * 100) / 100
        this.setData({
            downPayment: downPayment.toLocaleString(),
            loan: loan.toLocaleString(),
            mountlyPayment: mountlyPayment.toLocaleString()
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()
        this._loadProducts()
        this._loadFinancePlans()
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
    _loadFinancePlans() {
        this.db.collection('finance_plan')
        .get().then(res=>{
            this._processFinancePlanOriginData(res.data)
        })
    },
    _processFinancePlanOriginData(originData) {
        let financePlans = []
        originData.forEach(item=>{
            financePlans.push(item.name)
        })
        this.setData({
            financePlans,
            originData
        })
        this._changeFinancePlan()

    },
    _changeFinancePlan(index = 0) {
        let financeProducts = []
        this.data.originData[index].product.forEach(item=>{
            financeProducts.push(item.name)
        })
        const currentProducts = this.data.originData[index].product

        this.setData({
            financeProducts,
            currentProducts
        })
        this._changeFinanceProduct()
    },
    _changeFinanceProduct(index = 0) {
        const financeProduct = this.data.currentProducts[index].name
        let periodsOptions = this.data.currentProducts[index].periodsOptions
        let annualizedRateList = this.data.currentProducts[index].rate
        this.setData({
            periodsOptions,
            financeProduct,
            annualizedRateList
        })
        this._changePeriods()
    },
    _changePeriods(index = 0) {
        let periods = this.data.periodsOptions[index]
        let annualizedRate = this.data.annualizedRateList[index]
        this.setData({
            periods,
            annualizedRate
        })
        this._compute()

    },
    onPeriodsChange(e) {
        const {index} = e.detail
        this._changePeriods(index)
    },
    onFinanceProductChange(e) {
        const {index} = e.detail
        this._changeFinanceProduct(index)
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

        this._compute()
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

    onFinancePlanChange(e) {
        const { index } = e.detail
        this._changeFinancePlan(index)
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