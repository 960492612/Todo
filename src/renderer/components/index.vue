<template>
  <div>
    <input type="button" value="添加一级事件" @click="showAddForm">
    <input type="button" @click="save" value="保存">
    <div class="box">
      <div class="item" v-for="(item, index) in todoList" :key="index">
        <todo-item :todo="item" />
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
          console.log("保存成功");
        });
      });
    },
    // ...mapActions(["toggleAddTodoForm", "addTodoItem"])
  }
};
</script>

<style>
</style>
