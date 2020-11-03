<template>
    <div class="color-hue-slider">
        <div ref="hueBar" class="color-hue-slider-bar"></div>
        <div ref="hueThumb" class="color-slider-thumb" :style="{left: hueSliderX + 'px'}"></div>
    </div>
</template>
<script>
import draggable from './draggable'

export default {
    name: 'hue-slider',
    props: {
        color: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hueSliderX: 0
        }
    },
    computed: {
        hueVal() {
            return this.color.get('hue')
        },
    },
    watch: {
        hueVal() {
            this.update();
        }
    },
    mounted() {
        const { hueBar, hueThumb } = this.$refs;

        const dragConfig = {
            drag: event => {
                this.onDragging(event);
            },
            end: event => {
                this.onDragging(event);
            }
        }

        draggable(hueBar, dragConfig);
        draggable(hueThumb, dragConfig);
        this.update();
    },
    methods: {
        onDragging(event) {
            const { hueBar, hueThumb } = this.$refs;
            const rect = hueBar.getBoundingClientRect();
            let hue;
            let left = event.clientX - rect.left;
            left = Math.min(left, rect.width - hueThumb.offsetWidth / 2);
            left = Math.max(hueThumb.offsetWidth / 2, left);

            hue = Math.round((left - hueThumb.offsetWidth / 2) / (rect.width - hueThumb.offsetWidth) * 360);

            this.color.set('hue', hue);
        },
        getThumbLeft() {
            const { hueBar, hueThumb } = this.$refs;
            let hue = this.color.get('hue');
            if(hue == 0) {
                return -hueThumb.offsetWidth / 2;
            }
            return Math.round(hue * (hueBar.offsetWidth - hueThumb.offsetWidth / 2) / 360);
        },
        update() {
            this.hueSliderX = this.getThumbLeft();
            this.color.updateColor();
        }
    },
}
</script>
<style scoped>
.color-hue-slider {
    position: relative;
    width: 100%;
    height: 10px;
    padding: 0 2px;
    border-radius: 3px;
    background: red;
}
.color-hue-slider-bar {
    position: relative;
    height: 100%;
    width: 100%;
    background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);
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