<template>
  <div id="app">
    <div class="columns">
      <div class="column is-6">
        <div class="box is-info">
          <h1 class="title is-2">UWC showcase</h1>
          <p class=subtitle>Showcase your ideas and projects here!</p>

          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary" href="#postami">Make a post</a>
            </p>
            <p class="control">
              <a class="button is-primary" href="#events-calendar">Check the calendar!</a>
            </p>
            <p class="control">
              <a class="button is-primary" href="#">Subscribe!</a>
            </p>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <div class="label">Tags:</div>
          <a class="button is-primary" href="#">Help</a>
          <a class="button is-info" href="#">Projects</a>
          <a class="button is-danger is-active is-inverted" href="#">Events</a>
          <a class="button is-success" href="#">Zhi-xhings</a>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column"> <Post v-for="(post, index) in posts" v-if="index % 5 === 0"></Post> </div>
      <div class="column"> <Post v-for="(post, index) in posts" v-if="index % 5 === 1"></Post> </div>
      <div class="column"> <Post v-for="(post, index) in posts" v-if="index % 5 === 2"></Post> </div>
      <div class="column"> <Post v-for="(post, index) in posts" v-if="index % 5 === 3"></Post> </div>
      <div class="column"> <Post v-for="(post, index) in posts" v-if="index % 5 === 4"></Post> </div>
    </div>


    <a class="button is-primary is-large" id="btn-load-more" href="">Load More...</a>
    <Modal name="postami">
      <NewPost></NewPost>
    </Modal>
    <Modal class="calendar-modal" name="events-calendar">
      <Calendar></Calendar>
    </Modal>
  </div>
</template>

<script>
import Tile from './components/Tile'
import Modal from './components/Modal'
import NewPost from './components/NewPost'
import ParentTile from './components/ParentTile'
import tilingMachine from './tilingMachine'
import Calendar from './components/Calendar'
import Post from './components/Post'
import axios from 'axios'

var app = {
  name: 'app',
  components: {
    Tile,
    Modal,
    NewPost,
    ParentTile,
    Calendar,
    Post
  },
  data () {
    return {
      showMakePost: false,
      posts: ["", "", "", "", "", "", "", "", "", ""]
    }
  },
  mounted: function() {
    axios.get(
      '/api/post',
      {
          headers: {
            'Accept': 'application/json'
          }
      }
    ).then((result) => {
      this.posts = result.data
    });
  }
}


export default app;
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

.columns {
  margin: 1em;
}

.columns .column {
  padding: 0.375em;
}

.columns .column .box {
  margin-bottom: 0.7em;
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

#btn-load-more {
  margin-bottom: 2em;
}
</style>
