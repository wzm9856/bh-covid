// pages/setting/setting.js
Page({
    data: {
        showClearID: false,
        showClearName: false,
        showClearPwd: false,
        stuID: '',
        stuName: '',
        stuPwd: '',
        gender: 0,
        genderList: ['男', '女']
    },
    onFocusID: function (params) {
        if(params.detail.value.length) this.setData({'showClearID': true})
    },
    onFocusName: function (params) {
        if(params.detail.value.length) this.setData({'showClearName': true})
    },
    onFocusPwd: function (params) {
        if(params.detail.value.length) this.setData({'showClearPwd': true})
    },
    onBlurID: function (params) {
        this.setData({'showClearID': false})
    },
    onBlurName: function (params) {
        this.setData({'showClearName': false})
    },
    onBlurPwd: function (params) {
        this.setData({'showClearPwd': false})
    },
    onClearID: function (params) {
        this.setData({'stuID': ''})
    },
    onClearName: function (params) {
        this.setData({'stuName': ''})
    },
    onClearPwd: function (params) {
        this.setData({'stuPwd': ''})
    },    
    onInputID: function (params) {
        this.setData({'showClearID': !!params.detail.value.length, 'stuID': params.detail.value})
    },
    onInputName: function (params) {
        this.setData({'showClearName': !!params.detail.value.length, 'stuName': params.detail.value})
    },
    onInputPwd: function (params) {
        this.setData({'showClearPwd': !!params.detail.value.length, 'stuPwd': params.detail.value})
    },
    onChangeGender: function (params) {
        this.setData({'gender': params.detail.value})
    },
    onSave: function (params) {
        console.log(params)
    }
})