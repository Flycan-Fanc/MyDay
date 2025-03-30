

const imageUtils = {
  /**
   * 压缩图片文件对象（严格保持输入输出结构一致）
   * @param {Object} fileObj - 原始文件对象 { miniurl, _name }
   * @param {number} maxWidth - 最大宽度
   * @returns {Promise<{ miniurl: string, _name: string }>} 压缩后的图片文件对象
   */
  async compressImage(fileObj, maxWidth = 600) {
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

export { imageUtils };
