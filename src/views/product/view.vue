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
					<a-form-model-item :label="$t('GLOBAL.DATA_TITLE')" prop="title">
						<a-input v-model="viewData.title" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_TITLE')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_SUBTITLE')">
						<a-input v-model="viewData.subtitle" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_SUBTITLE')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_SECTION')" prop="section_id">
						<a-tree-select
							style="width: 100%"
							v-model="viewData.section_id"
							:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
							:placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_SECTION')"
							allow-clear
							tree-default-expand-all
							tree-data-simple-mode
							:tree-data="treeData"
						/>
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
					<a-form-model-item :label="$t('GLOBAL.ROUTE_NAME')">
						<a-input v-model="viewData.route_name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.ROUTE_NAME')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_DESC')" class="form-label_top">
						<a-textarea v-model="viewData.intro" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_DESC')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.ANNEX_FILE')">
						<single-upload v-if="loaded || !id" text-type="button" list-type="text" file-type="file" :data-list="viewData.file" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'file')"></single-upload>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.PHOTOS')" class="form-label_top" prop="photos">
						<bulk-upload v-if="loaded || !id" :data-list="viewData.photos" :originIds="originIds" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'photos')"></bulk-upload>
					</a-form-model-item>
					<a-form-model-item :wrapper-col="{ offset: 4 }">
						<a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
						<a-button style="margin-left:10px;" @click="() => this.$router.back(-1)">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
					</a-form-model-item>
				</a-col>
				<a-col :span="7" :offset="1">
					<a-form-model-item v-bind="formRightLayout" :label="$t('GLOBAL.THUMBNAIL')" prop="thumbnail">
						<single-upload v-if="loaded || !id" :data-list="viewData.thumbnail" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'thumbnail')"></single-upload>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.PUBLISH_DATE')" v-bind="formRightLayout" prop="publish_time">
						<a-date-picker
							v-model="viewData.publish_time"
							show-time
							format="YYYY-MM-DD HH:mm:ss"
							:placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.PUBLISH_DATE')"
							style="width:100%"
						/>
					</a-form-model-item>
					<a-form-model-item v-bind="formRightLayout" :label="$t('GLOBAL.TAG')">
						<a-select v-model="viewData.tags" mode="multiple" allow-clear :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.TAG')">
							<a-select-option v-for="(item, index) in PRODUCT_TAGS" :key="index" :value="item">{{item}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item v-bind="formRightLayout" :label="$t('GLOBAL.STATE')" prop="state">
						<a-select v-model="viewData.state" allow-clear :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.STATE')">
							<a-select-option v-for="(item, index) in INFO_STATUS" :key="index" :value="index">{{item}}</a-select-option>
						</a-select>
					</a-form-model-item>
				</a-col>
			</a-row>
		</a-form-model>
	</div>
</template>
<script>
import moment from 'moment'

import SingleUpload from 'components/SingleUpload.vue'
import BulkUpload from 'components/BulkUpload.vue'

import { getProductDetail as getData, addProduct as addData, updateProduct as upadteData, getCategoryTree as getTree } from '@/api/product'
import { INFO_STATUS, PRODUCT_TAGS } from 'config/setting'
import config from './config'

export default {
	name: 'productView',
	components: {
		SingleUpload,
		BulkUpload
	},
	data() {
		return {
			layout: config.layout,
			colon: config.colon,
			labelAlign: config.labelAlign,
			rules: config.rules,
			formRightLayout: config.formRightLayout,
			formLeftLayout: config.formLeftLayout,
			INFO_STATUS,
			PRODUCT_TAGS,
			id: 0,
			viewData: {
				content: '',
				seo_info: {
					title: '',
					keywords: '',
					description: '',
				},
				file: [],
				thumbnail: [],
				photos: [],
				tags: [],
				state: 1,
			},
			treeData: [],
			submitDisabled: false,
			originIds: [],
			savedIds: [],
			deletedIds: [],
			loaded: false,
		};
	},
	watch: {
		'viewData.thumbnail': {
			handler: function() {
				this.$nextTick(() => {
					this.$refs.viewForm.validateField(['thumbnail']);
				})
			},
			deep: true,
		},
	},
	created() {
		this.id = this.$route.params.id;
		if (this.id) {
			this.getDataFn();
		}
		this.getTreeFn();
	},
	methods: {
		handleContentTyping (content) {
			this.viewData.content = content;
		},
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
					tags: this.viewData['tags'] && this.viewData['tags'].slice(),
					publish_time:
						this.viewData['publish_time'] &&
						this.viewData['publish_time'].format('YYYY-MM-DD hh:mm:ss'),
					state: parseInt(this.viewData.state),
					uploadSaveIds: this.savedIds,
					uploadDelIds: this.deletedIds,
				};
				this.submitDisabled = true;
				if (this.id) {
					this.updateDataFn(values);
				} else {
					this.addDataFn(values);
				}
			});
		},
		async getDataFn () {
			const params = {id: this.id}
			const res = await getData(params);
			if (res.code == '200') {
				this.loaded = true;
				this.viewData = {...res.data, publish_time: moment(res.data.publish_time, 'YYYY-MM-DD hh:mm:ss')};
				this.originIds = res.data.photos.length ? res.data.photos.map(item => item.id) : [];
			} else {
				this.$message.error(res.msg);
			}
		},
		async updateDateFn (params) {
			params = {id: this.id, ...params}
			const res = await upadteData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.getDataFn();
				})
			} else {
				this.$message.error(res.msg, () => {
					this.submitDisabled = false;
				})
			}
		},
		async addDateFn (params) {
			const res = await addData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.$router.replace({name: 'productEdit', params:{id: res.data}});
				})
			} else {
				this.$message.error(res.msg, () => {
					this.submitDisabled = false;
				})
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
	}
};
</script>
