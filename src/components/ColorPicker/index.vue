<template>
    <div class="color-picker-wrap">
        <!-- 色板区 -->
        <sv-panel :color="color"></sv-panel>
        <!-- 滑块区 -->
        <div class="color-slider-box">
            <div class="color-show">
                <div class="color-transparent"></div>
                <div class="color-background" :style="{'background-color': color.value}"></div>
            </div>
            <div class="color-slider">
                <!-- 色块滑动条 -->
                <hue-slider :color="color"></hue-slider>
                <!-- 透明滑动条 -->
                <alpha-slider :color="color"></alpha-slider>
            </div>
        </div>
        <!-- 色值展示区 -->
        <div class="color-value-box">
            <div class="color-value-left">
                <div v-if="color.format == 'hex'" class="color-value-hex">
                    <input ref="hex" class="color-value-input" type="text" name="hexValue" :value="color.value" @input="changeHex">
                    <div class="color-value-format">{{color.format}}</div>
                </div>
                <div v-else class="color-value-rgba">
                    <div class="color-value-input-col3">
                        <input ref="c0" class="color-value-input" type="text" name="hexValueR" :value="displayedColor()[0]" @input="changeColor(0)">
                        <div class="color-value-format">{{color.format.split('')[0]}}</div>
                    </div>
                    <div class="color-value-input-col3">
                        <input ref="c1" class="color-value-input" type="text" name="hexValueG" :value="displayedColor()[1]" @input="changeColor(1)">
                        <div class="color-value-format">{{color.format.split('')[1]}}</div>
                    </div>
                    <div class="color-value-input-col3">
                        <input ref="c2" class="color-value-input" type="text" name="hexValueB" :value="displayedColor()[2]" @input="changeColor(2)">
                        <div class="color-value-format">{{color.format.split('')[2]}}</div>
                    </div>
                    <div class="color-value-input-col3">
                        <input ref="A" class="color-value-input" type="text" name="hexValueA" :value="color._alpha" @input="changeA">
                        <div class="color-value-format">{{color.format.split('')[3]}}</div>
                    </div>
                </div>
            </div>
            <div class="color-value-btn">
                <div class="color-value-format-up" @click="changeColorFormat(-1)"></div>
                <div class="color-value-format-down" @click="changeColorFormat(1)"></div>
            </div> 
        </div>
        <!-- 常用色区 -->
        <div class="color-commons-box" @click="pickerColorQuickly">
            <template v-for="(item, index) in commonColors">
                <div :key="index" class="color-commons-value" :style="{backgroundColor: item, marginRight: (index+1) % 9 == 0 ? '0' : '16px'}" :data-color="item"></div>
            </template>
        </div>
    </div>
</template>
<script>
import Color from './color'
import SvPanel from './sv-panel.vue'
import HueSlider from './hue-slider.vue'
import AlphaSlider from './alpha-slider.vue'

export default {
    name: 'ColorPicker',
    components: {
        SvPanel,
        HueSlider,
        AlphaSlider
    },
    props: {
        value: {
            type: String,
            default: function() {
                return '#000';
            }
        }
    },
    data() {
        const color = new Color();
        return {
            color,
            commonColors: ['#000000', '#ffffff', '#ff0000', '#ff6600', '#00ffff', '#00ff00', '#000000', '#ffffff', '#ff0000', '#ff6600', '#00ffff', '#00ff00'],  // 常用颜色
            colorFormats: ['hex', 'rgba', 'hsla', 'hsva'],
        }
    },
    computed: {
        currentColor() {
            return this.value
        },
    },
    watch: {
        currentColor: {
            handler: function(val) {
                this.color.value = val;
                this.color.formatColor(val);
            },
            immediate: true
        },
    },
    methods: {
        changeColorFormat(value) {
            const index = this.colorFormats.indexOf(this.color.format);
            const length = this.colorFormats.length;
            let format;
            if (index + value >= length) {
                format = this.colorFormats[0];
            } else if (index + value >= 0) {
                format = this.colorFormats[index + value];
            } else {
                format = this.colorFormats[length - 1];
            }
            this.color.format = format;
            this.color.formatColor(this.color.value);
            // this.color.updateColor();
        },
        displayedColor() {
            let values = [];
            switch(this.color.format) {
                case 'rgba':
                    values = this.color.value.replace(/rgba|rgb|\(|\)/gi, '').split(/,\s/g);
                    break;
                case 'hsla':
                    values = this.color.value.replace(/hsla|hsl|\(|\)/gi, '').split(/,\s/g);
                    break;
                case 'hsva':
                    values = this.color.value.replace(/hsva|hsv|\(|\)/gi, '').split(/,\s/g);
                    break;
            }
            return values;
        },
        changeHex() {
            this.color.value = this.$refs.hex.value;
        },
        changeColor(index) {
            const value = this.$refs[`c${index}`].value;
            let color = null;
            switch(index) {
                case 0:
                    color = this.color.value.replace(/(?<=\()\w+(?=\,)/g, value);
                    break;
                case 1:
                    color = this.color.value.replace(/(?<=\(\w+\,\s*)\w+%*(?=\,)/g, value);
                    break;
                case 2:
                    color = this.color.value.replace(/(?<=\((\w+%*,\s*){2})\w+%*(?=\,)/g, value);
                    break;
            }
            this.color.formatColor(color);
        },
        changeA() {
            const alpha = this.$refs.A.value;
            if (alpha > 100 || alpha < 0) return;
            this.color.set('alpha', alpha);
        },
        pickerColorQuickly(e) {
            const color = e.target.dataset.color;
            if(!color) return;
            this.color.formatColor(color);
        }
    },
}
</script>
<style scoped>
.color-picker-wrap {
    position: relative;
    width: 294px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    overflow: hidden;
}
.color-slider-box {
    margin-top: 15px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.color-show {
    position: relative;
    width: 60px;
    height: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.color-transparent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
}
.color-background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.color-slider {
    width: calc(100% - 80px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.color-value-box {
    margin-top: 15px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.color-value-left {
    width: calc(100% - 40px);
}
.color-value-input {
    width: 100%;
    height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    color: #606266;
    text-align: center;
    line-height: 30px;
}
.color-value-format {
    width: 100%;
    color: #b5b5b5;
    line-height: 30px;
    text-align: center;
}
.color-value-rgba {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.color-value-input-col3 {
    width: 50px;
}
.color-value-btn {
    width: 30px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.color-value-format-up {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom-color: #ccc;
}
.color-value-format-down {
    width: 0;
    height: 0;
    margin-top: 5px;
    border: 6px solid transparent;
    border-top-color: #ccc;
}
.color-value-format-up:hover {
    border-bottom-color: #333;
}
.color-value-format-down:hover {
    border-top-color: #333;
}
.color-commons-box {
    position: relative;
    padding: 10px 5px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.color-commons-box::before {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    right: -5px;
    height: 0;
    border-top: 1px solid #dcdfe6;
}
.color-commons-value {
    width: 16px;
    height: 16px;
    margin: 0 16px 8px 0;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3) inset;
    cursor: pointer;
}
</style>