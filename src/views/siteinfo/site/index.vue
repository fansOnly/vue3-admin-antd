<template src="./index.html"> </template>

<script>
import { getSiteInfo, updateSiteInfo} from '@/api/setting'
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import config from './config'

export default {
    name: 'site',
    setup() {
        const { ctx } = getCurrentInstance()

        const tabActiveKey = ref('base')
        const formRef = reactive({
            base: {
                name: '',
                phone: '',
                email: '',
                copyright: '',
                content: ''
            },
            advance: {},
            seo: {
                title: '',
                keywords: '',
                description: ''
            }
        })
        const submiting = ref(false)

        const { validate: validateBaseForm, validateInfos: validateBaseInfos } = useForm(formRef.base, reactive(config.rules.baseRules))
        const { validate: validateSeoForm, validateInfos: validateSeoInfos } = useForm(formRef.seo, reactive(config.rules.seoRules))

        const handleSubmit = async (formName, e) => {
            e.preventDefault()
            try {
                if (formName === 'baseForm') {
                    await validateBaseForm()
                } else if (formName === 'seoForm') {
                    await validateSeoForm()
                }
                submiting.value = true
                const { code, msg } = await updateSiteInfo({...toRaw(formRef[tabActiveKey.value])})
                ctx.$message[code == '200' ? 'success' : 'error'](msg, () => {
                    submiting.value = false
                })
            } catch (error) {
                console.log('error: ', error);
            }
        }

        const apiGetSiteInfoFn = async () => {
            const { code, msg, data: { base_info, advance_info, seo_info } } = await getSiteInfo();
            if (code == '200') {
                formRef.base = base_info;
                formRef.advance = advance_info;
                formRef.seo = seo_info;
            } else {
                ctx.$message.error(msg);
            }
        }
        apiGetSiteInfoFn()

        return {
            colon: config.colon,
            layout: config.layout,
            tabActiveKey,
            formRef,
            validateBaseInfos,
            validateSeoInfos,
            submiting,
            handleSubmit
        }
    }
};
</script>
<style scoped>
.ant-form-vertical .ant-btn {
    margin-top: 0;
}
</style>
