import { FORM_CONFIG, WINDOW_OPEN_GROUP, BANNER_STATUS } from '@/config/setting'

export default {
    ...FORM_CONFIG,
    WINDOW_OPEN_GROUP,
    BANNER_STATUS,
	rules: {
		sortnum: [
			{ type: 'number', message: '请输入合法的数字', trigger: ['change', 'blur'] },
		],
		title: [
            { required: true, message: '请输入标题', trigger: ['change', 'blur'] },
		],
		classid: [
			{ required: true, message: '请选择上级分类', trigger: ['change', 'blur'] },
		],
		photos: [
			{ required: true, type: 'array', message: '请上传缩略图', trigger: 'change' },
		]
	}
}
