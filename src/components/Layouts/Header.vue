<template>
	<div class="header">
		<div class="header-left" @click="$emit('update:collapsed', !collapsed)">
            <a-tooltip v-if="collapsed">
                <template v-slot:title>展开菜单</template>
                <MenuUnfoldOutlined />
            </a-tooltip>
            <a-tooltip v-else>
                <template v-slot:title>折叠菜单</template>
                <MenuFoldOutlined />
            </a-tooltip>
		</div>
		<div class="header-right">
			<div class="opt-search">
				<a-input-search v-model:value="keyword" allow-clear placeholder="input search text" @search="handleSearch" enterButton />
			</div>
			<div class="ant-dropdown-menu-item opt-item" @click="handleDialogOpen('qrcode')">
                <a-tooltip>
                    <template v-slot:title>二维码</template>
                    <QrcodeOutlined style="color:#777;font-size:20px;" />
                </a-tooltip>
			</div>
			<div class="ant-dropdown-menu-item opt-item" @click="toggleFullscreen">
                <a-tooltip v-if="fullscreen">
                    <template v-slot:title>取消全屏</template>
                    <FullscreenExitOutlined style="color:#777;font-size:20px;" />
                </a-tooltip>
                <a-tooltip v-else>
                    <template v-slot:title>全屏</template>
                    <FullscreenOutlined style="color:#777;font-size:20px;" />
                </a-tooltip>
			</div>
			<div class="ant-dropdown-menu-item opt-item">
                <router-link to='/admin/message/list'>
                    <a-tooltip>
                        <template v-slot:title>未读消息</template>
                        <a-badge count="99">
                            <BellOutlined style="color:#777;font-size:20px;" />
                        </a-badge>
                    </a-tooltip>
                </router-link>
            </div>
			<div class="users">
				<a-dropdown placement="topRight">
					<div class="ant-dropdown-menu-item opt-item">
                        <a-avatar v-if="!user.avatar">
                            <template v-slot:icon><UserOutlined style="font-size:20px;margin-right:0;" /></template>
                        </a-avatar>
                        <a-avatar v-else :src="getImgAbsPath(user.avatar)" />
                        <span style="margin-left:10px;text-transform:uppercase;">{{user.nickname || 'admin'}}</span>
					</div>
                    <template v-slot:overlay>
                        <a-menu @click="switchUserOption">
                            <a-menu-item key="user.userinfo">
                                <router-link to='/admin/user/userinfo'>
                                    <UserOutlined style="margin-right:5px;" />编辑信息
                                </router-link>
                            </a-menu-item>
                            <a-menu-item key="user.changepass">
                                <router-link to='/admin/user/changepass'>
                                    <SafetyCertificateOutlined style="margin-right:5px;" />修改密码
                                </router-link>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="user.logout">
                                <PoweroffOutlined />退出系统
                            </a-menu-item>
                        </a-menu>
                    </template>
				</a-dropdown>
			</div>
			<div class="lans">
				<a-dropdown placement="topRight">
					<div class="ant-dropdown-menu-item opt-item">
                        <GlobalOutlined style="color:#777;font-size:20px;" />
					</div>
                    <template v-slot:overlay>
                        <a-menu v-model:selectedKeys="selectedKeys" @click="selectLocale">
                            <template v-for="(item, index) in Object.keys(LANS)" :key="item">
                                <a-menu-item>
                                    <a href="javascript:;">{{LANS[item].icon}} {{LANS[item].labels[index]}}</a>
                                </a-menu-item>
                            </template>
                        </a-menu>
                    </template>
				</a-dropdown>
			</div>
		</div>
		<Qrcode :visible="dialogName === 'qrcode'" @cancel="dialogName = false" />
	</div>
</template>

<script>
    import {
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        BellOutlined,
        QrcodeOutlined,
        FullscreenOutlined,
        FullscreenExitOutlined,
        GlobalOutlined,
        UserOutlined,
        SafetyCertificateOutlined,
        PoweroffOutlined
    } from '@ant-design/icons-vue'
	import { Modal } from 'ant-design-vue'
	import Qrcode from 'components/Qrcode.vue'

    import { ref, getCurrentInstance, watch, reactive, readonly, toRefs } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    import { getImgAbsPath } from '@/utils/util'

	export default {
		name: 'heade',
		props: {
			collapsed: {
				type: Boolean,
				default: false
			}
		},
        setup() {
            const { ctx } = getCurrentInstance()
            const router = useRouter()
            const store = useStore()

            const qrcodeVisible = ref(false)
            const keyword = ref('')
            const fullscreen = ref(false)
            const dialogName = ref('')
            const user = readonly(reactive({
                ...toRefs(store.state.user.user)
            }))
            const handleSearch = value => {
                if (!value.replace(/\s/g, '')) {
					keyword.value = ''
					return ctx.$message.warn('请输入搜索关键字');
				}
				router.push({name: 'search', query: {keyword: value}}).catch(err => {err});
            }

            const toggleFullscreen = () => {
                if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen()
					fullscreen.value = true
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen()
						fullscreen.value = false
					}
				}
            }

            const handleDialogOpen = val => {
                dialogName.value = val
            }

            const switchUserOption = item => {
                if (item.key == 'user.logout') {
					const modal = Modal.confirm({
						title: '提示',
						content: '真的要注销登录吗 ?',
						okText: '确定',
						cancelText: '取消',
						onOk () {
                            sessionStorage.clear();
                            router.push('/login')
							modal.destroy();
						}
					});
				}
            }

            const LANS = Object.freeze({
                'zh-cn': {
                    icon: '🇨🇳',
                    labels: ['简体中文', '繁体中文', '英文']
                },
                'zh-hk': {
                    icon: '🇨🇳',
                    labels: ['簡體中文', '繁體中文', '英文']
                },
                'en': {
                    icon: '🇬🇧',
                    labels: ['Simplified Chinese', 'Traditional Chinese', 'English']
                }
            })
            const currentLocale = ref('zh-zn')
            const selectedKeys = ref([currentLocale.value])
            watch(currentLocale, val => {
                selectedKeys.value = [val]
            })
            const selectLocale = item => {
                currentLocale.value = item.key
            }

            window.addEventListener('resize', windowResize);
            const windowResize = () => {
                if (!document.fullscreenElement && !document.mozFullscreenElement && !document.webkitFullscreenElement) {
					fullscreen.value = false;
				}
            }

            window.addEventListener('keydown', e => {
                F11keydown(e);
            })
            const F11keydown = e => {
                if (e.keyCode == 122) {
					e.preventDefault()
				}
            }

            return {
                user,
                qrcodeVisible,
                keyword,
                fullscreen,
                dialogName,
                LANS,
                currentLocale,
                selectedKeys,
                handleSearch,
                toggleFullscreen,
                handleDialogOpen,
                switchUserOption,
                selectLocale,
                getImgAbsPath
            }
        },
		components: {
            MenuFoldOutlined,
            MenuUnfoldOutlined,
            BellOutlined,
            QrcodeOutlined,
            FullscreenOutlined,
            FullscreenExitOutlined,
            GlobalOutlined,
            UserOutlined,
            SafetyCertificateOutlined,
            PoweroffOutlined,
			Qrcode
        }
	};
</script>
<style scoped>
.header {
	position: relative;
	padding: 0 24px;
	background: #fff;
	color: rgba(0, 0, 0, 0.45);
    box-shadow: 1px 1px 3px 0 #e8e8e8;
	z-index: 5;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.header::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 1px 0 2px 0 #e8e8e8 inset;
	z-index: -1;
}
.header-left {
    color:#777;
    font-size:28px;
    vertical-align:middle;
    cursor:pointer;
}
.header-right {
	display: flex;
	align-items: center;
}
.opt-search {
	display: flex;
	align-items: center;
	margin-right: 15px;
}
.opt-item {
	height: 64px;
	padding: 0 12px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.opt-item>.anticon:first-child {
	margin-right: 0;
}
.ant-avatar-image {
	background: #f7f7f7;
}
</style>
