import { PAGINATION, FILTER_ITEMS } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: '日志ID',
            dataIndex: 'id',
            width: '90px'
        },
		{
			title: '搜索关键词',
			dataIndex: 'title',
        },
		{
			title: '搜索次数',
			dataIndex: 'views',
            width: '120px'
        },
        {
			title: '最早搜索日期',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '190px',
		},
        {
			title: '最近搜索日期',
			dataIndex: 'update_time',
			sorter: (a, b) => date2Timestamp(a.update_time) - date2Timestamp(b.update_time),
            width: '190px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '100px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filterList: {
		...FILTER_ITEMS,
		FILTER_ID: false,
		FILTER_STATE: false,
		FILTER_UPDATE_TIME: true
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'搜索关键词': 'title',
			'搜索次数': 'views',
		},
		EXCEL_NAME: '用户搜索记录导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	},
	actionList: ['删除'],
	optionList: {
		SHOW_FILTER_AREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: false,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
}
