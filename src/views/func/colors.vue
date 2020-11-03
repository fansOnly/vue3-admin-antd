<template>
    <div class="container">
        <div class="title">fans color picker v1.0 乞丐版</div>
        <ColorPicker :value="color" />
    </div>
</template>
<script>
import ColorPicker from 'components/ColorPicker/index.vue';

export default {
    components: {
        ColorPicker
    },
    data() {
        return {
            color: '#f60'
        };
    },
    methods: {
    }
};
</script>
<style scoped>
.title {
    margin-bottom: 15px;
    font-size: 18px;
}
</style>
