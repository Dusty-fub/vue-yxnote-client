import Router from "vue-router";

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/notebooks"
    },
    {
      path: "/notebooks",
      component: () => import("@/components/NotebookList.vue")
    },
    {
      path: "/login",
      component: () => import("@/components/Login.vue")
    },
    {
      path: "/note",
      component: () => import("@/components/NoteDetail.vue")
    },
    {
      path: "/trash",
      component: () => import("@/components/TrashDetail.vue")
    }
  ]
});
