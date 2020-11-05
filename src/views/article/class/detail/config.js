import { FORM_CONFIG, INFO_CLASS_STATUS } from 'config/setting'

export default {
    ...FORM_CONFIG,
    INFO_CLASS_STATUS,
	rules: {
		sortnum: [
			{ type: 'number', message: '请输入合法的整数', trigger: ['change', 'blur'] },
		],
        name: [
			{ required: true, message: '请输入标题', trigger: ['change', 'blur'] }
        ],
        parent_id: [
            { required: true, message: '请选择上级分类', trigger: 'change' }
        ],
        photos: [
            { required: true, type: 'array', message: '请上传缩略图', trigger: 'change' },
        ],
        state: [
            { required: true, type: 'number', message: '请设置数据状态', trigger: 'change' }
        ]
	}
}
