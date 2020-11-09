import { PAGINATION, FILTER_ITEMS, PANEL_GROUP, ASSETS_STATUS, BADGE_STATUS } from '@/config/setting'
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
        },
        {
			title: '数据路径',
            dataIndex: 'resource',
            slots: { customRender: 'resource'},
            width: '100px'
        },
        {
			title: '数据格式',
            dataIndex: 'mimetype',
			width: '150px'
        },
        {
			title: '创建日期',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '180px',
		},
		{
			title: '数据状态',
			dataIndex: 'state',
			slots: { customRender: 'state' },
			width: '110px',
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
        STATUS: ASSETS_STATUS,
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
			'ID': 'object_id',
			'名称': 'name',
            '路径': 'path',
            '格式': 'suffix',
            '创建日期': 'create_time',
            '状态': {
                field: 'state',
                callback: (value) => {
                    return ASSETS_STATUS[value];
                }
            },
		},
		name: '资源导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
}
