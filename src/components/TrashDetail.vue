<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>标题</div>
        <div>更新时间</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="title">{{ note.title }}</span>
            <span class="date">{{ note.updatedAtFriendly }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail" v-if="!!curTrashNote.id">
      <div class="note-bar">
        <span>创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span>|</span>
        <span>更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <span>|</span>
        <span>所属笔记本: {{ belongTo }}</span>

        <a class="btn action" @click="onClear">
          <i class="iconfont icon-qingkong"></i>清空
        </a>
        <a class="btn action" @click="onDelete">
          <i class="iconfont icon-huishouzhan1"></i>彻底删除
        </a>
        <a class="btn action" @click="onRevert">
          <i class="iconfont icon-huifu"></i>恢复
        </a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
    <div v-else class="note-empty">回收站为空</div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();

export default {
  created() {
    this.checkLogin();
    this.getNotebooks();
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId });
      })
      .catch((err) => {});
  },
  watch: {
    curTrashNote() {
      if (!!this.curTrashNote.id && this.$route.fullPath === "/trash") {
        this.$router.replace({
          path: "/trash",
          query: { noteId: this.curTrashNote.id },
        });
      } else if (!this.curTrashNote.id && this.$route.fullPath !== "/trash") {
        this.$router.replace({
          path: "/trash",
          query: {},
        });
      }
    },
  },

  computed: {
    ...mapGetters(["trashNotes", "curTrashNote", "belongTo"]),

    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "");
    },
  },

  methods: {
    ...mapMutations(["setCurTrashNote"]),

    ...mapActions([
      "checkLogin",
      "deleteTrashNote",
      "revertTrashNote",
      "clearTrashNotes",
      "getTrashNotes",
      "getNotebooks",
    ]),

    onDelete() {
      this.$confirm("删除后将无法恢复", "确定删除？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.deleteTrashNote({ noteId: this.curTrashNote.id });
        })
        .then(() => {
          this.setCurTrashNote();
          this.$router.replace({
            path: "/trash",
            query: { noteId: this.curTrashNote.id },
          });
        });
    },

    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNote.id }).then(() => {
        this.setCurTrashNote();
      });
    },
    onClear() {
      this.$confirm("清空后将无法恢复", "确定清空？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.clearTrashNotes();
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less"  scoped >
@import url(../assets/css/trash-sidebar.less);
@import url(../assets/css/trash-detail.less);

#trash {
  display : flex;
  align-items : stretch;
  background-color : #FFFFFF;
  flex : 1;
  min-width : 920px;
}

</style>