import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, ACCOUNT_STATUS, FORM_CONFIG } from 'config/setting'
import { date2Timestamp, formatDate, validatePhone } from 'utils/util'

export default {
    columnList: [
        {
			title: '会员ID',
            dataIndex: 'id',
            width: '90px'
        },
		{
			title: '会员账号',
			dataIndex: 'username',
        },
		{
			title: '会员姓名',
			dataIndex: 'nickname',
        },
        // {
		// 	title: '手机号',
		// 	dataIndex: 'phone',
        // },
		{
			title: '管理员类型',
			dataIndex: 'role_name',
			scopedSlots: { customRender: 'roleNameSlot' },
			width: '120px',
		},
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '200px',
		},
        {
			title: '最近登陆',
            dataIndex: 'last_login_time',
			sorter: (a, b) => date2Timestamp(a.last_login_time) - date2Timestamp(b.last_login_time),
            width: '200px'
        },
        {
			title: '登陆IP',
            dataIndex: 'last_login_ip',
        },
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '80px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '150px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filterList: {
		...FILTER_ITEMS,
		STATUS: ACCOUNT_STATUS,
		FILTER_ID: false,
		FILTER_TITLE: false,
		FILTER_PCLASS: true,
		FILTER_USER_NAME: true,
		FILTER_NICK_NAME: true,
		FILTER_PHONE: false,
	},
	excelConfig: {
		SHOW_EXPORT: false,
		EXCEL_FIELDS: {
			'ID': 'id',
			'姓名': 'name',
			'类型': 'role_name',
			'创建时间': 'create_time',
			'最近登陆': 'last_login_time',
			'登陆IP': 'last_login_ip',
		},
		EXCEL_NAME: '管理员导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
	optionList: {
		SHOWAREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: true,
		EDIT_ABLE: true,
		ADD_ABLE: true,
		SHOW_ALL_SELECT: false,
	},
	...FORM_CONFIG,
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
		],
		role_id: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_SELECT') + '管理员分类', trigger: ['change', 'blur'] },
		],
	},
}
