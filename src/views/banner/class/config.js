import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, BANNER_CLASS_STATUS, FORM_CONFIG } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
		{
			title: i18n.t('GLOBAL.DATA_ID'),
            dataIndex: 'id',
            width: '90px'
        },
		{
			title: i18n.t('GLOBAL.DATA_NAME'),
			dataIndex: 'name',
        },
        {
			title: i18n.t('GLOBAL.DATA_DESC'),
			dataIndex: 'content',
        },
        {
			title: i18n.t('GLOBAL.CREATE_DATE'),
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '200px',
		},
        {
			title: i18n.t('GLOBAL.UPDATE_DATE'),
			dataIndex: 'update_time',
			sorter: (a, b) => date2Timestamp(a.update_time) - date2Timestamp(b.update_time),
            width: '200px',
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
		STATUS: BANNER_CLASS_STATUS,
		FILTER_TITLE: false,
		FILTER_NAME: true,
		FILTER_STATE: false,
	},
	excelConfig: {
		SHOW_EXPORT: false,
		EXCEL_FIELDS: {
			'ID': 'id',
			'名称': 'title',
		},
		EXCEL_NAME: '导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
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
	labelAlign: 'right',
	colon: false,
	rules: {
		name: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_NAME'), trigger: ['change', 'blur'] },
		],
	},
}
