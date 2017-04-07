<template>
  <div>
    <h1 class="title">Post something</h1>
    <div class="field">
      <label class="label">Message</label>
      <p class="control">
        <textarea v-model="postText" class="textarea" placeholder="Textarea"></textarea>
      </p>
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
    <a v-on:click="submitPost" class="button is-success" href="">Submit</a>
  </div>
</template>

<script>
export default {
  name: 'NewPost',
  data () {
    return {
      postText: '',
      email: '',
      isMailValid: 1,
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
        var that = this;
        $.ajax({
          type: 'post',
          url: 'newpost',
          data: {
            message: that.postText,
            email: that.email
          },
          success: function(r) {
              alert(r);
          }
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

</style>
