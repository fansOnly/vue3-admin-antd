<template>
	<page-skeleton
        :data-list="dataList"
        :selected-row-keys="selectedRowKeys"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        @delete-multi-items="delMultiItems"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
    >
        <!-- 渲染筛选条件 -->
        <template #filterAfterSlot="{ filterValues }">
            <a-col v-if="filterList.FILTER_UPDATE_TIME" :span="6">
                <a-form-item :label="$t('GLOBAL.UPDATE_DATE')">
                    <a-date-picker v-model="filterValues.fupdate_time" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.UPDATE_DATE')" style="width: 100%" />
                </a-form-item>
            </a-col>
        </template>
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <!-- <span slot="actionSlot" slot-scope="action, record">
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

    import { getSearchlogList as getDataList, deleteSearchlog as deleteData } from '@/api/systemlog'
    import config from './config'
    import { pluck } from 'utils/util'

    export default {
        name: 'searchStatics',
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
			delMultiItems() {
				const deleteList = this.dataList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = pluck(deleteList, 'id');
                this.deleteDataListFn(deleteIds);
            },
            handleFilterSubmit (values = {}) {
                // console.log('handleFilterValues', values);
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
