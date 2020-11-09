import { PAGINATION, FILTER_ITEMS, PANEL_GROUP, ROLE_STATUS, BADGE_STATUS } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
			title: 'ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '角色名称',
            dataIndex: 'title',
        },
        {
			title: '创建时间',
			dataIndex: 'create_time',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '180px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			slots: { customRender: 'state' },
			width: '80px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			slots: { customRender: 'action' },
			width: '150px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filterList: {
		...FILTER_ITEMS,
		STATUS: ROLE_STATUS,
    },
    panelGroup: {
        ...PANEL_GROUP
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
            '角色ID': 'id',
            '角色名称': 'title',
            '创建时间': 'create_time',
            '状态': {
                field: 'state',
                callback: (value) => {
                    return ROLE_STATUS[value];
                }
            },
		},
		name: '角色导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
}
