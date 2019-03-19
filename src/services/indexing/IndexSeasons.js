import { ITEM_ROLES, ITEM_STATES, ITEM_TYPES } from '../../constants'

import IndexEpisodes from './IndexEpisodes'

class IndexSeasons {
  constructor(oneDrive, folderId) {
    this._oneDrive = oneDrive
    this._folderId = folderId
  }

  perform() {
    return this.oneDrive.children(this.folderId).then(response => {
      return response.value.map(item => this.index(item))
    }).then(seasons => {
      return Promise.all(seasons).then(seasons => seasons.filter(season => season != null))
    })
  }

  async index(item) {
    if (item.folder == null || Number.isNaN(item.name)) {
      return null
    }

    const episodes = await new IndexEpisodes(this.oneDrive, item.id).perform()

    return {
      type: ITEM_TYPES.SEASON,
      state: ITEM_STATES.INDEXED,
      role: episodes.filter(episode => episode.role === ITEM_ROLES.LIBRARY).length > 0 ? ITEM_ROLES.LIBRARY : ITEM_ROLES.RECOMMENDED,
      id: item.id,
      seasonNumber: Number.parseInt(item.name),
      episodes: episodes
    }
  }

  get oneDrive() {
    return this._oneDrive
  }

  get folderId() {
    return this._folderId
  }
}

export default IndexSeasons