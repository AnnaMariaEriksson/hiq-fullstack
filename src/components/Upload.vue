<template>
  <div class="hello">
    <h1>Hello, please upload a file.</h1>
    <form @submit.prevent="submitFile">
      <input type="text" v-model="content" placeholder="Type something here." />
      <input type="file" @change="loadFromFile" id="file" ref="file" />
      <button>Upload</button>
    </form>

    <div>
      <textarea id="textToBeRead" rows="20" cols="100" />
    </div>
    <button @click="analyzeContent">Calculate stuff!</button>

  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      content: ""
    }
  },
  computed: {
    files() {
      return this.$store.state.files;
    },
    file() {
      return this.$store.state.file
    }
  },
  created() {
    this.$store.dispatch("getAllFiles");
  },
  methods: {
    loadFromFile() {
      let file = document.getElementById("file").files[0];
      let fileReader = new FileReader();
      let thisUpload = this;
      fileReader.onload = function(fileLoadEvent) {
        thisUpload.fileContent = fileLoadEvent.target.result;
        document.getElementById("textToBeRead").value = thisUpload.fileContent;
      };
      fileReader.readAsText(file, "UTF-8");
    },
    analyzeContent() {
      let keys = [];
      let listOfOccuringWords = {};
      let wordTokens = this.fileContent.split(/\W+/); // TODO maybe change this.fileContent to another variable?
      for (let i = 0; i < wordTokens.length; i++) {
        let word = wordTokens[i];
        if (listOfOccuringWords[word] === undefined) {
          listOfOccuringWords[word] = 1;
          keys.push(word);
        } else {
          listOfOccuringWords[word]++;
        }
      }
      keys.sort(function(a, b) {
        if (listOfOccuringWords[a] > listOfOccuringWords[b]) {
          return -1
        }
        if (listOfOccuringWords[a] < listOfOccuringWords[b]) {
          return 1
        }
        return 0
      });
      for (let i = 0; i < keys.length; i++) {
        console.log(`${keys[i]}: ${listOfOccuringWords[keys[i]]}`);
      }
    },
    submitFile() {
      let fc = {
        content: this.fileContent
      };
      this.$store.dispatch("postContent", fc);
    }
  }
};
</script>

<style scoped></style>
