<template>
  <div id="NewBtn">New</div>
</template>

<script>

export default {
    name:'NewBtn',
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#NewBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 70px;
  height: 40px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.6);
  font-size: 20px;
  font-weight: bold;
  user-select:none; /*禁止选中文字*/
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}
#NewBtn:hover{
  background-color: #0884dc;
  color: #fff;
  transform:scale(1.1);
}
#NewBtn:active{
  background-color: #0884dc;
  color: #fff;
  transform:scale(0.9);
}
</style>

