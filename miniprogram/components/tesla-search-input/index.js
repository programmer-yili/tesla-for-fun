// components/tesla-search-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        isClearable: false,
        value: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onInput(e) {
            let isClearable = false;
            const {value} = e.detail
            if(value !== '') {
                isClearable = true
            }

            this.setData({
                isClearable
            })
        },
        onClear() {
            this.setData({
                isClearable: false,
                value: ''
            })
            this.triggerEvent('clear')
        },
        onConfirm(e) {
            const { value } = e.detail
            this.triggerEvent('confirm', value)
        }
    }
})
