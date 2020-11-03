<template>
<div>
    <bread-crumb show-breadcrumb :routes="[{name: 'admin', path: '/', meta: {depth: 0, breadcrumbName: 'MENU.MENU1'}}, {name: 'search', path: '/search', meta: {depth: 1, breadcrumbName: 'MENU.MENU10'}}]" ></bread-crumb>
	<page-skeleton
        :data-list="dataList"
        :option-list="optionList"
        :filter-list="filterList"
        :excel-config="excelConfig"
        @handle-filter-submit="handleFilterSubmit"
        @handle-filter-reset="handleFilterReset"
    >
        <!-- 渲染数据 -->
        <!-- <template slot="tableSlot">
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="pagination" :rowSelection="null" bordered @change="handleTableChange" >
                <span slot="titleSlot" slot-scope="action">
                    <span v-html="action"></span>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="action | BADGE_STATUS" :text="filterList.STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="routePage('edit', record.id)">{{$t('GLOBAL.TEXT_VIEW')}}</a-button>
                </span>
            </a-table>
        </template> -->
    </page-skeleton>
</div>
</template>

<script>
    import BreadCrumb from '@/components/Layouts/Breadcrumb.vue'
    import PageSkeleton from 'components/PageSkeleton.vue'

    import { searchGlobal as getDataList } from '@/api/common'
    import config from './config'


    export default {
        name: 'search',
        components: {
            BreadCrumb,
            PageSkeleton,
        },
        data () {
            return {
                optionList: config.optionList,
                excelConfig: config.excelConfig,
                columnList: config.columnList,
                filterList: config.filterList,
                pagination: config.pagination,
                keywordtemp: sessionStorage.getItem('keyword'),
                dataList: [],
                loading: true,
                filterValues: {}, // 筛选条件
            }
        },
        watch: {
            '$route'(to, from) {
                if (to.name === 'search' || (to.name === 'search' && from.name !== 'search')) {
                    this.keywordtemp = to.query.keyword;
                }
            },
            keywordtemp: {
                handler: function(val) {
                    val && this.getDataListFn();
                },
                immediate: true
            }
        },
        created () {
            if (!this.keywordtemp) {
                this.loading = false;
            }
        },
        methods: {
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
            routePage (option, editId) {
                this.$router.push({name: 'productEdit', params: {id: editId}});
            },
            highlightKeyword(val) {
                let keyword = this.keywordtemp;
                if (val.indexOf(keyword) !== -1) {
                    const reg = new RegExp(keyword, 'g');
                    return val.replace(reg, `<font class='ant-btn-primary'>${keyword}</font>`)
                } else {
                    return val
                }
            },
            async getDataListFn () {
                const { current, pageSize } = this.pagination;
                const params = { page:current, pageSize, keyword: this.keywordtemp, ...this.filterValues };
                try {
                    const res = await getDataList(params);
                    this.loading = false;
                    if (res.code == 200) {
                        res.data.map(item => {
                            item.title = this.highlightKeyword(item.title);
                        })
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
        }
    }
</script>
