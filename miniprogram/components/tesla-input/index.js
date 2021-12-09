// components/tesla-input/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
      },
    properties: {
        required: {
            type: Boolean,
            value: false
        },
        rules: {
            type: Array,
            value: []
        },
        label: {
            type: String,
            value: ''
        },
        value: {
            type: String|Number,
            value: ''
        },
        disabled: {
            type: Boolean,
            value: false
        },
        writable: {
            type: Boolean,
            value: true,
        },
        tips: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isError: false,
        errorMessage: ''
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onInput(e) {
            this.checkError()
            this.triggerEvent('input', e.detail)
        },
        checkError() {
            this._handleRequired()
            this._handleRules()
        },
        _handleRequired() {
            let isError = false;
            let errorMessage = '';
            if(this.properties.required) {
                if(this.properties.value === '') {
                    isError = true
                    errorMessage = '请输入' + (this.properties.label ? this.properties.label : '字段');
                }
            }
            this.setData({isError, errorMessage})
        },
        _handleRules() {
            this.properties.rules.forEach(rule=>{
                this._handleRule(rule)
            })
        },
        _handleRule(rule) {
            switch(rule.type) {
                case 'email': this._handleEmailCheck();break;
                case 'phone': this._handlePhoneCheck();break;
            }
        },
        _handleEmailCheck() {
            let format = /^[A-Za-z0-9+]+[A-Za-z0-9\.\_\-+]*@([A-Za-z0-9\-]+\.)+[A-Za-z0-9]+$/;
            if (!this.properties.value.match(format)) {
                   this.setData({isError: true, errorMessage: '请正确输入电子邮件地址'})
            }
        },
        _handlePhoneCheck() {
            if(!(/^1[3456789]\d{9}$/.test(this.properties.value))){
                this.setData({isError: true, errorMessage: '请正确输入手机号码'})
            }
        },
        isReady() {
            this.checkError()
            return !this.data.isError;
        }
    }
})
