<template>
    <section class="thumbnails">
        <transition-group name="fade" class="thumbnails-container" tag="section">
            <figure class="thumbnails-item" v-for="cell in cells" @click="openLargeImg(cell)" :key="cell.id">
                <img :src="'https://ww4.sinaimg.cn/bmiddle/' + cell.img" alt="">
                <figcaption class="text">{{ cell.text }}</figcaption>
            </figure>
        </transition-group>
        <div class="next-container">
            <button class="next" @click="nextPage">下一页</button>
        </div>
    </section>
</template>
<script>
import { MODAL_TOGGLE, IMAGE_CURRENT_CHANGE } from '../constants/index'
import { mapGetters } from 'vuex'

export default {
    props: ['cells'],
    methods: {
        openLargeImg(cell) {
            this.$store.commit(IMAGE_CURRENT_CHANGE, cell)
            this.$store.commit(MODAL_TOGGLE)
        },
        nextPage() {
            this.$store.dispatch('getNextPage')
        }
    }
}
</script>
<style lang="stylus" scoped>
$nextColor = #9e9e9e
.thumbnails
    display flex
    justify-content center
    align-items center
    flex-direction column
.thumbnails-container
    display flex
    justify-content center
    align-items center
    flex-direction row
    flex-wrap wrap
    width 100%
    .thumbnails-item
        display flex
        flex-direction column
        padding .2rem
        box-shadow 0 0 .5rem #888
    .text
        text-align center
.next-container
    display flex
    justify-content center
    align-items center
    padding 2rem 0
    .next
        padding 1rem 2rem
        background-color $nextColor
        color #fff
        border 0
        &:hover
            background-color darken($nextColor, 10%)

</style>
