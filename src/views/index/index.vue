<template>
    <div class="page" :style="{ minHeight: clientHeight }">
        <a-layout-sider class="sidebar" breakpoint="sm" :theme="menuCfg.theme" :collapsed="collapsed">
            <div class="logo-wrap">
                <img v-if="menuCfg.theme == 'dark'" class="logo" src="../../assets/images/logo.png" alt />
                <img v-else class="logo" src="../../assets/images/logo.png" alt />
                <h1 class="logo-title">fans design</h1>
            </div>
            <BaseSider :menu-cfg="menuCfg" :selected-key="selectedKey" :open-key="openKey" />
        </a-layout-sider>
        <a-layout class="main">
            <a-layout-header>
                <BaseHeader v-model:collapsed="collapsed" />
            </a-layout-header>
            <BreadCrumb :show-breadcrumb="showBreadcrumb" :show-backbtn="showBackbtn" :routes="routes" />
            <a-layout-content>
                <router-view />
            </a-layout-content>
            <a-layout-footer>
                <BaseFooter />
            </a-layout-footer>
        </a-layout>
        <SideSetting v-model:visible="sideSettingVisible" :menu-cfg="menuCfg" @change-menu-theme="changeMenuTheme" />
    </div>
</template>

<script>
import BaseSider from '@/components/Layouts/Sider.vue'
import BaseHeader from '@/components/Layouts/Header.vue'
import BaseFooter from '@/components/Layouts/Footer.vue'
import SideSetting from 'components/SideSetting.vue'
import BreadCrumb from '@/components/Layouts/Breadcrumb.vue'

import { computed, getCurrentInstance, nextTick, reactive, ref, watch } from 'vue'

export default {
    name: 'adminIndex',
    setup() {
        const { ctx } = getCurrentInstance()

        const clientHeight = computed(() => document.documentElement.clientHeight + 'px')

        const collapsed = ref(false)
        const sideSettingVisible = ref(false)
        const showBreadcrumb = ref(false)
        const showBackbtn = ref(false)
        const selectedKey = ref('')
        const openKey = ref('')
        const routes = ref([])
        const menuCfg = reactive({
            mode: localStorage.getItem('menuMode') || 'inline',
            theme: localStorage.getItem('menuTheme') || 'dark'
        })

        const updateBreadcrumbRoutes = route => {
            let _routes = [];
            route.matched.filter(item => item.meta.breadcrumbName).map(item => {
                _routes.push({path: item.path, name: item.name, meta: item.meta})
            })
            return _routes;
        }

        watch(
            () => ctx.$router.currentRoute.value,
            to => {
                showBreadcrumb.value = to.meta.depth > 1
                showBackbtn.value = to.meta.depth > 2
                selectedKey.value = to.matched[to.matched.length - 1].meta.key
                openKey.value = to.matched.filter(item => item.meta.depth == 1)[0].name
                routes.value = updateBreadcrumbRoutes(to)
            },
            {
                immediate: true
            }
        )

        watch(collapsed, async val => {
            await nextTick()
            if (!val && document.querySelector('.ant-menu-submenu-selected .ant-menu-sub')) {
                document.querySelector('.ant-menu-submenu-selected .ant-menu-sub').style.display = 'block';
            }
        })

        const changeMenuTheme = theme => {
            menuCfg.theme = theme
        }

        return {
            clientHeight,
            collapsed,
            sideSettingVisible,
            showBreadcrumb,
            showBackbtn,
            selectedKey,
            openKey,
            routes,
            menuCfg,
            changeMenuTheme
        }
    },
    components: {
        BaseHeader,
        BaseFooter,
        BaseSider,
        SideSetting,
        BreadCrumb
    }
};
</script>
<style scoped>
.page {
    background: #f0f2f5;
    overflow: hidden;
    display: flex;
}
.sidebar {
    overflow-y: auto;
    box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}
.logo-wrap {
    position: relative;
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
}
.ant-layout-sider-light .logo-wrap {
    box-shadow: 1px 1px 3px 0 #e8e8e8;
}
.ant-layout-sider-dark .logo-wrap {
    background: #002140;
}
.logo-title {
    display: inline-block;
    margin: 0 0 0 15px;
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    transition: all ease 0.2s;
}
.ant-layout-sider-light .logo-title {
    color: #000;
}
.logo {
    width: 32px;
    vertical-align: middle;
}
.main {
    display: block;
    overflow: auto;
    transition: all ease 0.2s;
}
.ant-layout-header {
    padding: 0;
    background: transparent;
}
</style>
