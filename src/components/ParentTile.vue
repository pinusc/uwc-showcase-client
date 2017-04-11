<template>
  <div class="tile is-parent">
    <template v-for="child in childList">
      <Tile v-if="!(child.isParent)" :title="child.title" body="Lorem ipsum"></Tile>
      <ParentTile v-else :childList="child.childList":class="child.n ? child.n : '' + ' ' + child.isVertical"></ParentTile>
    </template>
  </div>
</template>

<script>
import Tile from './Tile'

export default {
  components: {
    Tile
  },
  name: 'ParentTile',
  props: ['childList'],
  beforeCreate: function () {
    this.$options.components.ParentTile = require('./ParentTile.vue')
  }
}
</script>

<style></style>
