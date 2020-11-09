<template src="./index.html"></template>

<script>
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons-vue'
import AvatarUpload from '@/components/AvatarUpload.vue'
import { updateAdmin as updateData, getRoleList as getParentList } from '@/api/admin'
import config from './config'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { useStore } from 'vuex'
import { formatPhone } from '@/utils/util'

export default {
	name: 'adminDetail',
    setup() {
        const { ctx } = getCurrentInstance()
        const store = useStore()

        const loading = ref(false)
        let viewData = reactive(store.state.user.user)
        const maskVisible = ref(false)
        const uploadVisible = ref(false)

        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(viewData, ruleRef)

        const handleSubmit = async () => {
            try {
                await validate()
                loading.value = true
                const params = {
                    ...toRaw(viewData),
                }
                apiUpdateData(params)
            } catch (error) {
                console.log('error: ', error)
            }
        }

        const cropperDone = async url => {
            // 处理图片逻辑
            uploadVisible.value = false
            if (url) {
                const userInfo = reactive(store.state.user.user)
                userInfo.avatar = url
                await store.dispatch('user/UPDATE_USER', userInfo)
                viewData.avatar = url
            }
        }

        const parentList = ref([])
        const apiGetParentList = async () => {
            const { code, data } = await getParentList()
            if (code == '200') {
                parentList.value = data
            }
        }
        apiGetParentList()

        const getNameById = (arr, prop, val, target) => {
            return arr.find(v => v[prop] == val)[target]
        }

        const apiUpdateData = async params => {
            const { code, msg } = await updateData({id: viewData.id, ...params})
            ctx.$message[code == '200' ? 'success': 'error'](msg, 1, () => {
                loading.value = false
            })
        }

        const onPhoneChange = e => {
            const { value } = e.target
            viewData.phone = formatPhone(value)
        }

        return {
            formatPhone,
			formLeftLayout: Object.freeze(config.formLeftLayout),
			formRightLayout: Object.freeze(config.formRightLayout),
            loading,
            viewData,
            parentList,
            maskVisible,
            uploadVisible,
            validateInfos,
            handleSubmit,
            onPhoneChange,
            getNameById,
            cropperDone
        }
    },
    components: {
        PlusOutlined,
        CloudUploadOutlined,
        AvatarUpload
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
    z-index: 3;
}
</style>
