import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: res => {
        import("@/components/index").then(module => {
          res(module);
        });
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
