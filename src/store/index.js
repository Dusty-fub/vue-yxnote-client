import Vuex from "vuex";
import notebook from "./modules/notebook";
import note from "./modules/note";
import trash from "./modules/trash";
import user from "./modules/user";

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    trash,
    user
  }
});
