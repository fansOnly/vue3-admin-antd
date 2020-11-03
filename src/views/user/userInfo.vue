<template>
	<div class="container">
        <a-form-model ref="viewForm" :model="viewData" :rules="rules" :layout="layout" :colon="colon">
			<a-row :gutter="50">
				<a-col :span="12">
					<a-form-model-item :label="$t('GLOBAL.NICK_NAME')" prop="nickname">
						<a-input v-model="viewData.nickname" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.NICK_NAME')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.PHONE')" prop="phone">
						<a-input v-model="viewData.phone" maxLength="11" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.PHONE')">
							<!-- <a-select slot="addonBefore" v-model="viewData.phonePrefix" style="width: 70px" >
								<a-select-option value="86">+86</a-select-option>
								<a-select-option value="87">+87</a-select-option>
							</a-select> -->
						</a-input>
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.EMAIL')" prop="email">
						<a-input v-model="viewData.email" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.EMAIL')" />
					</a-form-model-item>
					<a-form-model-item :label="$t('GLOBAL.USER_NOTE')">
						<a-textarea v-model="viewData.intro" :rows="4" :placeholder="$t('GLOBAL.OPTION_INPUT') + $t('GLOBAL.USER_NOTE')" />
					</a-form-model-item>
					<a-form-model-item>
						<a-button type="primary" :loading="submitDisabled" @click="handleSubmit('viewForm')">{{$t('GLOBAL.TEXT_SAVE')}}</a-button>
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<div class="avatarBox" @mouseover="() => this.maskVisible = true" @mouseout="() => this.maskVisible = false" @click="openUpload">
						<div v-show="maskVisible" class="mask"><a-icon type="plus" style='color:#fff;font-size:35px;' /></div>
						<img v-if="!viewData.avatar" class="avatar" :src="defaultAvatar" alt="">
						<img v-else class="avatar" :src="viewData.avatar" alt="">
						<a-icon type="cloud-upload" class="upload-icon" />
					</div>
				</a-col>
			</a-row>
		</a-form-model>
		<avatar-upload :visible="uploadVisible" @cropperDone="cropperDone" @cancel="cropperCancel" ></avatar-upload>
	</div>
</template>

<script>
	import AvatarUpload from 'components/AvatarUpload.vue'

	import { getAdminDetail, updateAdmin } from '@/api/admin'
	import config from './config'

	export default {
		name: 'userInfo',
		components: {
			AvatarUpload
		},
		data () {
			return {
				layout: config.layout,
				colon: config.colon,
				rules: config.rules,
				viewData: {},
				defaultAvatar: 'https://preview.pro.loacg.com/avatar2.jpg',
				maskVisible: false,
				uploadVisible: false,
				submitDisabled: false
			}
		},
		created() {
			this.getAdminDetailFn();
		},
        methods: {
			openUpload() {
				this.uploadVisible = true;
			},
			cropperDone(url) {
				// 处理图片逻辑
				this.uploadVisible = false;
				if (url) {
					this.viewData.avatar = url;
					sessionStorage.setItem('user', JSON.stringify(this.viewData));
				}
			},
			cropperCancel() {
				this.uploadVisible = false;
			},
			handleSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (!valid) return;
					this.submitDisabled = true;
					this.updateUserFn(this.viewData);
				});
			},
			async getAdminDetailFn() {
				const id = JSON.parse(sessionStorage.getItem('user')).id;
				const res = await getAdminDetail({id})
				if (res.code == '200') {
					const _data = {
						id: res.data.id,
						nickname: res.data.nickname,
						phone: res.data.phone,
						email: res.data.email,
						intro: res.data.intro,
						avatar: res.data.avatar
					}
					this.viewData = _data;
					sessionStorage.setItem('user', JSON.stringify(_data));
				} else {
					this.$message.error(res.msg);
				}
			},
			async updateUserFn(params) {
				const res = await updateAdmin({id: JSON.parse(sessionStorage.getItem('user')).id, ...params})
				if (res.code == '200') {
					this.$message.success(res.msg, 2, () => {
						this.submitDisabled = false;
						this.getAdminDetailFn();
					});
				} else {
					this.$message.error(res.msg, 2, () => {
						this.submitDisabled = false;
					});
				}
			}
        }
	};
</script>
<style scoped>
.avatarBox {
	position: relative;
	width: 180px;
	height: 180px;
	margin: 40px 0 0 80px;
	border-radius: 100%;
    box-shadow: 0 0 4px #ccc;
}
.mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 100%;
	cursor: pointer;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
}
.avatar {
	width: 180px;
	height: 180px;
	border-radius: 100%;
	overflow: hidden;
	cursor: pointer;
}
.upload-icon {
	position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: .5rem;
    background: rgba(222,221,221,.7);
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.2);
}
</style>
