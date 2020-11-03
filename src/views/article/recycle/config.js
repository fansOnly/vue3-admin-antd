import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, INFO_STATUS } from 'config/setting'
import { date2Timestamp, formatDate, htmlEncode } from 'utils/util'

export default {
    columnList: [
        {
			title: i18n.t('GLOBAL.DATA_ID'),
			dataIndex: 'id',
			width: '120px'
		},
		{
			title: i18n.t('GLOBAL.DATA_TITLE'),
			dataIndex: 'title',
		},
		{
			title: i18n.t('GLOBAL.THUMBNAIL'),
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbSlot' }
		},
		{
			title: i18n.t('GLOBAL.PUBLISH_DATE'),
			dataIndex: 'publish_time',
			width: '200px',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
		},
		{
			title: i18n.t('GLOBAL.DELETE_DATE'),
			dataIndex: 'delete_time',
			width: '200px',
			sorter: (a, b) => date2Timestamp(a.delete_time) - date2Timestamp(b.delete_time),
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
		FILTER_STATE: false,
		FILTER_SECTION_ID: true,
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
			'标签': 'tags',
			'发布时间': 'publish_time',
			'删除时间': 'delete_time',
			'状态': {
				field: 'state',
				callback: (value) => {
                    return INFO_STATUS[value];
                }
			},
		},
		EXCEL_NAME: '文章回收站导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') + '.xls'
	},
	optionList: {
		SHOWAREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: false,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
}
