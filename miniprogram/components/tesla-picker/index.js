// components/tesla-picker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        label: {
            type: String,
            value: ''
        },
        defaultValue: {
            type: String | Number,
            value: '',
            observer(newValue, oldValue) {
                console.log(1)
                console.log(newValue)
                this.initValue(newValue)
            }
        },
        options: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
    },

    lifetimes: {
        },

    /**
     * 组件的方法列表
     */
    methods: {
        initValue(value) {
            this.setData({
                value
            })
        },
        onChange(e) {
            const value = this.properties.options[e.detail.value]
            this.setData({
                value
            })
            this.triggerEvent('change', {value, index: e.detail.value})
        }
    }
})
