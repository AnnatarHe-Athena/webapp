<template>
  <div id="app">
    <nav-header :categories="categories"></nav-header>
    <transition name="fade">
      <thumbnails :cells="cells"></thumbnails>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavHeader from './components/header'
import Thumbnails from './components/thumbnails'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      cells: 'cells',
      categories: 'categories'
    })
  }

  components: {
    NavHeader,
    Thumbnails
  },
  created() {
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>
@require './styles/normalize'
#app 
  display flex
  justify-content center
  align-items center

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-active
  opacity 0
</style>
