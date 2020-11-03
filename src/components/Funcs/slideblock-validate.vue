<template>
    <div>
        <!-- 滑块验证 -->
        <div class="slide-box" :style="{ width: slideBoxWidth + 'px' }">
            <div class="slide-block" :style="{borderColor:slideValidateIconColor}" @mousedown.left="startSlideValidate">
                <a-icon
                    :style="{ color: slideValidateIconColor, fontSize: '16px' }"
                    :type="slideValidateIcon"
                />
            </div>
            <div class="slide-area">
                <div class="slide-move-area slide-move-animation"></div>
            </div>
            <div v-if="!!slideValidateStatus" class="slide-result" :style="{backgroundColor:slideValidateIconColor}"><p style="transform:translateX(-20px);">{{slideValidateStatus == 'success' ? '验证成功' : '验证失败'}}</p></div>
            <div v-if="slideMoveX == 0" class="slide-text">拖住滑块验证</div>
        </div>
        <a-button style="margin-top:15px" @click="resetSlideValidate">重置</a-button>
    </div>
</template>
<script>
export default {
    props: {
        slideBoxWidth: {
            type: Number,
            default: function(){
                return 300
            }
        },
    },
    data() {
        return {
            // 滑块验证参数
            // slideBoxWidth: 300,
            slideStartMoving: false,
            slideValidateIcon: 'double-right',
            slideValidateIconColor: 'rgba(0,0,0,0.15)',
            slideValidateStatus: '',
            slideValidateSuccessColor: '#52ccba',
            slideValidateFailColor: '#e86363',
            slideValidateMovingColor: 'linear-gradient(90deg,#b1ece4, #87e8da)',
            slideMoveX: 0,
        };
    },
    mounted() {
        this.initSlideValidate();
    },
    methods: {
        initSlideValidate() {
            this.slideBtnWidth = 40;
            this.slideMaxWidth = this.slideBoxWidth;
            this.slideSuccessWidth = this.slideBoxWidth - this.slideBtnWidth;
            this.slideBox = document.querySelector('.slide-box');
            this.slideBtn = document.querySelector('.slide-block');
            this.slideArea = document.querySelector('.slide-area');
        },
        startSlideValidate() {
            if (this.slideStartMoving) return;
            this.slideStartMoving = true;
            document.addEventListener('mousemove', this.slideMove);
            document.addEventListener('mouseup', this.slideEnd);
        },
        slideMove(event) {
            if (event.clientX >= this.slideBox.offsetLeft && event.clientX - this.slideBox.offsetLeft <= this.slideMaxWidth) {
                this.slideMoveX = event.clientX - this.slideBox.offsetLeft;
                this.slideArea.style.background = this.slideValidateMovingColor;
                if (this.slideMoveX >= this.slideSuccessWidth ) {
                    this.slideMoveX = this.slideSuccessWidth;
                    this.slideValidateStatus = 'success';
                    this.slideValidateIcon = 'check-circle';
                    this.slideValidateIconColor = this.slideValidateSuccessColor;
                } else {
                    this.slideValidateStatus = '';
                    this.slideValidateIcon = 'double-right';
                }
                this.slideBtn.style.left = this.slideMoveX + 'px';
                this.slideArea.style.width = this.slideMoveX + 'px';
            }
            event.preventDefault();
        },
        slideEnd() {
            if (!this.slideStartMoving) return;
            this.slideStartMoving = false;
            if (this.slideMoveX < this.slideSuccessWidth / 2) {
                this.resetSlideValidate();
            } else if (this.slideMoveX < this.slideSuccessWidth) {
                // 验证失败
                this.slideBtn.style.left = this.slideSuccessWidth + 'px';
                this.slideValidateStatus = 'fail';
                this.slideValidateIcon = 'close-circle';
                this.slideValidateIconColor = this.slideValidateFailColor;
            }
            document.removeEventListener('mousemove', this.slideMove);
            document.removeEventListener('mouseup', this.slideEnd);
        },
        resetSlideValidate() {
            this.slideValidateStatus = '';
            this.slideValidateIcon = 'double-right';
            this.slideValidateIconColor = 'rgba(0,0,0,0.15)';
            this.slideBtn.style.left = 0;
            this.slideArea.style.width = 0;
            this.slideMoveX = 0;
            this.slideStartMoving = false;
        },
        // throtte(fn, delay = 500) {
        //     let last, timer;
        //     return function() {
        //         let now = +new Date();
        //         if (now - last < delay) {
        //             clearTimeout(timer);
        //             timer = setTimeout(() => {
        //                 last = now;
        //                 fn.apply(this, arguments);
        //             }, delay);
        //         } else {
        //             last = now;
        //             fn.apply(this, arguments);
        //         }
        //     };
        // },
    }
};
</script>
<style scoped>
.slide-box {
    position: relative;
    height: 40px;
    background: #e9e9e9;
    text-align: center;
    line-height: 40px;
    overflow: hidden;
}
.slide-area {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    z-index: 4;
    overflow: hidden;
}
.slide-result {
    position: relative;
    z-index: 5;
    color: #fff;
}
.slide-text {
    transform: translateX(20px);
}
.slide-block {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 1px solid transparent;
    cursor: pointer;
}
.slide-move-area {
    position: absolute;
    left: 0;
    width: 0;
    height: 200%;
    box-shadow: 1px 1px 5px 5px rgba(255, 255, 255, 0.2);
    transform: skewX(-15deg);
    z-index: 5;
}

.slide-move-animation {
    animation-name: move;
    animation-iteration-count: infinite;
    animation-duration: 1.8s;
    animation-timing-function: ease;
}
@keyframes move {
    0% {
        left: 0
    }
    100% {
        left: 100%
    }
}
</style>
