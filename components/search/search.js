import KeywordModel from '../../models/keyword'

// components/search/search.js

let keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: []
  },

  attached() {
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {})
    },
    onConfirm(event) {
      const word = event.detail.value
      console.log(word)
      keywordModel.addToHistory(word)
    }
  }
})
