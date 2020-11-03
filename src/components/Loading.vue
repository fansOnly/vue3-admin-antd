<template>
    <div v-show="spinning" class="loading-wrapper">
        <a-spin :spinning="spinning" size="large" tip="Loading..." />
    </div>
</template>
<script>
export default {
    name: 'loading',
    props: {
        spinning: {
            type: Boolean,
            default: function() {
                return false
            }
        }
    }
}
</script>
<style scoped>
.loading-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999999999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>