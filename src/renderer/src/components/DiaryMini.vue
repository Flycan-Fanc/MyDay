<template>
  <div id="DiaryMini-container" class="selected">
    <span class="date">2023.1.4</span>
    <span class="diaryAbstract">今天元旦开学......</span>
    <input
      type="checkbox"
      name="diary-selector"
      id="diary-selector"
      class=""
    />
  </div>
</template>

<script>

export default {
  name: 'DiaryMini',
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#DiaryMini-container {
  /*记得删掉*/
  margin: 10px;
  /*记得删掉*/
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 130px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease-in-out;
  cursor:pointer;
}
#DiaryMini-container:hover {
  background-color: #fff;
  transform: translate(-5px, -5px);
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.4);
}
.date {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.diaryAbstract {
  flex: 1;
  display: flex;
  font-size: 20px;
}
#diary-selector {
  position: absolute;
  right: 5%;
  top: 5%;
}
</style>

