import i18n from '@/i18n'
import { FORM_CONFIG } from 'config/setting'

export default {
    columnList: [
        {
			title: i18n.t('GLOBAL.DATA_ID'),
            dataIndex: 'id',
            width: '180px'
        },
		{
			title: i18n.t('GLOBAL.DATA_SORTNUM'),
			dataIndex: 'sortnum',
		},
		{
			title: i18n.t('GLOBAL.DATA_NAME'),
			dataIndex: 'name',
		},
		{
			title: i18n.t('GLOBAL.DATA_EN_NAME'),
			dataIndex: 'en_name',
		},
		// {
		// title: i18n.t('GLOBAL.DATA_MODE'),
		// 	dataIndex: 'mode',
		// },
		{
			title: i18n.t('GLOBAL.THUMBNAIL'),
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbSlot' },
            width: '120px'
        },
		{
			title: i18n.t('GLOBAL.CREATE_DATE'),
			dataIndex: 'create_time',
            width: '200px'
        },
		{
			title: i18n.t('GLOBAL.DATA_OPTION'),
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '200px'
		}
	],
	optionList: {
		SHOWAREA: false,
		SHOW_OPTION_BAR: true,
		SHOW_MODAL: false,
		EDIT_ABLE: true,
		ADD_ABLE: true,
		SHOW_ALL_SELECT: false,
	},
	...FORM_CONFIG,
	labelAlign: 'right',
	rules: {
		sortnum: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_SORTNUM'), trigger: ['change', 'blur'] },
		],
		name: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_INPUT') + i18n.t('GLOBAL.DATA_NAME'), trigger: ['change', 'blur'] }
		],
		parent_id: [
			{ required: true, message: i18n.t('GLOBAL.OPTION_SELECT') + i18n.t('GLOBAL.DATA_SECTION'), trigger: 'change' }
		]
	}
}
