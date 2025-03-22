/**
 * @description 图片类
 * @param pictureId
 * @param userId
 * @param diaryId
 * @param insId
 * @param pictureName
 * @param pictureContent
 * @param isAvatar
 * @param isCover
 * @constructor
 */
function Picture(pictureId,userId,diaryId,insId,pictureName,pictureContent,isAvatar=false,isCover=false){
  this.pictureId = pictureId;
  this.userId = userId;
  this.diaryId = diaryId || null;
  this.insId = insId || null;
  this.pictureName = pictureName;
  this.pictureContent = pictureContent;
  this.isAvatar = isAvatar
  this.isCover = isCover;
}

export default Picture
