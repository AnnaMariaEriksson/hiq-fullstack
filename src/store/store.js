import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    files: [],
    file: {
      content: ""
    }
  },
  mutations: {

    setFileContent(state, value) {
      state.file = value;
    },
    setFiles(state, value) {
      state.files = value;
    }
  },
  actions: {
    async postContent({ commit }, fc) {
      console.log(fc);
      let response = await fetch("/files", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fc)
      });
      let newFileContent = await response.json();
      console.log(newFileContent);
      commit("setFiles", newFileContent);
    },
    async getLastFile({ commit }) {
      try {
        let response = await fetch("/files");
        let data = await response.json();
        commit("setFiles", data);
      } catch (e) {
        e.message;
      }
    }

  },
  modules: {}
});
