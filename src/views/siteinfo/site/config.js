export default {
    layout: 'vertical',
    colon: false,
    rules: {
        baseRules: {
            name: [
                { required: true, message: '请输入站点名称', trigger: ['change', 'blur'] },
            ],
            phone: [
                { required: true, message: '请输入联系方式', trigger: ['change', 'blur'] },
            ],
            email: [
                { type: 'email', message: '请输入联系邮箱', trigger: ['change', 'blur'] },
            ],
        },
        seoRules: {
            title: [
                { required: true, message: '请输入SEO标题', trigger: ['change', 'blur'] },
            ],
            keywords: [
                { required: true, message: '请输入SEO关键字', trigger: ['change', 'blur'] },
            ],
            description: [
                { required: true, message: '请输入SEO描述', trigger: ['change', 'blur'] },
            ],
        },
    }
}
