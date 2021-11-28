// pages/video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryAreaWidth: '',
        uri: '',
        title: '',
        currentCarModel: '',
        categories: [],
        currentSubCategoryIndex: '',
        videoList: [],
        videoTree: {},
        showCarModelSelection: false,
        actions: [],
        allCategories: [],
        categoryDisplay: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()



        // 车型数据
        
        this.db.collection('car-model').get().then(response1=>{
           let carModels = response1.data
           this.db.collection('car-model-category').get().then(response2=>{
               let allCategories = response2.data
               this.db.collection('video').get().then(response3=>{
                   let videoList = response3.data
                   this.setData({carModels, allCategories, videoList})
                   this._initActions();
                   this._changeCarModel()
                   this._buildVideoTree()
                   this._buildCategoriesDisplay()
               })
           })
        })

    },

    _buildCategoriesDisplay() {

    },
    _buildVideoTree(index = 0) {
        let videoTree = {}
        let categories = {}
        const currenModel = this.data.carModels[index]
        let video = null
        this.data.videoList.forEach(item=>{
            if(item['car_model'] === currenModel._id) {

             if (!video) {
                 video = item
             }

            const key = `sub-category-${item.category}`
            if (videoTree.hasOwnProperty(key)) {
                videoTree[key].push(item)

            } else {
                videoTree[key] = [item]
                categories[key] = this.data.allCategories.filter(result=> {
                    return result._id === item.category
                })[0]
            }
        }
        })

        

        const categoryDisplay = Object.keys(categories).length > 1
        this.setData({videoTree,categories, categoryDisplay, title: video.title, 
            uri: video.media_uri
        })
    },
    _initActions() {
        let actions = []
        this.data.carModels.forEach(item=>{
            actions.push({
                name: item.title
            })
        })
        this.setData({actions})
    },
    _changeCarModel(index = 0){
        const currentCarModel = this.data.carModels[index].title
        const currentObject = this.data.carModels[index]
        let categories = []
        !currentObject.categories || (categories=currentObject.categories)


        categories = this.data.allCategories.filter(item=>{
            return categories.includes(item._id)
        })

        this.setData({currentCarModel})
    },

    onCarModelTap() {
        this.setData({
            showCarModelSelection: true
        })
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
            res[0].forEach(item => {
                width += item.width
            })
            count = res[0].length
            width = width + (count - 1) * 33
            this.setData({
                categoryAreaWidth: `${width}px`
            })
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    play(e) {
        const {video} = e.currentTarget.dataset
        this.setData({
            uri: video.media_uri,
            title: video.title
        })
    },
    onShow: function () {

    },

    onClose() {
        this.setData({
            showCarModelSelection: false
        })
    },

    onSelect(e) {
        const index = this.data.carModels.findIndex(item=>{
            return item.title === e.detail.name
        })
        
        this._changeCarModel(index)
        this._buildVideoTree(index)
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