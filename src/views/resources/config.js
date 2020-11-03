import i18n from '@/i18n'
import { PAGINATION, FILTER_ITEMS, ASSETS_STATUS } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: i18n.t('GLOBAL.DATA_ID'),
            dataIndex: 'id',
            width: '100px'
        },
		{
			title: i18n.t('GLOBAL.DATA_NAME'),
			dataIndex: 'originalname',
        },
        {
			title: i18n.t('GLOBAL.PATH'),
            dataIndex: 'path',
			scopedSlots: {customRender: 'pathSlot'},
        },
        {
			title: i18n.t('GLOBAL.MIME_TYPE'),
            dataIndex: 'mimetype',
			width: '120px'
        },
        {
			title: i18n.t('GLOBAL.SUFFIX'),
            dataIndex: 'suffix',
			width: '120px'
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
			width: '110px',
		},
		{
			title: i18n.t('GLOBAL.DATA_OPTION'),
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '70px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filterList: {
		...FILTER_ITEMS,
		STATUS: ASSETS_STATUS,
		FILTER_ID: false,
		FILTER_TITLE: false,
		FILTER_OBJECT_ID: false,
		FILTER_NAME: true,
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'object_id',
			'名称': 'name',
			'类型': 'type',
		},
		EXCEL_NAME: '资源导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
	actionList: ['删除'],
	optionList: {
		SHOWAREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: true,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
}
