<template>
    <div class="container">
        <div class="title">fans editor v1.0 乞丐版</div>
        <fans-editor :html="editHtml" ></fans-editor>
        <a-divider />
    </div>
</template>
<script>
import FansEditor from 'components/Funcs/fans-editor.vue'

export default {
    components: {
        FansEditor
    },
    data() {
        return {
            editHtml: '1234567890'
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
