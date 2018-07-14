<template>
    <div>
        <input type="text" @keyup.enter="addTopTodo" v-model="title">
        <div class="box">
            <div class="item" v-for="(item, index) in todoList" :key="index">
                <todo-item :todo="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Todo } from "@/classes/todo";
import TodoItem from './TodoItem'
export default {
  data() {
    return {
      title: null,
      todoList: []
    };
  },
  components:{
      TodoItem
  },
  methods: {
    addTopTodo() {
        this.todoList.push(new Todo({title: this.title,info: '', begin: new Date()}))
    }
  }
};
</script>

<style>
</style>
