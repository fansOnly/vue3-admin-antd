import { PAGINATION, FILTER_ITEMS, OPERATION_ITEMS } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
        {
			title: '日志ID',
            dataIndex: 'id',
            width: '90px'
        },
		{
			title: '操作人ID',
			dataIndex: 'admin_id',
            width: '90px'
        },
		{
			title: '操作人员',
			dataIndex: 'admin_nickname',
        },
		{
			title: '关联ID',
			dataIndex: 'object_id',
            width: '90px'
        },
		{
			title: '关联对象',
			dataIndex: 'object_name',
        },
		{
			title: '关联栏目',
			dataIndex: 'object_table',
        },
		{
			title: '操作类型',
			dataIndex: 'operation',
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
		FILTER_OPERATOR: true,  // 操作人
		FILTER_OBJECT_TABLE: true,  // 操作库
		FILTER_OPERATION: true,  // 操作类型
	},
	OPERATION_ITEMS,
	excelConfig: {
		SHOW_EXPORT: true,
		EXCEL_FIELDS: {
			'ID': 'id',
			'操作人ID': 'admin_id',
			'操作人员': 'admin_nickname',
			'关联ID': 'object_id',
			'关联对象': 'object_name',
			'关联栏目': 'object_table',
			'操作类型': 'operation',
			'创建时间': 'create_time',
		},
		EXCEL_NAME: '操作日志导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	},
	actionList: ['删除'],
	optionList: {
		SHOWAREA: true,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: false,
		EDIT_ABLE: false,
		ADD_ABLE: false,
		SHOW_ALL_SELECT: false,
	},
}
