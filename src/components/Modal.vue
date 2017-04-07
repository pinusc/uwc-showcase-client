<template>
  <div :id="name" class="modalDialog" v-on:click="modalClose">
      <div v-on:click="childListener" class="box notification">
          <button v-on:click="modalClose" title="Close" class="delete"></button>
          <slot>404</slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['name'],
  data () {
    return {}
  },
  methods: {
    modalClose: function () {
        if (location.hash == '#' + this.name) {
            location.hash = '';
        }
    },
    childListener: function (e) {
      e.stopPropagation();
    }
  }
}

</script>

<style>
.notification {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 50%;
  min-height: 50%;
  transform: translate(-50%,-50%);
}

.modalDialog {
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    opacity:0;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    pointer-events: none;
}
.modalDialog:target {
    opacity:1;
    pointer-events: auto;
}

.close:hover {
    background: #00d9ff;
}
</style>
