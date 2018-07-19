<template>
    <div class="addTodoForm" v-show="showAddTodoForm">
        
        <div class="form">
            <div>
              <label for="">事件标题:</label>
              <input type="text" v-model="data.title">
            </div>
            <div>
              <label for="">事件详情：</label>
              <input type="text" v-model="data.info">
            </div>
            <div>
              <label for="">权重(1-5):</label>
              <input type="text" v-model="data.weight">
            </div>
            
            
            <div class="controls">
              <input type="button" value="取消" @click="toggleAddTodoForm">
              <input type="button" value="确认" @click="sure">
          </div>
        </div>
        
    </div>
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: {
        title: null,
        info: null,
        weight: 2
      }
    };
  },
  computed: {
    ...mapGetters(["showAddTodoForm"])
  },
  methods: {
    setWeight(val) {
      this.data.weight = val;
    },
    sure() {
      this.toggleAddTodoForm();
    },
    ...mapActions(["toggleAddTodoForm"])
  }
};
</script>
<style>
.addTodoForm {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  flex: 0 0 50%;
  flex-direction: column;

  width: 50%;
  height: 50%;
  background: #fff;
}
</style>
