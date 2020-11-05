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
			title: '访问会员',
			dataIndex: 'member_nickname',
        },
		{
			title: '访问路径',
			dataIndex: 'path',
        },
		{
			title: '访问深度',
			dataIndex: 'depth',
            width: '90px'
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
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
		FILTER_TITLE: false,
		FILTER_MEMBER_NICK_NAME: true,
	},
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'访问路径': 'path',
			'访问深度': 'depth',
			'创建时间': 'create_time',
		},
		EXCEL_NAME: '访问日志导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
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
