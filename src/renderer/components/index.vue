<template>
  <div>
    <!-- <input type="button" value="添加一级事件" @click="showAddForm">
    <input type="button" @click="save" value="保存"> -->
    <div class="box">
      <div class="item" v-for="(item, index) in todoList" :key="index">
        <todo-item :todo="item" @deleteTodoItem="deleteTodoItem"/>
      </div>
    </div>
    <add-todo-form @addTodo="addTopTodo" ref="addForm"/>
  </div>
</template>

<script>
import { Todo } from "@/classes/todo";
import TodoItem from "./TodoItem";
import AddTodoForm from "./addTodoForm";
import { mapGetters, mapActions } from "vuex";
import Vue from 'vue'
const { ipcRenderer } = require('electron');
// 事件委托
const eventHub = new Vue()
ipcRenderer.on('addTopTodo', (event, arg) => {
    eventHub.$emit('addTopTodo')
});
ipcRenderer.on('save', (event, arg) => {
    eventHub.$emit('save')
});
export default {
  data() {
    return {
      todoList: []
    };
  },
  computed: {
   
  },
  components: {
    TodoItem,
    AddTodoForm
  },
  created() {
    this.$db.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      docs.forEach(element => {
        this.todoList.push(new Todo(element));
      });
    });
    eventHub.$on('addTopTodo', ()=>{
      this.showAddForm()
    })
    eventHub.$on('save', ()=>{
      this.save()
    })
  },
  methods: {
    showAddForm(){
         this.$refs.addForm.toggleShow()
      },
    addTopTodo(data) {
      this.todoList.push(new Todo({ ...{ begin: new Date() }, ...data }));
    },
    save() {
      let data = this.todoList.map(item => {
        return item.getJson();
      });
      this.$db.remove({}, { multi: true }, (err, numRemoved) => {
        this.$db.insert(data, (err, newDocs) => {
          alert("保存成功");
        });
      });
    },
    deleteTodoItem(id){
          this.todo.deleteTodoItem(id)
      },
    // ...mapActions(["toggleAddTodoForm", "addTodoItem"])
  }
};
</script>

<style>
</style>
