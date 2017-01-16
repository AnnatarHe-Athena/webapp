<template>
    <transition name="fade">
        <div v-show="status" class="mask" @click="modalToggle">
            <div class="modal-container">
                <figure class="cell-container">
                    <img :src="'http://ww4.sinaimg.cn/large/' + cell.img" alt="">
                    <span class="text">{{ cell.text }}</span>
                </figure>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { MODAL_TOGGLE } from '../constants/index'

export default {
    computed: {
        ...mapGetters({
            status: 'modalStatus',
            cell: 'currentCell'
        })
    },
    methods: {
        modalToggle() {
            this.$store.commit(MODAL_TOGGLE)
        }
    }
}
</script>

<style lang="stylus" scoped>
.mask
    background-color rgba(255, 255, 255, .8)
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center
    .cell-container
        display flex
        flex-direction column
    .text
        text-align center
</style>