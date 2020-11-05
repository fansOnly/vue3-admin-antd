/**
 * 全局表单配置项
 * @formLeftLayout 左侧表单项布局
 * @formRightLayout 右侧表单项布局
 * @layout 表单布局 (horizontal vertical inline)
 * @colon 配合 label 属性使用，表示是否显示 label 后面的冒号
 * @hideRequiredMark 隐藏所有表单项的必选标记
 * @labelAlign label 标签的文本对齐方式 (left right)
 */
export const FORM_CONFIG = {
	formLeftLayout: {
		labelCol: {
			sm: { span: 4 }
		},
		wrapperCol: {
			sm: { span: 20 }
		}
	},
	formRightLayout: {
		labelCol: {
			sm: { span: 6 }
		},
		wrapperCol: {
			sm: { span: 18 }
		}
    },
    // layout: 'horizontal',
    // colon: true,
    // hideRequiredMark: false,
    // labelAlign: 'right'
};

/**
 * 页码布局配置
 * @pageSize 每页条数
 * @current 当前页数
 * @pageSizeOptions 指定每页可以显示多少条
 * @showSizeChanger 是否可以改变 pageSize
 * @showQuickJumper 是否可以快速跳转至某页
 * @showTotal 用于显示数据总量和当前数据顺序
 */
export const PAGINATION = {
    pageSize: 10,
    current: 1,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条信息`
    // showTotal: total => i18n.t('GLOBAL.PAGE_SHOW_TOTAL', [total])
}

/**
 * 数据默认筛选条件配置
 */
export const FILTER_ITEMS = {
    FILTER_ID: true,  // 根据ID筛选
    FILTER_TITLE: true,  // 根据标题筛选
    FILTER_CREATE_TIME: true,  // 根据创建时间按筛选
    FILTER_STATE: true, // 根据数据状态筛选
    FILTER_PCLASS: false, // 根据父级分类筛选
}

/**
 * 全局状态管理
 */
// 管理员状态管理 admin
export const ACCOUNT_STATUS = ['禁用', '正常'];

// 角色状态管理 role
export const ROLE_STATUS = ['禁用', '正常'];

// 资源状态管理 assets
export const ASSETS_STATUS = ['无效资源', '正常', '回收站', '文件缺失'];

// 幻灯片状态管理  banner
export const BANNER_STATUS = ['禁用', '正常'];

// 幻灯片分类状态管理  banner_class
export const BANNER_CLASS_STATUS = ['禁用', '正常'];

// 用户状态管理 member
export const MEMBER_STATUS = ['已冻结', '待审核', '已审核'];

// 文章状态管理  article
export const INFO_STATUS = ['已下架', '待审核', '已审核', '已置顶'];

// 文章分类状态管理  articleCLass
export const INFO_CLASS_STATUS = ['禁用', '正常'];

// 留言状态管理  message
export const MESSAGE_STATUS = ['未查看', '已查看', '已回复', '已置顶'];

/**
 * 其他常量
 */
// 文章标签管理
export const ARTICLE_TAGS = ['热点', '技术', '分享', '生活', '教程'];

// 产品标签管理
export const PRODUCT_TAGS = ['新品', '热销', '折扣'];

// 性别定义
export const GENDER_GROUP = ['男', '女'];

// 窗口打开方式
export const WINDOW_OPEN_GROUP = ['当前窗口', '新窗口'];

// 操作日志类型
export const OPERATION_GROUP = ['新增', '更新', '删除', '还原', '清空', '上传', '回复', '登录','登出'];

// 操作状态标识
export const BADGE_STATUS = state => {
    return ['default', 'processing', 'success', 'error', 'warinng'][state]
}

// 邮箱后缀
export const EMAIL_SUFFIXS = ['@gmail.com', '@qq.com', '@163.com', '@yahoo.com'];
