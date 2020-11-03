import i18n from '@/i18n'
import { FORM_CONFIG } from 'config/setting'
import { validatePhone } from 'utils/util'

export default {
	...FORM_CONFIG,
	colon: false,
	rules: {
		username: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.USER_NAME'), trigger: ['change', 'blur'] },
		],
		password: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.PASSWORD'), trigger: ['change', 'blur'] },
		],
		nickname: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.NICK_NAME'), trigger: ['change', 'blur'] },
		],
		phone: [
			{ validator: validatePhone, message: i18n.t('GLOBAL.PHONE') + i18n.t('VALIDATION.ELLEGAL'), trigger: 'change' }
		],
		email: [
			{ type: 'email', message: i18n.t('GLOBAL.EMAIL') + i18n.t('VALIDATION.ELLEGAL'), trigger: 'change' }
		]
	},
}
