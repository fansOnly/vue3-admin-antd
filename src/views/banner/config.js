import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, BANNER_STATUS, FORM_CONFIG } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
		{
			title: i18n.t('GLOBAL.DATA_ID'),
            dataIndex: 'id',
            width: '100px'
		},
		{
			title: i18n.t('GLOBAL.DATA_SORTNUM'),
			dataIndex: 'sortnum',
			sorter: (a, b) => Number(a.sortnum) - Number(b.sortnum),
			width: '100px'
		},
		{
			title: i18n.t('GLOBAL.DATA_TITLE'),
			dataIndex: 'title',
        },
        {
			title: i18n.t('GLOBAL.DATA_LINK'),
			dataIndex: 'url',
        },
        {
			title: i18n.t('GLOBAL.THUMBNAIL'),
            dataIndex: 'thumbnail',
            scopedSlots: {customRender: 'thumbSlot'}
        },
        {
			title: i18n.t('GLOBAL.CREATE_DATE'),
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '200px',
		},
		{
			title: i18n.t('GLOBAL.STATE'),
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '80px',
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
		FILTER_ID: false,
		FILTER_PCLASS: true,
		STATUS: BANNER_STATUS,
	},
	excelConfig: {
		SHOW_EXPORT: false,
		EXCEL_FIELDS: {
			'ID': 'id',
			'幻灯片名称': 'title',
			'幻灯片链接': 'url',
			'幻灯片图片': 'image',
		},
		EXCEL_NAME: '幻灯片导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
	optionList: {
		SHOWAREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: false,
		EDIT_ABLE: true,
		ADD_ABLE: true,
		SHOW_ALL_SELECT: false,
	},
	...FORM_CONFIG,
	labelAlign: 'right',
	rules: {
		sortnum: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_SORTNUM'), trigger: ['change', 'blur'] },
		],
		title: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_TITLE'), trigger: ['change', 'blur'] },
		],
		class_id: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_PARENT'), trigger: ['change', 'blur'] },
		],
		thumbnail: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_UPLOAD') + i18n.t('GLOBAL.THUMBNAIL'), trigger:'change' },
		]
	}
}
