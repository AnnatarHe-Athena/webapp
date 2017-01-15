<template>
    <nav class="navbar">
        <ul class="nav-container">
            <li class="nav-item" v-for="category in categories" @click="changeCurrentCate(category.id)">
                {{ category.name }}
            </li>
        </ul>
    </nav>
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
<style scoped>
.navbar
    height 5rem
    display flex
    background-color #ea4335
    color #fff

.nav-container
    display flex
    flex-wrap wrap
    flex-direction row
    overflow-y scroll

.nav-item
    display flex
    padding .5rem 1rem
</style>
