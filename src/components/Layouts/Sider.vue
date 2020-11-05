<template>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeysRef"
		:mode="menuCfg.mode"
		:theme="menuCfg.theme"
		:inlineCollapsed="collapsed"
		@openChange="handleToggleMenu"
		@select="handleSelect"
		@click="clickMenuItem"
		style="padding: 8px 0;border-right-color:transparent;"
	>
		<template v-for="item in menus" :key="item.meta.key">
            <template v-if="!item.children || item.meta.hiddenChildren">
                <a-menu-item :key="item.meta.key">
                    <router-link v-if="item.path" :to="item.path">
                        <MenuIconRender :icon="item.meta.icon" />
                        <span>{{item.meta.breadcrumbName}}</span>
                    </router-link>
                    <a v-else href="javascript:;">
                        <MenuIconRender :icon="item.meta.icon" />
                        <span>{{item.meta.breadcrumbName}}</span>
                    </a>
                </a-menu-item>
            </template>

            <template v-else>
                <!-- 包含二级分类 -->
                <a-sub-menu :key="item.meta.key" v-menu-auth="item.meta.key">
                    <template v-slot:title>
                        <MenuIconRender :icon="item.meta.icon" />
                        <span>{{item.meta.breadcrumbName}}</span>
                    </template>
                    <template v-for="second in item.children">
                        <template v-if="!second.meta.hidden">
                            <template v-if="!second.children || second.meta.hiddenChildren">
                                <a-menu-item :key="second.meta.key">
                                    <router-link v-if="second.path" :to="second.path">
                                        <MenuIconRender :icon="second.meta.icon" />
                                        <span>{{second.meta.breadcrumbName}}</span>
                                    </router-link>
                                    <a v-else href="javascript:;">
                                        <MenuIconRender :icon="second.meta.icon" />
                                        <span>{{second.meta.breadcrumbName}}</span>
                                    </a>
                                </a-menu-item>
                            </template>
                            <!-- 包含三级分类 -->
                            <template v-else>
                                <a-sub-menu :key="second.meta.key" :title="second.meta.breadcrumbName">
                                    <template v-for="third in second.children">
                                        <template v-if="!third.meta.hidden">
                                            <template v-if="!third.children || third.meta.hiddenChildren">
                                                <a-menu-item :key="third.meta.key">
                                                    <router-link v-if="third.path" :to="third.path">
                                                        <MenuIconRender :icon="third.meta.icon" />
                                                        <span>{{third.meta.breadcrumbName}}</span>
                                                    </router-link>
                                                    <a v-else href="javascript:;">
                                                        <MenuIconRender :icon="third.meta.icon" />
                                                        <span>{{third.meta.breadcrumbName}}</span>
                                                    </a>
                                                </a-menu-item>
                                            </template>
                                        </template>
                                    </template>
                                </a-sub-menu>
                            </template>
                        </template>
                    </template>
                </a-sub-menu>
            </template>
		</template>
	</a-menu>
</template>

<script>
import MenuIconRender from './MenuIconRender.vue'

import { computed, getCurrentInstance, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'

import viewRoutes from '@/router/views'
import { deepCopy } from '@/utils/util'

export default {
    name: 'side',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        menuCfg: {
            type: Object,
            default: function() {
                return {
                    mode: 'inline',
                    theme: 'dark',
                }
            }
        },
        selectedKey: {
            type: String,
            default: ''
        },
        openKey: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const { selectedKey, openKey } = toRefs(props)

        let openKeysRef = ref([])

        const routes = deepCopy(viewRoutes)
        const menus = computed(() => routes.filter(v => !v.hidden))
        const rootKeys = computed(() => menus.value.map(v => v.meta.key))

        let selectedKeys = computed({
            get() {
                return [selectedKey.value]
            },
            set() {}
        })

        watch(openKey, val => {
            openKeysRef.value = val ? [val] : []
        }, {
            immediate: true
        })

        const handleSelect = ({ selectedKeys: keys }) => {
            selectedKeys = keys
        }

        const handleToggleMenu = openKeys => {
            const latestOpenKey = openKeysRef.value.find(key => openKeys[openKeys.length - 1] === key)
            if (rootKeys.value.indexOf(latestOpenKey) == '-1') {
                openKeysRef.value = openKeys
            } else {
                openKeysRef.value = [latestOpenKey] || []
            }
        }

        const clickMenuItem = ({ key, keyPath }) => {
            if (keyPath.length == 1) {
                openKeysRef.value = []
            }
            if (key === 'user.logout') {
                const router = useRouter()
                const { ctx } = getCurrentInstance()
                ctx.$message.success('退出登陆', 1).then(() => {
                    sessionStorage.clear()
                    router.push('/login')
                });
            }
        }

        return {
            openKeysRef,
            selectedKeys,
            menus,
            handleSelect,
            handleToggleMenu,
            clickMenuItem
        }
    },
    components: {
        MenuIconRender
    }
};
</script>
<style scoped>
.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
	color: hsla(0,0%,100%,.4);
}
</style>
