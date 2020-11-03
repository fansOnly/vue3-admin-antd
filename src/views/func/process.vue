<template>
    <div class="container">
        <a-steps :current="current" :status="status">
            <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
                :description="item.description"
            />
        </a-steps>
        <div class="steps-content">{{ steps[current].content }}</div>
        <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="done">完成</a-button>
            <a-button v-if="current > 0 && !isDone" style="margin-left: 8px" @click="prev">上一步</a-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Process',
    data() {
        return {
            current: 0,
            status: 'process',
            times: 0,
            isDone: false,
            steps: [
                {
                    title: '报销申请',
                    description: '老板，赏点零花钱',
                    content: 'First-content'
                },
                {
                    title: '经理审批',
                    description: '出门右拐',
                    content: 'Second-content'
                },
                {
                    title: '财务复审',
                    description: '多点几次就行了',
                    content: 'Second-content'
                },
                {
                    title: '提交成功',
                    description: '明年再发',
                    content: 'Last-content'
                }
            ]
        };
    },
    methods: {
        next() {
            if (this.current == 2 && this.times < 10) {
                this.times++;
                this.status = 'error';
            } else if (this.current == 2 && this.times == 10) {
                this.times = 0;
                this.status = 'process';
                this.$message.warn('下次让你点一百次')
            }
            if (this.status == 'error') {
                this.$message.error('就是不给你过')
                return;
            }
            this.current++
        },
        prev() {
            this.status = 'process';
            this.current--;
        },
        done() {
            if (this.isDone) return;
            this.isDone = true;
            this.$message.success('恭喜你，报销一年后到账')
        }
    }
};
</script>
<style scoped>
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

.steps-action {
    margin-top: 24px;
}
</style>
