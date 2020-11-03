<template>
    <a-drawer
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
    >
        <template #handle>
            <div @click="toggleVisible" class="ant-btn-primary fix-setting">
                <CloseOutlined v-if="visible" />
                <SettingOutlined v-else />
            </div>
        </template>
        <!-- 菜单风格 -->
        <div class="side-title">菜单风格</div>
        <a-radio-group :value="menuCfg.theme" buttonStyle="solid" @change="changeMenuTheme">
            <a-radio-button value="dark">暗黑</a-radio-button>
            <a-radio-button value="light">亮色</a-radio-button>
        </a-radio-group>
        <a-divider />
        <!-- 菜单样式 -->
        <!-- <div class="side-title">菜单样式</div>
        <a-radio-group :defaultValue="menuMode" buttonStyle="solid" @change="changeMenuMode">
            <a-radio-button value="inline">垂直</a-radio-button>
            <a-radio-button value="horizontal">水平</a-radio-button>
        </a-radio-group>
        <a-divider /> -->
        <!-- 主题颜色 -->
        <div class="side-title">主题颜色</div>
        <ThemePicker />
        <a-divider />
    </a-drawer>
</template>

<script>
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { toRefs } from 'vue';
import ThemePicker from 'components/ThemePicker.vue'

export default {
    name: 'sideSetting',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        menuCfg: {
            type: Object,
            default: function() {
                return {
                    mode: 'inline',
                    theme: 'dark'
                }
            }
        }
    },
    setup(props, { emit }) {
        const { visible } = toRefs(props)

        const toggleVisible = () => {
            emit('update:visible', !visible.value)
        }
        const onClose = () => {
            emit('update:visible', false)
        }
        const changeMenuTheme = e => {
            localStorage.setItem('menuTheme', e.target.value)
            emit('change-menu-theme', e.target.value)
        }

        return {
            toggleVisible,
            onClose,
            changeMenuTheme
        }
    },
    components: {
        SettingOutlined,
        CloseOutlined,
        ThemePicker
    }
};
</script>
<style scoped>
.fix-setting {
    position: absolute;
    right: 256px;
    top: 130px;
    width: 45px;
    height: 45px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    box-shadow: none;
    text-shadow: none;
    z-index: 8888;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-setting {
    color: #fff;
    font-size: 20px;
}
.side-title {
    margin-bottom: .5em;
    color: rgba(0,0,0,.85);
    font-size: 16px;
}
</style>
