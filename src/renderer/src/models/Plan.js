/**
 * 计划类
 * @param planId
 * @param userId
 * @param planContent
 * @param planTags
 * @param isDone
 * @param isTop
 * @param startTime
 * @param endTime
 * @constructor
 */
function Plan(planId, userId, planContent, planTags, isDone, isTop, startTime, endTime) {
  this.planId = planId;
  this.userId = userId;
  this.planContent = planContent;
  this.planTags = planTags;
  this.isDone = isDone;
  this.isTop = isTop;
  this.startTime = startTime;
  this.endTime = endTime;
}


export default Plan;
