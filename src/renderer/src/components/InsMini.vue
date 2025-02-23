<template>
  <div id="InsMini-container">
    <span class="insCover">
      <img src="../assets/background/plouzane-1758197.jpg" alt=""/>
    </span>
    <span class="insTitle">海边夜景</span>
    <span class="insDate">2020.04.06</span>
    <input type="checkbox" name="insSelector" id="insSelector" />
  </div>
</template>

<script>

export default {
  name: 'InsMini',
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#InsMini-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 170px;
  height: 230px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
#InsMini-container:hover {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
.insCover {
  flex: 2;
  margin-top: 15px;
  transition: margin-top 0.15s ease-in-out;
}
#InsMini-container:hover .insCover {
  margin-top: 40px;
}
.insCover img {
  width: 100%;
  height: 100%;
}
.insTitle {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.insDate {
  flex: 1;
}
#insSelector {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
}
#InsMini-container:hover #insSelector {
  visibility: visible;
  opacity: 1;
}
</style>

