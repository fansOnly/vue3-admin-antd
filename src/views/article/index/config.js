import { PAGINATION, FILTER_ITEMS, INFO_STATUS, BADGE_STATUS } from '@/config/setting'
import { htmlEncode, date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '100px'
		},
        {
			title: '数据ID',
			dataIndex: 'id'
		},
		{
			title: '数据标题',
			dataIndex: 'title',
		},
		{
			title: '缩略图',
			dataIndex: 'thumbnail',
			slots: { customRender: 'thumb' },
			width: '100px'
		},
		{
			title: '浏览量',
			dataIndex: 'views',
			width: '100px'
		},
		{
			title: '发布日期',
			dataIndex: 'publish_time',
            width: '180px',
			sorter: (a, b) => date2Timestamp(a.publish_time) - date2Timestamp(b.publish_time),
		},
		{
			title: '数据标签',
			dataIndex: 'tags',
            slots: { customRender: 'tags' },
		},
		{
            title: '数据状态',
			dataIndex: 'state',
            slots: { customRender: 'state' },
			width: '100px',
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
		STATUS: INFO_STATUS,
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
			'ID': 'id',
			'标题': 'title',
			'内容': {
				field: 'content',
				callback: value => {
					return htmlEncode(value)
				}
			},
			'缩略图': {
				field: 'thumbnail',
				callback: (value) => {
					if (value && value.length) {
						return value[0].path
					}
					return value
                }
			},
			'浏览量': 'views',
			'标签': 'tags',
			'发布时间': 'publish_time',
			'状态': {
				field: 'state',
				callback: (value) => {
                    return INFO_STATUS[value];
                }
			},
		},
		name: '文章导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') + '.xls'
	}
}
