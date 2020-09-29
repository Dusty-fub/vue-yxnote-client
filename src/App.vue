<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
export default {
  name: "app",
  components: {
    sidebar,
  },
};
</script>

<style>
@import '//at.alicdn.com/t/font_2079792_8c5lw6d13p6.css';
* {
  box-sizing : border-box;
  margin : 0;
  padding : 0;
}
html, body, #app {
  height : 100%;
}
body {
  font-family : 'Avenir', Helvetica, Arial, sans-serif;
  font-size : 14px;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;
  background-color : #EEEEEE;
}
a {
  text-decoration : none;
  color : #444444;
}
ul, li {
  list-style : none;
}
.btn {
  color : #666666;
  font-size : 12px;
  padding : 2px 4px;
  background-color : #FFFFFF;
  box-shadow : 0px 0px 2px 0px #CCCCCC;
  border : none;
  cursor : pointer;
  display : inline-block;
}
#app {
  display : flex;
  align-items : stretch;
}

.project-dropdown {
  max-height : 400px;
  overflow : auto;
}
.project-dropdown::-webkit-scrollbar {
  width : 5px;
  height : 5px;
  background-color : #F5F5F5;
}
.project-dropdown::-webkit-scrollbar-track {
  border-radius : 10px;
  background-color : #F5F5F5;
}

</style>