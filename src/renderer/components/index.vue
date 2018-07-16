<template>
    <div>
        <input type="text" @keyup.enter="addTopTodo" v-model="title">
        <input type="button" @click="save" value="保存">
        <div class="box">
            <div class="item" v-for="(item, index) in todoList" :key="index">
                <todo-item :todo="item" />
            </div>
        </div>
    </div>
</template>

<script>
import { Todo } from "@/classes/todo";
import TodoItem from "./TodoItem";
export default {
  data() {
    return {
      title: null,
      todoList: []
    };
  },
  components: {
    TodoItem
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
    addTopTodo() {
      this.todoList.push(
        new Todo({ title: this.title, info: "", begin: new Date() })
      );
    },
    save() {
      let data = this.todoList.map(item => {
        return item.getJson();
      });
      this.$db.remove({}, { multi: true }, (err, numRemoved) => {
        this.$db.insert(data, (err, newDocs) => {
          console.log("保存成功");
          this.$db.find({}, (err, docs) => {
            console.log(docs);
            
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
