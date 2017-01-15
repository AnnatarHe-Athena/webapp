<template>
    <transition name="fade">
        <div v-show="status" class="mask" @click="modelToggle">
            <div class="modal-container">
                <figure>
                    <img :src="'http://ww4.sinaimg.cn/large/' + cell.img" alt="">
                    <span>{{ cell.text }}</span>
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

<style scoped>
.mask
    background-color rgba(255, 255, 255, .8)
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    display flex
</style>