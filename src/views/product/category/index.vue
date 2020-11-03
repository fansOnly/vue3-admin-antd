<template>
	<page-skeleton
        :optionList="optionList"
        :photo-preview-visible="photoPreviewVisible"
        :preview-photo="previewPhoto"
        @handle-photopreview-cancel="handlePhotopreviewCancel"
        @show-modal="routePage"
    >
        <!-- 渲染数据 -->
        <template v-slot:tableSlot>
            <a-table row-key="id" :loading="loading" :columns="columnList" :data-source="dataList" :pagination="false" :row-selection="null" bordered >
            <template v-slot:thumbSlot="action" >
                <span v-if="!action || !action.length">{{$t('GLOBAL.TEXT_EMPTY')}}</span>
                <a v-else-if="action[0].state == 1" href="javascript:;"><img :src="action[0].path" style="width:30px;height:30px;" :alt="action[0].name" @click="handlePhotoPreview(action[0])"></a>
                <span style="color:red;" v-else>{{$t('GLOBAL.TEXT_FILE_MISSING')}}</span>
            </template>
            <!-- <span slot="actionSlot" slot-scope="action, record"> -->
                <!-- 最多允许创建三级分类 -->
                <!-- <template v-if="record.level < 3">
                    <a-button size="small" @click="routePage('add', record.id)">{{$t('GLOBAL.TEXT_ADD')}}</a-button>
                    <span>&nbsp;</span>
                </template>
                <a-button size="small" @click="routePage('edit', record.id)">{{$t('GLOBAL.TEXT_EDIT')}}</a-button>
                <span>&nbsp;</span>
                <a-popconfirm :title="$t('GLOBAL.OPTION_DELETE_CONFIRM')" @confirm="() => delItem(record.id)">
                    <a-button size="small" type="danger" >{{$t('GLOBAL.TEXT_DELETE')}}</a-button>
                </a-popconfirm> -->
            <!-- </span> -->
            </a-table>
        </template>
    </page-skeleton>
</template>

<script>
import PageSkeleton from 'components/PageSkeleton.vue'

import { getCategoryIndex as getDataList, deleteCategory as deleteDataList } from '@/api/product'
import config from './config'

export default {
    name: 'categoryIndex',
    components: {
        PageSkeleton,
    },
    data () {
        return {
            columnList: config.columnList,
            optionList: config.optionList,
            dataList: [],
            loading: true,
            photoPreviewVisible: false,
            previewPhoto: '',
        }
    },
    created () {
        this.getDataListFn();
    },
    methods: {
        delItem(id) {
            this.deleteDataListFn([id]);
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
                this.$router.push({name: 'categoryAdd', params: {pid: editId}});
            } else if (option == 'edit') {
                this.$router.push({name: 'categoryEdit', params: {id: editId}});
            } else {
                this.$message.error(this.$t('GLOBAL.TEXT_OPERATION_ILLEGAL'));
            }
        },
        async getDataListFn () {
            try {
                const res = await getDataList();
                this.loading = false;
                if (res.code == 200) {
                    this.dataList = res.data;
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
                    this.getDataListFn();
                });
            } else {
                this.$message.error(res.msg);
            }
        },
    }
}
</script>
