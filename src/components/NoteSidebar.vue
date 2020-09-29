<template>
  <div class="note-sidebar">
    <span v-if="curBook.id" class="btn add-note" @click="onAddNote">
      + 添加笔记
    </span>
    <span v-else class="notebook-title">无笔记本</span>
    <el-dropdown
      v-if="curBook.id"
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <i class="iconfont icon-LC_icon_down_line"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div class="project-dropdown">
          <el-dropdown-item
            :key="notebook.id"
            v-for="notebook in notebooks"
            :command="notebook.id"
          >
            {{ notebook.title }}
          </el-dropdown-item>
          <el-dropdown-item command="trash">回收站</el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="menu">
      <div>标题</div>
      <div>更新时间</div>
    </div>
    <ul class="notes">
      <li :key="note.id" v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="title">{{ note.title }}</span>
          <span class="date">{{ note.updatedAtFriendly }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  created() {
    this.getNotebooks()
      .then(() => {
        this.setCurBook({ curBookId: this.$route.query.notebookId });

        if (this.curBook.id)
          return this.getNotes({ notebookId: this.curBook.id });
      })
      .then(() => {
        if (this.curBook.miss) {
          this.$router.push("/notebooks");
        }
        this.setCurNote({ curNoteId: this.$route.query.noteId });
      });
  },

  computed: {
    ...mapGetters(["notebooks", "notes", "curBook", "curNote"]),
  },

  methods: {
    ...mapMutations(["setCurBook", "setCurNote"]),

    ...mapActions(["getNotebooks", "getNotes", "addNote"]),

    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.$store.commit("setCurBook", { curBookId: notebookId });
      this.getNotes({ notebookId }).then(() => {
        this.setCurNote(this.curNote.id);
        this.$route.query.noteId = this.curNoteId;
        this.$route.query.notebookId = this.curBookId;
      });
    },

    onAddNote() {
      this.addNote({ notebookId: this.curBook.id }).then((res) => {
        this.$router.push({
          path: "/note",
          query: {
            noteId: res.data.id,
          },
        });
      });
    },
  },
};
</script>


<style lang="less"  scoped>
@import url(../assets/css/note-sidebar.less);

</style>
