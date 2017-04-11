<template>
  <div>
    <a :href="'#' + id">
      <div class="card" :class="color + ' ' + tag">
        <div class="card-image" v-if="hasImg">
          <figure class="image is-4by3">
            <img :src="'https://unsplash.it/400/300/?image=' + n " alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{title}}</p>
            </div>
          </div>
          <div class="content" v-if="!hasImg">
            {{ body.slice(0,140).concat(body.length > 140 ? "..." : "") }}
          </div>
        </div>
      </div>
    </a>
    <Modal :name="id">
      <h1 class="title is-3">{{ title }}</h1>
      <p>{{ body }}</p>
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
  data () {
    return {
      hasImg: Math.random() > 0.5,
      title: lipsum({count:1, units:'sentences'}),
      body: lipsum({count:4, units:'paragraphs'}),
      id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16); }),
      n:  Math.floor(Math.random() * (200 - 0 + 1)),
      tagi: [Math.floor(Math.random() * 3+1)],
    }
  },
  computed: {
    color: function() {
      return ["is-primary", "is-info", "is-danger", "is-success"][this.tagi]
    },
    tag: function () {
      return ["help", "projects", "events", "zhi"][this.tagi]
    }
  }
}

</script>

<style scoped>
.card {
  margin-bottom: 0.75em;
  border-radius: 0.2em;
}

.help {
}
</style>
