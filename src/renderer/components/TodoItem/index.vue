<template>
    <div class="todo-box">
        <div class="header">
            <div class="status" :style="status"></div>
            <div class="title">{{todo.title}}</div>
            <div class="btn-box">
                <span @click="addChildTodo">添加子事件</span>
                <span>更改状态</span>
                <span>展开/收起</span>
                <span>删除</span>
            </div>
            <div class="time-line" :style="timeLine">
                <span class="begin label">{{todo.begin}}</span>
                <span class="end label">{{todo.end}}</span>
            </div>
        </div>
        <div class="child">
            <ul>
                <li v-for="(item, index) in todo.children" :key="index" v-if="item">
                    <todo-item :todo="item"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Todo } from "@/classes/todo";
import { log } from 'util';
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
        console.log(this.todo.getWidthPercent());
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
  watch:{
    
  },
  methods:{
      addChildTodo(){
          this.todo.addTodoItem(new Todo({title: '',info: '', begin: new Date()}))
          console.log(this.todo.children);
          
      }
  }
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
    position: relative;
}
.title{
    flex: 0 0 120px;
    text-align: center;
    /* width: 100px; */
    height: 60px;
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
