import * as pictureAPI from './modules/picture';


/**
 * 监听pictureAPI
 */
window.api.rendererAPI.picture.uploadPicture(async (args) => await pictureAPI.uploadPicture(...args))
window.api.rendererAPI.picture.getPicture(async (args) => await pictureAPI.getPicture(...args))
window.api.rendererAPI.picture.getUserPictureList(async (args) => await pictureAPI.getUserPictureList(...args))
window.api.rendererAPI.picture.deletePicture(async (args) => await pictureAPI.deletePicture(...args))

