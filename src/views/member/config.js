import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, MEMBER_STATUS, FORM_CONFIG, GENDER_ITEMS } from 'config/setting'
import { date2Timestamp, formatDate, validatePhone } from 'utils/util'

export default {
    columnList: [
        {
			title: i18n.t('GLOBAL.DATA_ID'),
            dataIndex: 'id',
            width: '80px'
        },
		{
			title: i18n.t('GLOBAL.USER_NAME'),
			dataIndex: 'username',
        },
		{
			title: i18n.t('GLOBAL.NICK_NAME'),
			dataIndex: 'nickname',
        },
        {
			title: i18n.t('GLOBAL.DATA_AVATAR'),
			dataIndex: 'avatar',
			scopedSlots: {customRender: 'avatarSlot'},
			width: '100px'
        },
        {
			title: i18n.t('GLOBAL.PHONE'),
			dataIndex: 'phone',
        },
        {
			title: i18n.t('GLOBAL.CREATE_DATE'),
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '190px',
		},
        {
			title: i18n.t('GLOBAL.DATA_LAST_LOGIN_DATE'),
            dataIndex: 'last_login_time',
			sorter: (a, b) => date2Timestamp(a.last_login_time) - date2Timestamp(b.last_login_time),
            width: '190px'
        },
		{
			title: i18n.t('GLOBAL.STATE'),
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '100px',
		},
		{
			title: i18n.t('GLOBAL.DATA_OPTION'),
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
		STATUS: MEMBER_STATUS,
		FILTER_TITLE: false,
		FILTER_NICK_NAME: true,
		FILTER_USER_NAME: true,
		FILTER_PHONE: true,
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'姓名': 'name',
			'手机号': 'phone',
			'头像': 'avatar',
			'性别': {
				field: 'gender',
				callback: value => {
					return GENDER_ITEMS[value]
				}
			},
			'创建时间': 'create_time',
			'状态': {
				field: 'state',
				callback: value => {
                    return MEMBER_STATUS[value];
                }
			},
		},
		EXCEL_NAME: '会员导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
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
