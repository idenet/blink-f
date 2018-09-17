import { classicBeh } from '../classic-beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   *
   * 播放API
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      // 切换图片
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src //
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 当前正在播放
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        // 当切换其他小程序播放
        if (mMgr.paused == null) {
          this.setData({
            playing: false
          })
          return
        }
        console.log('背景音乐播放')
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
