export default {
    layout: 'vertical',
    colon: false,
    rules: {
        max_files: [
            { required: true, type: 'number', message: '请输入最大同时上传文件数', trigger: ['change', 'blur'] }
        ],
        chunk_size: [
            { required: true, type: 'number', message: '请输入文件分块上传分块大小', trigger: ['change', 'blur'] }
        ],
        image_max_filesize: [
            { required: true, type: 'number', message: '请输入图片文件大小限制', trigger: ['change', 'blur'] }
        ],
        image_extensions: [
            { required: true, message: '请输入图片文件格式限制', trigger: ['change', 'blur'] }
        ],
        video_max_filesize: [
            { required: true, type: 'number', message: '请输入视频文件大小限制', trigger: ['change', 'blur'] }
        ],
        video_extensions: [
            { required: true, message: '请输入视频文件格式限制', trigger: ['change', 'blur'] }
        ],
        audio_max_filesize: [
            { required: true, type: 'number', message: '请输入音频文件大小限制', trigger: ['change', 'blur'] }
        ],
        audio_extensions: [
            { required: true, message: '请输入音频文件格式限制', trigger: ['change', 'blur'] }
        ],
        file_max_filesize: [
            { required: true, type: 'number', message: '请输入附件文件大小限制', trigger: ['change', 'blur'] }
        ],
        file_extensions: [
            { required: true, message: '请输入附件文件格式限制', trigger: ['change', 'blur'] }
        ],
    }
}
