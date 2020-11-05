<template>
    <export-excel
        :fields="fields"
        :data="data"
        :before-generate="startDownload"
        :before-finish="finishDownload"
        :name="name"
        type="xls"
    >
        <a-button>{{buttonText}}</a-button>
    </export-excel>
</template>

<script>
import JsonExcel from 'vue-json-excel'

export default {
    name: 'exportExcel',
    components: {
        'export-excel': JsonExcel
    },
    props: {
        fields: {
            type: Object,
            default: function() {
                return {};
            }
        },
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        name: {
            type: String,
            default: ''
        },
        buttonText: {
            type: String,
            default: '导出'
        }
    },
    methods: {
        startDownload() {
            // this.$emit('export-excel')
        },
        finishDownload() {}
    }
};
</script>
