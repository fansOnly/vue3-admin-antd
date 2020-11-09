import { PAGINATION, FILTER_ITEMS, PANEL_GROUP, ADMIN_STATUS, BADGE_STATUS } from '@/config/setting'
import { date2Timestamp, formatDate } from '@/utils/util'

export default {
    columnList: [
        {
            title: '用户ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '用户账号',
			dataIndex: 'username',
        },
		{
            title: '用户昵称',
            dataIndex: 'nickname',
            width: '120px'
        },
        {
            title: '用户头像',
            dataIndex: 'avatar',
            slots: { customRender: 'avatar' },
            width: '100px',
        },
		{
			title: '管理员类型',
			dataIndex: 'role_name',
			slots: { customRender: 'roleName' },
			width: '120px',
		},
        {
			title: '创建日期',
			dataIndex: 'create_time',
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '180px',
		},
        {
			title: '最近登陆',
            dataIndex: 'last_login_time',
			sorter: (a, b) => date2Timestamp(a.last_login_time) - date2Timestamp(b.last_login_time),
            width: '180px'
        },
        {
			title: '登陆IP',
            dataIndex: 'last_login_ip',
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
			width: '140px'
		}
	],
	pagination: {
		...PAGINATION
    },
    panelGroup: {
        ...PANEL_GROUP
    },
	filterList: {
		...FILTER_ITEMS,
		STATUS: ADMIN_STATUS,
    },
    BADGE_STATUS,
	excelConfig: {
		fields: {
			'ID': 'id',
			'姓名': 'name',
			'类型': 'role_name',
			'创建时间': 'create_time',
			'最近登陆': 'last_login_time',
            '登陆IP': 'last_login_ip',
            '状态': {
                field: 'state',
                callback: (value) => {
                    return ADMIN_STATUS[value];
                }
            },
		},
		name: '管理员导出-'+ formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
	},
}
