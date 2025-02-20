<template>
    <div class="CalenderMini-container"
         @click="onclick"
         :class="{selected: choose}">
      <div class="month">12月</div>
      <div class="dateArea">
        <div class="date">2</div>
        <div class="week">Mon.</div>
      </div>
      <div class="planNum">+3 more</div>
    </div>
</template>

<script>

export default {
    name: 'CalendarMini',
    props: ['choose'],
    methods: {
        onclick() {
            this.$emit('select')
        }
    }
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.CalenderMini-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  cursor:pointer;
}
.CalenderMini-container.selected,.CalenderMini-container:hover {
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.4);
  transform: translate(-5px, -5px);
  color: white;
  background-color: #007bff;
}
.CalenderMini-container.selected .date {
  color: white;
}
.CalenderMini-container:hover .date {
  color: white;
}
.CalenderMini-container.selected .week {
  color: white;
}
.CalenderMini-container:hover .week {
  color: white;
}
.CalenderMini-container.selected .planNum {
  color: black;
}
.CalenderMini-container:hover .planNum {
  color: black;
}
.month {
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 10%;
  font-size: 12px;
  font-weight: 600;
}
.dateArea {
  flex: 1;
  display: flex;
  align-items: flex-end;
}
.dateArea .date {
  flex: 1;
  margin-right: 10px;
  font-size: 25px;
  font-weight: 900;
  color: #ff0000;
  text-shadow: 1px 1px 3px rgb(0, 0, 0);
}
.dateArea .week {
  flex: 1;
  align-self: flex-end;
  margin-bottom: 5px;
  font-size: 15px;
  color: rgb(231, 1, 1);
}
.planNum {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #949292;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 10%;
}
</style>

