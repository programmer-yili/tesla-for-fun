// pages/video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryAreaWidth: '',
        uri: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        title: '视频标题',
        currentCarModel: '',
        categories: ['后视镜', '灯光', '轮胎', '后视镜', '灯光', '轮胎', '后视镜', '灯光', '轮胎'],
        currentSubCategoryIndex: 0,
        videoList: [{
            id: 7,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 1
        },
        {
            id: 4,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 2
        },
        {
            id: 6,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 1
        },
        {
            id: 5,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 2
        },

        {
            id: 3,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 2
        }, {
            id: 2,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 2
        }, {
            id: 1,
            title: '视频标题2',
            cover: '../../images/tesla.png',
            subCategoryId: 3
        }
        ],
        videoTree: {},
        showCarModelSelection: false,
        actions: [],
        allCategories: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.db = wx.cloud.database()

        let videoTree = {}
        this.data.videoList.forEach(item=>{
            const key = `sub-category-${item.subCategoryId}`
            videoTree.hasOwnProperty(key) ? videoTree[key].push(item) : videoTree[key] = [item]
        })
        this.setData({videoTree})

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
               })
           })
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

        console.log(categories)

        categories = this.data.allCategories.filter(item=>{
            return categories.includes(item._id)
        })

        this.setData({currentCarModel, categories})
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