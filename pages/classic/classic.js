// pages/classic/classic.js
import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  onLike(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext(event) {
    this._updateClassic('next')
  },

  onPrevious(event) {
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious) {
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, res => {
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
      this._getLikeStatus(res.id, res.type)
    })
  },

  _getLikeStatus(artID, categary) {
    likeModel.getClassicLikeStatus(artID, categary, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
