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
            value: ''
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
        attached() {
            this.setData({
                value: this.properties.defaultValue
            })
        }
        },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e) {
            const value = this.properties.options[e.detail.value]
            this.setData({
                value
            })
            this.triggerEvent('change', {value})
        }
    }
})
