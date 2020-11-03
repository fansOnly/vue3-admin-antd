<template>
    <div class="exception">
        <div class="imgBox">
            <img
                class="img"
                src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
                style="width:300px;height:auto;"
                alt="404"
            />
            <!-- <img class="img" src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg" style="width:300px;height:auto;" alt="403" /> -->
            <!-- <img class="img" src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg" style="width:300px;height:auto;" alt="500" /> -->
        </div>
        <div class="content">
            <h1 class="status">404</h1>
            <p class="desc">Sorry, the page you visited does not exist.</p>
            <a-button><a href="./">返回首页</a></a-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'notFound'
};
</script>
<style scoped>
.exception {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 800px;
}
.imgBox {
    flex: 0 0 55%;
    width: 55%;
    padding-right: 10%;
    zoom: 1;
}
.img {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}
.content {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
}
.status {
    margin-bottom: 24px;
    color: #434e59;
    font-weight: 600;
    font-size: 72px;
    line-height: 72px;
}
.desc {
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
}
</style>
