<template>
  <div id="app">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-parent">
        <div class="tile is-child box is-info">
          <h1 class="title is-2">UWC showcase</h1>
          <p class=subtitle>Showcase your ideas and projects here!</p>

          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary" href="#postami">Make a post</a>
            </p>
            <p class="control">
              <a class="button is-primary" href="#">Check the calendar!</a>
            </p>
            <p class="control">
              <a class="button is-primary" href="#">Subscribe!</a>
            </p>
          </div>

        </div>
      </div>
      <div class="tile is-vertical is-4 is-parent">
        <tile></tile>
        <tile></tile>
      </div>
      <div class="tile is-2 is-parent">
        <tile></tile>
      </div>
      <div class="tile is-2 is-parent">
        <tile></tile>
      </div>
    </div>
    <a class="button is-primary" href="">Load More...</a>
    <Modal name="postami">
      <NewPost></NewPost>
    </Modal>
  </div>
</template>

<script>
import Tile from './components/Tile'
import Modal from './components/Modal'
import NewPost from './components/NewPost'

export default {
  name: 'app',
  components: {
    Tile,
    Modal,
    NewPost
  },
  data () {
    return {
      showMakePost: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5em;
}

html {
  background: url(/static/bg.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

div .tile.is-ancestor {
  padding-left: 1.5em;
  padding-right: 1.5em;
}

div.field.columns {
  /* margin-top: 0.5em; */
}

.field.is-grouped {
  display: inline-block;
  margin: auto;
  flex-wrap: wrap;
  justify-content: flex-center;
}

.field.is-grouped > .control:not(:last-child) {
  margin-bottom: 0.75em;
}

.field.is-grouped > .control {
  display: inline-block;
  margin: auto;
  text-align: center;
}
</style>
