import { FORM_CONFIG, ADMIN_STATUS } from '@/config/setting'
import { validatePhone } from '@/utils/validate'

export default {
    ...FORM_CONFIG,
    ADMIN_STATUS,
	rules: {
		username: [
			{ required: true, message: '请输入登陆账号', trigger: ['change', 'blur'] },
		],
		password: [
            { required: true, message: '请输入登陆密码', trigger: ['change', 'blur'] },
		],
		nickname: [
            { required: true, message: '请输入用户昵称', trigger: ['change', 'blur'] },
		],
		phone: [
            { validator: validatePhone, message: '请输入合法的手机号', trigger: 'change' }
		],
		email: [
            { type: 'email', message: '请输入合法的邮箱', trigger: 'change' }
		],
		role_id: [
            { required: true, type: 'number', message: '请设置管理员分类', trigger: 'change' },
		],
	},
}
