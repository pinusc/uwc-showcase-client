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
              <a class="button is-primary" href="#events-calendar">Check the calendar!</a>
            </p>
            <p class="control">
              <a class="button is-primary" href="#">Subscribe!</a>
            </p>
          </div>

        </div>
      </div>
    </div>
    <a class="button is-primary" href="">Load More...</a>
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
import axios from 'axios'



tilingMachine();

var parents = [{
    'title': 'foo',
    'isParent': 0
}, {
    'isParent': 1,
    'isVertical': 'is-vertical',
    'childList': [{
        'title': "Lorem",
        'isParent': 0
    }, {
        'title': "Ipsum",
        'isParent': 0
    }, {
        'title': "Whoo",
        'isParent': 0
    }]
}, {
    'title': 'de',
    'isParent': 0
}];


var app = {
  name: 'app',
  components: {
    Tile,
    Modal,
    NewPost,
    ParentTile,
    Calendar,
  },
  data () {
    return {
      showMakePost: false,
      parents: parents,
      demoEvents: [{
        date: '2016/12/15',
        title: 'Foo',
        desc: 'longlonglong description'
      },{
        date: '2016/11/12',
        title: 'Bar'
      }]
    }
  },
  mounted: function() {
    /*axios.get(
      '/api/post',
      {
          headers: {
            'Accept': 'application/json'
          }
      }
    ).then((result) => {
      //this.parents = result.data
    });*/
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
