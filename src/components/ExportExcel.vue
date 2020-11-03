<template>
    <export-excel
        :fields="EXCEL_FIELDS"
        :data="excelData"
        :before-generate="startDownload"
        :before-finish="finishDownload"
        :name="EXCEL_NAME"
        type="xls"
    >
        <a-button>{{btnName}}</a-button>
    </export-excel>
</template>

<script>
import JsonExcel from 'vue-json-excel'

export default {
    name: 'ExportExcel',
    components: {
        'export-excel': JsonExcel
    },
    props: {
        EXCEL_FIELDS: {
            type: Object,
            default: function() {
                return {};
            }
        },
        excelData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        EXCEL_NAME: {
            type: String,
            default: function() {
                return '';
            }
        },
        btnName: {
            type: String,
            default: function() {
                return '导出';
            }
        }
    },
    methods: {
        startDownload() {
            this.$emit('export-excel');
        },
        finishDownload() {}
    }
};
</script>
