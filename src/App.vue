<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <img src="/static/uwclogo.svg" alt="">
        <h1 class="title is-1">showcase</h1>
      </div>
      <div class="hero-footer">
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-primary" href="#postami">Make a post</a>
          </p>
          <p class="control">
            <a class="button is-primary" href="#events-calendar">Check the calendar!</a>
          </p>
          <div class="field" :class="showSubscribe ? 'has-addons' : ''">
            <p class="control">
              <button id="subscribe" :class="subscribed ? 'is-success' : 'is-primary'" class="button" v-on:click="subscribe">
                {{ subscribed ? 'Successfully subscribed!' : 'Subscribe' }}
              </button>
            </p>
            <p id="subscribeEmailFieldContainer" class="control has-icon is-expanded" :class="showSubscribe ? '' : 'hide'">
              <input v-model="emailSubscribe" id="emailField" class="input subscribe" :class="'is-' + ['success', 'danger'][isMailValid]" type="email" placeholder="Email input" value="someone@example.com">
              <span class="icon is-small">
                <i class="fa fa-envelope"></i>
              </span>
            </p>
          </div>
          <p class="control">
            <button v-on:click="showLabels = !showLabels" class="button is-primary">Filter</button>
          </p>
          <div id="labelsContainer" class="field" :class="showLabels ? '' : 'hide'">
              <a v-on:click="toggleTag" :class="!(tags.help) ? 'is-grey' : ''" id="tag-help" class="tag is-medium is-primary" href="#">Help</a>
              <a v-on:click="toggleTag" :class="!(tags.projects) ? 'is-grey' : ''" id="tag-projects" class="tag is-medium is-warning" href="#">Projects</a>
              <a v-on:click="toggleTag" :class="!(tags.events) ? 'is-grey' : ''" id="tag-events" class="tag is-medium is-danger is-active is-inverted" href="#">Events</a>
              <a v-on:click="toggleTag" :class="!(tags.zhi) ? 'is-grey' : ''" id="tag-zhi" class="tag is-medium is-success" href="#">Zhi-xhings</a>
          </div>

        </div>
      </div>
            <!-- <div class=""> -->
            <!--   <div class="label">Tags:</div> -->
            <!--   <a v-on:click="toggleTag" :class="!(tags.help) ? 'is-grey' : ''" id="tag-help" class="tag is-medium is-primary" href="#">Help</a> -->
            <!--   <a v-on:click="toggleTag" :class="!(tags.projects) ? 'is-grey' : ''" id="tag-projects" class="tag is-medium is-warning" href="#">Projects</a> -->
            <!--   <a v-on:click="toggleTag" :class="!(tags.events) ? 'is-grey' : ''" id="tag-events" class="tag is-medium is-danger is-active is-inverted" href="#">Events</a> -->
            <!--   <a v-on:click="toggleTag" :class="!(tags.zhi) ? 'is-grey' : ''" id="tag-zhi" class="tag is-medium is-success" href="#">Zhi-xhings</a> -->
            <!-- </div> -->
    </section>
    <div id="postContainer" v-masonry transition-duration="0.3s" item-selector=".post">
      <!-- <Post v-masonry-tile class="item" v-for="(item, index) in blocks"></Post> -->
      <Post v-masonry-tile v-for="(post, index) in posts" :post="post" :key="post._id"></Post>
    </div>
    <button class="button is-primary is-large" id="btn-load-more" v-on:click='getMorePosts(10)'>Load More...</button>
    <Modal name="postami"> <NewPost></NewPost>
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
      posts: [],
      tags: {'help': 1, 'projects': 1, 'events': 1, 'zhi': 1},
      w: 0,
      breakpoints: {},
      showSubscribe: false,
      isMailValid: false,
      emailSubscribe: '',
      subscribed: false,
      showLabels: false
    }
  },
  mounted: function() {
    this.getMorePosts(10);
    window.addEventListener('resize', this.resized);
    this.resized();
  },
  methods: {
    getMorePosts: function (limit) {
      var url = "/api/post/?&optSort=createdAt&optDirection=-1"
      var limit = limit !== undefined ? "&optLimit=" + limit : '';
      var skip = this.posts.length ? "&optSkip=" + this.posts.length : '';
      url += limit + skip;
      console.log("URLLLL");
      console.log(url);
      axios.get(
        url,
        {
            headers: {
              'Accept': 'application/json'
            }
        }
      ).then((result) => {
        this.posts = this.posts.concat(result.data)
      });
    },
    resized: function(e) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.w = w;
      this.breakpoints = {
        mobile: w <= 768,
        tablet: w > 768,
        tablet_only: w > 768 && w <= 999,
        touch: w <= 999,
        desktop: w > 999,
        desktop_only: w > 999 && w <= 1191,
        widescreen: w > 1191,
        widescreen_only: w > 1192 && w <= 1383,
        fullhd: w >= 1384
      }
    },
    toggleTag: function (event) {
      this.tags[event.target.id.slice(4)] = !this.tags[event.target.id.slice(4)];
      console.log(this.tags);
    },
    subscribe: function (event) {
      if (validateEmail(this.emailSubscribe)) {
        axios.post('/api/user',
          {
            subscribed:true,
            email: this.emailSubscribe
          }
        ).then((result) => {
          if(result.status === 201) {
            this.subscribed = true;
            window.setTimeout(() => {this.subscribed = false}, 3000);
          } else {
            console.log(result);
          }
        });
      }
      this.showSubscribe = !this.showSubscribe;
      this.emailSubscribe = '';
    }
  },
  computed: {
    nCol: function() {
      var n = 5;
      if (!this.breakpoints.widescreen) n = 4;
      if (!this.breakpoints.desktop) n = 3;
      return n;
    },
  },
  watch: {
    emailSubscribe: function(newEmail) {
      console.log("sss");
      if (validateEmail(newEmail)) {
        this.isMailValid = 0;
      } else {
        this.isMailValid = 1;
      }
    }
  },
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export default app;
</script>

<style lang="scss">
// 1. Import the initial variables
//@import "../static/css/sass/utilities/variables";

$primary: #1B92AD;
$success: #009482;
$info: #004A97;

$danger: #E53D00;
$warning: #E8D622;
// $danger: $blue;

@import "../static/css/bulma";
@import url('https://fonts.googleapis.com/css?family=Rock+Salt');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.columns {
  margin: 1em;

  .column {
    padding: 0.375em;

    .box {
      margin-bottom: 0.7em;
    }
  }
}

html {
  /*background: url(/static/bg.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;*/
  background: $primary;
  padding-bottom: 5em;
}

section.hero {
  $heroFontSize: 6rem;
  //box-shadow: 0px 5px 64px -3px rgba(0,0,0,0.75);
  border-radius: 0.3em;
  margin: 1.5em;
  font-family: 'Quicksand', sans-serif;

  .title {
    font-family: 'Libre Baskerville', cursive;
    font-size: $heroFontSize;
    margin-top: 3rem;
    margin-left: 0.3em;
    //transform: rotate(-4deg);
    float: left;
  }

  .subtitle {
    font-weight: $weight-semibold;
  }

  img {
    height: $heroFontSize;
    margin-top: 3rem;
    margin-left: 3rem;
    float: left;
  }

  .hero-footer {
    padding: 1em;
    > .field.is-grouped {
      flex-wrap: wrap;
      justify-content: center;
    }
    .field {
      max-width: 100%;
      transition: all ease 0.3s;
      .control {
        transition: all ease 0.3s;
      }
      #subscribeEmailFieldContainer, #labelsContainer {
        width: 23em;
        max-height: 2.25em;
        transition: width linear 0.3s;
        overflow: hidden;
      }

      #labelsContainer {
        max-height: 2em;
      }

      &:not(:last-child) {
        margin-right: 0.75em;
      }
    }
  }
}

#postContainer {
  margin: 0.5em;
  @include desktop {
    margin: 1em;
  }
}

.control {
  margin-bottom: 0.5em !important;
}

input.subscribe {
  border-width: 2px;
  padding-bottom: 0;
  padding-top: 0;
  &.is-success {
    color: $success;
  }
  &.is-danger {
    color: $danger;
  }
}

.hide {
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
}


.subscribe-enter-active, .subscribe-leave-active {
  transition: all 0.3s;
}

.subscribe-enter, .subscribe-leave-to {
  transform: scaleX(0);
  transform-origin: left;
}


.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.is-grey {
  opacity: 0.5;
}

.tag {
  transition: opacity linear 0.2s;
}
</style>
