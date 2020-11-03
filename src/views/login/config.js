export default {
	layout: 'horizontal',
    colon: true,
	rules: {
		username: [
			{ required: true, message: '请输入账号', trigger: ['change', 'blur'] },
		],
		password: [
            { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
		]
	},
}
