// components/tesla-swiper/index.js
Component({
    properties: {
        data: {
            type: Array,
            value: [],
          },
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [],
        current: 0,
    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached() {
            this.setData({list: this.properties.data})
         },

      },
    methods: {
        onSwiperChange(e) {
            const { current } = e.detail
            this.setData({
                current
            })
        },
        viewConfiguration(e) {
            const {id} = e.target.dataset
            wx.navigateTo({
              url: `/pages/product/index?id=${id}`,
            })
        },
        onBookBtnClick() {
            this.triggerEvent('on-book-btn-click')
        }
    }
})
