import { PAGINATION, FILTER_ITEMS, PANEL_GROUP, INFO_STATUS, BADGE_STATUS } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
			title: '数据ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '数据标题',
			dataIndex: 'title',
			slots: { customRender: 'titlex' },
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
			width: '100px',
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
        SHOW_OPTION_ADD: false,
        SHOW_BATCH_BTN: false
    },
    filterList: {
        ...FILTER_ITEMS,
        STATUS: INFO_STATUS,
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
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
		name: '搜索结果导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+ '.xls'
	},
}
