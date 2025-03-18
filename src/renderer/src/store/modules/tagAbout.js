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
  namespaced:true,
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
    ],
    selectedTag:[],
    closeTag:[],
  },
  actions:{
    /**
     * 创建标签
     */
    addTag(context,value){
      let tagId = nanoid()
      //TODO: 后面增加用户id
      let userId = 1
      let tagName = value.tagName;
      let color = value.color;
      let newTag = new Tag(tagId,userId,tagName,color)
      console.log('newTag:'+JSON.stringify(newTag))
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
      console.log('state editName:'+JSON.stringify(value))
      context.commit('editTagName',{index,newTagName})
    },
    /**
     * 获取对应id项目的tagList,放在selectedTag中
     */
    getTagList(context,value){
      context.commit('getTagList',value)
    },
    /**
     * 选择标签赋予项目
     */
    addSelectedTag(context,value){
      context.commit('addSelectedTag',value)
    },
    /**
     * 删除单个赋予选项的标签
     */
    deleteSelectedTag(context,value){
      let index = context.state.selectedTag.findIndex(item=>item.tagId === value.tagId)
      context.commit('deleteSelectedTag',index)
    },
    /**
     * 清空赋予选项的标签
     */
    clearSelectedTag(context){
      context.commit('clearSelectedTag')
    },
    /**
     * 添加要关闭的标签
     */
    addCloseTag(context,value){
      context.commit('addCloseTag',value)
    },
    /**
     * 清空要关闭的标签
     */
    clearCloseTag(context){
      context.commit('clearCloseTag')
    },
    /**
     * 去掉selected中要去除的标签
     */
    deleteSelectedTagByCloseTag(context){
      context.commit('deleteSelectedTagByCloseTag')
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
      state.userTags[value.index].tagName = value.newTagName;
      console.log('state:'+JSON.stringify(value))
    },
    /**
     * 获取对应id项目的tagList,放在selectedTag中
     */
    getTagList(context,value){
      let project = value.project
      if(project === 'plan'){

      }
    },
    /**
     * 选择标签赋予项目
     */
    addSelectedTag(state,value){
      console.log('state:',JSON.stringify(value))
      state.selectedTag = value
      console.log('state selectedTag:'+state.selectedTag)
    },
    /**
     * 删除单个赋予选项的标签
     */
    deleteSelectedTag(state,value){
      console.log('state关闭了：'+JSON.stringify(state.selectedTag[value]))
      state.selectedTag.splice(value,1)
      console.log("state selectedTag"+state.selectedTag)
    },
    /**
     * 清空赋予选项的标签
     */
    clearSelectedTag(state){
      state.selectedTag = []
    },
    /**
     * 添加要关闭的标签
     */
    addCloseTag(state,value){
      state.closeTag.push(value)
    },
    /**
     * 清空要关闭的标签
     */
    clearCloseTag(state){
      state.closeTag = []
    },
    /**
     * 去掉selected中要去除的标签
     */
    deleteSelectedTagByCloseTag(state){
      let closeTagId = state.closeTag.map(item=>item.tagId)
      state.selectedTag.filter(item=>!closeTagId.includes(item.tagId))
    }
  },
  getters:{

  }
}

export default tagAbout;
