import { HTTP } from '../util/http'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, categary, callback) {
    this.request({
      url: `classic/${categary}/${artID}/favor`,
      success: callback
    })
  }
}

export { LikeModel }
