import { PAGINATION, FILTER_ITEMS, BANNER_STATUS, BADGE_STATUS } from 'config/setting'
import { date2Timestamp, formatDate } from 'utils/util'

export default {
    columnList: [
		{
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => Number(a.sortnum) - Number(b.sortnum),
			width: '100px'
		},
		{
			title: 'ID',
            dataIndex: 'id',
		},
		{
			title: '标题',
			dataIndex: 'title',
        },
        {
			title: '链接地址',
			dataIndex: 'url',
        },
        {
			title: '缩略图',
            dataIndex: 'thumbnail',
            slots: {customRender: 'thumb'}
        },
        {
			title: '创建日期',
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
	panelGroup: {
		SHOW_FILTER_AREA: true,
        SHOW_OPTION_BAR: true,
        SHOW_OPTION_ADD: true
    },
	filterList: {
		...FILTER_ITEMS,
		STATUS: BANNER_STATUS,
	},
	excelConfig: {
		fields: {
			'ID': 'id',
			'幻灯片名称': 'title',
			'幻灯片链接': 'url',
			'幻灯片图片': 'image',
		},
		name: '幻灯片导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
    },
    BADGE_STATUS
}
