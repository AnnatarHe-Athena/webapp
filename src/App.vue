<template>
  <div id="app">
    <nav-header :categories="categories"></nav-header>
    <transition name="slide">
      <thumbnails :cells="cells"></thumbnails>
    </transition>
    <Modal></Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavHeader from './components/header'
import Thumbnails from './components/thumbnails'
import Modal from './components/modal'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      cells: 'cells',
      categories: 'categories'
    })
  },
  components: {
    NavHeader,
    Modal,
    Thumbnails
  },
  created() {
    this.$store.dispatch('fetchCategories')
    this.scrollObserver()
    // this.$store.dispatch('changeCurrentCategory', 1)
  },
  methods: {
    getNextPage() {
        this.$store.dispatch('getNextPage')
    },
    scrollObserver() {
        window.addEventListener('scroll', e => {
            const height = ~~document.body.getBoundingClientRect().height
            const farFromTop = ~~window.scrollY + window.screen.height
            if (farFromTop + 200 > height) {
                this.getNextPage()
            }
        })
    }
  }
}
</script>

<style lang="stylus">
@require './styles/normalize'

#app
    display flex
    justify-content center
    align-items center
    flex-direction column
    
.fade-enter-active .fade-leave-active
    transition opacity .5s
.fade-enter, .fade-leave-active
    opacity 0

.slide-fade-enter-active
    transition all .3s ease
.slide-fade-leave-active
    transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-enter, .slide-fade-leave-active
    transform translateY(10px)
    opacity 0

</style>
