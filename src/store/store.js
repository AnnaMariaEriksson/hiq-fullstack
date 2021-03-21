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
    async uploadFile({ commit }, fc) {
      console.log(fc);
      try {
        let response = await fetch("/files", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fc)
        });
        console.log(response);
        let newFile = await response.json();
        console.log(newFile);
        commit("setFiles", newFile);
      } catch (e) {
        e.message;
      }
    },
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
    async getTextFromFile({ commit }, id) {
      try {
        let response = await fetch("/files/" + id);
        let data = await response.json();
        console.log(data);
        commit("setFileContent", data);
      } catch (e) {
        e.message;
      }
    },
    async getAllFiles({ commit }) {
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
