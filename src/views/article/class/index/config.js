import { PANEL_GROUP, BADGE_STATUS } from '@/config/setting'

export default {
    columnList: [
        {
            title: '序号',
            dataIndex: 'sortnum',
            width: '150px'
        },
        {
			title: '数据ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '数据名称',
			dataIndex: 'name',
		},
		{
			title: '数据别称',
			dataIndex: 'en_name',
		},
		{
			title: '缩略图',
            dataIndex: 'photos',
            slots: { customRender: 'thumb' },
            width: '120px'
        },
		{
			title: '创建日期',
			dataIndex: 'create_time',
            width: '180px'
        },
		{
			title: '操作',
			dataIndex: 'action',
			slots: { customRender: 'action' },
			width: '200px'
		}
    ],
    panelGroup: {
        ...PANEL_GROUP,
        SHOW_FILTER_AREA: false,
    },
    BADGE_STATUS
}
