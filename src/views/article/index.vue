<template>
	<page-skeleton
        :data-list="dataList"
        :selected-row-keys="selectedRowKeys"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        :photo-preview-visible="photoPreviewVisible"
        :preview-photo="previewPhoto"
        @delete-multi-items="handleBulkDelete"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
        @handle-photopreview-cancel="handlePhotopreviewCancel"
        @show-modal="routePage"
    >
        <!-- 渲染筛选条件 -->
        <template #filterBeforeSlot="{ filterValues }">
            <a-col v-if="filterList.FILTER_SECTION" :span="6">
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
            <a-col v-if="filterList.FILTER_ADMIN_ID" :span="6">
                <a-form-model-item :label="$t('GLOBAL.DATA_ADMIN')">
                    <a-select v-model="filterValues.fadminid" :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_ADMIN')">
                        <a-select-option value="">{{$t('GLOBAL.TEXT_ALL')}}</a-select-option>
                        <a-select-option v-for="item in adminList" :key="item.id" :value="item.id">{{item.nickname}}</a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-col>
        </template>
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :row-selection="rowSelection" bordered @change="handleTableChange" >
                <template v-slot:thumbSlot="action" >
                    <span v-if="!action || !action.length">{{$t('GLOBAL.TEXT_EMPTY')}}</span>
                    <a v-else-if="action[0].state == 1" href="javascript:;"><img :src="action[0].path" style="width:30px;height:30px;" :alt="action[0].name" @click="handlePhotoPreview(action[0])"></a>
                    <span style="color:red;" v-else>{{$t('GLOBAL.TEXT_FILE_MISSING')}}</span>
                </template>
                <!-- <span slot="tagsSlot" slot-scope="action">
                    <a-tag v-for="(item, index) in action" :key="index" color="blue">{{item}}</a-tag>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="routePage('edit', record.id)">{{$t('GLOBAL.TEXT_EDIT')}}</a-button>
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

    import { getArticleList as getDataList, deleteArticle as deleteDataList, getSectionTree as getTree } from '@/api/article'
    import { getAdminList } from '@/api/admin'
    import config from './config'

	export default {
		name: 'articleList',
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
                adminList: [],
                dataList: [],
                loading: true,
                selectedRowKeys: [],
                filterValues: {}, // 筛选条件
                photoPreviewVisible: false,
                previewPhoto: '',
                treeData: [],
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
            this.filterList.FILTER_ADMIN_ID && this.getAdminListFn();
            this.filterList.FILTER_SECTION && this.getTreeFn();
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
            handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
            },
			handlePhotoPreview(file) {
                this.previewPhoto = file.path;
				this.photoPreviewVisible = true;
			},
			routePage (option, editId) {
                if (option == 'add') {
					this.$router.push({name: 'articleAdd'});
                } else if (option == 'edit') {
					this.$router.push({name: 'articleEdit', params: {id: editId}});
                } else {
                    this.$message.error(this.$t('GLOBAL.TEXT_OPERATION_ILLEGAL'));
                }
            },
            async getAdminListFn() {
                const res = await getAdminList();
                if (res.code == 200) {
                    this.adminList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
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
	};
</script>
