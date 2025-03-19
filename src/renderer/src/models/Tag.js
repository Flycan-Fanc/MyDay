/**
 * 标签类
 * @param tagId
 * @param userId
 * @param tagName
 * @param tagColor
 * @constructor
 */
function Tag(tagId,userId,tagName,tagColor){
    this.tagId = tagId;  //Number
    this.userId = userId;  //Number
    this.tagName = tagName;   //String
    this.color = tagColor;   //String,例如"#ffffff"
}

export default Tag;
