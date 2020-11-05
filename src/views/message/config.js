import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, MESSAGE_STATUS, FORM_CONFIG } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: '数据ID',
            dataIndex: 'id',
            width: '100px'
        },
		{
			title: i18n.t('GLOBAL.NICK_NAME'),
			dataIndex: 'nickname',
        },
        {
			title: i18n.t('GLOBAL.PHONE'),
			dataIndex: 'phone',
        },
        {
			title: i18n.t('GLOBAL.EMAIL'),
			dataIndex: 'email',
        },
        {
			title: '创建日期',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '200px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '100px',
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
		STATUS: MESSAGE_STATUS,
		FILTER_ID: false,
		FILTER_TITLE: false,
		FILTER_PHONE: true,
		FILTER_NICK_NAME: true,
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'姓名': 'nickname',
			'手机号': 'phone',
			'邮箱': 'email',
		},
		EXCEL_NAME: '留言导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
	actionList: ['回复','删除'],
	optionList: {
		SHOW_FILTER_AREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: true,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
	...FORM_CONFIG,
	colon: false,
	rules: {
		reply: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_REPLY'), trigger: ['change', 'blur'] },
		],
	},
}
