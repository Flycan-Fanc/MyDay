/**
 * @description: 图片store
 */

import Picture from '../../models/Picture'

import {nanoid} from 'nanoid'

const pictureApi = {
  // TODO:将md收集到的图片数据转为后端可以读取的形式
  toObj(state){},

  //TODO:将后端返回的数据转为md可以使用的格式
  toMd(state){}
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
     * 添加计划
     */
    addPicture(context,value){

    },
    /**
     * 删除计划
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
     * 添加计划
     */
    addPicture(context,value){

    },
    /**
     * 删除计划
     */
    deletePicture(context,value){

    },
    /**
     * 批量删除图片
     */
    deletePictureBatch(context,value){

    },
  },
  getters:{
    sortedPlanList(state){
      return planApi.sortPlanList(state.planData)
    }
  }
}

export default planAbout;
