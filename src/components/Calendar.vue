<template>
  <vue-event-calendar :events="demoEvents"></vue-event-calendar>
</template>

<script>
export default {
  data () {
    return {
      demoEvents: [{
        date: '2016/12/15',
        title: 'Foo',
        desc: 'longlonglong description'
      },{
        date: '2016/11/12',
        title: 'Bar'
      }]
    }
  }
}
</script>

<style>
.calendar-modal .notification {
  width: 90%;
  text-align: left;
}

.cal-header {
  background-color: transparent !important;
}

</style>
