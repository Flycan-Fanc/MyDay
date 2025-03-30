import axios from "axios";


const imageRequest = {
  get: (url) => {

  },
  /**
   * 单一图片上传
   * @param url 请求地址
   * @param data 图片数据
   * @returns {Promise<unknown>}
   */
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData();

      console.log('file改没改？'+JSON.stringify(data))
      // 假设 this.img_files 是 File 对象数组
      // 批量上传至服务器
      // this.img_file.forEach((file, index) => {
      //   formData.append(`file`, file); // 字段名需与后端 upload.array("images") 匹配
      //   // console.log('img_file:'+JSON.stringify(file))
      // });

      formData.append(`file`, data);
      console.log('传的啥呀？'+JSON.stringify(data))
      axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
      }).then((res) => {
        resolve(res.data[0]);
      }).catch((error) => {
        reject("上传失败:"+error);
      });
    })
  }
}

export { imageRequest };
