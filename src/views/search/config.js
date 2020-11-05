import { PAGINATION, FILTER_ITEMS, INFO_STATUS } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: '数据ID',
            dataIndex: 'id',
            width: '80px'
        },
		{
			title: '数据标题',
			dataIndex: 'title',
			scopedSlots: { customRender: 'titleSlot' },
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '190px',
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
			width: '100px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filterList: {
		...FILTER_ITEMS,
		STATUS: INFO_STATUS,
	},
	excelConfig: {
		SHOW_EXPORT: false,
		EXCEL_FIELDS: {
			'ID': 'id',
			'标题': 'title',
			'创建时间': 'create_time',
			'状态': {
				field: 'state',
				callback: (value) => {
                    return INFO_STATUS[value];
                }
			},
		},
		EXCEL_NAME: '搜索结果导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	},
	actionList: ['查看'],
	optionList: {
		SHOW_FILTER_AREA: true,
		SHOW_OPTION_BAR: false,
		SHOW_MODAL: false,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
}
