<template>
    <div class="color-picker-board" @click="colorPicker">
        <a-tooltip v-for="item in themes" :key="item.id" placement="top" :title="item.title">
            <span
                class="color-picker"
                :class="{ cur: theme == item.color }"
                :data-color="item.color"
                :style="`background: ${item.color};`"
                >
                <CheckOutlined />
            </span>
        </a-tooltip>
    </div>
</template>

<script>
import { CheckOutlined } from '@ant-design/icons-vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('settings')

const themes = [
    {id: 1, title: '薄暮', color: '#f5222d'},
    {id: 2, title: '火山', color: '#fa541c'},
    {id: 3, title: '日暮', color: '#faad14'},
    {id: 4, title: '明青', color: '#13c2c2'},
    {id: 5, title: '极光绿', color: '#52c41a'},
    {id: 6, title: '拂晓蓝(默认)', color: '#1890ff'},
    {id: 7, title: '极客蓝', color: '#2f54eb'},
    {id: 8, title: '酱紫', color: '#722ed1'},
];

const version = require('ant-design-vue/package.json').version; // version
const ORIGINAL_THEME = '#1890ff'; // default color
const ORIGINAL_CLUSTER = ['#1890ff', '#40a9ff', '#096dd9', '#91d5ff', 'rgba(24,144,255,.2)'];

export default {
    data() {
        return {
            themes,
            chalk: '',
            theme: '',
        };
    },
    computed: {
        ...mapState({theme_: 'theme'}),
        defaultTheme() {
            return this.theme_;
        }
    },
    watch: {
        defaultTheme: {
            handler: function(val) {
                this.theme = val;
            },
            immediate: true
        },
        theme: {
            handler: async function(val, oldValx) {
                const oldVal = this.chalk ? oldValx : ORIGINAL_THEME
                if (typeof val !== 'string') return;
                const originalCluster = this.chalk ? JSON.parse(localStorage.getItem('themeCluster')) : ORIGINAL_CLUSTER;
                const originRGB = this.Hex2RGB(oldVal.replace('#', ''));
                const themeRGB = this.Hex2RGB(val.replace('#', ''));
                let themeCluster = [];
                let last = originalCluster.pop();
                last = last.replace(new RegExp(originRGB), themeRGB);
                originalCluster.forEach(item => {
                    themeCluster.push(this.tintColor(originRGB, themeRGB, item.replace('#', '')))
                })
                themeCluster.push(last);
                localStorage.setItem('themeCluster', JSON.stringify(themeCluster));
                // console.log(themeCluster, originalCluster);
                // rgba => 24,144,255  64,169,255  9,109,217  145,213,255
                // const themeCluster = ['#f5222d', '#B93B2D', '#E64507', '#7C672D', 'rgba(245,34,45,.2)'];
                // f5222d  B93B2D  E64507 7C672D
                // rgba => 245,34,45   205,59,45   230,69,7  124,103,45
                const getHandler = (variable, id) => {
                    return () => {
                        this.chalk = this.updateStyle(
                            this[variable],
                            originalCluster,
                            themeCluster
                        );
                        let styleTag = document.getElementById(id);
                        if (!styleTag) {
                            styleTag = document.createElement('style');
                            styleTag.setAttribute('type', 'text/css');
                            styleTag.setAttribute('id', id);
                            document.head.appendChild(styleTag);
                        }
                        // 处理加载进度条样式
                        const nprogressStyle = `#nprogress .bar {background: ${val}!important;}`;
                        // 处理disabled样式
                        const disabledBtnStyle = `.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-disabled {background: ${val}!important;border-color: ${val}!important;}`
                        styleTag.innerText = this.chalk + nprogressStyle + disabledBtnStyle;
                    };
                };
                if (!this.chalk) {
                    const url = `https://unpkg.com/ant-design-vue@${version}/dist/antd.min.css`;
                    await this.getCSSString(url, 'chalk');
                }
                // var res = this.chalk.match(/#[0-9A-Fa-f]{6}/g);
                const chalkHandler = getHandler('chalk', 'chalk-style');
                chalkHandler();
            },
            immediate: true
        }
    },
    methods: {
        Hex2RGB: color => {
            let red = parseInt(color.slice(0, 2), 16);
            let green = parseInt(color.slice(2, 4), 16);
            let blue = parseInt(color.slice(4, 6), 16);

            return [red, green, blue];
        },
        tintColor: (origin, theme, color) => {
            let red = parseInt(color.slice(0, 2), 16);
            let green = parseInt(color.slice(2, 4), 16);
            let blue = parseInt(color.slice(4, 6), 16);

            const diff = [red - origin[0], green - origin[1], blue - origin[2]];

            const compare255 = (num1, num2) => {
                return num1 + num2 > 255 || num1 + num2 < 0
            }

            red = compare255(theme[0], diff[0]) ? theme[0] - diff[0] : theme[0] + diff[0];
            green = compare255(theme[1], diff[1]) ? theme[1] - diff[1] : theme[1] + diff[1];
            blue = compare255(theme[2], diff[2]) ? theme[2] - diff[2] : theme[2] + diff[2];

            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);

            return `#${red}${green}${blue}`;
        },
        colorPicker(e) {
            const themeColor = e.target.dataset.color;
            if (!themeColor) return;
            this.theme = themeColor;
            localStorage.setItem('theme', themeColor);
            this.changeSetting(themeColor);
        },
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, 'ig'),
                    newCluster[index]
                );
            });
            return newStyle;
        },
        getCSSString(url, variable) {
            return new Promise(resolve => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
                        resolve();
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
        ...mapActions(['changeSetting'])
    },
    components: {
        CheckOutlined
    }
};
</script>

<style scoped>
.color-picker-board {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.color-picker {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 0;
    margin: 0 5px 5px 0;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    line-height: 20px;
}
.color-picker.cur {
    color: #fff;
    font-size: 15px;
}
</style>
