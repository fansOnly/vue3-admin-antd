<template src="./index.html"></template>

<script>
import { getCurrentInstance, reactive, ref, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { getUploadSetting, updateUploadSetting } from '@/api/setting'
import config from './config'

export default {
    name: 'upload',
    setup() {
        const { ctx } = getCurrentInstance()

        let formRef = reactive({
            // max_files: 20,
            // chunk_size: 512,
            // image_max_filesize: 10240,
            // image_extensions: 'jpg, jpeg, png, gif, bmp',
            // video_max_filesize: 20480,
            // video_extensions: 'mp4',
            // audio_max_filesize: 10240,
            // audio_extensions: 'mp3',
            // file_max_filesize: 10240,
            // file_extensions: 'txt, pdf, doc, docx, xls, xlsx, ppt, pptx, zip, rar'
        })

        const submiting = ref(false)
        const ruleRef = reactive(config.rules)
        const { validate, validateInfos } = useForm(formRef, ruleRef)

        const handleSubmit = async e => {
            e.preventDefault()
            try {
                await validate()
                submiting.value = true
                const { code, msg } = await updateUploadSetting({...toRaw(formRef)})
                ctx.$message[code == '200' ? 'success' : 'error'](msg, () => {
                    submiting.value = false
                })
            } catch (error) {
                console.log('error: ', error);
            }
        }

        const apiGetUploadSetting = async () => {
            const { code, msg, data: { max_files, chunk_size, image_max_filesize, image_extensions, video_max_filesize, video_extensions, audio_max_filesize, audio_extensions, file_max_filesize, file_extensions } } = await getUploadSetting()
            if (code == '200') {
                formRef.max_files = max_files
                formRef.chunk_size = chunk_size
                formRef.image_max_filesize = image_max_filesize
                formRef.image_extensions = image_extensions
                formRef.video_max_filesize = video_max_filesize
                formRef.video_extensions = video_extensions
                formRef.audio_max_filesize = audio_max_filesize
                formRef.audio_extensions = audio_extensions
                formRef.file_max_filesize = file_max_filesize
                formRef.file_extensions = file_extensions
            } else {
                ctx.$message.error(msg);
            }
        }
        apiGetUploadSetting()

        return {
            colon: config.colon,
            layout: config.layout,
            formRef,
            submiting,
            validateInfos,
            handleSubmit
        }
    }
};
</script>
<style scoped>
.help-block {
    display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #597ea2;
}
.ant-form-vertical .ant-btn {
    margin-top: 0;
}
</style>
