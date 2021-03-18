<template>
  <div class="hello">
    <h1>Hello, please upload a file.</h1>
    <input type="file" @change="loadFromFile" id="fileToUpload">

    <div>
      <textarea id="textToBeRead" rows="20" cols="100"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  computed: {
    fileContent() {
      return this.$store.state.fileContent;
    }
  },
  methods: {
    loadFromFile() {
      let file = document.getElementById('fileToUpload').files[0];
      let fileReader = new FileReader();
      fileReader.onload = function(fileLoadEvent) {
        let textFromLoadedFile = fileLoadEvent.target.result;
        document.getElementById('textToBeRead').value = textFromLoadedFile;
      };
      fileReader.readAsText(file, "UTF-8");
    }
  }
};
</script>

<style scoped>

</style>