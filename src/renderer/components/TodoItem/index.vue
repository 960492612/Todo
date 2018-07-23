<template>
    <div class="todo-box">
        <div class="header">
            <div class="status" :style="status_color"></div>
            <div class="tree-line">

            </div>
            <div class="title">{{todo.title}}</div>
            <div class="title info">详情:{{todo.info}}</div>
            <div class="btn-box">
                <span @click="showAddForm">添加子事件</span>
                <span @click="showStatusSelect" style="position: relative;margin-right: 3px;">更改状态
                    <div class="status-wrap" v-show="isShowStatusSelect">
                        <span v-for="(item, key) in status_text" :key="key" @click="setStatus(key)">{{item}}</span>
                    </div>
                </span>
                <span @click="toggleChild">{{isShowChild?'收起':'展开'}}</span>
                <span @click="deleteTodo">删除</span>
            </div>
            <div class="time-line" :style="timeLine">
                <span class="begin label">{{todo.begin}}</span>
                <span class="end label">{{todo.end}}</span>
            </div>
        </div>
        <div class="child" v-show="isShowChild">
            <ul>
                <li v-for="(item, index) in todo.children" :key="index" v-if="item">
                    <todo-item :todo="item"/>
                </li>
            </ul>
        </div>
        <add-todo-form @addTodo="addTodo" ref="addForm"/>
    </div>
</template>

<script>
import { Todo } from "@/classes/todo";
import {STATUS, STATUS_TEXT} from '@/common/js/config'
import { log } from 'util';
import {mapGetters, mapActions} from 'vuex'
import AddTodoForm from "../addTodoForm";
export default {
  name: "todoItem",
  props: {
    todo: {
      type: Object,
      defalt: () => {}
    }
  },
  data(){
      return {
          isShowChild: false,
          isShowStatusSelect: false
      }
  },
  computed: {
    timeLine() {
      return {
        width: this.todo.getWidthPercent() * 100 + "%"
      };
    },
    status_color(){
        return{
            background: this.todo.getStatusColor()
        }
    },
    status_text(){
        return STATUS_TEXT
    }
  },
  components: {
    AddTodoForm
  },
  watch:{
    
  },
  methods:{
      showAddForm(){
         this.$refs.addForm.toggleShow()
      },
      addTodo(data){
        this.todo.addTodoItem(new Todo({ ...{ begin: new Date() }, ...data }))

      },
      showStatusSelect(){
          this.isShowStatusSelect = !this.isShowStatusSelect
      },
      setStatus(key){          
          this.todo.status = key
          
      },
      toggleChild(){
          this.isShowChild = !this.isShowChild;
      },
      deleteTodo(){

      },
      ...mapActions([
       
      ])
  }
//   components: {
//     todoItem
//   }
};
</script>

<style scoped lang="scss">
.todo-box{
    margin-top: 20px;
    padding-left: 30px;
}
.header{
    // overflow: hidden;
    // display: flex;
    position: relative;
}
.title{
    // flex: 0 0 120px;
    text-align: left;
    /* width: 100px; */
    // height: 60px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
}
.info{
    font-size: 13px;
}
.status{
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    top: 17px;

}
.tree-line{
    position: absolute;
    left: -10px;
    height: 100%;
    width: 1px;
    background: #222;
}
.btn-box{
    height: 44px;
    line-height: 44px;
    >span{
        background: rgb(95, 222, 226);
        padding: 5px 3px;
        border-radius: 2px;
        font-size: 12px;
        cursor: pointer;
        color: #fff;
        &:hover{
            background: rgb(3, 243, 252);
        }
        .status-wrap{
            position: absolute;
            bottom: -31px;
            z-index: 999;
            background: #6dd860;;
            color: #222;
            border-radius: 3px;
            left: 0;
            display: flex;
            width: 360px;
            text-align: center;
            >span{
                flex:1;
                height: 30px;
                line-height: 30px;
                &:hover{
                    color: #fff;
                }
                // border: 1px solid #ddd;
            }
        }
    }
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
