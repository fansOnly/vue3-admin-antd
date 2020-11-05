import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, ROLE_STATUS, FORM_CONFIG } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: 'ID',
            dataIndex: 'id',
            width: '90px'
        },
		{
			title: '分类名称',
			dataIndex: 'name',
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '200px',
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
		STATUS: ROLE_STATUS,
		FILTER_TITLE: false,
		FILTER_NAME: true,
		FILTER_CREATE_TIME: false
	},
	excelConfig: {
		SHOW_EXPORT: false,
		EXCEL_FIELDS: {
			'ID': 'id',
		},
		EXCEL_NAME: '角色导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
	optionList: {
		SHOW_FILTER_AREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: true,
		EDIT_ABLE: true,
		ADD_ABLE: true,
		SHOW_ALL_SELECT: false,
	},
	...FORM_CONFIG,
	colon: false,
	rules: {
		name: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_NAME'), trigger: ['change', 'blur'] },
		],
	},
}
