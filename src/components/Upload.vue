<template>
  <div class="hello">
    <h1>Hello, please upload a file.</h1>
    <form @submit.prevent="submitFile">
      <input type="file" @change="loadFromFile" id="file" ref="file" />
      <button>Upload</button>
    </form>

    <div>
      <h3>Instructions:</h3>
      <p>
        Choose a file, then click upload. <br />
        After that, press the 'Fetch latest file' button. <br />
        Finally, press the 'Calculate stuff' button.
      </p>
    </div>

    <div>
      <textarea id="textToBeRead" rows="20" cols="100" />
    </div>
    <button @click="fetchLatestFile">Fetch latest file</button>
    <button @click="analyzeContent">Calculate stuff!</button>
  </div>
</template>

<script>
export default {
  name: "Upload",
  computed: {
    files: {
      get() {
        return this.$store.state.files;
      },
      set(value) {
        this.$store.commit("setFiles", value);
      }
    },
  },
  created() {
    this.$store.dispatch("getLastFile");
  },
  methods: {
    loadFromFile() {
      let file = document.getElementById("file").files[0];
      let fileReader = new FileReader();
      let thisUpload = this;
      fileReader.onload = function(fileLoadEvent) {
        thisUpload.fileContent = fileLoadEvent.target.result;
      };
      fileReader.readAsText(file, "UTF-8");
    },

    //Get the file we just uploaded from the DB.
    fetchLatestFile() {
      // might need to restart the client in order for this to work for some reason
      document.getElementById("textToBeRead").value = this.files[
        this.files.length - 1
      ].content;
    },

    // huge method below, but could not be fixed any other way in the little time I had to do this project.
    //Would've broken this out to three methods probably.
    analyzeContent() {
      let keys = [];
      let listOfOccuringWords = {};

      //Split the content of the file and add each single word to a list
      let wordTokens = this.files[0].content.split(/\W+/);
      for (let i = 0; i < wordTokens.length; i++) {
        let word = wordTokens[i];
        if (listOfOccuringWords[word] === undefined) {
          listOfOccuringWords[word] = 1;
          keys.push(word);
        } else {
          listOfOccuringWords[word]++;
        }
      }

      //sort the most common words by most used
      keys.sort(function(a, b) {
        if (listOfOccuringWords[a] > listOfOccuringWords[b]) {
          return -1;
        }
        if (listOfOccuringWords[a] < listOfOccuringWords[b]) {
          return 1;
        }
        return 0;
      });
      let mostUsedWord = keys[0];
      let res = this.files[0].content.replaceAll(
        mostUsedWord,
        `foo:${mostUsedWord}:bar`
      );
      //Add the prefix/suffix words back to the text area
      document.getElementById("textToBeRead").value = res;
    },

    //Submit the uploaded file to the DB, step one.
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
