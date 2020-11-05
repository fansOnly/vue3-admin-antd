import { PAGINATION, FILTER_ITEMS, BANNER_CLASS_STATUS, BADGE_STATUS } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
		{
			title: '数据ID',
            dataIndex: 'id'
        },
		{
			title: '数据标题',
			dataIndex: 'title',
        },
        {
			title: '数据描述',
			dataIndex: 'content',
        },
        {
			title: '创建日期',
			dataIndex: 'create_time',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
            width: '180px',
		},
        {
			title: '更新日期',
			dataIndex: 'update_time',
			sorter: (a, b) => date2Timestamp(a.update_time) - date2Timestamp(b.update_time),
            width: '180px',
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
    panelGroup: {
        SHOW_FILTER_AREA: true,
        SHOW_OPTION_BAR: true,
        SHOW_OPTION_ADD: true
    },
    filterList: {
        ...FILTER_ITEMS,
        STATUS: BANNER_CLASS_STATUS,
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
			'ID': 'id',
			'名称': 'title',
		},
		name: '导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	}
}
