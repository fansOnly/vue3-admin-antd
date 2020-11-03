import viewRoutes from '@/router/views'
import { deepCopy } from 'utils/util'

let _menuList = deepCopy(viewRoutes);
_menuList = _menuList.filter(item => !['search'].includes(item.name));
let menuList = [];
_menuList.map(parent => {
    let _menu = {};
    let _children = [];
    _menu.name = parent.name;
    _menu.breadcrumbName = parent.meta.breadcrumbName;
    parent.children && parent.children.map(child => {
        _children.push({name: child.name, breadcrumbName: child.meta.breadcrumbName});
    })
    _menu.children = _children;
    menuList.push(_menu);
})

export default menuList;
