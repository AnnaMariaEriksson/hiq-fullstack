<template>
  <div class="hello">
    <h1>Hello, please upload a file.</h1>
    <form @submit.prevent="submitFile">
      <input type="file" @change="loadFromFile" id="file" />
      <button>Upload</button>
    </form>

    <div>
      <textarea id="textToBeRead" rows="20" cols="100" />
    </div>
    <button @click="analyzeContent">Calculate stuff!</button>
  </div>
</template>

<script>
let fileContent = "";

export default {
  name: "Upload",
  methods: {
    loadFromFile() {
      let file = document.getElementById("file").files[0];
      let fileReader = new FileReader();
      fileReader.onload = function(fileLoadEvent) {
        let textFromLoadedFile = fileLoadEvent.target.result;
        fileContent = textFromLoadedFile;
        document.getElementById("textToBeRead").value = textFromLoadedFile;
      };
      fileReader.readAsText(file, "UTF-8");
    },
    analyzeContent() {
      let keys = [];
      let listOfOccuringWords = {};
      let wordTokens = fileContent.split(/\W+/);
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
        if (listOfOccuringWords[b] > listOfOccuringWords[a]) {
          return listOfOccuringWords[b] - listOfOccuringWords[a];
        }
      });
      for (let i = 0; i < keys.length; i++) {
        console.log(`${keys[i]}: ${listOfOccuringWords[keys[i]]}`);
      }
    }
  }
};
</script>

<style scoped></style>
