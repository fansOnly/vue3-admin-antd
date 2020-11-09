import { FORM_CONFIG } from '@/config/setting'
import { validatePhone } from '@/utils/util'

export default {
	...FORM_CONFIG,
	rules: {
		nickname: [
			{ required: true, message: '请输入昵称', trigger: ['change', 'blur'] },
		],
		phone: [
			{ validator: validatePhone, message: '请输入合法的手机号码', trigger: 'change' }
		],
		email: [
			{ type: 'email', message: '请输入合法的邮箱地址', trigger: 'change' }
		]
	},
}
