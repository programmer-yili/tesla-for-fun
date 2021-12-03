// components/test-field/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String|Number,
      value: ''
  },
    rules: {
      type: Array,
      value: []
  },
  label: {
    type: String,
    value: ''
  },
  autosize: {
    type: Boolean | Object,
    value: false
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    error: false,
    errorMessage: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onInput(e) {
      console.log(this.properties.autosize)
      this.checkError()
      this.triggerEvent('input', e.detail)
    },
    checkError() {
      this._handleRequired()
      this._handleRules()
    },
    _handleRequired() {
      let error = false;
      let errorMessage = '';
      if(this.properties.required && this.properties.value === '') {
              error = true
              errorMessage = '请输入' + (this.properties.label ? this.properties.label : '字段');
      }
      this.setData({error, errorMessage})
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
           this.setData({error: true, errorMessage: '请正确输入电子邮件地址'})
    }
},
_handlePhoneCheck() {
    if(!(/^1[3456789]\d{9}$/.test(this.properties.value))){
        this.setData({error: true, errorMessage: '请正确输入手机号码'})
    }
},

isReady() {
this.checkError()
return !this.data.error;
}

  }
})
