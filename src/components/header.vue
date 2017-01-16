<template>
    <div class="container">
        <nav class="navbar">
            <ul class="nav-container">
                <li class="nav-item" v-for="category in categories">
                    <button class="link" @click="changeCurrentCate(category.id)">{{ category.name }}</button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['categories'],
    methods: {
        changeCurrentCate(cate) {
            this.$store.dispatch('changeCurrentCategory', cate)
        }
    }
}
</script>
<style lang="stylus" scoped>
.container
    height 5rem
    display flex
    background-color #ea4335
    color #fff
    width 100%
    justify-content center
    align-items center

.navbar
    height 5rem
    display flex
    background-color #ea4335
    color #fff

.nav-container
    display flex
    flex-wrap wrap
    flex-direction row
    padding 0

.nav-item
    display flex
    .link
        padding .5rem 1rem
        border 0
        background-color transparent
        color #fff
        transition all .35s
        &:hover
            background-color rgba(255, 255, 255, .8)
        
</style>
