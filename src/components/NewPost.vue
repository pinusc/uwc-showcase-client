<template>
  <div>
    <h1 class="title">Post something</h1>
    <div class="field">
      <label class="label">Title</label>
      <input type="text" class="input" v-model="title">
    </div>
    <div class="field">
      <label class="label">Message</label>
      <div class="field">
        <quill-editor v-model=content ></quill-editor>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <p class="control has-icon has-icon-right">
        <input v-model="email" class="input" :class="'is-' + ['success', 'danger', 'danger'][isMailValid]" type="text" placeholder="Email input" value="someone@example.com">
        <span class="icon is-small">
          <i class="fa fa-warning"></i>
        </span>
      </p>
      <p class="help" :class="'is-' + ['success', 'danger', 'danger'][isMailValid]">{{ ["This is a valid email", "This email is invalid", "Please enter a uwcchina.org email"][isMailValid] }}</p>
    </div>
    <a v-on:click="submitPost" class="button is-success" href="#" :disabled="isMailValid > 0">Submit</a>
  </div>
</template>

<script>
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'

export default {
  name: 'NewPost',
  components: {
    VueQuillEditor
  },
  data () {
    return {
      postText: '',
      email: '',
      title: '',
      isMailValid: 1,
      content: "<h3>Write your post here!</h3>"
    }
  },
  watch: {
    email: function(newEmail) {
      if (validateEmail(newEmail)) {
        if (newEmail.toLowerCase().endsWith("@uwcchina.org")){
          this.isMailValid = 0;
        } else {
          this.isMailValid = 2;
        }
      } else {
        this.isMailValid = 1;
      }
    }
  },
  methods: {
    submitPost: function() {
      if (! this.isMailValid) {
        axios.post(
          '/api/post',
          {
            body: this.content,
            title: this.title,
            email: this.email
          }
        ).then((result) => {
          console.log(result)
          this.posts = result.data
        });
      }
    }
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
</script>

<style>
#editor-control {
  max-height: 50%;
}

</style>
