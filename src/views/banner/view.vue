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
					<a-form-model-item :label="$t('GLOBAL.DATA_TITLE')" prop='title'>
						<a-input v-model="viewData.title" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_TITLE')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_PARENT')" prop="class_id">
						<a-select v-model="viewData.class_id" :placeholder="$t('GLOBAL.OPTION_SELECT') + $t('GLOBAL.DATA_PARENT')">
							<a-select-option value="">{{$t('GLOBAL.OPTION_SELECT')}}</a-select-option>
							<a-select-option v-for="(item, index) in parentList" :key="index" :value="item.id">{{item.name}}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_LINK')">
						<a-input v-model="viewData.url" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_LINK')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_OPEN_BLANK')">
						<a-radio-group v-model="viewData.blank" buttonStyle="solid" >
							<a-radio-button v-for="(item, index) in BLANK_ITEMS" :key="index" :value="index">{{item}}</a-radio-button>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.DATA_DESC')">
						<a-textarea v-model="viewData.content" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_DESC')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.STATE')">
						<a-radio-group v-model="viewData.state" buttonStyle="solid" >
							<a-radio-button v-for="(item, index) in BANNER_STATUS" :key="index" :value="index">{{item}}</a-radio-button>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item :wrapper-col="{ offset: 4 }">
						<a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
						<a-button style="margin-left:10px;" @click="() => this.$router.back(-1)">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
					</a-form-model-item>
				</a-col>
				<a-col :span="8" :offset="1">
					<a-form-model-item :label="$t('GLOBAL.THUMBNAIL')" v-bind="formRightLayout" prop="thumbnail">
						<single-upload v-if="loaded || !id" :data-list="viewData.thumbnail" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'thumbnail')"></single-upload>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.VIDEO_FILE')" v-bind="formRightLayout">
						<single-upload v-if="loaded || !id" text-type="button" list-type="text" file-type="video" :data-list="viewData.file" :savedIds="savedIds" :deletedIds="deletedIds" @change="handleUpload($event, 'file')"></single-upload>
					</a-form-model-item>
				</a-col>
			</a-row>
		</a-form-model>
	</div>
</template>
<script>
import SingleUpload from 'components/SingleUpload.vue'
import { getBannerDetail as getData, addBanner as addData, updateBanner as updateData, getBannerClassList as getParentList } from '@/api/banner'
import config from './config'
import { BLANK_ITEMS, BANNER_STATUS } from 'config/setting'

export default {
	name: 'bannerEdit',
	components: {
		SingleUpload,
	},
	data() {
		return {
			layout: config.layout,
			colon: config.colon,
			labelAlign: config.labelAlign,
			rules: config.rules,
			formRightLayout: config.formRightLayout,
			formLeftLayout: config.formLeftLayout,
			BANNER_STATUS,
			BLANK_ITEMS,
			id: 0,
			viewData: {
				state: 1,
				blank: 1
			},
			parentList: [],
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
		this.getParentListFn();
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
				this.submitDisabled = true;
				if (this.id) {
					this.updateDataFn(values);
				} else {
					this.addDataFn(values);
				}
			});
		},
		async getParentListFn () {
			const res = await getParentList();
			if (res.code == '200') {
				this.parentList = res.data;
			} else {
				this.$message.error(res.msg);
			}
		},
		async getDataFn () {
			const res = await getData({id: this.id})
			if (res.code == '200') {
				this.loaded = true;
				this.viewData = res.data;
				this.originIds = res.data.photos.length ? res.data.photos.map(item => item.id) : [];
			} else {
				this.$message.error(res.msg);
			}
		},
		async addDataFn (params) {
			const res = await addData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.$router.replace({name: 'bannerEdit', params:{id: res.data}});
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
