/**
 * @description: 标签store
 */
import { nanoid } from "nanoid";
import Tag from "../../models/Tag";

const tagApi = {
  /**
   * 生成随机16进制颜色
   * @returns {string}
   */
  randomHexColor(){
    let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
      hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
  }
}

const tagAbout = {
  state:{
    userTags:[
      {
        tagId: 1,
        tagName: '#工作',
        color:  '#12c23d'
      },
      {
        tagId: 2,
        tagName: '#学习',
        color: '#ff6b81'
      },
      {
        tagId: 3,
        tagName: '#娱乐',
        color: '#ff9f43'
      },
      {
        tagId: 4,
        tagName: '#生活',
        color: '#f6da00'
      },
      {
        tagId: 5,
        tagName: '#运动',
        color: "#146de1"
      }
    ]
  },
  actions:{
    /**
     * 创建标签
     */
    addTag(context,value){
      let tagId = nanoid()
      let tagName = value;
      // TODO:后续可能会支持用户自定义颜色
      let color = tagApi.randomHexColor()
      let newTag = new Tag(tagId,tagName,color)
      context.commit('addTag',newTag)
    },
    /**
     * 删除标签
     */
    deleteTag(context,value){
      let index = context.state.userTags.findIndex(item=>item.tagId === value)
      context.commit('deleteTag',index)
    },
    /**
     * 修改标签内容
     */
    editTagName(context,value){
      let index = context.state.userTags.findIndex((item=>item.tagId === value.tagId))
      let newTagName = value.tagName
      context.commit('editTagName',{index,newTagName})
    }
  },
  mutations:{
    /**
     * 创建标签
     */
    addTag(state,value){
      state.userTags.push(value)
    },
    /**
     * 删除标签
     */
    deleteTag(state,value){
      state.userTags.splice(value,1)
    },
    /**
     * 修改标签内容
     */
    editTagName(state,value){
      state.userTags[value.index].tagName = value.tagName;
    }
  },
  getters:{

  }
}

export default tagAbout;
