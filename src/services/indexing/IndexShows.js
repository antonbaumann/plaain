import { ITEM_STATES, ITEM_TYPES } from '../../constants'

import OneDrive from '../drives/OneDrive'

class IndexShows {
  constructor(accessToken) {
    this._oneDrive = new OneDrive(accessToken)
  }

  async perform() {
    return await Promise.all(await this.oneDrive.shows().then(response => {
      return response.value.map(item => this.index(item))
    })).then(shows => shows.filter(show => show != null))
  }

  async index(item) {
    if (item.folder == null) {
      return null
    }

    return {
      type: ITEM_TYPES.SHOW,
      state: ITEM_STATES.INDEXED,
      id: item.id,
      name: item.name
    }
  }

  get oneDrive() {
    return this._oneDrive
  }
}

export default IndexShows