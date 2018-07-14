<template>
    <div class="todo-box">
        <div class="header">
            <div class="status" :style="status"></div>
            <div class="title">{{todo.title}}</div>
            <div class="time-line" :style="timeLine">
                <span class="begin label">{{todo.begin}}</span>
                <span class="end label">{{todo.end}}</span>
            </div>
        </div>
        <div class="child">
            <ul>
                <li v-for="(item, index) in todo.children" :key="index" v-if="item.children.length != 0">
                    <todo-item :todo="item"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "todoItem",
  props: {
    todo: {
      type: Object,
      defalt: () => {}
    }
  },
  computed: {
    timeLine() {
      return {
        width: this.todo.getWidthPercent() * 100 + "%"
      };
    },
    status(){
        return{
            background: this.todo.getStatusColor()
        }
    }
  },
//   components: {
//     todoItem
//   }
};
</script>

<style scoped>
.todo-box{
    margin-top: 20px;
}
.header{
    overflow: hidden;
    display: flex;
}
.title{
    flex: 0 0 100px;
    text-align: center;
    /* width: 100px; */
    height: 44px;
    border: 1px solid #ddd;
}
.status{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 17px;
    margin-right: 10px;
}
.time-line{
    /* float: left; */
    height: 2px;
    background: rgb(118, 212, 118);
    position: relative;
    margin-top: 24px;
}
.label{
    position: absolute;
    top: -18px;
    font-size: 12px;
}
.begin{
    left: 0;
}
.end{
    right: 0;
}
</style>
