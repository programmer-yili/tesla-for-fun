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
        index: 0
    },

    lifetimes: {
        },

    /**
     * 组件的方法列表
     */
    methods: {
        initValue(value) {
            let index = this.properties.options.indexOf(value)
            this.setData({
                value,
                index
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
