import { FORM_CONFIG, ROLE_STATUS } from '@/config/setting'

export default {
    ...FORM_CONFIG,
    ROLE_STATUS,
    rules: {
        title: [
            { required: true, message: '请输入角色名称', trigger: ['change', 'blur'] },
        ],
        permission: [
            { required: true, type: 'array', message: '请输入设置角色权限', trigger: 'change' },
        ],
    },
}
