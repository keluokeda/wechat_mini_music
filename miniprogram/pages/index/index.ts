// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

interface CreateKeyResponse {
    code: number,
    data: {
        unikey: string
    }
}

interface CreateQrUrlResponse {
    code: number,
    data: {
        qrurl: string
    }
}

Page({
    data: {
        qrUrl: '',
        key: ''
    },

    checkLogin() {
        wx.request({
            url: "http://localhost:3000/login/qr/check",
            data: {
                key: this.data.key
            },
            success: (res) => {
                console.log(res)
            }
        })
    },
    onLoad() {
        this.createKey()
    },



    createKey() {
        wx.request({
            method: 'GET',
            url: 'http://localhost:3000/login/qr/key',
            success: (res: any) => {
                let data: CreateKeyResponse = res.data
                // console.log(data)
                this.setData({
                    key: data.data.unikey
                })
                this.createLoginQrUrl()
            }
        })
    },

    createLoginQrUrl() {
        wx.request({
            url: "http://localhost:3000/login/qr/create",
            data: {
                'key': this.data.key
            },
            success: (res: any) => {
                // console.log(res)
                let response: CreateQrUrlResponse = res.data
                this.setData({
                    qrUrl: response.data.qrurl
                })
            }, fail: (error) => {
                console.log(error)
            }
        })
    }

})
