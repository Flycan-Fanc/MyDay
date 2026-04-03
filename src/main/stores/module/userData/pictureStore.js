import electronStore from '../../index'

class PictureStore {
  constructor(userId) {
    this.userId = userId
    this.config = {
      name: 'user-picture',
      cwd: `users/${userId}`,
      encryptionKey: `user-key-${userId}`,
    }
    this.store = electronStore.getStore(this.config)
  }

  getPicture() {
    return this.store.get('picture', [])
  }

  setPicture(picture) {
    if (picture) {
      return this.store.set('picture', picture)
    }
  }
}

export default PictureStore
