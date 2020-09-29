<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["username", "slug"]),
  },
};
</script>

<style scoped>
span {
  display : inline-block;
  width : 30px;
  height : 30px;
  text-align : center;
  line-height : 32px;
  border-radius : 50%;
  background : rgb(77, 208, 225);
  color : #FFFFFF;
  text-shadow : 1px 0 1px #795C19;
  font-weight : bold;
  text-transform : uppercase;
  font-size : 18px;
  margin-top : 15px;
}

</style>