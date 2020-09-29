<template>
  <div id="sidebar">
    <avatar />
    <div class="icons">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-Notebook"></i>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-bijiben"></i>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-huishouzhan"></i>
      </router-link>
    </div>
    <div class="logout" title="退出">
      <i class="iconfont icon-tuichu" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import avatar from "@/components/Avatar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    avatar,
  },

  methods: {
    ...mapActions(["logout"]),

    onLogout() {
      this.logout({ path: "/login" });
    },
  },
};
</script>


<style lang="less" scoped>
#sidebar {
  position : relative;
  width : 56px;
  text-align : center;
  background-color : #272F40;
}
.icons {
  margin-top : 15px;

  a {
    padding : 6px 0;
    display : block;
  }

  .router-link-active {
    background-color : #5E6266;
  }
}
.logout {
  position : absolute;
  bottom : 20px;
  width : 100%;
  text-align : center;
  cursor : pointer;
}
.iconfont {
  color : #FFFFFF;
}

</style>