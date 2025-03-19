/**
 * 日记类
 * @param diaryId
 * @param userId
 * @param diaryTitle
 * @param diaryContent
 * @param diaryDate
 * @param diaryTags
 * @constructor
 */

function Diary(diaryId,userId,diaryTitle,diaryContent,diaryDate,diaryTags){
  this.diaryId = diaryId;  //Number
  this.userId = userId;   //Number
  this.diaryTitle = diaryTitle;   //String
  this.diaryContent = diaryContent;  //String
  this.diaryDate = diaryDate;  //Date
  this.diaryTags = diaryTags;  //Array
}

export default Diary
