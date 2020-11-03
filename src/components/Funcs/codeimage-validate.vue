<template>
    <canvas id="validate-code-img" @click="refresh" :width="validateCodeImgWidth" :height="validateCodeImgHeight"></canvas>
</template>
<script>
export default {
    props: {
        isRefreshWhileFail: {  // 验证失败则刷新验证码
            type: Boolean,
            default: function() {
                return true
            }
        },
        validateFail: {  // 验证失败的状态变化
            type: Boolean,
            default: function() {
                return false
            }
        },
        validateCodeImgWidth: {  // 验证码图片宽度
            type: Number,
            default: function() {
                return 120
            }
        },
        validateCodeImgHeight: {  // 验证码图片高度
            type: Number,
            default: function() {
                return 38
            }
        },
        maxLength: {  // 验证码长度
            type: Number,
            default: function() {
                return 6
            }
        },
        dotLength: {  // 验证码杂质密度
            type: Number,
            default: function() {
                return 50
            }
        },
        lineLength: {  // 验证码扰乱线条个数
            type: Number,
            default: function() {
                return 8
            }
        },
    },
    data() {
        return {
            validateSuccessCode: '',
        };
    },
    watch: {
        maxLength: {
            handler: function(val) {
                this.refresh();
            },
        },
        validateFail: {
            handler: function(val) {
                this.isRefreshWhileFail && this.refresh();
            },
        },
    },
    mounted() {
        this.drawValidateCode(this.maxLength);
    },
    methods: {
        refresh() {
            this.validateSuccessCode = '';
            this.drawValidateCode(this.maxLength);
        },
        drawValidateCode(length) {
            const canvas = document.getElementById('validate-code-img');
            const context = canvas.getContext('2d');
            canvas.width = this.validateCodeImgWidth;
            canvas.height = this.validateCodeImgHeight;
            const ratio = canvas.width / length;  // 文字、间隔比例
            const acode = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9';
            const scode = acode.split(',');
            const sLen = scode.length;
            for(let i = 0; i < length; i++) {
                const random = Math.floor(Math.random() * sLen);
                const deg = Math.random() * 15 * Math.PI / 180;  // 产生0~30之间的随机弧度
                const text = scode[random];
                this.validateSuccessCode += text;
                // 文字坐标计算
                const x = 10 + i * ratio * 0.9;
                const y = ratio * 0.8 + Math.random() * length * 2;
                context.font = `bold ${ratio * 0.8}px 微软雅黑`;
                context.translate(x, y);
                context.rotate(deg);
                context.fillStyle = this.randomColor();
                context.fillText(text, 0, 0);
                context.rotate(-deg);
                context.translate(-x, -y);
            }
            this.$emit('refresh', this.validateSuccessCode);
            // 验证码上显示线条
            for (let i = 0; i <= this.lineLength; i++) {
                context.strokeStyle = this.randomColor();
                context.beginPath();
                context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                context.stroke();
            }
            //验证码上显示小点
            for (let i = 0; i <= this.dotLength; i++) {
                context.strokeStyle = this.randomColor();
                context.beginPath();
                var x = Math.random() * canvas.width;
                var y = Math.random() * canvas.height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
        },
        randomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        },
    }
};
</script>
<style scoped>
#validate-code-img {
    margin-left: 15px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
}
</style>
