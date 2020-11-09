import { FORM_CONFIG, BANNER_CLASS_STATUS } from '@/config/setting'

export default {
    ...FORM_CONFIG,
    BANNER_CLASS_STATUS,
	rules: {
		title: [
			{ required: true, message: '请输入幻灯片标题', trigger: ['change', 'blur'] },
		],
	},
}
