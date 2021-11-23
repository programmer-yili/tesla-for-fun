// components/tesla-picker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        labelKey: {
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
            value: [],
            observer() {
                this.buildOptionList()
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
        index: 0,
        optionList: []
    },

    lifetimes: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        buildOptionList() {
            let optionList = []
            const labelKey = this.properties.labelKey


            labelKey ? this.properties.options.forEach(item=>{
                 optionList.push(item[labelKey])
            }) : optionList = this.properties.options

            const index = optionList.indexOf(this.properties.value)
            this.setData({
                optionList,index

            })
        },
        initValue(value) {
            let index = this.properties.optionList.indexOf(value)
            this.setData({
                value,
                index
            })
        },
        onChange(e) {
            const value = this.properties.optionList[e.detail.value]
            this.setData({
                value
            })
            this.triggerEvent('change', {value, index: e.detail.value})
        }
    }
})
