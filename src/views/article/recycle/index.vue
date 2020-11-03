<template>
	<page-skeleton
        :selected-row-keys="selectedRowKeys"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        @delete-multi-items="handleBulkDelete"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
    >
        <!-- 渲染筛选条件 -->
        <template #filterBeforeSlot="{ filterValues }">
            <a-col v-if="filterList.FILTER_SECTION_ID" :span="6">
                <a-form-model-item :label="$t('GLOBAL.DATA_SECTION')">
                    <a-tree-select
                        style="width: 100%"
                        v-model="filterValues.fsectionid"
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_SECTION')"
                        allow-clear
                        tree-default-expand-all
                        tree-data-simple-mode
                        :tree-data="treeData"
                    />
                </a-form-model-item>
            </a-col>
        </template>
        <template #filterAfterSlot="{ filterValues }">
            <a-col v-if="filterList.FILTER_CREATE_TIME" :span="6">
                <a-form-model-item :label="$t('GLOBAL.DELETE_DATE')" >
                    <a-date-picker v-model="filterValues.delete_time" :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DELETE_DATE')" style="width: 100%" />
                </a-form-model-item>
            </a-col>
        </template>
        <!-- 渲染操作按钮 -->
        <template v-slot:optionSlot>
            <a-button v-if="dataList.length" style="margin-right:10px;" type="default" @click="AllEmpty">{{$t('GLOBAL.TEXT_CLEAR')}}</a-button>
        </template>
        <template v-slot:bulkOptionSlot>
            <a-button style="margin-right:10px;" type="default" @click="handleBulkRestore">{{$t('GLOBAL.TEXT_BATCH_RESTORE')}}</a-button>
        </template>
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <template v-slot:thumbSlot="action" >
                    <span v-if="!action || !action.length">{{$t('GLOBAL.TEXT_EMPTY')}}</span>
                    <a v-else-if="action[0].state == 1" href="javascript:;"><img :src="action[0].path" style="width:30px;height:30px;" :alt="action[0].name" @click="handlePhotoPreview(action[0])"></a>
                    <span v-else style="color:red;">{{$t('GLOBAL.TEXT_FILE_MISSING')}}</span>
                </template>
                <!-- <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-popconfirm :title="$t('GLOBAL.OPTION_RESTORE_CONFIRM')" @confirm="() => restoreItem(record.id)">
                        <a-button size="small" type="" >{{$t('GLOBAL.TEXT_RESTORE')}}</a-button>
                    </a-popconfirm>
                    <span>&nbsp;</span>
                    <a-popconfirm :title="$t('GLOBAL.OPTION_DELETE_CONFIRM')" @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >{{$t('GLOBAL.TEXT_DELETE')}}</a-button>
                    </a-popconfirm>
                </span> -->
            </a-table>
        </template>
	</page-skeleton>
</template>

<script>
import PageSkeleton from 'components/PageSkeleton.vue'

import { getArticleRecycleList as getDataList, restoreArticle as restoreDataList, clearArticle as deleteDataList, getSectionTree as getTree, clearAll } from '@/api/article'
import config from './config'

export default {
    name: 'articleRecycle',
    components: {
        PageSkeleton,
    },
    data() {
        return {
            optionList: config.optionList,
            excelConfig: config.excelConfig,
            columnList: config.columnList,
            filterList: config.filterList,
            pagination: config.pagination,
            dataList: [],
            loading: true,
            selectedRowKeys: [],
            filterValues: {}, // 筛选条件
            photoPreviewVisible: false,
            previewPhoto: '',
            treeData: []
        };
    },
    computed: {
        rowSelection () {
            let { selectedRowKeys } = this;
            return {
                selectedRowKeys,
                onChange: this.checkItems,
            }
        }
    },
    created () {
        this.getTreeFn();
        this.getDataListFn();
    },
    methods: {
        checkItems (selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        delItem (id) {
            this.deleteDataListFn([id]);
        },
        restoreItem (id) {
            this.restoreDataListFn([id]);
        },
        AllEmpty () {
            const that = this;
            this.$confirm({
                title: this.$t('GLOBAL.OPTION_DELETE_REMIND'),
                content: this.$t('GLOBAL.OPTION_CLEAR_CONFIRM'),
                okType: 'danger',
                onOk() {
                    that.clearAllFn();
                },
                onCancel() {
                    console.log('Cancel');
                }
            });
        },
        handleBulkDelete () {
            const deleteList = this.dataList.filter(
                item => this.selectedRowKeys.includes(item.id)
            );
            const deleteIds = deleteList.map(item => item.id);
            this.deleteDataListFn(deleteIds);
        },
        handleBulkRestore () {
            const restoreList = this.dataList.filter(
                item => this.selectedRowKeys.includes(item.id)
            );
            const restoreIds = restoreList.map(item => item.id);
            this.restoreDataListFn(restoreIds);
        },
        handleFilterSubmit (values = {}) {
            this.filterValues = values;
            this.pagination = {
                ...this.pagination,
                current: 1
            };
            this.getDataListFn();
        },
        handleFilterReset () {
            this.handleFilterSubmit();
        },
        handleTableChange (pagination) {
            if (!this.dataList.length) return;
            this.loading = true;
            this.pagination = pagination;
            this.getDataListFn();
        },
        handlePhotoPreview (file) {
            this.previewPhoto = file.path
            this.photoPreviewVisible = true;
        },
        async getTreeFn () {
            const res = await getTree();
            if (res.code == '200') {
                res.data.shift();
                this.treeData = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        async getDataListFn () {
            const { current, pageSize } = this.pagination;
            const params = { page: current, pageSize, ...this.filterValues };
            try {
                const res = await getDataList(params);
                this.loading = false;
                if (res.code == 200) {
                    this.dataList = res.data;
                    this.pagination = {
                        ...this.pagination,
                        total: res.total,
                    };
                }
            } catch (error) {
                this.loading = false;
            }
        },
        async restoreDataListFn (ids) {
            const params = { ids: ids };
            try {
                const res = await restoreDataList(params);
                this.loading = false;
                if (res.code == 200) {
                    this.selectedRowKeys = [];
                    let { current, pageSize, total } = this.pagination;
                    const delLength = ids.length;
                    if ((total - delLength <= pageSize * (current - 1)) && (total - delLength > pageSize)) {
                        this.pagination.current = current - 1;
                    }
                    this.getDataListFn();
                }
            } catch (error) {
                this.loading = false;
            }
        },
        async deleteDataListFn (ids) {
            const params = { ids: ids };
            const res = await deleteDataList(params);
            if (res.code == '200') {
                this.$message.success(res.msg, 2, () => {
                    this.selectedRowKeys = [];
                    let { current, pageSize, total } = this.pagination;
                    const delLength = ids.length;
                    if ((total - delLength <= pageSize * (current - 1)) && (total - delLength > pageSize)) {
                        this.pagination.current = current - 1;
                    }
                    this.getDataListFn();
                });
            } else {
                this.$message.error(res.msg);
            }
        },
        async clearAllFn () {
            const data = await clearAll();
            if (data.code == '200') {
                this.$message.success(data.msg, 1, () => {
                    this.selectedRowKeys = [];
                    this.getDataListFn();
                });
            } else {
                this.$message.error(data.msg, 1);
            }
        },
    }
};
</script>
