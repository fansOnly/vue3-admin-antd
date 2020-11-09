import {
    Layout,
    Menu,
    Dropdown,
    Breadcrumb,
    Pagination,
    Form,
    Input,
    Checkbox,
    Select,
    Button,
    Avatar,
    Badge,
    BackTop,
    Tooltip,
    Modal,
    Drawer,
    Radio,
    Divider,
    Row,
    Col,
    Progress,
    Card,
    Table,
    List,
    Tabs,
    Tag,
    DatePicker,
    Popconfirm,
    Upload,
    TreeSelect,
    Spin
} from 'ant-design-vue'

const components = {
    Layout,
    Menu,
    Dropdown,
    Breadcrumb,
    Pagination,
    Form,
    Input,
    Checkbox,
    Select,
    Button,
    Avatar,
    Badge,
    BackTop,
    Tooltip,
    Modal,
    Drawer,
    Radio,
    Divider,
    Row,
    Col,
    Progress,
    Card,
    Table,
    List,
    Tabs,
    Tag,
    DatePicker,
    Popconfirm,
    Upload,
    TreeSelect,
    Spin
}

function install(Vue) {
    Object.keys(components).forEach(key => {
        Vue.use(components[key])
    })
}

export default { install }
