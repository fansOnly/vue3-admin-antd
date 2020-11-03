<template>
	<div class="container">
		<a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign" :label-col="formLeftLayout.labelCol" :wrapper-col="formLeftLayout.wrapperCol">
			<a-row>
				<a-col :span="15">
					<a-form-model-item v-if="id" :label="$t('GLOBAL.DATA_ID')">
						<a-input v-model="viewData.id" disabled />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_SORTNUM')" prop="sortnum">
						<a-input v-model.number="viewData.sortnum" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_SORTNUM')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_SECTION')" prop="parent_id">
						<a-tree-select
							style="width: 100%"
							v-model="viewData.parent_id"
							:dropdown-style="{ maxHeight: '200px', overflow: 'auto' }"
							:placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_SECTION')"
							allow-clear
							tree-default-expand-all
							tree-data-simple-mode
							:tree-data="treeData"
						/>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_NAME')" prop="name">
						<a-input v-model="viewData.name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_NAME')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_EN_NAME')">
						<a-input v-model="viewData.en_name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_EN_NAME')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.SEO_TITLE')">
						<a-input v-model="viewData.seo_info.title" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.SEO_TITLE')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.SEO_KEYWORD')">
						<a-textarea v-model="viewData.seo_info.keywords" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.SEO_KEYWORD')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.SEO_DESCRIPTION')">
						<a-textarea v-model="viewData.seo_info.description" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.SEO_DESCRIPTION')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-model-item>
					<!-- <a-form-model-item :label="$t('GLOBAL.DATA_MODE')">
						<a-radio-group v-model="initialAdmin.mode" buttonStyle="solid" >
							<a-radio-button value="内容模式">内容模式</a-radio-button>
							<a-radio-button value="新闻列表">新闻列表</a-radio-button>
							<a-radio-button value="图片列表">图片列表</a-radio-button>
							<a-radio-button value="图文列表">图文列表</a-radio-button>
							<a-radio-button value="自定义">自定义</a-radio-button>
						</a-radio-group>
					</a-form-model-item> -->
					<a-form-model-item :label="$t('GLOBAL.ROUTE_NAME')">
						<a-input v-model="viewData.route_name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.ROUTE_NAME')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_LINK')">
						<a-input v-model="viewData.url" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_LINK')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_DESC')">
						<a-textarea v-model="viewData.content" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_DESC')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-model-item>
					<a-form-model-item :wrapper-col="{ offset: 4 }">
						<a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
						<a-button style="margin-left:10px;" @click="() => this.$router.back(-1)">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
					</a-form-model-item>
				</a-col>
				<a-col :span="7" :offset="1">
					<a-form-model-item v-bind="formRightLayout" :label="$t('GLOBAL.THUMBNAIL')">
						<single-upload v-if="loaded || !id" :data-list="viewData.thumbnail" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'thumbnail')"></single-upload>
					</a-form-model-item>
				</a-col>
			</a-row>
		</a-form-model>
	</div>
</template>
<script>
import SingleUpload from 'components/SingleUpload.vue'
import { getSectionDetail as getData, addSection as addData, updateSection as updateData, getSectionTree as getTree } from '@/api/article'
import config from './config'

export default {
	name: 'sectionView',
	components: {
		SingleUpload
	},
	data() {
		return {
			layout: config.layout,
			colon: config.colon,
			labelAlign: config.labelAlign,
			rules: config.rules,
			formRightLayout: config.formRightLayout,
			formLeftLayout: config.formLeftLayout,
			id: 0,
			pid: 0,
			viewData: {
				seo_info: {
					title: '',
					keywords: '',
					description: '',
				},
				thumbnail: [],
			},
			treeData: [],
			submitDisabled: false,
			originIds: [],
			savedIds: [],
			deletedIds: [],
			thumbList: [],
			loaded: false
		};
	},
	created() {
		this.id = this.$route.params.id;
		this.pid = this.$route.params.pid;
		this.viewData.parent_id = this.pid ? this.pid +'' : '0';
		this.id && this.getDataFn();
		this.getTreeFn();
	},
	methods: {
		handleUpload(data, tag) {
			this.viewData[tag] = data.uploadList;
			this.deletedIds = data.deletedIds;
			this.savedIds = data.savedIds;
		},
		handleSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) return;
				const values = {
					...this.viewData,
					uploadSaveIds: this.savedIds,
					uploadDelIds: this.deletedIds,
				};
				// console.log('Received values of form: ', values);
				this.submitDisabled = true;
				if (this.id) {
					this.updateDataFn(values);
				} else {
					this.addDataFn(values);
				}
			});
		},
		async getTreeFn () {
			const res = await getTree();
			if (res.code == '200') {
				res.data.map(item => {
					item.value += '';
				})
				this.treeData = res.data;
			} else {
				this.$message.error(res.msg);
			}
		},
		async getDataFn () {
			const res = await getData({id: this.id})
			if (res.code == '200') {
				this.loaded = true;
				// res.data.parent_id += '';
				this.viewData = res.data;
			} else {
				this.$message.error(res.msg);
			}
		},
		async addDataFn (params) {
			const res = await addData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.$router.replace({name: 'sectionEdit', params:{id: res.id}});
				});
			} else {
				this.$message.error(res.msg, () => {
					this.submitDisabled = false;
				});
			}
		},
		async updateDataFn (params) {
			const res = await updateData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.getDataFn();
				});
			} else {
				this.$message.error(res.msg, () => {
					this.submitDisabled = false;
				});
			}
		},
	}
};
</script>
