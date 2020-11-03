import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, INFO_STATUS, FORM_CONFIG } from 'config/setting'
import { htmlEncode, date2Timestamp, formatDate } from 'utils/util'

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
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '100px'
		},
		{
			title: i18n.t('GLOBAL.DATA_TITLE'),
			dataIndex: 'title',
		},
		{
			title: i18n.t('GLOBAL.THUMBNAIL'),
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbSlot' },
			width: '100px'
		},
		{
			title: i18n.t('GLOBAL.VIEWS'),
			dataIndex: 'views',
			width: '100px'
		},
		{
			title: i18n.t('GLOBAL.CREATE_DATE'),
			dataIndex: 'publish_time',
			width: '200px',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
		},
		{
			title: i18n.t('GLOBAL.TAG'),
			dataIndex: 'tags',
			scopedSlots: { customRender: 'tagsSlot' },
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
		STATUS: INFO_STATUS,
		FILTER_ADMIN_ID: false,
		FILTER_CATEGORY_ID: true,
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'标题': 'title',
			'内容': {
				field: 'content',
				callback: value => {
					return htmlEncode(value)
				}
			},
			'缩略图': {
				field: 'thumbnail',
				callback: (value) => {
					if (value && value.length) {
						return value[0].path
					}
					return value
                }
			},
			'浏览量': 'views',
			'标签': 'tags',
			'发布时间': 'publish_time',
			'状态': {
				field: 'state',
				callback: (value) => {
                    return INFO_STATUS[value];
                }
			},
		},
		EXCEL_NAME: '产品导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') + '.xls'
	},
	actionList: ['编辑','删除'],
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
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_TITLE'), trigger: ['change', 'blur'] }
		],
		section_id: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_SELECT') + i18n.t('GLOBAL.DATA_SECTION'), trigger: 'change' }
		],
		thumbnail: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_UPLOAD') + i18n.t('GLOBAL.THUMBNAIL'), trigger: 'change' }
		],
		publish_time: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.PUBLISH_DATE'), trigger: 'change' }
		],
		state: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.STATE'), trigger: 'change' }
		]
	}
}
