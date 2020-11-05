<template>
    <page-skeleton
        :data-list="dataList"
        :selected-row-keys="selectedRowKeys"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        :photo-preview-visible="photoPreviewVisible"
        :preview-photo="previewPhoto"
        @delete-multi-items="delMultiItems"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
        @handle-photopreview-cancel="handlePhotopreviewCancel"
    >
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <!-- <span slot="pathSlot" slot-scope="action, record" v-if="record.state != 3">
                    <a v-if="!/^image/.test(record.mimetype)" :href="action | getImgAbsPath" target="_blank">{{$t('GLOBAL.TEXT_VIEW')}}</a>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action | getImgAbsPath" style="width:30px;height:30px;" :alt="action[0].name"></a>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-popconfirm :title="$t('GLOBAL.OPTION_DELETE_CONFIRM')" @confirm="delItem(record.id)">
                        <a-button size="small" type="danger" >{{$t('GLOBAL.TEXT_DELETE')}}</a-button>
                    </a-popconfirm>
                </span> -->
            </a-table>
        </template>
    </page-skeleton>
</template>

<script>
import PageSkeleton from 'components/PageSkeleton.vue'

import { getAssetsList as getDataList, deleteAssets as deleteData } from '@/api/setting'
import config from './config'

export default {
    name: 'assets',
    components: {
        PageSkeleton,
    },
    data () {
        return {
            optionList: config.optionList,
            excelConfig: config.excelConfig,
            columnList: config.columnList,
            filterList: config.filterList,
            pagination: config.pagination,
            dataList: [],
            loading: true,
            selectedRowKeys: [],  // 选择的数据ID组
            photoPreviewVisible: false,
            previewPhoto: '',
            filterValues: {}, // 筛选条件
        }
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
        this.getDataListFn();
    },
    methods: {
        checkItems(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        delItem(id) {
            this.deleteDataListFn([id]);
        },
        delMultiItems() {
            const deleteList = this.dataList.filter(
                item => this.selectedRowKeys.includes(item.id)
            );
            const deleteIds = deleteList.map(item => item.id);
            this.deleteDataListFn(deleteIds);
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
        handlePhotopreviewCancel() {
            this.photoPreviewVisible = false;
        },
        handlePhotoPreview(file) {
            this.previewPhoto = file;
            this.photoPreviewVisible = true;
        },
        handleTableChange (pagination) {
            if (!this.dataList.length) return;
            this.loading = true;
            this.pagination = pagination;
            this.getDataListFn();
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
    }
}
</script>
