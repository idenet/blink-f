// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const bid = this.properties.book.id
      // 服务于项目 项目组件
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
