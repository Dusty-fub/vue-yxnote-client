<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">
        {{ !curNote.miss ? "你的笔记空空如也" : "笔记无法查看或已被删除" }}
      </div>

      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期: {{ curNote.createdAtFriendly }}</span>
          <span>更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span
            class="iconfont icon-huishouzhan"
            @click="onDeleteNote"
            title="删除"
          ></span>
          <span
            class="iconfont"
            :class="isShowPreview ? 'icon-tubiao09' : 'icon-xianshi'"
            @click="isShowPreview = !isShowPreview"
            :title="isShowPreview ? '编辑' : '预览'"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <textarea
            v-show="!isShowPreview"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="
              (e) => {
                statusText = '正在输入...';
                supportTab(e);
              }
            "
            placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/neat.css";

let md = new MarkdownIt();

export default {
  components: {
    NoteSidebar,
    codemirror,
  },

  created() {
    this.checkLogin();
  },
  watch: {
    curNote() {
      if (this.notes.length && this.notebooks.length) {
        if (!this.$route.query.noteId || !this.$route.query.notebookId) {
          this.$router.push({
            path: "/note",
            query: {
              noteId: this.curNote.id,
              notebookId: this.curBook.id,
            },
          });
        }
      } else if (this.notebooks.length) {
        if (!this.$route.query.notebookId) {
          this.$router.push({
            path: "/note",
            query: {
              notebookId: this.curBook.id,
            },
          });
        }
      }
    },
  },

  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
      cmOptions: {
        tabSize: 4,
        mode: "text/x-markdown",
        theme: "neat",
        lineNumbers: false,
        line: true,
      },
    };
  },

  computed: {
    ...mapGetters(["notes", "notebooks", "curNote", "curBook"]),

    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },

  methods: {
    ...mapMutations(["setCurNote"]),

    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),

    supportTab(e) {
      var TABKEY = 9;
      if (e.keyCode === TABKEY) {
        this.curNote.content += "   ";
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }
    },

    onUpdateNote: _.debounce(function () {
      if (!this.curNote.id) return;
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content,
      })
        .then((data) => {
          this.statusText = "已保存";
        })
        .catch((data) => {
          this.statusText = "保存出错";
        });
    }, 3000),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then((data) => {
        this.$router.replace({ path: "/note" });
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less"  scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #ffffff;
  flex: 1;
  min-width: 920px;
}
</style>