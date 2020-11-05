import { PAGINATION, FILTER_ITEMS, INFO_STATUS, BADGE_STATUS } from 'config/setting'
import { date2Timestamp } from 'utils/util'

export default {
    columnList: [
        {
			title: '数据ID',
			dataIndex: 'id',
		},
		{
			title: '数据标题',
			dataIndex: 'title',
		},
		{
			title: '缩略图',
            dataIndex: 'photos',
            slots: { customRender: 'thumb' },
            width: '100px'
		},
		{
			title: '创建日期',
            dataIndex: 'create_time',
			width: '180px',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
		},
		{
			title: '删除日期',
			dataIndex: 'delete_time',
            width: '180px',
			sorter: (a, b) => date2Timestamp(a.delete_time) - date2Timestamp(b.delete_time),
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
        SHOW_OPTION_ADD: false
    },
    filterList: {
        ...FILTER_ITEMS,
        STATUS: INFO_STATUS,
    },
    BADGE_STATUS,
}
