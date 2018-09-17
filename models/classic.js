import { HTTP } from '../util/http'

class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        callback(res)
        this._setLatestIndex(res.index) // 写入index到缓存
        wx.setStorageSync(this._getKey(res.index), res) // 写入缓存
      }
    })
  }

  getClassic(index, nextOrPrevious, callback) {
    // 缓存中寻找 or API 写入到缓存中

    let key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)

    let classic = wx.getStorageSync(key)

    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res)
        }
      })
    } else {
      callback(classic)
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    return this._getLatestIndex() === index ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  _getKey(index) {
    return `classic-${index}`
  }
}

export { ClassicModel }
