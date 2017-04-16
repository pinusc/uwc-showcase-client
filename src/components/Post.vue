<template>
  <div class="post">
      <a :href="'#' + post._id">
        <div class="card" :class="">
          <div class="card-image is-hidden-mobile" v-if="hasImg">
            <figure class="image is-4by3">
              <img :src="'https://unsplash.it/400/300/?image=' + n " alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left is-hidden-tablet" v-if="hasImg">
                <figure class="is-4by3">
                  <img :src="'https://unsplash.it/400/300/?image=' + n " alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                  <p class="title">{{post.title}}</p>
              </div>
            </div>
            <div class="content" v-if="!hasImg" v-html='post.body ? post.body.slice(0,140).concat(post.body.length > 140 ? "..." : "") : ""'>
            </div>
          </div>
        </div>
      </a>
    <Modal :name="post._id">
      <h1 class="title is-3">{{ post.title }}</h1>
      <p v-html="post.body || ''"></p>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal.vue'
import lipsum from 'lorem-ipsum'

export default {
  name: 'Post',
  components: {
    Modal
  },
  props: ["post"],
  data () {
    return {
      hasImg: Math.random() > 0.5,
      n:  Math.floor(Math.random() * (200 - 0 + 1)),
      tagi: [Math.floor(Math.random() * 3+1)],
      tagj: [Math.floor(Math.random() * 3+1)],
    }
  },
  computed: {
    tags: function () {
      return ["help", "projects", "events", "zhi"][this.tagi]
    }
  }
}

</script>

<style scoped lang="scss">
@import "../../static/css/sass/utilities/variables";
@import "../../static/css/sass/utilities/mixins";
.post {
  width: 100%;
  padding: 0.375em;
  @include tablet {
    width: 50%;
  }
  @include desktop {
    width: 33%;
  }
  @include widescreen {
    width: 25%;
  }
  @include fullhd {
    width: 20%;
  }
}

.card {
  border-radius: 0.2em;
  .media-left img {
    max-height: 5em;
    width: auto;
    border: 1px #ddd solid;
  }
}

/*.card:hover {
  transition: transform 1.4s;
  transform: scale(1.04);
  box-shadow: 0px 5px 100px 0px rgba(0,0,0,0.75);
}*/

.help {
  background-color: tomato;
}

.projects {
  background-color: yellow;
}
.events {
  background-color: blue;
}
.zhi {
  background-color: red;
}
</style>
