<template>
    <!-- 取色板 -->
    <div class="color-svpanel" :style="{'background-color': background}">
        <div class="color-svpanel-white"></div>
        <div class="color-svpanel-black"></div>
        <div ref="cursor" class="color-svpanel-cursor" :style="{left: cursorX + 'px', top: cursorY + 'px'}"><div></div></div>
    </div>
</template>
<script>
import draggable from './draggable'

export default {
    name: 'sv-panel',
    props: {
        color: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            background: '',
            cursorX: '',
            cursorY: ''
        }
    },
    computed: {
        colorValue() {
            const hue = this.color.get('hue');
            const value = this.color.get('value');
            return { hue, value };
        }
    },
    watch: {
        colorValue: {
            handler: function() {
                this.update();
            },
            deep: true
        }
    },
    mounted() {
        const { cursor } = this.$refs;

        const dragConfig = {
            drag: event => {
                this.onDragging(event);
            },
            end: event => {
                this.onDragging(event);
            }
        };

        draggable(this.$el, dragConfig);
        draggable(cursor, dragConfig);

        this.update();
    },
    methods: {
        onDragging(event) {
            const rect = this.$el.getBoundingClientRect();

            let left = event.clientX - rect.left;
            let top = event.clientY - rect.top;
            
            left = Math.max(0, left);
            left = Math.min(left, rect.width);

            top = Math.max(0, top);
            top = Math.min(top, rect.height);

            this.cursorX = left;
            this.cursorY = top;
            this.color.set({
                saturation: left / rect.width * 100,
                value: 100 - top / rect.height * 100
            });
        },
        update() {
            const saturation = this.color.get('saturation');
            const value = this.color.get('value');

            const el = this.$el;
            let { clientWidth: width, clientHeight: height } = el;

            this.cursorX = saturation * width / 100;
            this.cursorY = (100 - value) * height / 100;

            this.background = 'hsl(' + this.color.get('hue') + ', 100%, 50%)';
            this.color.updateColor();
        }
    },
}
</script>
<style scoped>
.color-svpanel {
    position: relative;
    width: 100%;
    height: 200px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.color-svpanel-white {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
}
.color-svpanel-black {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(0deg,#000,transparent);
}
.color-svpanel-cursor {
    position: absolute;
}
.color-svpanel-cursor>div {
    width: 4px;
    height: 4px;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
    border-radius: 50%;
    transform: translate(-2px,-2px);
}
</style>