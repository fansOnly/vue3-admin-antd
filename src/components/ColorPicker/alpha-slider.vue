<template>
    <div class="color-alpha-slider">
        <div ref="alphaBar" class="color-alpha-slider-bar">
            <div class="color-transparent"></div>
            <div class="color-alpha-slider-bar-background" :style="{background: 'linear-gradient(90deg, transparent, '+backgroundVal+')'}"></div>
        </div>
        <div ref="alphaThumb" class="color-slider-thumb" :style="{left: alphaSlideX + 'px'}"></div>
    </div>
</template>
<script>
import draggable from './draggable'

export default {
    name: 'alpha-slider',
    props: {
        color: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            alphaSlideX: 100,  // 透明条的位置
        }
    },
    computed: {
        backgroundVal() {
            return this.color.value;
        },
        alphaVal() {
            return this.color.get('alpha')
        },
    },
    watch: {
        alphaVal() {
            this.update();
        }
    },
    mounted() {
        const { alphaBar, alphaThumb } = this.$refs;

        const dragConfig = {
            drag: event => {
                this.onDragging(event);
            },
            end: event => {
                this.onDragging(event);
            }
        }
        draggable(alphaBar, dragConfig);
        draggable(alphaThumb, dragConfig);
        this.update();
    },
    methods: {
        onDragging(event) {
            const { alphaBar, alphaThumb } = this.$refs;
            const rect = alphaBar.getBoundingClientRect();
            let alpha;
            let left = event.clientX - rect.left;
            left = Math.min(left, rect.width - alphaThumb.offsetWidth / 2);
            left = Math.max(alphaThumb.offsetWidth / 2, left);

            alpha = Math.round((left - alphaThumb.offsetWidth / 2) / (rect.width - alphaThumb.offsetWidth) * 100);

            this.color.set('alpha', alpha);
        },
        getThumbLeft() {
            const { alphaBar, alphaThumb } = this.$refs;
            let alpha = this.color.get('alpha');
            if (alpha == 0) {
                return -alphaThumb.offsetWidth / 2;
            }
            return Math.round(alpha * (alphaBar.offsetWidth - alphaThumb.offsetWidth / 2) / 100);
        },
        update() {
            this.alphaSlideX = this.getThumbLeft();
            this.color.updateColor();
        }
    },
}
</script>
<style scoped>
.color-alpha-slider {
    position: relative;
    width: 100%;
    height: 10px;
    padding: 0 2px;
    border-radius: 3px;
}
.color-alpha-slider-bar {
    position: relative;
    height: 100%;
    width: 100%;
}
.color-transparent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
}
.color-alpha-slider-bar-background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.color-slider-thumb {
    box-sizing:border-box;
    position: absolute;
    cursor: pointer;
    left: 0;
    top: -2px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px rgba(0,0,0,.6);
    z-index: 1;
}
</style>