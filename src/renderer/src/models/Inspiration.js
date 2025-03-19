/**
 * 灵感类
 * @param insId
 * @param userId
 * @param insTitle
 * @param insContent
 * @param insDate
 * @param insTags
 * @param insCover
 * @constructor
 */

function Inspiration(insId,userId,insTitle,insContent,insDate,insTags,insCover){
  this.insId = insId;  //Number
  this.userId = userId;  //Number
  this.insTitle = insTitle;  //String
  this.insContent = insContent;  //String
  this.insDate = insDate;  //Date
  this.insTags = insTags;  //Array
  this.insCover = insCover;   //String
}

export default Inspiration
