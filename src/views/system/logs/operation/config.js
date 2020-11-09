import { PAGINATION, FILTER_ITEMS, PANEL_GROUP, OPERATION_GROUP } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
			title: '日志ID',
            dataIndex: 'id',
        },
		{
			title: '操作用户',
            dataIndex: 'adminid',
        },
		{
			title: '操作对象',
            dataIndex: 'objectid',
        },
        {
            title: '操作类型',
            dataIndex: 'type',
        },
        {
			title: '操作时间',
			dataIndex: 'create_time',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
		},
		{
			title: '操作',
			dataIndex: 'action',
			slots: { customRender: 'action' },
			width: '100px'
		}
    ],
    pagination: {
        ...PAGINATION
    },
    panelGroup: {
        ...PANEL_GROUP,
        SHOW_OPTION_ADD: false
    },
    filterList: {
        ...FILTER_ITEMS,
        OPERATION_GROUP,
        FILTER_ID: false,
        FILTER_TITLE: false,
        FILTER_STATE: false
    },
	excelConfig: {
		fields: {
            'ID': 'id',
            '操作用户': 'adminid',
            '操作对象': 'objectid',
            '操作类型': 'type',
			'操作时间': 'create_time',
		},
		name: '操作日志导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	}
}
