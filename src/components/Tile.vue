<template>
  <div class="tile is-child box">
    <h1 class="title">{{ title }}</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'tile',
  props: ['title', 'text']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile {
  background-color: tomato;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
