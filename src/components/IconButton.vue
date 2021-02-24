<template>
    <div class="button">
        <button>{{this.$props.icon}}</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: `IconButton`,
    props: {
        icon: String
    }
})
</script>

<style lang="scss">
.button {
    min-height: 50px;
    min-width: 100px;
    button {
        border-radius: 5px;
    }
}
</style>
