import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileContent: ""
  },
  mutations: {
    setFileContent(state, value) {
      state.fileContent = value;
    }
  },
  actions: {
    async uploadFile({ commit }, file) {
      let response = await fetch("/upload", {
        method: "post",
        body: file
      });
      console.log(response)
      let newFile = await response.json();
      console.log(newFile);
      commit("setFileContent", newFile);
    },
    async getTextFromFile({commit}) {
      let response = await fetch("/upload");
      let data = await response.text()
      console.log(data);
      commit("setFileContent", data)
    }
  },
  modules: {}
});
