<template>
  <div class="search-area selected">
    <img src="../assets/icon/ic_tools_search.png" alt="" class="searchImg" />
    <input type="text" class="search" :placeholder="`查找${from}`" />
  </div>
</template>

<script>

export default {
  name:'Search',
  props:{
    from:{
      type:String,
      default:''
    }
  },
  mounted(){
    console.log(this.from)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.search-area {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
  width: 240px;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: -3px 4px 5px rgba(0, 0, 0, 0.4);
  padding: 0 20px;
}
.search-area img {
  width: 40px;
}
.search-area input {
  width: 160px;
  height: 20px;
  line-height:20px;
  text-indent: 2em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}

</style>

