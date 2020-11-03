<template>
	<page-skeleton
        :data-list="dataList"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        @delete-multi-items="handleBulkDelete"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
        @show-modal="routePage"
    >
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <!-- <span slot="permissionSlot" slot-scope="action">
                    <template v-for="(item, index) in action.value">
                        <a-tag :key="index" color="blue">{{item.menu}}</a-tag>
                    </template>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" :disabled="(role_id != 1 && record.id == 1) || ![1, 2].includes(role_id)" @click="routePage('edit', record.id)">{{$t('GLOBAL.TEXT_EDIT')}}</a-button>
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
    import { getRoleList as getDataList, deleteRole as deleteDataList } from '@/api/admin'

	import { createNamespacedHelpers } from 'vuex'
	const { mapState } = createNamespacedHelpers('common')

    import config from './config'

    export default {
        name: 'roleList',
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
            },
            ...mapState(['role_id'])
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
                if (option == 'add') {
					this.$router.push({name: 'roleAdd'});
                } else if (option == 'edit') {
					this.$router.push({name: 'roleEdit', params: {id: editId}});
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
