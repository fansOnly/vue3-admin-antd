<template>
	<div class="container">
        <a-form ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon" :label-align="labelAlign">
			<a-row>
				<a-col :span="15">
					<a-form-item v-if="id" label="数据ID">
						<a-input v-model="viewData.id" disabled />
					</a-form-item>
					<a-form-item label="数据名称" prop="name">
						<a-input v-model="viewData.name" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_NAME')" />
					</a-form-item>
					<a-form-item :label="$t('GLOBAL.DATA_DESC')">
						<a-textarea v-model="viewData.content" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.DATA_DESC')" :auto-size="{ minRows: 2, maxRows: 4 }" />
					</a-form-item>
					<a-form-item label="角色权限">
						<auth-picker v-if="authorityLoaded || !id" :auth-list="viewData.authority" @update="handleAuth" ></auth-picker>
					</a-form-item>
					<a-form-item label="数据状态">
						<a-radio-group v-model="viewData.state" buttonStyle="solid" >
							<a-radio-button v-for="(item, index) in ROLE_STATUS" :key="index" :value="index">{{item}}</a-radio-button>
						</a-radio-group>
					</a-form-item>
                    <a-form-item >
                        <a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
                        <a-button style="margin-left:10px;" @click="() => {$router.back()}">{{$t('GLOBAL.TEXT_BACK')}}</a-button>
                    </a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>
<script>
import AuthPicker from 'components/AuthPicker.vue'
import { addRole as addData, getRoleDetail as getData, updateRole as updateData } from '@/api/admin'
import config from './config'

export default {
	name: 'roleView',
	components: {
		AuthPicker
	},
	data() {
		return {
            layout: config.layout,
            colon: config.colon,
            labelAlign: config.labelAlign,
            rules: config.rules,
			ROLE_STATUS: config.filterList.STATUS,
			id: 0,
			viewData: {
				state: 1
			},
			submitDisabled: false,
			authList: [],
			authorityLoaded: false,
		};
	},
	created() {
		this.id = this.$route.params.id;
		!!this.id && this.getDataFn();
	},
	methods: {
		handleAuth(val) {
			this.authList = val;
		},
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) return;
				const values = {
					...this.viewData,
					authority: this.authList
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
			const res = await getData({id: this.id})
			if (res.code == '200') {
				this.viewData = res.data;
				this.authorityLoaded = true;
			} else {
				this.$message.error(res.msg);
			}
		},
		async addDataFn (params) {
			const res = await addData(params);
			if (res.code == '200') {
				this.$message.success(res.msg, 2, () => {
					this.submitDisabled = false;
					this.$router.replace({name: 'roleEdit', params:{id: res.data}});
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
