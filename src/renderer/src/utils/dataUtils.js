import store from "../store/store";

const weather = require('weather-js');

const imageUtils = {
  /**
   * 压缩图片文件对象（严格保持输入输出结构一致）
   * @param {Object} fileObj - 原始文件对象 { miniurl, _name }
   * @param {number} maxWidth - 最大宽度
   * @returns {Promise<{ miniurl: string, _name: string }>} 压缩后的图片文件对象
   */
  async compressImage(fileObj, maxWidth = 400) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = fileObj.miniurl;

      img.onload = () => {
        // 1. 无需压缩的情况
        if (img.width <= maxWidth) {
          resolve(fileObj); // 直接返回原始对象
          return;
        }

        // 2. 压缩处理
        const mimeType = fileObj.miniurl.split(';')[0].split(':')[1];
        const scale = maxWidth / img.width;
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 3. 生成新Base64（保留原始MIME类型）
        const quality = mimeType === 'image/png' ? 0.9 : 0.85;
        const newBase64 = canvas.toDataURL(mimeType, quality);

        // 4. 返回结构完全一致的对象
        resolve({
          miniurl: newBase64, // 更新后的Base64
          _name: fileObj._name // 原始文件名
        });
      };

      img.onerror = reject;
    });
  },
  /**
   * 工具函数：Base64转File（独立保留）
   * @param {string} base64
   * @param {string} filename
   * @returns {File}
   */
  base64ToFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }
}

const stringUtils = {
  /**
   * 检查字符串是否为空
   * @param str
   * @returns {boolean}
   */
  isStringEmpty(str) {
    // 检查是否为 null 或 undefined
    if (str === null) return true;
    // 检查去空格后的长度是否为 0
    return str.trim().length === 0;
  },
  /**
   * 判断字符串间是否模糊匹配
   * @param origin 源字符串
   * @param target 目标字符串
   * @returns {boolean}
   */
  isFuzzyMatch: function(origin,target){
    if (target === "") return true; // 空目标字符串直接返回 true
    // 将 target 的每个字符转义后，用 ".*" 连接，生成正则表达式
    const pattern = target
      .split("")
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // 转义正则特殊字符
      .join(".*");
    const regex = new RegExp(pattern); // 构建正则表达式
    return regex.test(origin); // 测试是否匹配
  },
}

const locationUtils = {
  /**
   * 通过IP获取地理位置信息，使用 ip-api.com API
   * @returns {Promise<{latitude: *, longitude: *, countryCode: *, city: *}>}
   */
  async fetchLocationByIP() {
    try {
      const response = await fetch('http://ip-api.com/json/?fields=lat,lon,countryCode,city');
      let res = await response.json();
      //alert(' 您位于 ' + res.city + ',' + res.countryCode);
      return {latitude:res.lat,longitude:res.lon,countryCode:res.countryCode,city:res.city}
    } catch (ipError) {
      console.error('IP 定位失败:', ipError);
    }
  },
  /**
   * 根据经纬度获取地理位置信息，使用 OpenStreetMap Nominatim API
   * @param lat
   * @param lng
   * @returns {Promise<any>}
   */
  async reverseGeocode(lat, lng) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    return await response.json();
  },
  /**
   * 获取地理位置信息，使用location.geolocation API
   * @returns {Promise<{latitude: *, longitude: *, countryCode: *, city: *}|undefined>}
   */
  async getGeoLocation(){
    if (!navigator.geolocation) {
      console.error('不支持定位');
      return locationUtils.fetchLocationByIP();
    }
    // 配置项
    const position_options = {
      enableHighAccuracy:true, //  开启高精度模式
      maximumAge:240000, // 缓存时间
      timeout:5000 // 超时时间
    }
    // 成功回调
    async function getPositionSuccess( position ){
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      //alert( "您所在的位置： 经度" + lat + "，纬度" + lng );
      let pos = await locationUtils.reverseGeocode(lat,lng)
      return {latitude:lat,longitude:lng,countryCode:pos.countryCode,city:pos.city}
    }
    // 失败回调
    async function getPositionError(error){
      // 使用 location.geolocation 失败则使用IP定位
      console.log('定位失败，改为使用IP定位')
      return await locationUtils.fetchLocationByIP()
    }
    await navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, position_options)
  },
}

const weatherUtils = {
  // async getWeatherInfo() {
  //   let pos = await locationUtils.fetchLocationByIP()
  //   // TODO:后续可能改为和风天气api？
  //   weather.find({search: pos.city+','+pos.countryCode, degreeType: 'C'}, function(err, result) {
  //     if(err) console.log(err);
  //     console.log(JSON.stringify(result, null, 2));
  //     store.dispatch('weatherAbout/setWeatherData',result)
  //   });
  // }
  async getWeatherInfo() {
    try {
      const pos = await locationUtils.fetchLocationByIP();
      // 将 weather.find 包装为 Promise
      await new Promise((resolve, reject) => {
        weather.find(
          {
            search: `${pos.city},${pos.countryCode}`,
            degreeType: 'C'
          },
          (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(JSON.stringify(result, null, 2));
              store.dispatch('weatherAbout/setWeatherData', result);
              resolve(result); // 完成 Promise
            }
          }
        );
      });
    } catch (error) {
      console.error("Failed to get weather info:", error);
      throw error; // 抛出错误以便外部捕获
    }
  }
}

export { imageUtils,stringUtils,locationUtils,weatherUtils };
