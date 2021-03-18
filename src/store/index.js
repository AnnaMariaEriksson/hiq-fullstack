import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileContent: "Hello there, this is text in a fake file, coming from store."
  },
  mutations: {
    setFileContent(state, value) {
      state.fileContent = value;
    }
  },
  actions: {},
  modules: {}
});
