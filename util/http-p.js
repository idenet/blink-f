import { config } from '../config'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  request({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }

  _request(url, resolve, reject, method, data) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: res => {
        const code = res.statusCode.toString()
        const error_code = res.data.error_code
        code.startsWith('2')
          ? resolve(res.data)
          : this._show_error(error_code, reject)
      },
      fail: err => {
        this._show_error(1, reject)
      }
    })
  }
  _show_error(error_code, reject) {
    if (!error_code) {
      error_code = 1
    }
    reject()
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000,
      mask: false
    })
  }
}

export { HTTP }
