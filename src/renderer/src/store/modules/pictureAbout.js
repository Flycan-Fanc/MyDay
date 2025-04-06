/**
 * @description: 图片store
 */

import Picture from '../../models/Picture'

import {nanoid} from 'nanoid'

const pictureApi = {
  // TODO:将md收集到的图片数据转为后端可以读取的形式
  toObj(data){
    return {
      miniurl:data._miniurl,
      _name:data._name,
    }
  },

  //TODO:将后端返回的数据转为md可以使用的格式
  toMd(data){
    let tempArr = data.map(item => {
      return {
        miniurl:item.pictureContent,
        _name:item.pictureName
      }
    })
    if(tempArr.length === 0){
      return null
    } else{
      tempArr.unshift({miniurl:'no img at pos 0',_name:'null'})
      return tempArr
    }

  }
}

const pictureAbout = {
  namespaced:true,
  state:{
    pictureData:[]
  },
  actions:{
    /**
     * 获取图片列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取图片列表
    },
    /**
     * 存储图片列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储图片列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加图片
     */
    addPicture(context,value){
      let picBase64 = pictureApi.toObj(value.image)
      let pictureId = nanoid()
      let userId = value.userId
      let diaryId = value.diaryId
      let insId = value.insId
      let pictureName = picBase64._name
      let pictureContent = picBase64.miniurl
      let isAvatar = value.isAvatar
      let isCover = value.isCover
      let picture = new Picture(pictureId,userId,diaryId,insId,pictureName,pictureContent,isAvatar,isCover)
      context.commit('addPicture',picture)
    },
    /**
     * 删除图片
     */
    deletePicture(context,value){

    },
    /**
     * 批量删除图片
     */
    deletePictureBatch(context,value){

    },
  },
  mutations:{
    /**
     * 获取图片列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取图片列表
    },
    /**
     * 存储图片列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储图片列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加图片
     */
    addPicture(state,value){
      state.pictureData.push(value)
    },
    /**
     * 删除图片
     */
    deletePicture(state,value){

    },
    /**
     * 批量删除图片
     */
    deletePictureBatch(state,value){

    },
  },
  getters:{
    fetchDiaryImage:(state) => (id) => {
      return pictureApi.toMd(state.pictureData.filter(item => item.diaryId === id))
    },
    fetchInsImage:(state) => (id) => {
      return pictureApi.toMd(state.pictureData.filter(item => item.insId === id))
    },
  }
}

export default pictureAbout;
