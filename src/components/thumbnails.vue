<template>
    <section>
        <figure v-for="cell in cells" @click="openLargeImg(cell)">
            <img :src="'http://ww4.sinaimg.cn/bmiddle/' + cell.img" alt="">
            <figcaption>{{ cell.text }}</figcaption>
        </figure>
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
        }
    }
}
</script>