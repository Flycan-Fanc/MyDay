/**
 * 标签类
 * @param tagId
 * @param userId
 * @param tagName
 * @param tagColor
 * @constructor
 */
function Tag(tagId,userId,tagName,tagColor){
    this.tagId = tagId;
    this.userId = userId;
    this.tagName = tagName;
  this.tagColor = tagColor;
}

export default Tag;
