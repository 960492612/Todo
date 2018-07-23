<template>
  <div class="addTodoForm" v-show="showAddTodoForm">

    <div class="form">
      <div>
        <label for="">事件标题:</label>
        <input type="text" v-model="data.title">
      </div>
      <div>
        <label for="">事件详情:</label>
        <input type="text" v-model="data.info">
      </div>
      <div>
        <label for="">权重(1-5):</label>
        <input type="text" v-model="data.weight">
      </div>

      <div class="controls">
        <input type="button" value="取消" @click="cancel">
        <input type="button" value="确认" @click="sure">
      </div>
    </div>

  </div>
</template>
<script>
// import { createNamespacedHelpers } from 'vuex'
// import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      data: {
        title: null,
        info: null,
        weight: 2
      },
      showAddTodoForm: false
    };
  },
  computed: {
    // ...mapGetters(["showAddTodoForm"])
  },
  actived() {
    this.data = {
      title: null,
      info: null,
      weight: 2
    };
  },
  watch: {},
  methods: {
    toggleShow() {
      this.showAddTodoForm = !this.showAddTodoForm;
    },
    cancel() {
      this.toggleShow();
    },
    sure() {
      this.$emit("addTodo", this.data);
      this.toggleShow();
    }
  }
};
</script>
<style lang="scss">
.addTodoForm {
  position: fixed;
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
  width: 50%;
  height: 50%;
  background: #fff;
  text-align: center;
  padding-top: 20px;
  box-sizing: border-box;
  div {
    height: 44px;
    line-height: 44px;
    input {
      height: 30px;
      outline: none;
      border: none;
      border-bottom: 1px solid #777;
    }
  }
}
</style>
