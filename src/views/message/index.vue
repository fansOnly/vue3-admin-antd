<template>
	<page-skeleton
        :data-list="dataList"
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
            <a-col v-if="filterList.FILTER_NICK_NAME" :span="6">
                <a-form-item :label="$t('GLOBAL.NICK_NAME')">
                    <a-input v-decorator="filterValues.fnickname" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.NICK_NAME')" />
                </a-form-item>
            </a-col>
        </template>
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <!-- <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="routePage('view', record.id)">{{$t('GLOBAL.TEXT_EDIT') }}</a-button>
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

import { getMessageList as getDataList, deleteMessage as deleteDataList } from '@/api/message'
import config from './config'

export default {
    name: 'message',
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
            selectedRowKeys: [],
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
        handleBulkDelete() {
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
        handleTableChange (pagination) {
            if (!this.dataList.length) return;
            this.loading = true;
            this.pagination = pagination;
            this.getDataListFn();
        },
        routePage (option, editId) {
            if (option == 'view') {
                this.$router.push({name: 'messageView', params: {id: editId}});
            } else {
                this.$message.error(this.$t('GLOBAL.TEXT_OPERATION_ILLEGAL'));
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
