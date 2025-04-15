/**
 * 用户类
 * @param userId
 * @param userAccount
 * @param userPassword
 * @param email
 * @param userName
 * @param avatarId
 * @param userProfile
 * @param userRole
 * @param isVip
 * @param createTime
 * @param isDelete
 * @constructor
 */

function User(
  userId,userAccount,userPassword,email,userName,avatarId,
  userProfile,userRole,isVip,createTime,isDelete){
    this.userId = userId;
    this.userAccount = userAccount;
    this.userPassword = userPassword;
    this.email = email;
    this.userName = userName;
    this.avatarId = avatarId;
    this.userProfile = userProfile;
    this.userRole = userRole;
    this.isVip = isVip;
    this.createTime = createTime;
    this.isDelete = isDelete;
}

export default User;
