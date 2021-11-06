// components/tesla-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        required: {
            type: Boolean,
            value: false
        },
        label: {
            type: String,
            value: ''
        },
        value: {
            type: String|Number,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isError: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onInput() {
            this.checkError()
        },
        checkError() {
            let isError = false;
            if(this.properties.required) {
                if(this.properties.value === '') {
                    isError = true
                }
            }
            this.setData({isError})
        },
        isReady() {
            this.checkError()
            return !this.data.isError;
        }
    }
})
