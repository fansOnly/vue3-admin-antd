import { PAGINATION, FILTER_ITEMS, PANEL_GROUP } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
			title: '日志ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '访问用户',
            dataIndex: 'memberid',
            width: '200px'
        },
		{
			title: '访问路径',
			dataIndex: 'path',
        },
		{
			title: '访问深度',
			dataIndex: 'depth',
            width: '100px'
        },
        {
            title: '访问时长',
            dataIndex: 'duration',
            slots: { customRender: 'duration' },
            width: '100px'
        },
        {
			title: '访问时间',
			dataIndex: 'create_time',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '180px',
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
        FILTER_ID: false,
        FILTER_TITLE: false,
        FILTER_STATE: false
    },
	excelConfig: {
		fields: {
            'ID': 'id',
            '访问用户': 'memberid',
			'访问路径': 'path',
            '访问深度': 'depth',
            '访问时长': {
                field: 'duration',
                callback: (value) => {
                    return `${value}s`;
                }
            },
			'访问时间': 'create_time',
		},
		name: '访问日志导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	}
}
