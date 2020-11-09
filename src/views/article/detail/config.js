import { INFO_STATUS, ARTICLE_TAGS, FORM_CONFIG } from '@/config/setting'

export default {
    ARTICLE_TAGS,
    INFO_STATUS,
	...FORM_CONFIG,
	rules: {
		sortnum: [
            { type: 'number', message: '请输入序号', trigger: ['change', 'blur'] },
		],
		title: [
            { required: true, message: '请输入数据标题', trigger: ['change', 'blur'] }
		],
        classid: [
			{ required: true, message: '请选择文章分类', trigger: 'change' }
		],
		publish_time: [
			{ required: true, message: '请选择发布时间', trigger: 'change' }
        ],
        thumbnail: [
            { required: true, type: 'array', message: '请上传缩略图', trigger: 'change' },
        ],
		state: [
            { required: true, type: 'number', message: '请选择状态', trigger: 'change' }
		]
	}
}
